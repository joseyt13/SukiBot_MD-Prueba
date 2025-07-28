const handler = async (m, { conn}) => {
  const reglas = `
🩷︵₊˚⊹𓏲𓈒 𝗥𝗲𝗴𝗹𝗮𝘀 & 𝗔𝘆𝘂𝗱𝗮 de *Suki_Bot_MD* 𓈒˚₊⊹︵

🎀 Este bot fue creado para compartir magia pastelcore, herramientas útiles y funciones kawaii. Por favor sigue estas reglas para mantener la armonía en el reino digital 🌸

╭───────────────╮
🌷 *Normas generales:*
• No hagas spam o flood de comandos
• No compartas contenido ofensivo o inapropiado
• No modifiques ni abuses del bot
• No robes el código sin permiso
• Sé respetuos@ con otros usuarios
╰───────────────╯

🍡 *Comandos disponibles:*
⪼.menu — Mostrar menú kawaii
⪼.sticker — Crear stickers mágicos
⪼.imagen — Buscar imágenes pastelcore
⪼.anime — Buscar anime adorables
⪼.play — Descargar música suave
⪼.serbot — Convertirse en subbot

🪄 *¿Tienes errores o dudas?*
Suki te escucha con dulzura~ ☁️✨

📞 *Habla con el creador:*
🔗 wa.me/+5491156178758
👤 Dev: fedexyz13

𓆩♡𓆪 Gracias por usar *Suki_Bot_MD*, tu compañera kawaii en este mundo digital pastel 💖
`;

  await conn.sendMessage(
    m.chat,
    { text: reglas.trim()},
    { quoted: m}
);
};

handler.command = ['reglas', 'ayuda', 'normas', 'rules'];
handler.help = ['reglas'];
handler.tags = ['main', 'info'];
handler.register = true;

export default handler;
