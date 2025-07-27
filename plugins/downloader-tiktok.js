import axios from 'axios';

const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';
const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

// 🍥 Obtiene token y cookie mágica desde tmate.cc
async function obtenerTokenYCookie() {
  const res = await axios.get('https://tmate.cc/id', {
    headers: { 'User-Agent': 'Mozilla/5.0'}
});
  const cookie = res.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '';
  const tokenMatch = res.data.match(/<input[^>]+name="token"[^>]+value="([^"]+)"/i);
  const token = tokenMatch?.[1];
  if (!token) throw new Error('No se encontró el token mágico 💔');
  return { token, cookie};
}

// 🌸 Descarga desde TikTok (video o imágenes)
async function descargarDeTikTok(urlTikTok) {
  const { token, cookie} = await obtenerTokenYCookie();
  const params = new URLSearchParams();
  params.append('url', urlTikTok);
  params.append('token', token);

  const res = await axios.post('https://tmate.cc/action', params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://tmate.cc/id',
      'Origin': 'https://tmate.cc',
      'Cookie': cookie
}
});

  const html = res.data?.data;
  if (!html) throw new Error('No se recibió ninguna respuesta 🌧️');

  const tituloMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const titulo = tituloMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || 'Sin título';

  const coincidencias = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"]+)"[^>]*>\s*<span>\s*<span>([^<]*)<\/span><\/span><\/a>/gi)];
  const vistos = new Set();
  const enlaces = coincidencias.map(([_, href, etiqueta]) => ({ href, label: etiqueta.trim()}))
.filter(({ href}) =>!href.includes('play.google.com') &&!vistos.has(href) && vistos.add(href));

  const enlacesMp4 = enlaces.filter(v => /download without watermark/i.test(v.label));

  const coincidenciasImg = [...html.matchAll(/<img[^>]+src="(https:\/\/tikcdn\.app\/a\/images\/[^"]+)"/gi)];
  const imagenes = [...new Set(coincidenciasImg.map(m => m[1]))];

  if (enlacesMp4.length> 0) return { type: 'video', title: titulo, mp4Links: enlacesMp4};
  if (imagenes.length> 0) return { type: 'image', title: titulo, images: imagenes};

  throw new Error('Nada fue encontrado, tal vez el enlace está triste 😢');
}

// 🎀 Comando principal de Suki nako ga
let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key}});
    return conn.sendMessage(m.chat, {
      text: `🍡 *Oh no, preciosura~* Falta el enlace de TikTok\n✨ Ejemplo:\n${usedPrefix + command} https://vt.tiktok.com/xxxx/`
});
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key}});

    const resultado = await descargarDeTikTok(text);

    const contextInfo = {
      externalAdReply: {
        title: '🎬 Video listo en Suki_Bot_MD',
        body: '¡Descarga completada con ternura!',
        thumbnailUrl: sukiIcon,
        sourceUrl: channelRD,
        mediaType: 1,
        renderLargerThumbnail: true
}
};

    if (resultado.type === 'video') {
      await conn.sendMessage(m.chat, {
        video: { url: resultado.mp4Links[0].href},
        caption: `🎥 *Tu video mágico está listo~*\n✨ *Título:* ${resultado.title}`,
        contextInfo
}, { quoted: m});
} else if (resultado.type === 'image') {
      for (let i = 0; i < resultado.images.length; i++) {
        await conn.sendMessage(m.chat, {
          image: { url: resultado.images[i]},
          caption: `🖼️ *Imagen ${i + 1}*\n✨ *Título:* ${resultado.title}`,
          contextInfo
}, { quoted: m});
}
}

    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}});

} catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '💥', key: m.key}});
    await conn.sendMessage(m.chat, {
      text: `😿 *Upss, Suki no pudo completar la magia...*\n💬 \`${e.message}\`\n¿Podrías intentar con otro enlace, porfi~?`
});
}
};

handler.help = ['tiktokdl <url>'];
handler.tags = ['downloader'];
handler.command = ['tiktok', 'ttdl', 'tt'];
handler.register = true;
handler.limit = true;

export default handler;
