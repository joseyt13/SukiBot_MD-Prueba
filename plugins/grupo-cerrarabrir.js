// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂

const channelRD = '𝖦𝗋𝗎𝗉𝗈 𝖢𝗈𝗇𝗍𝗋𝗈𝗅𝖺𝖽𝗈𝗋'; // Nombre decorativo con letras tipo "𝖯𝗋𝗂𝗆𝖾𝗋𝗈"

const handler = async (m, { conn, isAdmin, isBotAdmin, command}) => {
  if (!m.isGroup)
    return m.reply('❗ *Este comando solo funciona en grupos mágicos pastelcore.*');

  if (!isAdmin)
    return m.reply('🛡️ *Solo los administradores pueden usar este hechizo grupal.*');

  if (!isBotAdmin)
    return m.reply('🤖 *Necesito poderes de administrador para cambiar la configuración del grupo.*');

  const abrir = ['abrir', 'grupoabrir'].includes(command);
  const cerrar = ['cerrar', 'grupocerrar'].includes(command);

  if (abrir) {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    return m.reply(`🔓 *${channelRD} ha sido abierto~*\n✨ *Todos los miembros pueden enviar mensajes con ternura.*`);
}

  if (cerrar) {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    return m.reply(`🔒 *${channelRD} ha sido cerrado~*\n🌸 *Solo los administradores pueden enviar mensajes mágicos.*`);
}

  m.reply('⚠️ *Comando no reconocido. Usa "abrir" o "cerrar" para controlar el grupo.*');
};

handler.command = ['abrir', 'cerrar', 'grupoabrir', 'grupocerrar'];
handler.help = ['abrir', 'cerrar'];
handler.tags = ['grupo'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;
