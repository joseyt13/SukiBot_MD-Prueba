let handler = async (m, { conn}) => {
  const nombreBot = 'ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ';
  const creador = 'ꜰᴇᴅᴇxʏᴢ';
  const canal = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';
  const contacto = 'https://wa.me/5491156178758'; // reemplaza con tu número real
  const imagen = 'https://files.catbox.moe/rkvuzb.jpg';

  const texto = `
🌸 *Información del Creador*

👑 𝖡𝗈𝗍: ${nombreBot}
🎀 𝖢𝗋𝖾𝖺𝖽𝗈𝗋: ${creador}
📡 𝖢𝖺𝗇𝖺𝗅 𝗈𝗳𝗂𝖼𝗂𝖺𝗅:
${canal}

💌 ¿Quieres saludar o colaborar?
📲 Escríbele aquí:
${contacto}
`.trim();

  const buttons = [
    { buttonId: '.menu', buttonText: { displayText: '🌷 Menú Principal'}, type: 1},
    { buttonId: '.donar', buttonText: { displayText: '🍰 Donar'}, type: 1},
    { buttonId: '.infobot', buttonText: { displayText: '📦 Info del Bot'}, type: 1}
  ];

  const buttonMessage = {
    image: { url: imagen},
    caption: texto,
    footer: 'ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • powered by ꜰᴇᴅᴇxʏᴢ',
    buttons: buttons,
    headerType: 4
};

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m});
};

handler.command = ['creador', 'owner', 'creator'];
handler.help = ['creador'];
handler.tags = ['info'];
handler.register = true;

export default handler;
