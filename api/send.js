export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { answer, food, time } = req.body || {}

  if (!answer || !food || !time) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    res.status(500).json({ error: 'Telegram is not configured' })
    return
  }

  const text = [
    '💌 Новый ответ на свидание!',
    '',
    `Ответ: ${answer}`,
    `Еда: ${food}`,
    `Время встречи: ${time}`,
  ].join('\n')

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  if (!tgRes.ok) {
    res.status(502).json({ error: 'Telegram request failed' })
    return
  }

  res.status(200).json({ ok: true })
}
