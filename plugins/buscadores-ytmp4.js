// ✨ Código creado y mejorado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁
// no quites los créditos 🍂

import fetch from "node-fetch";
import yts from "yt-search";

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "🌷 𝖲𝗎𝗄𝗂_𝖡𝗈𝗍_𝖬𝖣 • 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌"
};

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

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
🌷 *Tu pedido está listo, cariño:*
📺 *Canal:* ${author.name || "Desconocido"}
👁️ *Vistas:* ${formatViews(views)}
⏳ *Duración:* ${timestamp || "?"}
📆 *Publicado:* ${ago || "?"}
🔗 *Enlace:* ${url}`.trim();

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
      { buttonId: `.ytmp4 ${url}`, buttonText: { displayText: "📹 Descargar Video"}, type: 1},
      { buttonId: `.ytmp3 ${url}`, buttonText: { displayText: "🎧 Descargar Audio"}, type: 1}
    ];

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage,
      footer: "ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • Descargas encantadas",
      buttons,
      headerType: 4,
...contextoBonito
}, { quoted: m});

    // 🎧 Audio
    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const audioUrl = api.result?.download?.url;
        if (!audioUrl) throw "⛔ Error generando el audio";
        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl},
          fileName: `${api.result.title || "descarga"}.mp3`,
          mimetype: "audio/mpeg"
}, { quoted: Shadow});
} catch {
        return conn.sendMessage(m.chat, {
          text: "💔 No se pudo enviar el audio. Intenta otro título o revisa el tamaño.",
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

handler.command = handler.help = ["play", "ytmp3", "playaudio"];
handler.tags = ["descargas"];
export default handler;

function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}
