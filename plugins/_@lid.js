let handler = async (m, { args, usedPrefix, command}) => {
  let target = m.mentionedJid?.[0] || args[0] || m.sender
  let id = typeof target === 'string'? target: m.sender

  await m.reply(`🆔 𝗜𝗗 𝗱𝗲𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼:\n\n\`${id}\``)
}

handler.help = ['lid', 'id', 'jid']
handler.tags = ['info']
handler.command = ['lid', 'id', 'jid'] // puedes usar cualquiera de estos
export default handler
