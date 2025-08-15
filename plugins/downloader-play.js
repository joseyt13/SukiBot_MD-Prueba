import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    throw `❗ *SukiBot_MD te dice:*
Por favor, escribe el nombre del video que deseas buscar.
📌 Ejemplo: *${usedPrefix + command} Un viaje épico*`;
}

  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '⚠️ *No se encontraron resultados para tu búsqueda.*
Intenta con otro título o revisa la ortografía.';
}

  const caption = `
🎬 *Resultado encontrado:*
📌 *Título:* ${videoInfo.title}
⏱️ *Duración:* ${videoInfo.timestamp}
👁️ *Vistas:* ${videoInfo.views.toLocaleString()}
📅 *Publicado:* ${videoInfo.ago}
🌐 *Canal:* ${videoInfo.author.name}

⚔️ *SukiBot_MD* te ofrece opciones mágicas:
🎧 Descargar solo *audio*
📽️ Descargar el *video completo*
🧬 O probar suerte en *Spotify*
`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail},
      caption: caption.trim(),
      footer: '╰─🍓𓆩 SukiBot_MD 𓆪🍰─╯',
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎵 Descargar Audio'}, type: 1},
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📽️ Descargar Video'}, type: 1},
      ],
      headerType: 4,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999
}
},
    { quoted: m}
);

  await conn.sendMessage(m.chat, {
    react: { text: '🔎', key: m.key}
});
};

handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['downloader'];
handler.group = true;
handler.limit = 6;

export default handler;
