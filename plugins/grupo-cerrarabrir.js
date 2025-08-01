const channelRD = 'Grupo Controlador'; // Puedes ajustar el nombre según el canal que administre

const handler = async (m, { conn, isAdmin, isBotAdmin, command}) => {
  if (!m.isGroup)
    return m.reply('❗ *Este comando solo funciona en grupos.*');

  if (!isAdmin)
    return m.reply('🛡️ *Este comando solo puede ser usado por administradores.*');

  if (!isBotAdmin)
    return m.reply('🤖 *Necesito permisos de administrador para cambiar la configuración del grupo.*');

  const abrir = ['abrir', 'grupoabrir'].includes(command);
  const cerrar = ['cerrar', 'grupocerrar'].includes(command);

  if (abrir) {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    return m.reply(`🔓 *${channelRD} ha sido abierto.*\nTodos los miembros pueden enviar mensajes.`);
}

  if (cerrar) {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    return m.reply(`🔒 *${channelRD} ha sido cerrado.*\nSolo los administradores pueden enviar mensajes.`);
}

  m.reply('⚠️ *Comando no reconocido.*');
};

handler.command = ['abrir', 'cerrar', 'grupoabrir', 'grupocerrar'];
handler.help = ['abrir', 'cerrar'];
handler.tags = ['grupo'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;
