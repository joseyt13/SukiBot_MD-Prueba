const handler = async (m, { conn}) => {
  const name = conn.getName(m.sender);
  const txt = `
︵˚₊⊹𓏲𓈒 𐂂🧁⋱Comprar o alquilar Suki_Bot_MD⋰🧋𓈒˚₊︵

💖 *Hola preciosurita ${name}~*
Suki_Bot_MD está disponible para:

✿ ┆ *Compra completa del Bot*
🍬 ┆ Acceso exclusivo a todo el código + asistencia personalizada.

✿ ┆ *Alquiler mensual del Bot*
🍓 ┆ Ideal para grupos, canales o pruebas kawaii.

✿ ┆ *Edición personalizada*
🖌️ ┆ Adaptamos plugins, funciones o diseño con estilo adorable.

🌈 *Plataformas compatibles*: WhatsApp MD, Multi-device, entre otros.
🧋 *Seguridad*: Código optimizado y sin elementos maliciosos.
🎨 *Estilo*: Interfaz pastelcore, emojis integrados, mensajes encantadores.

📞 *CONTACTO*: wa.me/5491156178758
📷 *INSTAGRAM*: @fede_13
📁 *Formato*: \`.zip\` o acceso privado a repositorio

𖥔𖧧𖧷 ¿Quieres una demo kawaii o quieres hablar con Dev_fedexyz13?
`.trim();

  m.reply(txt);
};

handler.command = /^(comprarbot|comprar|alquilarbot)$/i;
export default handler;
