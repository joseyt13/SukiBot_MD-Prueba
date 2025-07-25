import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(m.chat, `🌸 Porfis escribe qué deseas buscar en YouTube~\n\n🧋 Ejemplo:\n${usedPrefix + command} Nako ga`, m);
}

  await m.react('🔍');

  const res = await yts(text);
  const videos = res.videos.slice(0, 6); // Limita a 6 resultados para mejor lectura

  if (!videos.length) {
    return conn.reply(m.chat, '💢 No encontré ningún resultado. Intenta con otro nombre más claro.', m);
}

  const list = videos.map((v, i) => {
    return `🍓 *Resultado #${i + 1}*

💫 Título: *${v.title}*
📺 Canal: *${v.author.name}*
⏱️ Duración: *${v.timestamp}*
📆 Subido: *${v.ago}*
👁️‍🗨️ Vistas: *${v.views.toLocaleString()}*
🔗 Enlace: ${v.url}`;
}).join('\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n');

  await conn.sendFile(m.chat, videos[0].thumbnail, 'suki_yts.jpg', list, m);
  await m.react('✅');
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['buscador', 'media'];
handler.command = ['ytsearch', 'yts', 'ytbuscar'];
handler.register = true;
handler.limit = 1;

export default handler;
