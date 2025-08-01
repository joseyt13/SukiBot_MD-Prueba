
let handler = async (m, { conn, args, usedPrefix, command}) => {
  const chatId = m.chat;
  const groupMetadata = await conn.groupMetadata(chatId);
  const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && p.admin);

  if (!m.isGroup) {
    return conn.reply(chatId, '❌ Este comando solo puede usarse en grupos.', m);
}

  if (!isAdmin) {
    return conn.reply(chatId, '🛑 Solo los administradores pueden usar este comando.', m);
}

  const minutos = parseInt(args[0]);
  if (isNaN(minutos) || minutos < 1 || minutos> 1440) {
    return conn.reply(chatId, `💫 *Formato inválido.*\nUsa: ${usedPrefix + command} <minutos>\nEjemplo: ${usedPrefix + command} 10`, m);
}

  const msTiempo = minutos * 60 * 1000;

  await conn.reply(chatId, `⏳ *Cierre automático del grupo activado*\n🔐 El grupo se cerrará en *${minutos} minutos*.`, m);

  setTimeout(async () => {
    await conn.groupSettingUpdate(chatId, 'announcement');
    await conn.sendMessage(chatId, {
      text: `🔒 *El grupo ha sido cerrado automáticamente por SukiBot_MD*\n🕰️ Tiempo transcurrido: ${minutos} minutos.\n📢 Solo los administradores pueden enviar mensajes ahora.`
});
}, msTiempo);
};

handler.help = ['cerrargrupo <minutos>'];
handler.tags = ['grupo', 'admin'];
handler.command = ['cerrargrupo'];

export default handler;
