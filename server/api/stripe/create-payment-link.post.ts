import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  try {
    const { userEmail } = await readBody(event)

    const config = useRuntimeConfig()
    const stripe = new Stripe(config.stripe.secretKey)

    // 创建支付链接
    const paymentLink = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.stripe.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.public.appUrl}?session_id={CHECKOUT_SESSION_ID}&status=completed`,
      cancel_url: `${config.public.appUrl}?status=cancelled`,
      metadata: {
        userEmail: userEmail,
      },
    })

    return {
      success: true,
      url: paymentLink.url,
    }
  } catch (error) {
    console.error('Error creating payment link:', error)
    return {
      success: false,
      error: 'Failed to create payment link',
    }
  }
})
