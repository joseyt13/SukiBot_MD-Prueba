// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

import axios from 'axios'
import FormData from 'form-data'
import WebSocket from 'ws'
import cheerio from 'cheerio'
import crypto from 'crypto'
import yts from "yt-search"
import fs from 'fs'
import { get} from 'https'
import { createWriteStream} from 'fs'
import { promisify} from 'util'
const unlink = promisify(fs.unlink)
import fetch from 'node-fetch'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 Suki_Bot_MD Canal Oficial'
};

const imageURL = 'https://files.catbox.moe/cvpwkk.jpg'; // puedes cambiar esta imagen

let handler = async (m, { conn, text, args}) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:v|e(?:mbed)?)\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/

  if (!text ||!youtubeRegex.test(text)) {
    return conn.reply(m.chat, `🌱 Uso correcto: ytmp4 https://youtube.com/watch?v=DLh9mnfZvc0`, m)
}

  try {
    m.react('⏳')
    const search = await yts(args[0])
    const video = search.videos[0]
    if (!video ||!video.url) return conn.reply(m.chat, `No se encontró el video.`, m)

    const isDoc = /doc$/.test(text)
    const cap = `
*⋆｡ﾟ☁︎ Descarga pastelcore activada ☁︎｡ﾟ⋆*

🧋 *Título:* ${video.title}
🎀 *Canal:* ${video.author.name}
⏳ *Duración:* ${video.timestamp}
👀 *Vistas:* ${video.views.toLocaleString()}
📅 *Publicado:* ${video.ago}
📡 *Enlace:* ${video.url}
🌸 *Calidad:* ${args[1] || "360p"}
🧁 *Bot:* Suki_Bot_MD — inspirado en Suki na Ko 💮
`.trim()

    const imgBuffer = await fetch(imageURL).then(res => res.buffer())

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: cap,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 777,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 88,
          newsletterName: channelRD.name
}
}
}, { quoted: m})

    const vid = await ytmp4(video.url, args[1] || "360")
    const path = `/tmp/${Date.now()}.mp4`

    await new Promise((resolve, reject) => {
      const file = createWriteStream(path)
      get(vid.dl_url, (res) => {
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
        file.on('error', reject)
}).on('error', reject)
})

    const stats = fs.statSync(path)
    const sizeMB = stats.size / (1024 * 1024)
    const fDoc = sizeMB> 80

    await conn.sendFile(m.chat, path, `${video.title}.mp4`, (isDoc || fDoc)? "": cap, m, null, {
      asDocument: isDoc || fDoc,
      mimetype: "video/mp4"
})

    await unlink(path)
    m.react('✅')

} catch (error) {
    console.error(error)
    return conn.reply(m.chat, `Error al descargar el video.\n\n${error.message}`, m)
}
}

handler.command = ["ytmp4"]
handler.help = ["ytmp4"]
handler.tags = ["download"]
export default handler
