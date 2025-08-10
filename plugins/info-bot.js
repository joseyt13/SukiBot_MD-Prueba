// Código creado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

let handler = async (m, { conn}) => {
  const texto = m.text?.trim().toLowerCase();

  // Detecta si el mensaje es exactamente "bot"
  if (texto === 'bot') {
    const respuestas = [
      '🌸 *𝖧𝗈𝗅𝖺, 𝖺𝗎𝗋𝖺 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝖺~*',
      '✨ *𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 está despierta y lista para ayudarte*',
      '🧋 *¿Me invocaste? Estoy aquí, preciosura~*',
      '🍃 *𝖤𝗅 𝗏𝗂𝖾𝗇𝗍𝗈 𝗆𝖾 𝗍𝗋𝖺𝗃𝗈... ¿𝗇𝖾𝖼𝖾𝗌𝗂𝗍𝖺𝗌 𝖺𝗒𝗎𝖽𝖺?*',
      '🌷 *𝖲𝗎𝗄𝗂 está flotando por aquí~*'
    ];

    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

    return conn.sendMessage(m.chat, { text: respuesta}, { quoted: m});
}
};

handler.customPrefix = /^bot$/i;
handler.command = new RegExp;
handler.group = true;
handler.register = true;

export default handler;
