import moment from 'moment-timezone';

let handler = async (m, { conn, text}) => {
  if (!text) {
    await m.react('💭');
    return m.reply(`🌸 Escribe un texto para que Suki pueda crear tu imagen mágica~\n\n🧁 Ejemplo: *.iqc hola mundo*`);
}

  const position = Math.random() < 0.5? 'left': 'right'; // Aleatorio entre 'left' y 'right'
  const time = moment().tz('Asia/Jakarta').format('HH:mm'); // Tiempo en zona de Yakarta

  const apiUrl = `https://velyn.mom/api/maker/iqc?message=${encodeURIComponent(text)}&position=${position}&jam=${encodeURIComponent(time)}`;

  await m.react('🧋'); // Reacción kawaii
  await conn.sendMessage(m.chat, {
    image: { url: apiUrl},
    caption: `🩵 Aquí tienes tu imagen generada, ${text.length < 20? 'qué frase tan dulce': '¡wow!'} 🌸`,
    contextInfo: {
      mentionedJid: [m.sender]
}
}, { quoted: m});

  await m.react('🌺');
};

handler.help = ['iqc <texto>'];
handler.tags = ['tools', 'fun', 'kawaii'];
handler.command = ['iqc', 'bubbletext', 'mensajeanime'];

export default handler;
