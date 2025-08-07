import axios from 'axios';

let handler = async (m, { conn, text}) => {
  if (!text) {
    return conn.reply(m.chat, '🌸 Por favor proporciona un enlace de YouTube para descargar el video.\nEjemplo: *.ytmp4 https://youtube.com/shorts/abc123*', m);
}

  if (!text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    return conn.reply(m.chat, '❌ El enlace no parece válido. Asegúrate de que sea de YouTube.', m);
}

  await conn.reply(m.chat, '🔍 𓆩 ꒰ Procesando video ꒱ 𓆪', m);

  try {
    const api = `https://aemt.me/download/ytmp4?url=${encodeURIComponent(text)}`;
    const res = await axios.get(api);
    const data = res.data.result;

    if (!data ||!data.title ||!data.download_url) {
      return conn.reply(m.chat, `❌ No se pudo obtener el video para:\n*${text}*`, m);
}

    const caption = `
🎬 𓆩 ꒰ 𝖵𝗂𝖽𝖾𝗈 𝖤𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝖽𝗈 ꒱ 𓆪

📌 *Título:* ${data.title}
📦 *Tamaño:* ${data.size}
⏱️ *Duración:* ${data.duration}
📺 *Calidad:* ${data.quality}
🔗 *Enlace:* ${text}

🌷 SukiBot_MD te lo envía con dulzura.
`.trim();

    await conn.sendFile(m.chat, data.download_url, `${data.title}.mp4`, caption, m);
} catch (e) {
    console.error(e);
    await conn.reply(m.chat, '⚠️ Ocurrió un error al intentar descargar el video. Puede que esté restringido o demasiado largo.', m);
}
};

handler.help = ['ytmp4 <url>'];
handler.tags = ['downloader', 'youtube'];
handler.command = ['ytmp4', 'ytvideo', 'ytv'];
handler.register = true;

export default handler;
