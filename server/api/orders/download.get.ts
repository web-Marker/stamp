export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { sessionId } = query

    if (!sessionId || typeof sessionId !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing or invalid sessionId parameter',
      })
    }

    // 从 KV 获取文件数据
    const kv = hubKV()
    if (!kv) {
      throw createError({
        statusCode: 500,
        statusMessage: 'KV storage connection failed',
      })
    }

    try {
      const paymentData = await kv.get(`payment:${sessionId}`)

      if (!paymentData || typeof paymentData !== 'object' || !('zipBlob' in paymentData)) {
        throw createError({
          statusCode: 404,
          statusMessage: 'File not found in storage',
        })
      }

      // 返回文件数据
      return {
        success: true,
        fileData: (paymentData as { zipBlob: string }).zipBlob,
        fileName: 'stamp-pack.zip',
        mimeType: 'application/zip',
      }
    } catch (kvError) {
      console.error('❌ KV get error:', kvError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to retrieve file: ${(kvError as Error).message}`,
      })
    }
  } catch (error) {
    console.error('❌ Download error:', error)

    // 如果是已知的HTTP错误，直接抛出
    if ((error as any).statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to download file: ${(error as Error).message}`,
    })
  }
})
