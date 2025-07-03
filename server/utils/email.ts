import Mailjet from 'node-mailjet'

export async function sendEmail({ to, subject, html }) {
  const config = useRuntimeConfig()

  const mailjet = Mailjet.apiConnect(
    config.mailjet.apiKey,
    config.mailjet.secretKey,
  )

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: config.mailjet.fromEmail,
          Name: 'Stamp Maker Success',
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject: subject,
        HTMLPart: html,
      },
    ],
  })

  const result = await request
  return result.body
}
