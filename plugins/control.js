let handler = async (m, { conn, command, isGroup, isROwner}) => {
  if (!isGroup) return m.reply('🌸 Este comando solo funciona en grupos.');
  if (!isROwner) return m.reply('❌ Solo el creador puede usar este comando.');

  const estado = command === 'activar';
  const chat = global.db.data.chats[m.chat];

  chat.botActivo = estado;

  const mensaje = estado
? `✅ El bot ha sido *activado* en este grupo.\n🧁 Ahora pueden usar comandos mágicos.`
: `🚫 El bot ha sido *desactivado* en este grupo.\n🌙 No responderá a comandos hasta que se active.`;

  await m.reply(mensaje);
};

handler.command = ['activar', 'desactivar'];
handler.tags = ['admin'];
handler.group = true;
handler.rowner = true;
handler.help = ['activar', 'desactivar'];

export default handler;
