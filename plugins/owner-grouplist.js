// 🌸 𝖢𝗈́𝖽𝗂𝗀𝗈 𝖼𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 🍁
// 𝖬𝗎𝖾𝗌𝗍𝗋𝖺 𝗅𝗈𝗌 𝗀𝗋𝗎𝗉𝗈𝗌 𝖾𝗇 𝗅𝗈𝗌 𝗊𝗎𝖾 𝖾𝗌𝗍𝖺́ 𝖾𝗅 𝖻𝗈𝗍

let handler = async (m, { conn}) => {
  const chats = Object.entries(conn.chats)
.filter(([jid, chat]) => jid.endsWith('@g.us'))
.map(([jid, chat]) => ({ id: jid, name: chat.subject || 'Grupo sin nombre'}));

  if (chats.length === 0) {
    return m.reply('🌧️ *𝖲𝗎𝗄𝗂 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝗎𝗇𝗂𝖽𝖺 𝖺 𝗇𝗂𝗇𝗀𝗎𝗇 𝗀𝗋𝗎𝗉𝗈.*');
}

  let texto = `🌸 *𝖲𝗎𝗄𝗂 está en ${chats.length} grupos mágicos:*\n\n`;
  for (const chat of chats) {
    texto += `📍 *${chat.name}*\n🆔 ${chat.id}\n\n`;
}

  await conn.sendMessage(m.chat, {
    text: texto.trim(),
    contextInfo: {
      externalAdReply: {
        title: '📋 Lista de grupos',
        body: '✨ Grupos donde Suki está presente',
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com'
}
}
}, { quoted: m});
};

handler.command = ['grouplist', 'listagrupos', 'listagp'];
handler.tags = ['owner'];
handler.owner = true;

export default handler;
