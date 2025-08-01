// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

// Importaciones necesarias
import axios from 'axios'
import FormData from 'form-data'
import WebSocket from 'ws'
import cheerio from 'cheerio'
import crypto from 'crypto'
import yts from 'yt-search'
import fs from 'fs'
import { get} from 'https'
import { createWriteStream} from 'fs'
import { promisify} from 'util'
import fetch from 'node-fetch'
const unlink = promisify(fs.unlink)

// Canal decorativo pastelcore
const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 Suki_Bot_MD Canal Oficial'
}

const imageURL = 'https://files.catbox.moe/cvpwkk.jpg'

// Comando principal
let handler = async (m, { conn, text, args}) => {
  const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
  if (!text ||!youtubeRegex.test(text)) return conn.reply(m.chat, `🌱 Uso correcto: ytmp4 https://youtube.com/watch?v=DLh9mnfZvc0`, m)

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
🌸 *Calidad:* ${args[1] || '360p'}
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

    const vid = await ytmp4(video.url, args[1] || '360')
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

// 💮 Función convertidora ytmp4
async function ytmp4(url, quality) {
  const base_url = 'https://amp4.cc'
  const headers = { Accept: 'application/json', 'User-Agent': 'SukiBot/1.0.0'}
  const cookies = {}

  const parseCookies = (setCookie) => {
    if (!setCookie) return
    setCookie.forEach(cookie => {
      const [kv] = cookie.split(';')
      const [key, value] = kv.split('=')
      cookies[key] = value
})
}

  const cookieString = () => Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ')

  const getPage = async (url) => {
    const res = await axios.get(url, { headers: {...headers, Cookie: cookieString()}})
    parseCookies(res.headers['set-cookie'])
    return res
  }
  const postForm = async (url, data, extra = {}) => {
    const res = await axios.post(url, data, { headers: {...headers, Cookie: cookieString(),...extra}})
    parseCookies(res.headers['set-cookie'])
    return res
}

  const solveCaptcha = async (challenge) => {
    const { algorithm, challenge: chData, salt, maxnumber, signature} = challenge
    for (let i = 0; i <= maxnumber; i++) {
      const testHash = crypto.createHash(algorithm.toLowerCase()).update(salt + i).digest('hex')
      if (testHash === chData) {
        return Buffer.from(JSON.stringify({ algorithm, challenge: chData, number: i, salt, signature})).toString('base64')
}
}
    throw new Error("Captcha fallido")
}

  const connectWS = async (id) => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`wss://amp4.cc/ws`, ['json'], {
        headers: {...headers, Origin: base_url},
        rejectUnauthorized: false
})

      let file_info = {}
      const timeout = setTimeout(() => ws.close(), 30000)

      ws.on('open', () => ws.send(id))
      ws.on('message', (data) => {
        const res = JSON.parse(data)
        if (res.event === 'query' || res.event === 'queue') {
          file_info = {
            thumbnail: res.thumbnail,
            title: res.title,
            duration: res.duration,
            uploader: res.uploader
}
} else if (res.event === 'file' && res.done) {
          clearTimeout(timeout)
          ws.close()
          resolve({...file_info,...res})
}
})

      ws.on('error', () => clearTimeout(timeout))
})
}

  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/)
  if (!ytMatch) throw new Error("URL no válida")
  const fixed_url = `https://youtu.be/${ytMatch[1]}`
  const home = await getPage(`${base_url}/`)
  const $ = cheerio.load(home.data)
  const csrf = $('meta[name="csrf-token"]').attr('content')

  if (!isNaN(quality)) quality = `${quality}p`

  const form = new FormData()
  form.append('url', fixed_url)
  form.append('format', 'mp4')
  form.append('quality', quality)
  form.append('service', 'youtube')
  form.append('_token', csrf)

  const captcha = await getPage(`${base_url}/captcha`)
  if (captcha.data) form.append('altcha', await solveCaptcha(captcha.data))

  const convert = await postForm(`${base_url}/convertVideo`, form, form.getHeaders())
  const result = await connectWS(convert.data.message)

  return {
    title: result.title,
    uploader: result.uploader,
    duration: result.duration,
    quality,
    format: 'mp4',
    dl_url: `${base_url}/dl/${result.worker}/${convert.data.message}/${encodeURIComponent(result.file)}`
}
}
