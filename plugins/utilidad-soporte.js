const handler = async (m, { conn, args, usedPrefix, command}) => {
  // 🔍 Validación de número
  if (!args[0]) {
    return m.reply(`❗ *Uso correcto:*\n\n${usedPrefix}${command} <número>\n📌 Ejemplo: ${usedPrefix}${command} 573001234567`);
}

  let numero = args[0].replace(/\D/g, '') + '@s.whatsapp.net';

  // 📄 Mensaje enviado al número de soporte
  const texto = `
📩 *Solicitud de soporte*

🧑 *Usuario:* https://wa.me/${m.sender.split('@')[0]}
📞 *Soporte para:* https://wa.me/${args[0]}
🕒 *Fecha:* ${new Date().toLocaleString()}
`.trim();

  try {
    await conn.sendMessage(numero, { text: texto});
    m.reply(`✅ *Soporte enviado correctamente a* ${args[0]}`);
} catch (e) {
    console.error(e);
    m.reply(`❌ *Error al enviar mensaje a* ${args[0]}.\n🔎 Asegúrate de que el número está en WhatsApp y el bot puede enviarle mensajes.`);
}
};

handler.command = /^soporte$/i;
handler.help = ['soporte <número>'];
handler.tags = ['utilidad'];
export default handler;
