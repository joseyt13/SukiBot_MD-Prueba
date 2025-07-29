/*
* Código creado por fedexyz 🍁 
* no quites creditos 
*/

import { googleImage} from '@bochilteam/scraper';
import baileys from '@whiskeysockets/baileys';

// 🌷 Función para enviar álbum de imágenes
async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid!== 'string') throw new TypeError(`📛 jid debe ser string`);
  if (!Array.isArray(medias) || medias.length < 2) throw new Error(`📸 Se necesitan mínimo 2 imágenes para crear un álbum`);

  const caption = options.caption || '';
  const delay =!isNaN(options.delay)? options.delay: 500;
  const quoted = options.quoted;

  const album = baileys.generateWAMessageFromContent(
    jid,
    { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length}},
    {}
);

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id});

  for (let i = 0; i < medias.length; i++) {
    const { type, data} = medias[i];

    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data,...(i === 0? { caption}: {})},
      { upload: conn.waUploadToServer}
);

    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key},
};

    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id});
    await baileys.delay(delay);
}

  return album;
}

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🌸 Usa el comando así:\n${usedPrefix + command} <tema>\nEjemplo:.imagen gatitos kawaii 🐾`,
}, { quoted: m});
}

  await m.react('🔍');

  try {
    const res = await googleImage(text);
    const images = [];

    for (let i = 0; i < 10; i++) {
      const image = await res.getRandom();
      if (image) images.push({ type: 'image', data: { url: image}});
}

    if (images.length < 2) {
      return conn.sendMessage(m.chat, {
        text: `✧ No se encontraron suficientes imágenes para mostrar un álbum pastelcore 🫧`,
}, { quoted: m});
}

    const caption = `🌼 *Resultados para:* ${text}`;
    await sendAlbumMessage(m.chat, images, { caption, quoted: m});

    await m.react('✅');
} catch (error) {
    console.error(error);
    await m.react('❌');
    conn.sendMessage(m.chat, {
      text: `⚠︎ Ups~ ocurrió un error al buscar imágenes.`,
}, { quoted: m});
}
};

handler.help = ['imagen <tema>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['imagen', 'image', 'img'];
handler.register = true;

export default handler;
