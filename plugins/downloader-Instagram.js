// Código mejorado por fedexyz 🍁
// no quites los créditos 💳

import { igdl} from "ruhend-scraper"

let handler = async (m, { args, conn}) => {
  const url = args[0]

  if (!url) {
    await m.react('🎀')
    return conn.reply(m.chat, '🚩 *𝖨𝗇𝗀𝗋𝖾𝗌𝖺 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆.*\n📎 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: https://www.instagram.com/reel/xyz/', m, rcanal)
}

  try {
    await m.react(rwait)

    await conn.reply(m.chat, `🕒 *𝖤𝗇𝗏𝗂𝖺𝗇𝖽𝗈 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '🎀 𝖲𝗎𝗄𝗂 𝖡𝗈𝗍',
          body: '✨ 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖽𝖾 𝖱𝖾𝖾𝗅𝗌 𝗒 𝖯𝗈𝗌𝗍𝗌',
          previewType: 0,
          thumbnail: icons,
          sourceUrl: channel
}
}
})

    const res = await igdl(url)
    const data = res.data

    for (const media of data) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', `🚩 *𝖵𝗂𝖽𝖾𝗈 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆.*\n${textbot}`, m)
}

    await m.react('🌸')

} catch (err) {
    console.error('❌ Error:', err)
    await m.react(error)
    return conn.reply(m.chat, '💥 *𝖮𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋 𝖺𝗅 𝗉𝗋𝗈𝖼𝖾𝗌𝖺𝗋 𝗍𝗎 𝖾𝗇𝗅𝖺𝖼𝖾.*', m, fake)
}
}

handler.command = ['instagram', 'ig']
handler.tags = ['descargas']
handler.help = ['instagram', 'ig']
handler.cookies = 1
handler.register = true

export default handler
