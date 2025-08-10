// Código mejorado por fedexyz 🍁
// no quites los créditos 💳

import axios from 'axios'
import fetch from 'node-fetch'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 𝖲𝗎𝗄𝗂_𝖻𝗈𝗍_MD • 𝖭𝗈𝖙𝗂𝖼𝗂𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌'
}

const THUMBNAIL_URL = 'https://files.catbox.moe/qzp733.jpg'
const AD_THUMBNAIL = 'https://files.catbox.moe/rkvuzb.jpg'

const handler = async (m, { text, conn, args}) => {
  const url = args[0]

  if (!url) {
    await m.react('🎀')
    return conn.sendMessage(m.chat, {
      text: `🪼 *𝖧𝗈𝗅𝖺 𝖺𝗆𝗈𝗋,* 𝗇𝖾𝖼𝖾𝗌𝗂𝗍𝗈 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝗉𝖺𝗋𝖺 𝗉𝗈𝖽𝖾𝗋 𝖺𝗒𝗎𝖽𝖺𝗋𝗍𝖾.\n𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *ig https://www.instagram.com/reel/xyz/*', m, rcanal)
      quoted: m
})
}

  try {
    await m.react('☁️')
    await conn.sendMessage(m.chat, {
      text: '🔮 *𝖨𝗇𝗏𝗈𝖼𝖺𝗇𝖽𝗈 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈 𝖽𝖾𝗌𝖽𝖾 𝗅𝖺 𝗀𝖺𝗅𝖺𝗑𝗂𝖺 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆...*', m, rcanal)
      quoted: m
})

    const { data} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/instagram-dl?url=${encodeURIComponent(url)}`)
    const videoUrl = data?.data?.[0]?.dl_url

    if (!videoUrl) {
      await m.react('🫧')
      return conn.sendMessage(m.chat, {
        text: '🍄 *𝖭𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖾 𝖾𝗇𝗅𝖺𝖼𝖾 𝗏𝖺́𝗅𝗂𝖽𝗈 𝖽𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺.* ¿𝖯𝗋𝗈𝖻𝖺𝗆𝗈𝗌 𝖼𝗈𝗇 𝗈𝗍𝗋𝗈?',
        quoted: m
})
}

    const thumbBuffer = await fetch(THUMBNAIL_URL).then(res => res.buffer())

    const shadowMessage = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
},
      message: {
        locationMessage: {
          name: `𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠 𝖢𝖮𝖬𝖯𝖫𝖤𝖳𝖠\n[▓▓▓▓▓▓▓▓░░░░] 100%`,
          jpegThumbnail: thumbBuffer
}
},
      participant: "0@s.whatsapp.net"
}

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl},
      caption: `🪷 *𝖠𝗊𝗎𝗂 𝗍𝖾𝗇𝖾́𝗌 𝗍𝗎 𝗏𝗂𝖽𝖾𝗈 𝗆𝖺́𝗀𝗂𝖼𝗈 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆*\n🌐 𝖤𝗇𝗅𝖺𝖼𝖾: ${url}`,
      fileName: 'instagram.mp4',
      mimetype: 'video/mp4',
      quoted: shadowMessage,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 200,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: '🎀 𝖲𝗎𝗄𝗂 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝗈 𝗍𝗎 𝗏𝗂𝖽𝖾𝗈 𝖼𝗈𝗇 𝖾𝗌𝗍𝗂𝗅𝗈',
          body: '✨ 𝖱𝖾𝖾𝗅𝗌, 𝗁𝗂𝗌𝗍𝗈𝗋𝗂𝖺𝗌, 𝗉𝗈𝗌𝗍𝗌... 𝗅𝗈 𝗊𝗎𝖾 𝗍𝗎 𝖼𝗈𝗋𝖺𝗓𝗈́𝗇 𝗆𝖺𝗇𝖽𝖾',
          thumbnailUrl: AD_THUMBNAIL,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
})

    await m.react('🌸')

} catch (error) {
    console.error('❌ Error al descargar:', error)
    await m.react('💥')
    return conn.sendMessage(m.chat, {
      text: `💔 *𝖴𝗉𝗌… 𝗁𝗎𝗏𝗈 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋 𝖺𝗅 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋.*\n𝖳𝖺𝗅 𝗏𝖾𝗓 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾 𝖾𝗌𝗍𝖺́ 𝗉𝗋𝗈𝗍𝖾𝗀𝗂𝖽𝗈 𝗈 𝗏𝖾𝗇𝖼𝗂𝖽𝗈.`,
      quoted: m
})
}
}

handler.help = ['instagram <url>', 'insta <url>', 'igdl <url>']
handler.tags = ['descargas']
handler.command = ['ig', 'instagram', 'igdl']
handler.register = true

export default handler
