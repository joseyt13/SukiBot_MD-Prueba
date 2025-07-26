// Código creado por fedexyz 🍁
// no quites los créditos 💳 

import yts from 'yt-search'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🎀 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas'
}

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key}})
    return conn.sendMessage(m.chat, {
      text: `🌸 *Porfis...* escribí lo que querés buscar en YouTube~\n\n💡 Ejemplo:\n${usedPrefix + command} Nako ga`,
      quoted: m
})
}

  await m.react('🔍')
  const res = await yts(text)
  const videos = res.videos.slice(0, 6)

  if (!videos.length) {
    await m.react('💥')
    return conn.sendMessage(m.chat, {
      text: '🍄 *No encontré nada con ese nombre.* ¿Probamos con otra palabra?',
      quoted: m
})
}

  const list = videos.map((v, i) => {
    return `🌸 *Resultado #${i + 1}*
🎀 *Título:* ${v.title}
📺 *Canal:* ${v.author.name}
🕒 *Duración:* ${v.timestamp}
📅 *Publicado:* ${v.ago}
👁️ *Vistas:* ${v.views.toLocaleString()}
🔗 *Enlace:* ${v.url}`
}).join('\n\n⊹˚｡⋆ ── ⋆｡˚⊹\n\n')

  await conn.sendMessage(m.chat, {
    image: { url: videos[0].thumbnail},
    caption: list.trim(),
    fileName: 'suki_yts.jpg',
    mimetype: 'image/jpeg',
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 88,
        newsletterName: channelRD.name
},
      externalAdReply: {
        title: '🎶 Resultados mágicos de Suki',
        body: '✨ YouTube explorado con estilo kawaii',
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        sourceUrl: videos[0].url,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
})

  await m.react('🌸')
}

handler.help = ['ytsearch <texto>']
handler.tags = ['buscador', 'media']
handler.command = ['ytsearch', 'yts', 'ytbuscar']
handler.register = true
handler.limit = 1

export default handler
