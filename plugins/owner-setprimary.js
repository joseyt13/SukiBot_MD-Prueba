
// ✨ Código creado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁

let handler = async (m, { conn, args, usedPrefix, command}) => {
  const isOwner = global.owner?.includes(m.sender);
  if (!isOwner) {
    return conn.reply(m.chat, '🚫 Este comando solo puede usarlo el dueño del bot.', m);
}

  // Obtener número desde mención o argumento
  let user;
  if (m.mentionedJid?.length) {
    user = m.mentionedJid[0];
} else if (args[0]) {
    const number = args[0].replace(/[^0-9]/g, '');
    user = number + '@s.whatsapp.net';
}

  if (!user) {
    return conn.reply(m.chat, `🌸 Uso correcto:\n${usedPrefix}${command} @usuario\n${usedPrefix}${command} 51987654321`, m);
}

  // Guardar en base de datos
  global.subBots = global.subBots || {};
  global.subBots[user] = {
    addedBy: m.sender,
    timestamp: Date.now()
};

  // Confirmación con mención
  return conn.sendMessage(m.chat, {
    text: `✨ El usuario ha sido designado como *Sub-Bot primario*.\n🎀 ¡Bienvenido al equipo oficial de SukiBot_MD!`,
    mentions: [user]
}, { quoted: m});
};

handler.help = ['setprimary <@usuario | número>'];
handler.tags = ['owner'];
handler.command = ['setprimary'];
handler.rowner = true;

export default handler;
