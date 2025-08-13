
// código creado por fedexyz 🍂
// no quites los créditos ✨

import axios from 'axios'

const handler = async (m, { conn, text, command}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `📌 𝖲𝗎𝗄𝗂 necesita un enlace de YouTube para trabajar su magia.\n\n✨ Ejemplo:\n.${command} https://youtu.be/dQw4w9WgXcQ`
}, { quoted: m})
}

  await conn.sendMessage(m.chat, {
    react: { text: '🎶', key: m.key}
})

  try {
    const res = await axios.get(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(text)}`)
    const { title, result} = res.data

    if (!result ||!result.url) {
      throw new Error('𝖲𝗎𝗄𝗂 no pudo encontrar el audio. ¿Seguro que el enlace es válido?')
}

    await conn.sendMessage(m.chat, {
      text: `🎧 *𝖲𝗎𝗄𝗂Bot_MD ha preparado tu audio:*\n\n📌 *Título:* ${title}\n📥 *Formato:* MP3\n\nToca el botón para descargarlo~`,
      footer: '✨ Descarga mágica cortesía de 𝖲𝗎𝗄𝗂',
      buttons: [
        {
          buttonId: result.url,
          buttonText: { displayText: '🔊 Descargar Audio'},
          type: 1
}
      ],
      headerType: 1
}, { quoted: m})

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key}
})
} catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key}
})
    await conn.sendMessage(m.chat, {
      text: '😿 𝖲𝗎𝗄𝗂 se tropezó con un error. Intenta más tarde, maestro.'
}, { quoted: m})
}
}

handler.help = ['pindl <url>']
handler.tags = ['descargas']
handler.command = ['pimdl', '.pm3', 'audio']

export default handler
