// Código creado por fedexyz 
// no quites créditos ⚔

import { sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png} from '../lib/webp2mp4.js';
import moment from 'moment-timezone';
import Jimp from 'jimp';

// Verifica si el texto es una URL válida de imagen
const isValidImageUrl = (text) => {
  const regex = /https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-zA-Z]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/gi;
  return regex.test(text);
};

// Superpone el logo sobre la imagen base
const overlayLogo = async (baseBuffer) => {
  const base = await Jimp.read(baseBuffer);
  const logo = await Jimp.read('./media/logo.jpg');

  logo.resize(100, 100); // Tamaño del logo
  logo.opacity(0.6);     // Transparencia

  const x = base.getWidth() - logo.getWidth() - 10;
  const y = base.getHeight() - logo.getHeight() - 10;

  base.composite(logo, x, y);
  return await base.getBufferAsync(Jimp.MIME_PNG);
};

let handler = async (m, { conn, args}) => {
  let stickerResult = null;

  try {
    const quoted = m.quoted || m;
    const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || '';
    const senderName = conn.getName(m.sender);
    const timestamp = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY - HH:mm');

    const watermark1 = '𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁';
    const watermark2 = `${senderName} • ${timestamp}`;

    if (/webp|image|video/.test(mime)) {
      if (/video/.test(mime) && (quoted.msg || quoted).seconds> 15) {
        return m.reply('⚠️ El video no puede durar más de 15 segundos.');
}

      const media = await quoted.download?.();
      if (!media) {
        return conn.reply(m.chat, '🍁 Por favor, envía una imagen o video para hacer un sticker.', m);
}

      try {
        const withLogo = await overlayLogo(media);
        stickerResult = await sticker(withLogo, false, watermark1, watermark2);
} finally {
        if (!stickerResult) {
          let uploaded;
          if (/webp/.test(mime)) uploaded = await webp2png(media);
          else if (/image/.test(mime)) uploaded = await uploadImage(media);
          else if (/video/.test(mime)) uploaded = await uploadFile(media);

          if (typeof uploaded!== 'string') uploaded = await uploadImage(media);

          stickerResult = await sticker(false, uploaded, watermark1, watermark2);
}
}

} else if (args[0]) {
      if (isValidImageUrl(args[0])) {
        stickerResult = await sticker(false, args[0], watermark1, watermark2);
} else {
        return m.reply('⚠️ El URL no es válido...');
}
}

} finally {
    if (stickerResult) {
      conn.sendFile(m.chat, stickerResult, 'sticker.webp', '', m);
} else {
      conn.reply(m.chat, '🍁 Por favor, envía una imagen o video para hacer un sticker.', m);
}
}
};

handler.help = ['stiker <imagen>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;
