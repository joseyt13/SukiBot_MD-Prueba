// 🎀 Código creado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁
// Menú mágico de Free Fire para SukiBot_MD

let handler = async (m, { conn}) => {
  const text = `
╭─🌟 *𝖬𝖾𝗇𝗎 𝖥𝗋𝖾𝖾𝖥𝗂𝗋𝖾* 🌟─╮
│
│ 🎮 *Modos disponibles:*
│
│ 🔥 1. 4vs4 competitivo
│ ⚔️ 2. Duelo de escuadras
│ 🎯 3. Modo entrenamiento
│ 🏆 4. Clasificatoria
│ 🧩 5. Sala personalizada
│
│ ✨ ¡Elige tu modo favorito y prepárate!
╰──────────────────────╯
`.trim();

  const buttons = [
    { buttonId: '.4vs4', buttonText: { displayText: '🔥 4vs4'}, type: 1},
    { buttonId: '.duelo', buttonText: { displayText: '⚔️ Duelo'}, type: 1},
    { buttonId: '.entrenamiento', buttonText: { displayText: '🎯 Entrenar'}, type: 1},
    { buttonId: '.clasificatoria', buttonText: { displayText: '🏆 Ranked'}, type: 1},
    { buttonId: '.sala', buttonText: { displayText: '🧩 Sala personalizada'}, type: 1}
  ];

  await conn.sendMessage(m.chat, {
    text,
    footer: '🌸 SukiBot_MD • Zona mágica Free Fire',
    buttons,
    headerType: 1
}, { quoted: m});
};

handler.help = ['menuff'];
handler.tags = ['juegos', 'freefire'];
handler.command = ['menuff', 'freefiremenu'];
export default handler;
