// ✨ Código creado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁

let handler = async (m, { conn, args, usedPrefix, command}) => {
  // Número del dueño registrado
  const ownerNumber = '5491156178758';
  const senderNumber = m.sender.split('@')[0];

  // Verificar si el usuario es el owner
  if (senderNumber!== ownerNumber) {
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
    return conn.reply(m.chat, `🌸 Uso correcto:\n${usedPrefix}${command} @usuario\n${usedPrefix}${command} 5491156178758`, m);
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
