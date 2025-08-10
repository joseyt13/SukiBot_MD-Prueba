const handler = async (m, { conn, text}) => {
  const [numero, mensaje, cantidad] = text.split('|');

  if (!numero ||!mensaje) {
    return conn.reply(m.chat, `
❌ *𝖤𝗋𝗋𝗈𝗋 𝖾𝗇 𝖾𝗅 𝖼𝗈𝗆𝖺𝗇𝖽𝗈*

📌 *𝖴𝗌𝗈 correcto:*
#spamwa número|mensaje|cantidad

📍 *Ejemplo:*
#spamwa 51987654321|Hola, ¿cómo estás?|5
`, m);
}

  if (cantidad && isNaN(cantidad)) {
    return conn.reply(m.chat, '⚠️ *𝖫𝖺 𝖼𝖺𝗇𝗍𝗂𝖽𝖺𝖽 𝖽𝖾𝖻𝖾 𝗌𝖾𝗋 𝗎𝗇 𝗇𝗎𝗆𝖾𝗋𝗈 𝗏𝖺́𝗅𝗂𝖽𝗈.*', m);
}

  const numeroFormateado = numero
.replace(/[-+<>@ ]/g, '')
.replace(/^0/, '62') + '@s.whatsapp.net';

  const totalMensajes = cantidad? parseInt(cantidad): 10;

  if (totalMensajes> 999) {
    return conn.reply(m.chat, '⚠️ *𝖤𝗅 𝗅𝗂́𝗆𝗂𝗍𝖾 𝖾𝗌 999 𝗆𝖾𝗇𝗌𝖺𝗃𝖾𝗌.*', m);
}

  if (mensaje.length < 5) {
    return conn.reply(m.chat, '⚠️ *𝖤𝗅 𝗆𝖾𝗇𝗌𝖺𝗃𝖾 𝖽𝖾𝖻𝖾 𝗍𝖾𝗇𝖾𝗋 𝗆𝗂𝗇𝗂𝗆𝗈 5 𝖼𝖺𝗋𝖺𝖼𝗍𝖾𝗋𝖾𝗌.*', m);
}

  await conn.reply(m.chat, `✅ *𝖲𝖯𝖠𝖬 𝖨𝖭𝖨𝖢𝖨𝖠𝖣𝖮*\n📨 𝖤𝗇𝗏𝗂𝖺𝗇𝖽𝗈 *${totalMensajes}* 𝗆𝖾𝗇𝗌𝖺𝗃𝖾𝗌 𝖺 *${numero}*`, m);

  for (let i = 0; i < totalMensajes; i++) {
    await conn.sendMessage(numeroFormateado, { text: mensaje.trim()});
}
};

handler.help = ['spamwa <número>|<mensaje>|<cantidad>'];
handler.tags = ['tools'];
handler.command = ['spam', 'spamwa'];
handler.premium = true;

export default handler;
