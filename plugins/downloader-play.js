import fetch from "node-fetch"
import yts from "yt-search"

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "🌷 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas"
}

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\\?v=|embed\\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { react: { text: "📡", key: m.key}})
      return conn.sendMessage(m.chat, {
        text: `🪷 *Suki necesita una canción para desplegar su magia.*\n🎶 Ejemplo: *${command} Nako Ga*`,
        quoted: m
})
}

    await m.react("🔍")
    const videoMatch = text.match(youtubeRegexID)
    const query = videoMatch? `https://youtu.be/${videoMatch[1]}`: text
    let result = await yts(query)

    if (videoMatch) {
      const videoId = videoMatch[1]
      result = result.all.find(v => v.videoId === videoId) || result.videos.find(v => v.videoId === videoId)
} else {
      result = result.videos?.[0] || result.all?.[0] || result
}

    if (!result) {
      await m.react("💥")
      return conn.sendMessage(m.chat, {
        text: `😿 *Suki no encontró nada con ese nombre.*`,
        quoted: m
})
}

    const { title, thumbnail, timestamp, views, ago, url, author} = result
    const thumb = (await conn.getFile(thumbnail)).data
    const info = `
🌸 *Tu pedido está listo, cielo:*
🎀 *Título:* ${title}
📺 *Canal:* ${author.name || "Desconocido"}
👁️ *Vistas:* ${formatViews(views)}
🕰️ *Duración:* ${timestamp || "?"}
📆 *Publicado:* ${ago || "?"}
🔗 *Enlace:* ${url}`.trim()

    const preview = {
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

    await conn.sendMessage(m.chat, { text: info, quoted: m,...preview})

    // 🎧 Audio (solo para comandos 'play' y 'mp3')
    if (["play", "mp3"].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const audioUrl = api.result?.download?.url
        if (!audioUrl) throw "⛔ Error generando audio"

        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl},
          fileName: `${api.result.title || "descarga"}.mp3`,
          mimetype: "audio/mpeg"
}, { quoted: m})

        await m.react("🌸")
} catch {
        return conn.sendMessage(m.chat, {
          text: "💔 No se pudo enviar el audio. Tal vez es muy pesado o hubo un error en la descarga.",
          quoted: m
})
}
}

} catch (error) {
    await conn.sendMessage(m.chat, {
      text: `💥 Ups, ocurrió un error:\n> \`${error.message || error}\``,
      quoted: m
})
    await m.react("💫")
}
}

handler.command = handler.help = ["play", "mp3"]
handler.tags = ["descargas"]
export default handler

function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
  }
