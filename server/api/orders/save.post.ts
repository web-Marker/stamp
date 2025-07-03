import { useDrizzle, tables } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const { sessionId, userEmail, zipBlob } = await readBody(event)

    if (!sessionId || !userEmail || !zipBlob) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      })
    }

    // 验证数据库中是否有支付记录
    const db = useDrizzle()
    if (!db) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database connection failed',
      })
    }

    const paymentRecord = await db
      .select()
      .from(tables.orders)
      .where(eq(tables.orders.sessionId, sessionId))
      .limit(1)

    if (!paymentRecord.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Payment record not found',
      })
    }

    const payment = paymentRecord[0]
    if (payment.userEmail !== userEmail) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Email address does not match payment record',
      })
    }

    // 存储到 KV
    const kv = hubKV()

    // 检查数据库连接
    if (!kv) {
      throw createError({
        statusCode: 500,
        statusMessage: 'kv connection failed',
      })
    }

    try {
      await kv.set(`payment:${sessionId}`, {
        zipBlob,
      })

      console.log('✅ File saved to KV storage')

      // 调用发送邮件 API
      await $fetch('/api/email/send-download-link', {
        method: 'POST',
        body: {
          sessionId,
          userEmail,
        },
      })

      console.log('✅ Download email sent successfully')
    } catch (kvError) {
      console.error('❌ kvError insert failed with detailed error:')

      // 重新抛出错误让外层catch处理
      throw kvError
    }

    return {
      success: true,
      orderId: `order-${sessionId}`, // 使用时间戳作为订单ID
    }
  } catch (error) {
    console.error('Error saving order:', error)

    // 提供更详细的错误信息
    const err = error as Error

    // 如果是已知的HTTP错误，直接抛出
    if ((error as any).statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to save order: ${err.message}`,
    })
  }
})
