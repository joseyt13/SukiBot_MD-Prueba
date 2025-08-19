let handler = async (m, { conn, participants, usedPrefix, command}) => {
  if (!m.isGroup) {
    return m.reply(`👥 *Este hechizo solo florece en los jardines grupales* 🌷`)
}

  let lista = participants.map(p => {
    const nombre = conn.getName(p.id)
    return `𓆩 🆔 \`${p.id}\`\n𓆪 🧸 *Nombre:* ${nombre}`
}).join('\n\n')

  await conn.sendMessage(m.chat, {
    text: `✨ *Lista de miembros del grupo con sus ID mágicos* ✨\n\n${lista}`,
    footer: 'SᴜᴋɪBot_MD 🍓',
    buttons: [
      { buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}
    ],
    headerType: 1
}, { quoted: m})
}

handler.help = ['lid']
handler.tags = ['info']
handler.command = ['lid']

export default handler
