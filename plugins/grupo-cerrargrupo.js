let handler = async (m, { conn, args, usedPrefix, command}) => {
  const chatId = m.chat;

  // 🛑 Verificar que sea grupo
  if (!m.isGroup) {
    return conn.reply(chatId, '❌ Este comando solo puede usarse en grupos.', m);
}

  const groupMetadata = await conn.groupMetadata(chatId);
  const senderId = m.sender;
  const participant = groupMetadata.participants.find(p => p.id === senderId);
  const isAdmin = participant && participant.admin;

  // 🔐 Verificar permisos
  if (!isAdmin) {
    return conn.reply(chatId, '🚫 Solo los administradores pueden usar este comando.', m);
}

  // ⏳ Validar minutos
  const minutos = parseInt(args[0]);
  if (isNaN(minutos) || minutos < 1 || minutos> 1440) {
    return conn.reply(
      chatId,
      `🧭 *Formato incorrecto.*\nUsa: ${usedPrefix}${command} <minutos>\nEjemplo: ${usedPrefix}${command} 10`,
      m
);
}

  const msTiempo = minutos * 60 * 1000;

  await conn.reply(
    chatId,
    `🪄 *Temporizador activado: el grupo se cerrará en ${minutos} minuto(s).*`,
    m
);

  // 🕰️ Esperar y cerrar grupo
  setTimeout(async () => {
    try {
      await conn.groupSettingUpdate(chatId, 'announcement');
      await conn.sendMessage(chatId, {
        text: `🔒 *El grupo ha sido cerrado automáticamente por SukiBot_MD*\n🕐 Tiempo cumplido: ${minutos} minutos.\n📢 Solo los administradores pueden enviar mensajes ahora.`
});
} catch (error) {
      console.error('Error al cerrar el grupo:', error);
      await conn.reply(chatId, '⚠️ Hubo un problema al cerrar el grupo. Verifica que el bot sea administrador.');
}
}, msTiempo);
};

handler.help = ['cerrargrupo <minutos>'];
handler.tags = ['grupo', 'admin'];
handler.command = ['cerrargrupo'];

export default handler;
