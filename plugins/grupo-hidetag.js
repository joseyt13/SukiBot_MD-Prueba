// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂

let handler = async (m, { conn}) => {
  if (!m.isGroup) return m.reply('❗ *Este comando solo funciona en grupos.*');

  if (!m.quoted) return m.reply('🌸 *Porfis... responde al mensaje que quieres mencionar.*');

  const sender = m.quoted.sender;
  const name = await conn.getName(sender);
  const text = m.quoted.text || '📩 *Mensaje sin texto*';

  const mention = `📣 *𝖬𝖾𝗇𝖼𝗂𝗈𝗇 𝖽𝖾 𝗆𝖾𝗇𝗌𝖺𝗃𝖾:*\n\n💬 ${text}\n\n🔔 *De:* @${sender.split('@')[0]}`;

  await conn.sendMessage(m.chat, {
    text: mention,
    mentions: [sender]
}, { quoted: m});
};

handler.help = ['tag', 'n'];
handler.tags = ['grupo'];
handler.command = ['tag', 'n'];
handler.group = true;

export default handler;
