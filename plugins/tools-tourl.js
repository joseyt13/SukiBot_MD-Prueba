import { writeFile, unlink, readFile} from 'fs/promises'
import { join} from 'path'
import { fileTypeFromBuffer} from 'file-type'

let handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}})

  try {
    const q = m.quoted? m.quoted: m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('🌧️ *Suki necesita que respondas a un archivo para convertirlo.*')

    const media = await q.download()
    if (!media) return m.reply('☁️ *No pude descargarlo, mi cielo. ¿Me lo vuelves a mandar?*')

    const uploads = []

    const cloud1 = await uploaderCloudStack(media).catch(() => null)
    if (cloud1) uploads.push({ name: '☁️ CloudStack', url: cloud1})

    const cloud2 = await uploaderCloudGuru(media).catch(() => null)
    if (cloud2) uploads.push({ name: '🌀 CloudGuru', url: cloud2})

    const cloud3 = await uploaderCloudCom(media).catch(() => null)
    if (cloud3) uploads.push({ name: '🌐 CloudImages', url: cloud3})

    if (uploads.length === 0)
      throw '⛈️ *Ninguna nube quiso recibir tu archivo. ¿Lo intentamos de nuevo más tarde?*'

    let texto = `🧁 *Archivo subido con éxito*\n⊹˚｡⋆ Lista de enlaces mágicos:\n\n`
    for (const up of uploads) {
      texto += `🌸 *${up.name}*\n🔗 ${up.url}\n\n`
}

    await conn.sendMessage(m.chat, {
      text: texto.trim(),
      contextInfo: {
        externalAdReply: {
          title: '☁️ Uploader kawaii',
          body: '✨ Enlaces dulces desde servidores mágicos',
          thumbnailUrl: uploads[0]?.url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}, { quoted: m})

} catch (e) {
    await conn.sendMessage(m.chat, {
      text: typeof e === 'string'
? e
: '💔 *Ups... algo salió mal en la subida. ¿Probamos nuevamente más tarde?*',
      quoted: m
})
} finally {
    await conn.sendMessage(m.chat, { react: { text: '🫧', key: m.key}})
}
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(tourl|url)$/i
handler.limit = true
handler.register = true

export default handler

// ✧ Función mágica para subir el archivo a una nube
async function uploadTo(url, buffer) {
  const { ext, mime} = await fileTypeFromBuffer(buffer) || {}
  if (!ext ||!mime) throw new Error('🔒 *Suki no reconoce el tipo de archivo, lo siento...*')

  const tempPath = join('./tmp', `upload.${ext}`)
  await writeFile(tempPath, buffer)
  const fileData = await readFile(tempPath)

  const form = new FormData()
  form.append('file', new File([fileData], `upload.${ext}`, { type: mime}))

  try {
    const res = await fetch(url, { method: 'POST', body: form})
    const json = await res.json()
    await unlink(tempPath).catch(() => null)

    if (json?.status!== 'success' ||!json?.data?.url)
      throw new Error('☁️ *La nube se escondió… no se logró subir.*')

    return json.data.url
} catch (err) {
    console.error(`💥 Error en la nube (${url}):`, err)
    await unlink(tempPath).catch(() => null)
    return null
}
}

// 🌷 Nubes mágicas disponibles
const uploaderCloudStack = buffer =>
  uploadTo('https://phpstack-1487948-5667813.cloudwaysapps.com/upload.php', buffer)

const uploaderCloudGuru = buffer =>
  uploadTo('https://cloudkuimages.guru/upload.php', buffer)

const uploaderCloudCom = buffer =>
  uploadTo('https://cloudkuimages.com/upload.php', buffer)
