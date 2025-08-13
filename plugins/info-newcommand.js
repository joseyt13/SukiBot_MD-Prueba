// código creado por fedexyz 🍂
// no quites los créditos ✨

const handler = async (m, { conn, text, command}) => {
  const creatorID = global.owner[0][0] // Asegúrate de definir tu número en global.owner

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `📌 𝖲𝗎𝗄𝗂 necesita saber qué comando deseas sugerir.\n\n✨ Ejemplo:\n.${command}.wallpaper anime`
}, { quoted: m})
}

  // Confirmación al usuario
  await conn.sendMessage(m.chat, {
    text: `✅ ¡Gracias por tu sugerencia, maestro!\n𝖲𝗎𝗄𝗂 ha enviado tu propuesta al creador.`
}, { quoted: m})

  // Mensaje al creador
  const suggestion = `
📬 *Nueva sugerencia de comando para 𝖲𝗎𝗄𝗂Bot_MD*

👤 *Usuario:* ${m.sender}
💡 *Sugerencia:* ${text}
🕒 *Fecha:* ${new Date().toLocaleString()}
📍 *Chat:* ${m.chat}
  `.trim()

  await conn.sendMessage(`${creatorID}@s.whatsapp.net`, {
    text: suggestion
})
}

handler.help = ['nuevocm <comando>']
handler.tags = ['info']
handler.command = ['nuevocm', 'newcmd', 'sugerir']

export default handler
