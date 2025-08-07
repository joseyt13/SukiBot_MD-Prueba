import ytSearch from 'yt-search';

let handler = async (m, { text, conn}) => {
  if (!text) {
    return conn.reply(m.chat, '🌸 Por favor escribe el nombre del video.\nEjemplo: *.ytmp4 Shakira BZRP*', m);
}

  await conn.reply(m.chat, '🔍 𓆩 ꒰ Buscando video en YouTube ꒱ 𓆪', m);

  try {
    const result = await ytSearch(text);
    const video = result.videos.length> 0? result.videos[0]: null;

    if (video) {
      const response = `
🎬 𓆩 ꒰ 𝖵𝗂𝖽𝖾𝗈 𝖤𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝖽𝗈 ꒱ 𓆪

📌 *Título:* ${video.title}
🕒 *Duración:* ${video.timestamp}
👁️ *Vistas:* ${video.views.toLocaleString()}
📺 *Publicado:* ${video.ago}
🔗 *Enlace:* ${video.url}

🌷 SukiBot_MD te lo muestra con dulzura.
`.trim();

      await conn.sendMessage(m.chat, { text: response}, { quoted: m});
} else {
      await conn.reply(m.chat, `❌ No encontré ningún video para: *${text}*`, m);
}
} catch (e) {
    console.error(e);
    await conn.reply(m.chat, '⚠️ Ocurrió un error al buscar el video. Intenta nuevamente más tarde.', m);
}
};

handler.help = ['ytmp4 <nombre>'];
handler.tags = ['buscador', 'youtube'];
handler.command = ['ytmp4', 'ytsearch', 'ytfind'];
handler.register = true;

export default handler;
