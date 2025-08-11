// ✨ Código creado y mejorado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁
// no quites los créditos 🍂

import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const MAX_FILE_SIZE = 280 * 1024 * 1024; // 280 MB

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "🌷 𝖲𝗎𝗄𝗂_𝖡𝗈𝗍_𝖬𝖣 • 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌"
};

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
};

  const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers});
  const init = await initRes.json();
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers});
  const convert = await convertRes.json();

  let info;
  for (let i = 0; i < 3; i++) {
    const progressRes = await fetch(convert.progressURL, { headers});
    info = await progressRes.json();
    if (info.progress === 3) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
}

  if (!info ||!convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga');
  return { url: convert.downloadURL, title: info.title || 'Video sin título'};
}

async function getSize(url) {
  const response = await axios.head(url, { timeout: 10000});
  const size = parseInt(response.headers['content-length'], 10);
  if (!size) throw new Error('Tamaño no disponible');
  return size;
}

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { react: { text: "📡", key: m.key}});
      return conn.sendMessage(m.chat, {
        text: `🌸 *Suki necesita una canción para encender su magia.*\n🎶 Ejemplo: *${command} Un Verano Sin Ti*`,
        quoted: m
});
}

    await m.react("🔍");

    const videoIdMatch = text.match(youtubeRegexID);
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text;
    let result = await yts(searchQuery);

    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      result = result.all.find(v => v.videoId === videoId) || result.videos.find(v => v.videoId === videoId);
} else {
      result = result.videos?.[0] || result.all?.[0] || result;
}

    if (!result) {
      return conn.sendMessage(m.chat, {
        text: `😿 *Suki no encontró nada con ese nombre.*`,
        quoted: m
});
}

    const res2 = await fetch('https://files.cloudkuimages.guru/images/9m6kTLQt.jpg');
    const thumb2 = await res2.buffer();

    const Shadow = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
},
      message: {
        locationMessage: {
          name: `DESCARGA COMPLETA\n[▓▓▓▓▓▓▓▓░░░░] 100%`,
          jpegThumbnail: thumb2
}
},
      participant: "0@s.whatsapp.net"
};
    const { title, thumbnail, timestamp, views, ago, url, author} = result;
    const thumb = (await conn.getFile(thumbnail)).data;

    const infoMessage = `
🌷 _Tu pedido está listo, cariño:_
📺 _Canal:_ ${author.name || "Desconocido"}
👁️ _Vistas:_ ${formatViews(views)}
⏳ _Duración:_ ${timestamp || "?"}
📆 _Publicado:_ ${ago || "?"}
🔗 _Enlace:_ ${url}`.trim();

    const contextoBonito = {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 101,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: "🎀 Suki te trae música mágica",
          body: `📻 ${author.name || "Artista desconocido"} • ✨ ${title}`,
          thumbnailUrl: "https://files.catbox.moe/rkvuzb.jpg",
          mediaUrl: url,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
};

    const buttons = [
      { buttonId: `.playvideo ${url}`, buttonText: { displayText: "📹 Descargar Video"}, type: 1}
    ];

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage,
      footer: "ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • Descargas encantadas",
      buttons,
      headerType: 4,
...contextoBonito
}, { quoted: m});

    if (["playvideo", "ytmp4"].includes(command)) {
      try {
        const { url: videoUrl, title: videoTitle} = await ytdl(text);
        const size = await getSize(videoUrl);
        if (size> MAX_FILE_SIZE) throw new Error('🌧️ El archivo supera el límite permitido para descarga');

        const buffer = await (await fetch(videoUrl)).buffer();
        await conn.sendFile(
          m.chat,
          buffer,
          `${videoTitle}.mp4`,
          `🎬 *${videoTitle}*\n📁 *Formato:* Documento\n⚖️ *Tamaño:* ${formatSize(size)}`,
          m,
          null,
          {
            mimetype: 'video/mp4',
            asDocument: true,
            filename: `${videoTitle}.mp4`
}
);
} catch (e) {
        return conn.sendMessage(m.chat, {
          text: `❌ Error al descargar el video:\n> ${e.message}`,
          quoted: m
});
}
}

    await m.react("🌸");
} catch (error) {
    await conn.sendMessage(m.chat, {
      text: `💥 Ups, ocurrió un error:\n> \`${error.message || error}\``,
      quoted: m
});
    await m.react("💫");
}
};

handler.command = handler.help = ["play", "playvideo"];
handler.tags = ["descargas"];
export default handler;
