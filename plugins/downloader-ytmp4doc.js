import fetch from 'node-fetch'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, usedPrefix, command, args}) => {
  try {
    if (!text) {
      return conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
        caption: `🌸 *Uso correcto:*\n${usedPrefix + command} <enlace de YouTube>\n\n📌 *Ejemplo:*\n${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`,
        footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
        buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
        headerType: 4
}, { quoted: m})
}

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      return m.reply(`⚠️ Enlace inválido. Por favor, coloca un enlace válido de YouTube.`)
}

    await m.react('🕒')

    const json = await ytdl(args[0])
    const size = await getSize(json.url)
    const sizeStr = size? await formatSize(size): 'Desconocido'

    const botActual = conn.user?.jid?.split('@')[0].replace(/\D/g, '')
    const configPath = path.join('./JadiBots', botActual, 'config.json')

    let nombreBot = global.namebot || 'SᴜᴋɪBᴏᴛ_ᴍᴅ'
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        if (config.name) nombreBot = config.name
} catch (err) {
        console.log('⚠️ No se pudo leer config del subbot:', err)
}
}

    const caption = `🎬 *${json.title}*\n≡ 🍫 *URL:* ${args[0]}\n≡ 🔥 *Peso:* ${sizeStr}\n\n📤 *Enviado por:* ${nombreBot}`

    await conn.sendMessage(m.chat, {
      video: { url: json.url},
      mimetype: 'video/mp4',
      fileName: `${json.title}.mp4`,
      caption,
      footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
      buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
      headerType: 4,
      image: { url: 'https://files.catbox.moe/rkvuzb.jpg'}
}, { quoted: m})

    await m.react('✅')

} catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`🚫 Ocurrió un error:\n${e.message}`)
}
}

handler.help = ['ytmp4doc']
handler.command = ['playvidoc', 'ytmp4doc']
handler.tags = ['downloader']
handler.register = true 
export default handler
