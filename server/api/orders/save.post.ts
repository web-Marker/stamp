export default defineEventHandler(async (event) => {
  try {
    const { sessionId, userEmail, zipBlob } = await readBody(event)

    if (!sessionId || !userEmail || !zipBlob) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      })
    }

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
