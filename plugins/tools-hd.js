// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command}) => {
  const quoted = m.quoted || m
  const mime = quoted.mimetype || quoted.msg?.mimetype || ''

  if (!/image\/(jpe?g|png)/i.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key}})
    return conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
      caption: `🌸 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋 𝖾𝗇𝖵𝗂𝖺 𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇 (JPG o PNG)\n✨ 𝖴𝗌𝖺: *${usedPrefix + command}*`,
      footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
      buttons: [{ buttonId: '.menu', buttonText: { displayText: '📜 Ver Menú'}, type: 1}],
      headerType: 4
}, { quoted: m})
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key}})

    const media = await quoted.download()
    const ext = mime.split('/')[1]
    const filename = `mejorada_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('image', media, { filename, contentType: mime})
    form.append('scale', '2')

    const headers = {
...form.getHeaders(),
      accept: 'application/json',
      'x-client-version': 'web',
      'x-locale': 'es'
}

    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers,
      body: form
})

    const json = await res.json()

    if (!json?.result_url ||!json.result_url.startsWith('http')) {
      throw new Error('Sᴜᴋɪ no pudo obtener la imagen mejorada desde Pixelcut.')
}

    const resultBuffer = await (await fetch(json.result_url)).buffer()

    await conn.sendMessage(m.chat, {
      image: resultBuffer,
      caption: `
✨ 𝖳𝗎 𝗂𝗆𝖺𝗀𝖾𝗇 𝗁𝖺 𝗌𝗂𝖽𝗈 𝗆𝖾𝗃𝗈𝗋𝖺𝖽𝖺 𝖾𝗇 𝗋𝖾𝗌𝗈𝗅𝗎𝖼𝗂𝗈𝗇.

📈 𝖬𝖺𝗒𝗈𝗋 𝗇𝗂𝗍𝗂𝖽𝖾𝗓, 𝗆𝖺𝗌 𝖽𝖾𝗍𝖺𝗅𝗅𝖾𝗌.

🔧 𝖴𝗌𝖺 𝖾𝗌𝗍𝖺 𝖿𝗎𝗇𝖼𝗂𝗈𝗇 𝗉𝖺𝗋𝖺 𝗋𝖾𝗌𝖼𝖺𝗍𝖺𝗋 𝗂𝗆𝖺𝗀𝖾𝗇𝖾𝗌 𝖻𝗈𝗋𝗋𝗈𝗌𝖺𝗌.
      `.trim(),
      footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
      buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
      headerType: 4
}, { quoted: m})

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key}})
} catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key}})
    m.reply(`❌ 𝖥𝖺𝗅𝗅𝗈 𝖾𝗇 𝗅𝖺 𝗆𝖾𝗃𝗈𝗋𝖺:\n${err.message || err}`)
}
}

handler.help = ['hd']
handler.tags = ['tools', 'imagen']
handler.command = ['mejorar', 'hd']

export default handler
