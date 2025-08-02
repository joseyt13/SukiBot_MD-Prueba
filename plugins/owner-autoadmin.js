const handler = async (m, { conn, isAdmin}) => {
  const allowedOwner = '+5491156178758';
  const emoji = '👑';
  const done = '✅';
  const error = '❌';
  const info = 'ℹ️';

  if (!m.isGroup) return m.reply(`${info} Este comando solo puede usarse en grupos.`);
  if (m.sender!== allowedOwner + '@s.whatsapp.net') return m.reply(`${error} No tienes permiso para usar este comando.`);
  if (isAdmin) return m.reply(`${emoji} Ya eres administrador.`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react(done);
    m.reply(`${emoji} Has sido promovido a administrador.`);
} catch (err) {
    console.error(err);
    m.reply(`${error} Ocurrió un error al intentar promoverte.`);
}
};

handler.help = ['autoadmin'];
handler.tags = ['owner'];
handler.command = ['autoadmin'];
handler.group = true;
handler.botAdmin = true;

export default handler;
