import fetch from "node-fetch";
import yts from "yt-search";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, usedPrefix, command}) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `💿 *Por favor, ingresa el nombre o enlace del video.*`, m);
}

    // 🔍 Buscar video
    const videoIdMatch = text.match(youtubeRegexID);
    const query = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text;
    const search = await yts(query);
    const video = videoIdMatch
? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
: search.videos?.[0];

    if (!video) {
      return conn.reply(m.chat, '✧ *No se encontraron resultados para tu búsqueda.*', m);
}

    // 🖼️ Miniatura decorativa (imagen.jpg)
    const res2 = await fetch('https://commons.wikimedia.org/wiki/File:Cat03.jpg'); // Imagen decorativa
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

    // 📊 Información del video
    const { title, thumbnail, timestamp, views, ago, url, author} = video;
    const vistas = formatViews(views);
    const canal = author?.name || 'Desconocido';

    await m.react('☁️');

    const infoMessage = `*「 Descarga de YouTube 」*\n\n` +
      `🎬 *Título:* ${title}\n` +
      `📺 *Canal:* ${canal}\n` +
      `👁️ *Vistas:* ${vistas}\n` +
      `⏱️ *Duración:* ${timestamp}\n` +
      `📆 *Publicado:* ${ago}\n` +
      `🔗 *Enlace:* ${url}`;

    const thumb = (await conn.getFile(thumbnail))?.data;
    const external = {
      contextInfo: {
        externalAdReply: {
          title,
          body: 'sᴜᴋɪBot_MD 🌸',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: false
}
}
};

    await conn.reply(m.chat, infoMessage, m, external);

    // 🎵 Descargar audio
    if (['play', 'playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`);
        const json = await res.json();

        if (!json.result?.download?.url) throw new Error('No se obtuvo un enlace válido.');

        await m.react('✅');
        await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url},
          mimetype: 'audio/mpeg',
          fileName: `${json.result.title}.mp3`,
          contextInfo: {
            externalAdReply: {
              title,
              body: 'sᴜᴋɪBot_MD 🌸',
              mediaType: 1,
              thumbnail: thumb,
              mediaUrl: url,
              sourceUrl: url,
              renderLargerThumbnail: true
}
}
}, { quoted: Shadow});
} catch (e) {
        return conn.reply(m.chat, '⚠︎ *No se pudo enviar el audio. El archivo podría ser muy pesado o hubo un error en el enlace.*', m);
}
}

    // 📹 Descargar video
    else if (['play2', 'playvideo'].includes(command)) {
      try {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${url}`);
        const json = await res.json();

        if (!json.download) throw new Error('No se obtuvo enlace de video.');

        await m.react('✅');
        await conn.sendFile(m.chat, json.download, `${json.title || 'video'}.mp4`,
          `📥 *Video descargado con éxito.*\n\n` +
                            `🎬 *Título:* ${json.title}\n` +
          `⏱️ *Duración:* ${timestamp}\n` +
          `📽️ *Calidad:* ${json.quality}\n` +
          `🔗 *Enlace:* ${url}`, Shadow);
} catch (e) {
        return conn.reply(m.chat, '⚠︎ _No se pudo enviar el video. El archivo podría ser muy pesado o hubo un error en el enlace._ ', m);
}
}

    // ❌ Comando no reconocido
    else {
      return conn.reply(m.chat, '✧︎ *Comando no reconocido.*', m);
}

} catch (err) {
    return m.reply(`⚠︎ *Ocurrió un error inesperado:*\n${err.message || err}`);
}
};

handler.command = handler.help = ['play', 'play2', 'playaudio', 'playvideo'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;

// 📈 Formatear vistas
function formatViews(views) {
  if (views === undefined) return "No disponible";
  if (views>= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`;
  return views.toString();
}
