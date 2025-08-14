// 🍁 Código creado por fedexyz
// No quites créditos xd

import { writeFile, unlink, readFile} from 'fs/promises'
import { join} from 'path'
import { fileTypeFromBuffer} from 'file-type'
import FormData from 'form-data'

let handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, { react: { text: '🫧', key: m.key}})

  try {
    const q = m.quoted? m.quoted: m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('🌧️ *Suki necesita que respondas a un archivo o media para convertirlo.*')

    const media = await q.download()
    if (!media) return m.reply('☁️ *No pude descargarlo, mi cielo. ¿Me lo mandás otra vez?*')

    const uploads = []

    const cloud1 = await uploaderCloudStack(media).catch(() => null)
    if (cloud1) uploads.push({ name: '☁️ CloudStack', url: cloud1})

    const cloud2 = await uploaderCloudGuru(media).catch(() => null)
    if (cloud2) uploads.push({ name: '🌀 CloudGuru', url: cloud2})

    const cloud3 = await uploaderCloudCom(media).catch(() => null)
    if (cloud3) uploads.push({ name: '🌐 CloudImages', url: cloud3})

    const catbox = await uploaderCatbox(media).catch(() => null)
    if (catbox) uploads.push({ name: '🐱 Catbox', url: catbox})

    const zeroX = await uploader0x0(media).catch(() => null)
    if (zeroX) uploads.push({ name: '🧩 0x0.st', url: zeroX})

    const uguu = await uploaderUguu(media).catch(() => null)
    if (uguu) uploads.push({ name: '🍓 Uguu.se', url: uguu})

    if (uploads.length === 0)
      throw '⛈️ *Ninguna nube quiso recibir tu archivo… ¿lo intentamos más tarde, cielo?*'

    let texto = `🧁 *¡Archivo subido con éxito!*\n𖥔₊˚⊹ Enlaces encantados disponibles:\n\n`
    for (const up of uploads) {
      texto += `🌸 *${up.name}*\n🔗 ${up.url}\n\n`
}

    await conn.sendMessage(m.chat, {
      text: texto.trim(),
      contextInfo: {
        externalAdReply: {
          title: '☁️ Uploader mágico de Suki',
          body: '✨ Tus archivos están a salvo en las nubes',
          thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
}
}
}, { quoted: m})

} catch (e) {
    await conn.sendMessage(m.chat, {
      text: typeof e === 'string'
? e
: '💔 *Ups... algo salió mal en la subida. ¿Volvemos a intentarlo pronto?*',
      quoted: m
})
} finally {
    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}})
}
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['tourl', 'url']
handler.limit = true
handler.register = true

export default handler

// 🌷 Función mágica para subir el buffer
async function uploadTo(url, buffer, field = 'file') {
  const { ext, mime} = await fileTypeFromBuffer(buffer) || {}
  if (!ext ||!mime) throw new Error('🔒 *Suki no reconoce el tipo de archivo...*')

  const tempPath = join('./tmp', `upload.${ext}`)
  await writeFile(tempPath, buffer)
  const fileData = await readFile(tempPath)

  const form = new FormData()
  form.append(field, new File([fileData], `upload.${ext}`, { type: mime}))

  try {
    const res = await fetch(url, { method: 'POST', body: form})
    const json = await res.json().catch(() => null)
    await unlink(tempPath).catch(() => null)

    if (json?.url) return json.url
    if (json?.files?.[0]?.url) return json.files[0].url
    if (json?.data?.url) return json.data.url
    if (typeof res.url === 'string') return res.url

    throw new Error('☁️ *La nube se escondió… no se logró subir.*')
} catch (err) {
    console.error(`💥 Error en la nube (${url}):`, err)
    await unlink(tempPath).catch(() => null)
    return null
    }
}

// 🌈 Servidores mágicos disponibles
const uploaderCloudStack = buffer =>
  uploadTo('https://phpstack-1487948-5667813.cloudwaysapps.com/upload.php', buffer)

const uploaderCloudGuru = buffer =>
  uploadTo('https://cloudkuimages.guru/upload.php', buffer)

const uploaderCloudCom = buffer =>
  uploadTo('https://cloudkuimages.com/upload.php', buffer)

const uploaderCatbox = buffer =>
  uploadTo('https://catbox.moe/user/api.php', buffer)

const uploader0x0 = buffer =>
  uploadTo('https://0x0.st', buffer)

const uploaderUguu = buffer =>
  uploadTo('https://uguu.se/api.php?d=upload-tool', buffer)
