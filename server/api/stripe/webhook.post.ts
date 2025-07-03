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

  console.log('Webhook event type:', stripeEvent.type)

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object
        const userEmail = session.metadata?.userEmail
        const sessionId = session.id

        console.log('💳 Processing payment completion for:', { sessionId, userEmail })

        try {
          await db.insert(tables.orders).values({
            sessionId: sessionId as string,
            userEmail: userEmail as string,
            paidAt: new Date(),
            createdAt: new Date(),
          })
          console.log('✅ Payment record saved to database')
        } catch (dbError) {
          console.error('❌ Database insert failed:', dbError)
          // 数据库错误应该返回错误，让 Stripe 重试
          throw createError({
            statusCode: 500,
            statusMessage: 'Database insert failed',
          })
        }

        break
      }

      case 'charge.updated':
      case 'charge.succeeded': {
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
    // 如果是已知的HTTP错误，直接抛出
    if ((error as any).statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook processing failed',
    })
  }

  return { received: true }
})
