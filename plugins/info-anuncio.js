// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

const handler = async (m, { conn}) => {
  const anuncio = `
╭───────𓆩♡𓆪───────╮
│ 🌸 *𝖲𝗎𝗄𝗂Bot_MD — Anuncio Oficial* 🌸
╰───────𓆩♡𓆪───────╯

✨ ¡Hola, usuario mágico!

Este es un anuncio oficial de *𝖲𝗎𝗄𝗂Bot_MD*, tu compañera pastelcore en el mundo digital.
Te invitamos a seguir el canal oficial para recibir:

🧁 Actualizaciones encantadas
🪄 Nuevos comandos mágicos
💖 Eventos y funciones exclusivas

📢 *Canal oficial:*
https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N

Gracias por formar parte del reino kawaii de 𝖲𝗎𝗄𝗂 💫
`.trim();

  await conn.sendMessage(m.chat, {
    text: anuncio,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999
}
}, { quoted: m});
};

handler.command = ['anuncio', 'sukiinfo', 'canal'];
handler.help = ['anuncio'];
handler.tags = ['info'];
handler.register = true;

export default handler;
