// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

import axios from 'axios'
import cheerio from 'cheerio'
import crypto from 'crypto'
import fs from 'fs'
import { createWriteStream} from 'fs'
import { promisify} from 'util'
import WebSocket from 'ws'
import yts from 'yt-search'
import { get} from 'https'
const unlink = promisify(fs.unlink)

let handler = async (m, { conn, text, args, command}) => {
  const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  if (!text ||!ytRegex.test(text)) {
    return conn.reply(m.chat, '📌 Uso:.ytmp4 <enlace de YouTube>', m)
}

  m.react('⏳')
  try {
    const search = await yts(args[0])
    const video = search.videos[0]
    if (!video ||!video.url) throw new Error('Video no encontrado.')

    const quality = args[1] || '360'
    const isDoc = /doc$/i.test(command)

    const vid = await ytmp4(video.url, quality)
    const path = `/tmp/${Date.now()}.mp4`
    await new Promise((resolve, reject) => {
      const file = createWriteStream(path)
      get(vid.dl_url, res => {
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
        file.on('error', reject)
}).on('error', reject)
})

    const stats = fs.statSync(path)
    const sizeMB = stats.size / (1024 * 1024)
    const sendAsDoc = isDoc || sizeMB> 80

    const caption = `
🎬 *Título:* ${video.title}
📺 *Canal:* ${video.author.name}
⏱️ *Duración:* ${video.timestamp}
👁️ *Vistas:* ${video.views.toLocaleString()}
📆 *Publicado:* ${video.ago}
🔗 *URL:* ${video.url}
🧩 *Calidad:* ${quality}p
`.trim()

    await conn.sendFile(m.chat, path, `${video.title}.mp4`, sendAsDoc? '': caption, m, null, {
      asDocument: sendAsDoc,
      mimetype: 'video/mp4'
})

    await unlink(path)
    m.react('✅')
} catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error: ${e.message}`, m)
}
}

handler.command = ['ytmp4', 'ytmp4doc']
handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
export default handler
