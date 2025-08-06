// ✨ Adaptado por fedexyz 🍁 — no quites créditos ⚔️

import { sticker} from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png} from '../lib/webp2mp4.js'

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

let handler = async (m, { conn, args, usedPrefix, command}) => {
  let stiker = false
  try {
    let q = m.quoted? m.quoted: m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds> 15) {
        return m.reply(`⚠️ ¡El video no puede durar más de 15 segundos!...`)
}

      let img = await q.download?.()
      if (!img) return conn.reply(m.chat, `'🍁 Por favor, envía una imagen o video para hacer un sticker...'`, m)

      let out
      try {
        // ✨ Marca de agua personalizada
        let texto1 = '𝐟𝐞𝐝𝐞𝐱𝐲𝐳 🍁'
        let texto2 = 'ＳｕｋｉＢｏｔ＿ＭＤ'

        stiker = await sticker(img, false, texto1, texto2)
} finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out!== 'string') out = await uploadImage(img)

          stiker = await sticker(false, out, '𝐟𝐞𝐝𝐞𝐱𝐲𝐳 🍁', 'ＳｕｋｉＢｏｔ＿ＭＤ')
}
}

} else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], '𝐟𝐞𝐝𝐞𝐱𝐲𝐳 🍁', 'ＳｕｋｉＢｏｔ＿ＭＤ')
} else {
        return m.reply(`⚠️ El URL es incorrecto...`)
}
}

} finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
} else {
      return conn.reply(m.chat, ```🍁 Por favor, envía una imagen o video para hacer un sticker...```, m)
}
}
}

handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler
