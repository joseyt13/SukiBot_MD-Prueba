const handler = async (m, { conn, isAdmin}) => {
  const emoji = '👑';
  const done = '✅';
  const error = '❌';
  const info = 'ℹ️';

  if (!m.fromMe) return m.reply(`${error} Solo el owner puede usar este comando.`);
  if (!m.isGroup) return m.reply(`${info} Este comando solo funciona en grupos.`);
  if (isAdmin) return m.reply(`${emoji} Ya eres administrador.`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react(done);
    m.reply(`${emoji} ¡Promoción exitosa! Ahora eres admin.`);
} catch (err) {
    console.error(err);
    m.reply(`${error} Ocurrió un error al intentar darte admin.`);
}
};

handler.help = ['autoadmin'];
handler.tags = ['owner'];
handler.command = ['autoadmin'];
handler.mods = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
