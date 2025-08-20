import fetch from 'node-fetch';

const cacheSpotify = new Set(); // Cache temporal para evitar repeticiones

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text?.trim()) {
    return conn.sendMessage(m.chat, {
      text: `🚫 *Falta el nombre de la canción*\n\n📀 Usa:\n${usedPrefix + command} <nombre>\n🎧 Ejemplo:\n${usedPrefix + command} Enemy - Imagine Dragons`,
      footer: 'Spotify Downloader',
      buttons: [
        { buttonId: `${usedPrefix + command} Blinding Lights`, buttonText: { displayText: '🎵 Blinding Lights'}, type: 1},
        { buttonId: `${usedPrefix + command} Shape of You`, buttonText: { displayText: '🎵 Shape of You'}, type: 1}
      ],
      headerType: 1
}, { quoted: m});
}

  m.react('🔄');

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json?.result?.downloadUrl) {
      throw new Error('No se encontró la canción.');
}

    const { title, artist, duration, downloadUrl, thumbnail} = json.result;

    if (cacheSpotify.has(downloadUrl)) {
      return conn.sendMessage(m.chat, {
        text: `⚠️ *Canción repetida*\nYa fue enviada recientemente.\nEvita repetir la misma canción.`,
        footer: 'Spotify Downloader',
        buttons: [
          { buttonId: `${usedPrefix + command} random`, buttonText: { displayText: '🔀 Otra canción'}, type: 1}
        ],
        headerType: 1
}, { quoted: m});
}

    cacheSpotify.add(downloadUrl);
    setTimeout(() => cacheSpotify.delete(downloadUrl), 60 * 1000);

    // Enviar audio como documento para mayor compatibilidad
    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl},
      mimetype: 'audio/mpeg',
      fileName: `${title} - ${artist}.mp3`,
      caption: `🎵 *${title}* - ${artist}`
}, { quoted: m});

    // Enviar imagen con botones
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail || 'imagen.jpg'},
      caption: `🎶 *Spotify Descargado*\n\n🎵 *Título:* ${title}\n🎙️ *Artista:* ${artist}\n⏱️ *Duración:* ${duration}\n✅ ¡Descarga exitosa!`,
      footer: 'Spotify Downloader',
      buttons: [
        { buttonId: `${usedPrefix + command} ${artist}`, buttonText: { displayText: `🔍 Más de ${artist}`}, type: 1},
        { buttonId: `${usedPrefix + command} random`, buttonText: { displayText: '🎧 Otra canción'}, type: 1}
      ],
      headerType: 4
}, { quoted: m});

    m.react('🎶');

} catch (err) {
    console.error('[❌ ERROR SPOTIFY]', err);
    m.react('❌');
    conn.sendMessage(m.chat, {
      text: `😿 *No se pudo obtener la canción*\nRevisa el nombre o intenta más tarde.`,
      footer: 'Spotify Downloader',
      buttons: [
        { buttonId: `${usedPrefix + command} menu`, buttonText: { displayText: '📘 ayuda'}, type: 1}
      ],
      headerType: 1
}, { quoted: m});
}
};

handler.help = ['spotify *<nombre>*'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'spotifydl'];

export default handler;
