// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

import fetch from "node-fetch"
import yts from "yt-search"

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "🌷 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas"
}

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { react: { text: "📡", key: m.key}})
      return conn.sendMessage(m.chat, {
        text: `🌸 *Suki necesita una canción para comenzar su magia.*\n🎶 Ejemplo: *${command} Un Verano Sin Ti*`,
        quoted: m
})
}

    await m.react("🔍")
    const videoIdMatch = text.match(youtubeRegexID)
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text
    let result = await yts(searchQuery)

    if (videoIdMatch) {
      const videoId = videoIdMatch[1]
      result = result.all.find(v => v.videoId === videoId) || result.videos.find(v => v.videoId === videoId)
} else {
      result = result.videos?.[0] || result.all?.[0] || result
}

    if (!result) {
      return conn.sendMessage(m.chat, {
        text: `😿 *Suki no encontró nada con ese nombre.*`,
        quoted: m
})
}

    const { title, thumbnail, timestamp, views, ago, url, author} = result
    const thumb = (await conn.getFile(thumbnail)).data
    const infoMessage = `
🌷 *Tu pedido está listo, cariño:*
📺 *Canal:* ${author.name || "Desconocido"}
👁️ *Vistas:* ${formatViews(views)}
⏳ *Duración:* ${timestamp || "?"}
📆 *Publicado:* ${ago || "?"}
🔗 *Enlace:* ${url}`.trim()

    const contextoBonito = {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 101,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: "🎀 Sᴜᴋɪ te trae música mágica",
          body: `📻 ${author.name || "Artista desconocido"} • ✨ ${title}`,
          thumbnailUrl: "https://files.catbox.moe/rkvuzb.jpg",
          mediaUrl: url,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}

    await conn.sendMessage(m.chat, { text: infoMessage, quoted: m,...contextoBonito})

    // 🎧 Audio
    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const audioUrl = api.result?.download?.url
        if (!audioUrl) throw "⛔ Error generando audio"
        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl},
          fileName: `${api.result.title || "descarga"}.mp3`,
          mimetype: "audio/mpeg"
}, { quoted: m})
} catch {
        return conn.sendMessage(m.chat, {
          text: "💔 No se pudo enviar el audio. Tal vez es muy pesado o hubo un error con el enlace.",
          quoted: m
})
}
}

    // 🎥 Video
    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      try {
        const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.url, `${json.title}.mp4`, `📹 *${title}*`, m)
} catch {
        return conn.sendMessage(m.chat, {
          text: "💔 No se pudo enviar el video. Intenta con otro título o revisá el tamaño.",
          quoted: m
})
}
}

    else {
      return conn.sendMessage(m.chat, {
        text: "✨ Comando no reconocido, pero Suki está lista para ayudarte 💫",
        quoted: m
})
}

    await m.react("🌸")
} catch (error) {
    await conn.sendMessage(m.chat, {
      text: `💥 Ups, ocurrió un error:\n> \`${error.message || error}\``,
      quoted: m
})
    await m.react("💫")
}
}

handler.command = handler.help = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4", "playaudio", "mp4"]
handler.tags = ["descargas"]
export default handler

// 🌼 Formato dulce para vistas
function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}
