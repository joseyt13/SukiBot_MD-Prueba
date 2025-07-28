const handler = async (m, { conn, text, usedPrefix, command}) => {
  const ownerNumber = '+5491156178758'; // Creador

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🌸 Usa el comando así:\n${usedPrefix + command} <problema>\n\n🧋 Ejemplo:\n.reportar El bot no responde cuando escribo.play`
}, { quoted: m});
}

  const name = await conn.getName(m.sender);
  const report = `
📢 *Nuevo reporte enviado a Suki_Bot_MD* 💫

👤 Usuario: ${name}
🔖 Número: ${m.sender}
📝 Mensaje: ${text}

🐾 Si es urgente, puedes hablar directo con el creador:
📞 wa.me/${ownerNumber.replace('+', '')}
`;

  // Confirmación al usuario
  await conn.sendMessage(m.chat, {
    text: `🧁 Gracias por tu reporte, ${name}~ 💖\n¡Suki lo entregará con cuidado pastelcore! ☁️`
}, { quoted: m});

  // Enviar al número del creador
  await conn.sendMessage(ownerNumber + '@s.whatsapp.net', {
    text: report
});
};

handler.command = ['reportar', 'reporte'];
handler.help = ['reportar <problema>'];
handler.tags = ['info', 'admin'];
handler.register = true;

export default handler;
