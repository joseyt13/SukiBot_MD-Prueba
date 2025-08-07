let handler = async (m, { conn, command, isGroup, isROwner}) => {
  if (!isGroup) return m.reply('🌸 Este comando solo funciona en grupos.');
  if (!isROwner) return m.reply('❌ Solo el creador del bot puede usar este comando.');

  const chat = global.db.data.chats[m.chat];
  const activar = command === 'activar';

  chat.botActivo = activar;

  const estado = activar? '🟢 ACTIVADO': '🔴 DESACTIVADO';
  const mensaje = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖢𝗈𝗇𝗍𝗋𝗈𝗅 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍 ꒱ 𖥔˚₊

📍 *Grupo:* ${await conn.getName(m.chat)}
👑 *Acción:* ${estado}
🧁 *Responsable:* ${m.sender.split('@')[0]}

${activar
? '✨ El bot está activo y listo para recibir comandos mágicos.'
: '🌙 El bot ha sido silenciado en este grupo. No responderá hasta que sea activado nuevamente.'}
`.trim();

  await conn.sendMessage(m.chat, { text: mensaje}, { quoted: m});
};

handler.command = ['activar', 'desactivar'];
handler.tags = ['admin'];
handler.group = true;
handler.rowner = true;
handler.help = ['activar', 'desactivar'];

export default handler;
