let handler = async (m, { conn, args, isOwner, usedPrefix, command}) => {
  const creatorID = global.owner[0][0]; 
  if (!args[0]) {
    return m.reply(`🧋 Ingresa el enlace de invitación de un grupo.\n\n✨ Ejemplo:\n${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxxxxxxxxx`);
}

  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let link = args[0].match(linkRegex);

  if (!link) {
    return m.reply('⚠️ Enlace no válido. Asegúrate de que sea un link de grupo de WhatsApp.');
}

  let inviteCode = link[1];

  if (isOwner) {
    try {
      const response = await conn.groupAcceptInvite(inviteCode);
      await m.react('✅');
      await m.reply(`🌸 𝖲𝗎𝗄𝗂 se ha unido con éxito al grupo: ${response}`);
} catch (e) {
      console.error(e);
      await m.react('❌');
      m.reply('💢 𝖲𝗎𝗄𝗂 no pudo unirse al grupo. Es posible que el enlace esté vencido o el bot esté bloqueado.');
}
} else {
    // Si no es el creador, se le envía el link al propietario
    try {
      await conn.sendMessage(creatorID + '@s.whatsapp.net', {
        text: `🔔 El usuario *${m.sender.split('@')[0]}* intentó usar el comando *.join*.\n📎 Enlace de invitación:\nhttps://chat.whatsapp.com/${inviteCode}`
});
      await m.reply('❌ Este comando solo puede usarlo el creador de 𝖲𝗎𝗄𝗂_Bot_MD.\n📩 Tu invitación ha sido enviada al propietario.');
} catch (e) {
      console.error(e);
      await m.reply('⚠️ No se pudo enviar la invitación al propietario. Intenta más tarde.');
}
}
};

handler.help = ['join <enlace de grupo>'];
handler.tags = ['owner'];
handler.command = ['join', 'botjoin', 'sukijoin'];
handler.rowner = true;

export default handler;
