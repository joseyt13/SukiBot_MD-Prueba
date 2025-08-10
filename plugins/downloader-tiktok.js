// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂

import axios from 'axios';
import { exec} from 'child_process';
import { writeFile, unlink, readFile} from 'fs/promises';
import { tmpdir} from 'os';
import { join} from 'path';

// 🍥 Obtiene token y cookie mágica desde tmate.cc
async function obtenerTokenYCookie() {
  const res = await axios.get('https://tmate.cc/id', {
    headers: { 'User-Agent': 'Mozilla/5.0'}
});
  const cookie = res.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '';
  const tokenMatch = res.data.match(/<input[^>]+name="token"[^>]+value="([^"]+)"/i);
  const token = tokenMatch?.[1];
  if (!token) throw new Error('𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋ó 𝖾𝗅 𝗍𝗈𝗄𝖾𝗇 𝗆𝖺𝗀𝗂𝖼𝗈 💔');
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
  if (!html) throw new Error('𝖭𝗈 𝗌𝖾 𝗋𝖾𝖼𝗂𝖻𝗂ó 𝗇𝗂𝗇𝗀𝗎𝗇𝖺 𝗋𝖾𝗌𝗉𝗎𝖾𝗌𝗍𝖺 🌧️');

  const tituloMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const titulo = tituloMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || '𝖲𝗂𝗇 𝗍𝗂́𝗍𝗎𝗅𝗈';

  const coincidencias = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"]+)"[^>]*>\s*<span>\s*<span>([^<]*)<\/span><\/span><\/a>/gi)];
  const vistos = new Set();
  const enlaces = coincidencias.map(([_, href, etiqueta]) => ({ href, label: etiqueta.trim()}))
.filter(({ href}) =>!href.includes('play.google.com') &&!vistos.has(href) && vistos.add(href));

  const enlacesMp4 = enlaces.filter(v => /download without watermark/i.test(v.label));
  const coincidenciasImg = [...html.matchAll(/<img[^>]+src="(https:\/\/tikcdn\.app\/a\/images\/[^"]+)"/gi)];
  const imagenes = [...new Set(coincidenciasImg.map(m => m[1]))];

  if (enlacesMp4.length> 0) return { type: 'video', title: titulo, mp4Links: enlacesMp4};
  if (imagenes.length> 0) return { type: 'image', title: titulo, images: imagenes};

  throw new Error('𝖭𝖺𝖽𝖺 𝖿𝗎𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝖽𝗈, 𝗍𝖺𝗅 𝗏𝖾𝗓 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾 𝖾𝗌𝗍𝖺́ 𝗍𝗋𝗂𝗌𝗍𝖾 😢');
}

// 🎀 Comando principal de SukiBot_MD-V2
let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key}});
    return conn.sendMessage(m.chat, {
      text: `🍡 *𝖮𝗁 𝗇𝗈, 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺~* Falta el enlace de TikTok\n✨ Ejemplo:\n${usedPrefix + command} https://vt.tiktok.com/xxxx/`
});
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '🔮', key: m.key}});

    const resultado = await descargarDeTikTok(text);

    const contextInfo = {
      externalAdReply: {
        title: '🎬 𝖵𝗂𝖽𝖾𝗈 𝗅𝗂𝗌𝗍𝗈 𝖾𝗇 SukiBot_MD-V2',
        body: '𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝖽𝖺 𝖼𝗈𝗇 𝗍𝖾𝗋𝗇𝗎𝗋𝖺',
        mediaType: 1,
        renderLargerThumbnail: true
}
};

    if (resultado.type === 'video') {
      await conn.sendMessage(m.chat, {
        video: { url: resultado.mp4Links[0].href},
        caption: `🎥 *𝖳𝗎 𝗏𝗂𝖽𝖾𝗈 𝗆𝖺́𝗀𝗂𝖼𝗈 𝖾𝗌𝗍𝖺́ 𝗅𝗂𝗌𝗍𝗈~*\n✨ *𝖳𝗂́𝗍𝗎𝗅𝗈:* ${resultado.title}`,
        contextInfo
}, { quoted: m});
} else if (resultado.type === 'image') {
      for (let i = 0; i < resultado.images.length; i++) {
        await conn.sendMessage(m.chat, {
          image: { url: resultado.images[i]},
          caption: `🖼️ *𝖨𝗆𝖺𝗀𝖾𝗇 ${i + 1}*\n✨ *𝖳𝗂́𝗍𝗎𝗅𝗈:* ${resultado.title}`,
          contextInfo
}, { quoted: m});
}
}

    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}});

} catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '💥', key: m.key}});
    await conn.sendMessage(m.chat, {
      text: `😿 *𝖴𝗉𝗌𝗌, Suki 𝗇𝗈 𝗉𝗎𝖽𝗈 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝗋 𝗅𝖺 𝗆𝖺𝗀𝗂𝖺...*\n💬 \`${e.message}\`\n¿𝖯𝗈𝖽𝗋𝗂́𝖺𝗌 𝗂𝗇𝗍𝖾𝗇𝗍𝖺𝗋 𝖼𝗈𝗇 𝗈𝗍𝗋𝗈 𝖾𝗇𝗅𝖺𝖼𝖾, 𝗉𝗈𝗋𝖿𝗂~?`
});
}
};

handler.help = ['tiktokdl <url>'];
handler.tags = ['downloader'];
handler.command = ['tiktok', 'ttdl', 'tt'];
handler.register = true;
handler.limit = true;

export default handler;

// 🎶 Extrae audio desde un video TikTok
async function extractAudio(videoUrl) {
  const tempVideo = join(tmpdir(), `tiktok_video_${Date.now()}.mp4`);
  const tempAudio = join(tmpdir(), `tiktok_audio_${Date.now()}.mp3`);

  const res = await axios.get(videoUrl, { responseType: 'arraybuffer'});
  await writeFile(tempVideo, res.data);

  return new Promise((resolve, reject) => {
    exec(`ffmpeg -i "${tempVideo}" -vn -acodec libmp3lame
