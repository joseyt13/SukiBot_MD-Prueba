import axios from 'axios'

const randomUserId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Mw Tanya Apa')
  
  try {
    let { data: rawSSE, headers } = await axios.post(
      'https://api.gpt-oss.com/chatkit',
      {
        op: 'threads.create',
        params: {
          input: {
            text,
            content: [{ type: 'input_text', text }],
            quoted_text: '',
            attachments: []
          }
        }
      },
      {
        headers: {
          authority: 'api.gpt-oss.com',
          accept: 'text/event-stream',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://gpt-oss.com',
          cookie: `user_id=${randomUserId()}`,
          referer: 'https://gpt-oss.com/',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
          'x-selected-model': 'gpt-oss-120b'
        },
        responseType: 'text'
      }
    )

    let events = rawSSE
      .split('\n')
      .filter(line => line.startsWith('data: '))
      .map(line => line.slice(6).trim())
      .filter(Boolean)
      .map(str => {
        try { return JSON.parse(str) } catch { return null }
      })
      .filter(Boolean)

    let response = events
      .filter(e => e.type === 'thread.item_done' && e.item?.type === 'assistant_message')
      .map(e => e.item.content?.[0]?.text)
      .filter(Boolean)
      .join('\n\n')
    await m.reply(response)
  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['gptoss']
handler.command = ['gptoss']
handler.tags = ['ai']

export default handler
