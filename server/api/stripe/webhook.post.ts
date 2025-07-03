import Stripe from 'stripe'
import { useDrizzle, tables } from '../../utils/drizzle'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  const signature = getHeaders(event)['stripe-signature']
  const body = await readRawBody(event)

  if (!signature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing stripe-signature header',
    })
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body',
    })
  }
  const db = useDrizzle()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
    })
  }

  let stripeEvent
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      config.stripe.webhookSecret,
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    const error = err as Error
    throw createError({
      statusCode: 400,
      message: `Webhook Error: ${error.message}`,
    })
  }

  console.log('Webhook event type:', stripeEvent.type) // 调试日志

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object
        const userEmail = session.metadata?.userEmail
        const sessionId = session.id

        try {
          console.log('🔄 Attempting database insert...')
          await db.insert(tables.orders).values({
            paidAt: new Date(),
            sessionId: sessionId as string,
            userEmail: userEmail as string,
            createdAt: new Date(),
          })
        } catch (dbError) {
          console.error('❌ Database insert failed with detailed error:')
          console.error('Error object:', dbError)
        }

        break
      }

      case 'charge.updated':
      case 'charge.succeeded': {
        // 处理支付更新事件，但不需要特殊处理
        console.log('💳 Charge event received:', stripeEvent.type)
        break
      }

      default: {
        console.log('📋 Unhandled webhook event type:', stripeEvent.type)
        break
      }
    }
  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    // 不抛出错误，让 Stripe 知道我们收到了 webhook
  }

  return { received: true }
})
