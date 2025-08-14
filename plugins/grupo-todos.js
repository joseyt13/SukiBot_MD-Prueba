let handler = async (m, { conn, args, participants, groupMetadata}) => {
  if (!m.isGroup) throw '🌸 Este comando solo funciona en grupos mágicos.'

  const admins = groupMetadata.participants.filter(p => p.admin)
  const isAdmin = admins.some(p => p.id === m.sender)
  const isBotAdmin = admins.some(p => p.id === conn.user.jid)

  if (!isAdmin) throw '🧁 Solo los administradores pueden invocar a todos con 𝖲𝗎𝗄𝗂.'
  if (!isBotAdmin) throw '⚠️ El bot necesita ser administrador para mencionar a todos.'

  const texto = args.join(' ') || '🌷 𝖲𝗎𝗄𝗂Bot_MD invoca a todos los miembros del reino mágico:'
  const mentions = participants.map(p => p.id)

  await conn.sendMessage(m.chat, {
    text: texto + '\n\n' + mentions.map(u => `• @${u.split('@')[0]}`).join('\n'),
    mentions,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Invocación grupal',
        body: '✨ Todos han sido llamados por 𝖲𝗎𝗄𝗂',
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
}
}
}, { quoted: m})
}

handler.help = ['todos', 'tagall', 'invocar']
handler.tags = ['group']
handler.command = ['todos', 'tagall', 'invocar'];
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler
