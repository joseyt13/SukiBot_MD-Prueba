// código creado por fedexyz 
// no quites creditos pajero xd

import acrcloud from 'acrcloud';
import fetch from 'node-fetch';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

let handler = async (m, { conn, usedPrefix, command}) => {
  const q = m.quoted? m.quoted: m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/video|audio/.test(mime)) {
    return conn.reply(
      m.chat,
      `🎧 *Responde a un audio o video corto con *${usedPrefix + command}* para descubrir qué canción es 🌸`,
      m
);
}

  try {
    const buffer = await q.download();
    const { status, metadata} = await acr.identify(buffer);

    if (status.code!== 0) throw new Error(status.msg);

    const { title, artists, album, genres, release_date} = metadata.music[0];

    let txt = `╭───❀「 *SukiBot_MD - WhatMusic* 」❀\n`;
    txt += `│ 🎶 *Título:* ${title}\n`;
    if (artists) txt += `│ 👤 *Artista:* ${artists.map(v => v.name).join(', ')}\n`;
    if (album) txt += `│ 📀 *Álbum:* ${album.name}\n`;
    if (genres) txt += `│ 🪷 *Género:* ${genres.map(v => v.name).join(', ')}\n`;
    txt += `│ 📅 *Lanzamiento:* ${release_date}\n`;
    txt += `╰─────────────❀`;

    const imgBuffer = await fetch('https://files.catbox.moe/rkvuzb.jpg').then(res => res.buffer());

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: txt,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 777
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error en whatmusic:', e);
    await conn.reply(
      m.chat,
      '❎ Suki no pudo reconocer la canción... ¿Seguro que es un audio o video corto? 🍃',
      m
);
}
};

handler.help = ['whatmusic <audio/video>'];
handler.tags = ['tools'];
handler.command = ['shazam', 'whatmusic'];

export default handler;
