// 🌸 Código decorado por ꜰᴇᴅᴇxʏᴢ ⚔
// No quites los créditos 💖

import { sticker} from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png} from '../lib/webp2mp4.js'
import moment from 'moment-timezone'
import Jimp from 'jimp'

// Verifica si el texto es una URL válida de imagen
const isValidImageUrl = (text) => {
  const regex = /https?:\/\/.*\.(jpe?g|png|gif)/i
  return regex.test(text)
}

// Superpone el logo sobre la imagen base
const overlayLogo = async (baseBuffer) => {
  const base = await Jimp.read(baseBuffer)
  const logo = await Jimp.read('./media/logo.jpg') // Asegurate de tener esta imagen en tu carpeta

  logo.resize(100, 100)
  logo.opacity(0.6)

  const x = base.getWidth() - logo.getWidth() - 10
  const y = base.getHeight() - logo.getHeight() - 10

  base.composite(logo, x, y)
  return await base.getBufferAsync(Jimp.MIME_PNG)
}

let handler = async (m, { conn, args}) => {
  let stickerResult = null

  try {
    const quoted = m.quoted || m
    const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''
    const senderName = conn.getName(m.sender)
    const timestamp = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY - HH:mm')

    const watermark1 = 'ꜰᴇᴅᴇxʏᴢ 🍁'
    const watermark2 = `${senderName} • ${timestamp}`

    if (/webp|image|video/.test(mime)) {
      if (/video/.test(mime) && (quoted.msg || quoted).seconds> 15) {
        return conn.sendMessage(m.chat, {
          image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
          caption: `⚠️ El video no puede durar más de 15 segundos.\n🌸 Usa una imagen o video corto para crear tu sticker.`,
          footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
          buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
          headerType: 4
}, { quoted: m})
}

      const media = await quoted.download?.()
      if (!media) {
        return conn.sendMessage(m.chat, {
          image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
          caption: `🍁 Por favor, envía una imagen o video para hacer un sticker.`,
          footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
          buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
          headerType: 4
}, { quoted: m})
}

      try {
        const withLogo = await overlayLogo(media)
        stickerResult = await sticker(withLogo, false, watermark1, watermark2)
} finally {
        if (!stickerResult) {
          let uploaded
          if (/webp/.test(mime)) uploaded = await webp2png(media)
          else if (/image/.test(mime)) uploaded = await uploadImage(media)
          else if (/video/.test(mime)) uploaded = await uploadFile(media)

          if (typeof uploaded!== 'string') uploaded = await uploadImage(media)

          stickerResult = await sticker(false, uploaded, watermark1, watermark2)
}
}

} else if (args[0]) {
      if (isValidImageUrl(args[0])) {
        stickerResult = await sticker(false, args[0], watermark1, watermark2)
} else {
        return conn.sendMessage(m.chat, {
          image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
          caption: `⚠️ El URL no es válido. Asegúrate de que sea una imagen JPG, PNG o GIF.`,
          footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
          buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
          headerType: 4
}, { quoted: m})
}
}

} finally {
    if (stickerResult) {
      conn.sendFile(m.chat, stickerResult, 'sticker.webp', '', m)
} else {
      conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
        caption: `🍁 Por favor, envía una imagen o video para hacer un sticker.`,
        footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
        buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
        headerType: 4
}, { quoted: m})
}
}
}

handler.help = ['stiker <imagen>', 'sticker <url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler
