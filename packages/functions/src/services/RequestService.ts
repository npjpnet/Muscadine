const createDocumentRequestAsync = async (requestId: string): Promise<void> => {
  const webhookURL = process.env.DISCORD_WEBHOOKS_URL
  if (!webhookURL) return

  const webhookBody = {
    content: '',
    username: 'Muscadine',
    embeds: [
      {
        title: '書類申請を受け付けました。',
        url: '',
        fields: [
          {
            name: '申請ID',
            value: requestId
          }
        ]
      }
    ]
  }

  await fetch(webhookURL, {
    method: 'POST',
    body: JSON.stringify(webhookBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default {
  createDocumentRequestAsync
}
