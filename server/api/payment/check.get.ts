import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Session ID is required',
    })
  }

  try {
    const kv = hubKV()
    const paymentRecord = await kv.get(`payment:${sessionId}`)

    if (paymentRecord) {
      return {
        success: true,
        paid: true,
        ...(paymentRecord as any),
      }
    }

    // 如果 KV 中没有记录，再检查 Stripe 状态（双重保险）
    const config = useRuntimeConfig()
    const stripe = new Stripe(config.stripe.secretKey)

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status === 'paid') {
        // 如果 Stripe 显示已支付，但 KV 中没有记录，说明 webhook 可能延迟
        // 这时返回支付成功，但标记为需要等待处理
        return {
          success: true,
          paid: true,
          processing: true, // 标记为处理中
          userEmail: session.metadata?.userEmail,
          sessionId: session.id,
        }
      }
    } catch (stripeError) {
      console.error('Stripe API error:', stripeError)
    }

    return {
      success: true,
      paid: false,
    }
  } catch (error) {
    console.error('Error checking payment status:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check payment status',
    })
  }
})
