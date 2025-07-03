import { sendEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    return createError({
      statusCode: 400,
      message: 'Email address cannot be empty',
    })
  }

  try {
    // 生成订单页面的URL，包含邮箱参数
    const config = useRuntimeConfig()
    const baseUrl = config.public.appUrl || 'https://stampdy.com'
    const downloadUrl = `${baseUrl}/order?email=${encodeURIComponent(email)}`

    // 构建邮件HTML内容，包含个性化信息
    const html = getSealDownloadEmailTemplate(downloadUrl, email, `ORD-${Date.now()}`)

    try {
      // 发送邮件
      await sendEmail({
        to: email,
        subject: '🎉 Your Digital Stamp is Ready for Download - Stampdy',
        html,
      })

      return { success: true, message: 'Email sent successfully' }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      const error = emailError as Error
      throw new Error(
        `Email sending failed: ${error.message || 'Unknown error'}`,
      )
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    const err = error as Error
    return createError({
      statusCode: 500,
      message: 'Email sending failed: ' + (err.message || ''),
    })
  }
})

// Get stamp download email template
function getSealDownloadEmailTemplate(downloadUrl: string, userEmail = '', orderId = '') {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Stamp is Ready - Stampdy</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header with Logo -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
          <div style="color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">
            📫 Stampdy
          </div>
          <div style="color: #e2e8f0; font-size: 14px; margin-top: 5px;">
            Professional Digital Stamps
          </div>
        </div>

        <!-- Success Banner -->
        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 0;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 24px;">✅</div>
            <div>
              <div style="font-weight: 600; color: #166534; font-size: 16px;">
                Payment Successful!
              </div>
              <div style="color: #166534; font-size: 14px;">
                Your stamp is ready for download
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <h1 style="color: #1a202c; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; line-height: 1.2;">
            🎉 Your Digital Stamp is Ready!
          </h1>
          
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Hi there! Thank you for choosing Stampdy. Your professional digital stamp has been created and is now ready for download.
          </p>

          ${orderId
            ? `
          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="font-size: 14px; color: #718096; margin-bottom: 10px;">Order Details:</div>
            <div style="font-weight: 600; color: #2d3748;">Order ID: ${orderId}</div>
            <div style="color: #718096; font-size: 14px;">Date: ${currentDate}</div>
            ${userEmail ? `<div style="color: #718096; font-size: 14px;">Email: ${userEmail}</div>` : ''}
          </div>
          `
            : ''}

          <!-- Download Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="${downloadUrl}" 
               style="display: inline-block; 
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: #ffffff; 
                      padding: 16px 32px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: 600; 
                      font-size: 16px;
                      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                      transition: all 0.2s ease;">
              📁 Download Your Stamp Files
            </a>
          </div>

          <!-- What's Included -->
          <div style="background-color: #fef7e7; border: 1px solid #f6cc3f; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <div style="font-weight: 600; color: #92400e; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>📦</span> What's included in your download:
            </div>
            <ul style="color: #92400e; font-size: 14px; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 6px;">🖼️ High-resolution PNG files (300 DPI)</li>
              <li style="margin-bottom: 6px;">📐 Scalable SVG vector files</li>
              <li style="margin-bottom: 6px;">📄 Print-ready PDF format</li>
              <li style="margin-bottom: 6px;">📋 Usage guidelines and tips</li>
            </ul>
          </div>

          <!-- Support Section -->
          <div style="border-top: 1px solid #e2e8f0; padding-top: 30px; margin-top: 40px;">
            <h3 style="color: #2d3748; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">
              Need Help? We're Here for You!
            </h3>
            <p style="color: #4a5568; font-size: 14px; line-height: 1.5; margin: 0 0 15px 0;">
              If you have any questions or need assistance with your stamp files, our support team is ready to help:
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <a href="mailto:support@stampdy.com" 
                 style="color: #667eea; text-decoration: none; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                <span>📧</span> support@stampdy.com
              </a>
              <div style="color: #718096; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                <span>⏰</span> Response within 24 hours
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <div style="color: #2d3748; font-weight: 600; margin-bottom: 10px;">
            Thank you for choosing Stampdy! 🙏
          </div>
          <div style="color: #718096; font-size: 14px; line-height: 1.5;">
            Professional digital stamps for all your business needs<br>
            <a href="https://stampdy.com" style="color: #667eea; text-decoration: none;">stampdy.com</a>
          </div>
          
          <!-- Security Notice -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #a0aec0; line-height: 1.4;">
              🔒 This email contains your personal download link. Please do not share it with others.<br>
              If you didn't make this purchase, please contact our support team immediately.<br>
              This is an automated message - please do not reply directly to this email.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
