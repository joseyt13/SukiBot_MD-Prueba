/*
• Créditos mágicos: @fedexyz13 
• Versión decorada por by Dev_fedexyz13
*/

import { googleImage} from '@bochilteam/scraper';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, { caption = '', delay = 500, quoted} = {}) {
  if (typeof jid!== 'string') throw new TypeError('🩷 El JID debe ser una cadena.');
  if (!Array.isArray(medias) || medias.length < 2) throw new Error('📸 Se necesitan al menos 2 imágenes para crear un álbum visual.');

  const albumMsg = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: { expectedImageCount: medias.length},
},
    {}
);

  await conn.relayMessage(jid, albumMsg.message, { messageId: albumMsg.key.id});

  for (let i = 0; i < medias.length; i++) {
    const { type, data} = medias[i];

    const imgMsg = await baileys.generateWAMessage(
      jid,
      { [type]: data,...(i === 0? { caption}: {})},
      { upload: conn.waUploadToServer}
);

    imgMsg.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: albumMsg.key},
};

    await conn.relayMessage(jid, imgMsg.message, { messageId: imgMsg.key.id});
    await baileys.delay(delay);
}

  return albumMsg;
}

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🩷 Usa el comando así:\n${usedPrefix}${command} <tema>\nEjemplo: ${usedPrefix}${command} gatitos kawaii 🐾`,
}, { quoted: m});
}

  await m.react('🔎');
  await conn.sendMessage(m.chat, {
    text: `✧ *Buscando imágenes encantadas para:* "${text}" ☁️`,
    contextInfo: {
      externalAdReply: {
        title: 'Suki_Bot_MD',
        body: 'Álbum visual automático',
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
});

  try {
    const res = await googleImage(text);
    const images = [];

    for (let i = 0; i < 10; i++) {
      const imgUrl = await res.getRandom();
      if (imgUrl) images.push({ type: 'image', data: { url: imgUrl}});
}

    if (images.length < 2) {
      return conn.sendMessage(m.chat, {
        text: `⚠︎ No encontré suficientes imágenes para crear tu álbum visual pastelcore 🫧`,
}, { quoted: m});
}

    const caption = `🖼️ *Resultados para:* "${text}"\n— Suki_Bot_MD powered by Dev_fedexyz13 💖`;
    await sendAlbumMessage(m.chat, images, { caption, quoted: m});
    await m.react('✅');
} catch (e) {
    console.error('[ERROR AL BUSCAR IMAGEN]', e);
    await m.react('❌');
    conn.sendMessage(m.chat, {
      text: `😿 Ups~ ocurrió un error al crear el álbum mágico.`,
}, { quoted: m});
}
};

handler.command = ['imagen', 'image', 'img'];
handler.help = ['imagen <tema>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.register = true;

export default handler;
