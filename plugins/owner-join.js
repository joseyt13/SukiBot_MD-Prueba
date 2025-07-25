let handler = async (m, { conn, args, isOwner, usedPrefix, command}) => {
  if (!isOwner) {
    return m.reply('❌ Este comando solo puede usarlo el creador de Suki_Bot_MD.');
}

  if (!args[0]) {
    return m.reply(`🧋 Ingresa el enlace de invitación de un grupo.\n\n✨ Ejemplo:\n${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxxxxxxxxx`);
}

  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let link = args[0].match(linkRegex);

  if (!link) {
    return m.reply('⚠️ Enlace no válido. Asegúrate de que sea un link de grupo de WhatsApp.');
}

  let inviteCode = link[1];
  try {
    const response = await conn.groupAcceptInvite(inviteCode);
    await m.react('✅');
    await m.reply(`🌸 Suki se ha unido con éxito al grupo: ${response}`);
} catch (e) {
    console.error(e);
    await m.react('❌');
    m.reply('💢 No pude unirme al grupo. Es posible que el enlace esté vencido o el bot esté bloqueado.');
}
};

handler.help = ['join <enlace de grupo>'];
handler.tags = ['owner'];
handler.command = ['join', 'botjoin', 'sukijoin'];
handler.rowner = true;

export default handler;
