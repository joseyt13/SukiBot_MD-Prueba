// Código creado por fedexyz 🍁
// no quites los créditos 💳

import axios from 'axios'
import fetch from 'node-fetch'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas'
}

let handler = async (m, { text, conn, args}) => {
  const url = args[0]
  if (!url) {
    await m.react('🎀')
    return conn.sendMessage(m.chat, {
      text: `🪼 *Hola amor,* necesito un enlace de Instagram para poder ayudarte.\nEjemplo: *ig https://www.instagram.com/reel/xyz/*`,
      quoted: m
})
}

  try {
    await m.react('☁️')
    await conn.sendMessage(m.chat, {
      text: '🔮 *Invocando el video desde la galaxia Instagram...*',
      quoted: m
})

    const res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/instagram-dl?url=${encodeURIComponent(url)}`)
    const result = res.data?.data?.[0]
    const videoUrl = result?.dl_url

    if (!videoUrl) {
      return conn.sendMessage(m.chat, {
        text: '🍄 No encontré enlace válido de descarga. ¿Probamos con otro?',
        quoted: m
})
}

    // 🌸 Imagen decorativa personalizada
    const res2 = await fetch('https://files.catbox.moe/qzp733.jpg')
    const thumb2 = await res2.buffer()
    const Shadow = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
},
      message: {
        locationMessage: {
          name: `DESCARGA COMPLETA\n[▓▓▓▓▓▓▓▓░░░░] 100%`,
          jpegThumbnail: thumb2
}
},
      participant: "0@s.whatsapp.net"
}

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl},
      caption: `🪷 *Aquí tenés tu video mágico de Instagram*\n🌐 Enlace: ${url}`,
      fileName: 'instagram.mp4',
      mimetype: 'video/mp4',
      quoted: Shadow,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 200,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: '🎀 Suki descargó tu video con estilo',
          body: '✨ Reels, historias, posts... lo que tu corazón mande',
          thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
})

    await m.react('🌸')

} catch (error) {
    await m.react('💥')
    return conn.sendMessage(m.chat, {
      text: `💔 *Ups… hubo un error al descargar.*\nTal vez el enlace está protegido o vencido.`,
      quoted: m
})
}
}

handler.help = ['instagram <url>', 'insta <url>', 'igdl <url>']
handler.tags = ['descargas']
handler.command = ['ig', 'instagram', 'igdl']
handler.register = true

export default handler
