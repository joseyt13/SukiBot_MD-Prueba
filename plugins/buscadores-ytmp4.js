import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣"
};

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];
const limit = 100;

const packname = "TanjiroBot";
const dev = "fedexyz";
const icono = "https://i.ibb.co/fX7YWTk/tanjiro-icon.jpg";
const redes = "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N";

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) &&!formatVideo.includes(format)) {
      throw new Error("⚠️ Formato no compatible.");
}

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0"}
};

    try {
      const response = await axios.request(config);
      if (response.data?.success) {
        const { id, title, info} = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, title, image: info.image, downloadUrl};
} else {
        throw new Error("⛔ No se pudo obtener detalles del video.");
}
} catch (error) {
      console.error("❌ Error en descarga:", error.message);
      throw error;
}
},

  cekProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: { "User-Agent": "Mozilla/5.0"}
};

    try {
      while (true) {
        const res = await axios.request(config);
        if (res.data?.success && res.data.progress === 1000) {
          return res.data.download_url;
}
        await new Promise(resolve => setTimeout(resolve, 4000));
}
} catch (error) {
      throw new Error("❌ Error al obtener progreso.");
}
}
};

const handler = async (m, { conn, text, command}) => {
  await m.react("🌙");

  if (!text.trim()) return m.reply("🌸 Dime el nombre del video que deseas cazar.");

  try {
    const search = await yts(text);
    if (!search.all.length) return m.reply("🧣 No se encontró nada con ese nombre.");

    const video = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url} = video;
    const vistas = formatViews(views);
    const thumb = await fetch(thumbnail).then(res => res.buffer());

    const info = `
乂会≡ 🌸 *Tanjiro_Bot - Informe de Descarga* ≡会乂

🎬 *Título:* ${title}
🕰️ *Duración:* ${timestamp}
📺 *Canal:* ${video.author.name}
👁️ *Vistas:* ${vistas}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

🔻 El archivo se enviará a continuación...
🧣 Dev: ${dev}
`.trim();

    await conn.sendMessage(m.chat, { image: thumb, caption: info}, { quoted: m});

    if (["play", "yta", "ytmp3"].includes(command)) {
      const api = await ddownr.download(url, "mp3");
      await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl},
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 301,
            newsletterName: channelRD.name
}
}
}, { quoted: m});
      await m.react("🎵"); } else if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (let source of sources) {
        try {
          const res = await fetch(source);
          const { data, result, downloads} = await res.json();
          const downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;

          if (downloadUrl) {
            success = true;
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl},
              fileName: `${title}.mp4`,
              mimetype: "video/mp4",
              thumbnail: thumb,
              contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: channelRD.id,
                  serverMessageId: 302,
                  newsletterName: channelRD.name
}
}
}, { quoted: m});
            await m.react("📹");
            break;
}
} catch (e) {
          console.error(`⚠️ Fuente falló: ${source}`, e.message);
}
}

      if (!success) m.reply("❌ No se encontró un enlace válido para descargar el video.");
}

} catch (error) {
    console.error("❌ Error global:", error.message);
    await m.react("❌");
    m.reply(`⚠️ Error inesperado: ${error.message}`);
}
};

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.register = true;
export default handler;

function formatViews(views) {
  if (typeof views!== "number") return "Desconocido";
  return views>= 1000
? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
: views.toString();
        }
