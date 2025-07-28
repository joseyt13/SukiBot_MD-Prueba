const handler = async (m, { conn}) => {
  const reglas = `
🩷︵₊˚⊹𓏲𓈒 *𝑹𝒆𝒈𝒍𝒂𝒔 𝒅𝒆 𝑺𝒖𝒌𝒊_𝑩𝒐𝒕_𝑴𝑫* 𓈒˚₊⊹︵

🌷 Este bot fue creado para ofrecerte funciones kawaii, herramientas útiles y estética digital pastelcore~
Por favor ten en cuenta estas reglas para convivir con dulzura:

──────────── ✧ ────────────

✨ *Normas generales:*

• No uses el bot para spam constante (flood)
• No envíes contenido ofensivo, violento o NSFW
• No intentes dañar, desconectar o modificar el bot
• No robes el código sin dar créditos
• Respeta a otros usuarios si estás en grupo

🍓 *Comandos admitidos:*
Usa comandos como: `.sticker`, `.imagen`, `.anime`, `.menu`, `.play`, `.serbot`, etc.
¡Recuerda que Suki responde con ternura! 💫

──────────── ✧ ────────────

🌈 *¿El bot tiene errores o se comporta raro?*
No entres en pánico pastelcore 🫧

📞 *Habla con el creador:*
Wa.me/+5491156178758 — Dev_fedexyz13

𓆩♡𓆪 *Suki_Bot_MD* está en constante mejora
Gracias por confiar en esta compañera mágica~ 💖
`;

  await conn.sendMessage(
    m.chat,
    { text: reglas.trim()},
    { quoted: m}
);
};

handler.command = ['reglas', 'normas', 'ayuda', 'rules'];
handler.help = ['reglas'];
handler.tags = ['info', 'main'];
handler.register = true;

export default handler;
