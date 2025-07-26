// 🌸 Código original por fedexyz 🍡
// ✨ Reimaginado con ternura para Sᴜᴋɪ_Bᴏᴛ_MD 💖

import axios from 'axios'

// 🍥 Obtiene token y cookies necesarias desde tmate.cc
async function obtenerTokenYCookie() {
  const res = await axios.get('https://tmate.cc/id', {
    headers: { 'User-Agent': 'Mozilla/5.0'}
})
  const cookie = res.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || ''
  const tokenMatch = res.data.match(/<input[^>]+name="token"[^>]+value="([^"]+)"/i)
  const token = tokenMatch?.[1]
  if (!token) throw new Error('No se encontró el token mágico 💔')
  return { token, cookie}
}

// 🎀 Descarga desde TikTok (video, imágenes o audio)
async function descargarDeTikTok(urlTikTok) {
  const { token, cookie} = await obtenerTokenYCookie()
  const params = new URLSearchParams()
  params.append('url', urlTikTok)
  params.append('token', token)

  const res = await axios.post('https://tmate.cc/action', params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://tmate.cc/id',
      'Origin': 'https://tmate.cc',
      'Cookie': cookie
}
})

  const html = res.data?.data
  if (!html) throw new Error('No se recibió ninguna respuesta 🌧️')

  const tituloMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
  const titulo = tituloMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || 'Sin título'

  const coincidencias = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"]+)"[^>]*>\s*<span>\s*<span>([^<]*)<\/span><\/span><\/a>/gi)]
  const vistos = new Set()
  const enlaces = coincidencias
.map(([_, href, etiqueta]) => ({ href, label: etiqueta.trim()}))
.filter(({ href}) =>!href.includes('play.google.com') &&!vistos.has(href) && vistos.add(href))

  const enlacesMp4 = enlaces.filter(v => /download without watermark/i.test(v.label))
  const enlaceMp3 = enlaces.find(v => /download mp3 audio/i.test(v.label))

  const coincidenciasImg = [...html.matchAll(/<img[^>]+src="(https:\/\/tikcdn\.app\/a\/images\/[^"]+)"/gi)]
  const imagenes = [...new Set(coincidenciasImg.map(m => m[1]))]

  if (enlacesMp4.length> 0) {
    return { type: 'video', title: titulo, mp4Links: enlacesMp4, mp3Link: enlaceMp3}
}

  if (imagenes.length> 0) {
    return { type: 'image', title: titulo, images: imagenes, mp3Link: enlaceMp3}
}

  throw new Error('Nada fue encontrado, tal vez el enlace está triste 😢')
}

// 🍓 Comando principal para usuarios
let yeon = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}})
    return conn.sendMessage(m.chat, {
      text: `🌸 *!Te falta el enlace de TikTok...\nEjemplo: *${usedPrefix + command}* https://vt.tiktok.com/abcd/`
})
}

  try {
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key}})
    const resultado = await descargarDeTikTok(text)

    if (resultado.type === 'video') {
      await conn.sendMessage(m.chat, {
        video: { url: resultado.mp4Links[0].href},
        caption: `🎬 *Video de TikTok listo para vos*\n✨ *Título:* ${resultado.title}`
})
} else if (resultado.type === 'image') {
      for (let i = 0; i < resultado.images.length; i++) {
        await conn.sendMessage(m.chat, {
          image: { url: resultado.images[i]},
          caption: `🖼️ *Imagen ${i + 1}*\n📌 *Título:* ${resultado.title}`
})
}
}

    if (resultado.mp3Link) {
      await conn.sendMessage(m.chat, {
        document: { url: resultado.mp3Link.href},
        fileName: `${resultado.title}.mp3`,
        mimetype: 'audio/mpeg'
})
}

    await conn.sendMessage(m.chat, { react: { text: "🌸", key: m.key}})

} catch (e) {
    await conn.sendMessage(m.chat, { react: { text: "💥", key: m.key}})
    await conn.sendMessage(m.chat, {
      text: `😿 Oh no, algo falló en la descarga...\n💬 \`${e.message}\`\n¿Podrías probar con otro enlace, porfi?`
})
}
}

yeon.help = ['tiktokdl <url>']
yeon.tags = ['downloader']
yeon.command = ['tiktok', 'ttdl', 'tt']
yeon.register = true
yeon.limit = true

export default yeon
