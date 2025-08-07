import axios from 'axios';

let handler = async (m, { conn, text, args}) => {
  if (!text) {
    return conn.reply(m.chat, '🌸 Por favor, proporciona un enlace de YouTube para descargar el video.', m);
}

  if (!text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
    return conn.reply(m.chat, '❌ El enlace no parece ser válido. Asegúrate de que sea de YouTube.', m);
}

  await conn.reply(m.chat, '🔍 𓆩 ꒰ Buscando video en YouTube ꒱ 𓆪', m);

  try {
    const api = `https://api.lolhuman.xyz/api/ytvideo?apikey=GataDios&url=${encodeURIComponent(text)}`;
    const res = await axios.get(api);
    const data = res.data.result;

    const caption = `
🎬 𓆩 ꒰ 𝖵𝗂𝖽𝖾𝗈 𝖣𝖾𝗍𝖾𝖼𝗍𝖺𝖽𝗈 ꒱ 𓆪

📌 *Título:* ${data.title}
📦 *Tamaño:* ${data.size}
⏱️ *Duración:* ${data.duration}
📺 *Calidad:* ${data.quality}

🌷 SukiBot_MD te lo envía con dulzura.
`.trim();

    await conn.sendFile(m.chat, data.link, `${data.title}.mp4`, caption, m);
} catch (e) {
    console.error(e);
    return conn.reply(m.chat, '⚠️ Ocurrió un error al intentar descargar el video.', m);
}
};

handler.help = ['ytmp4 <url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytvideo', 'ytv'];
handler.register = true;

export default handler;
