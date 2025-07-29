import { sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png} from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command}) => {
  let stik = null;
  const q = m.quoted? m.quoted: m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';
  const isMedia = /webp|image|video/.test(mime);

  try {
    if (isMedia) {
      if (/video/.test(mime) && (q.msg || q).seconds> 15)
        return m.reply('❌ El video es muy largo~ solo acepto hasta 15 segunditos mágicos ✨');

      const media = await q.download?.();
      if (!media) return conn.reply(m.chat, '🩷 Envíame una imagen o video cortito para crear tu sticker encantado~', m);

      let url;
      try {
        if (/webp/.test(mime)) url = await webp2png(media);
        else if (/image/.test(mime)) url = await uploadImage(media);
        else if (/video/.test(mime)) url = await uploadFile(media);
        if (!url || typeof url!== 'string') url = await uploadImage(media);

        const user = global.db.data.users[m.sender] || {};
        const txt1 = user.text1 || global.packsticker;
        const txt2 = user.text2 || global.packsticker2;

        stik = await sticker(false, url, txt1, txt2);
} catch (err) {
        console.error(err);
}
} else if (args[0]) {
      if (isUrl(args[0])) {
        stik = await sticker(false, args[0], global.packsticker, global.packsticker2);
} else {
        return m.reply('🚫 La URL parece no ser válida~ Asegúrate que sea directa y tenga formato.png/.jpg 🌐');
}
}
} catch (e) {
    console.error(e);
}

  if (stik) {
    await conn.sendFile(m.chat, stik, 'suki_sticker.webp', '', m);
} else {
    conn.reply(
      m.chat,
      `✨ No se pudo generar el sticker kawaii...

🧁 Puedes enviarme:
• Una imagen (.jpg,.png,.webp)
• Un video corto (máximo 15 segundos)
• O una URL directa de imagen

📌 Ejemplo:
${usedPrefix}${command} https://i.imgur.com/cute-anime.png

🍓 Consejo: usa imágenes claras, adorables y de buena calidad 💖`,
      m
);
}
};

handler.help = ['sticker2 <imagen|video|url>'];
handler.tags = ['sticker'];
handler.command = ['sticker2', 'stiker2'];

export default handler;

const isUrl = (text) =>
  /^https?:\/\/.*\.(jpe?g|gif|png|webp)$/i.test(text);
