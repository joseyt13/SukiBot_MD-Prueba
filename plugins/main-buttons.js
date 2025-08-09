let handler = async (m, { conn}) => {
  const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg'; // Imagen decorativa

  const message = {
    templateMessage: {
      hydratedTemplate: {
        imageMessage: { url: imageUrl},
        hydratedContentText: `🌸 *Bienvenido a SukiBot_MD*\n\n🧋 ¿Qué deseas hacer hoy, ${m.pushName || 'Anónimo'}?`,
        hydratedFooterText: '🍓 SukiBot_MD • pastelcore edition',
        hydratedButtons: [
          {
            quickReplyButton: {
              displayText: '📋 Ver menú',
              id: '.menu'
}
},
          {
            quickReplyButton: {
              displayText: '👑 Owner',
              id: '.owner'
}
},
          {
            quickReplyButton: {
              displayText: '🛠️ Ayuda',
              id: '.ayuda'
}
}
        ]
}
}
};

  await conn.sendMessage(m.chat, message, { quoted: m});
};

handler.help = ['sukibot'];
handler.tags = ['main'];
handler.command = ['sukibot', 'inicio', 'start'];

export default handler;
