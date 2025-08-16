// Código creado  por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

import { sticker} from '../lib/sticker.js';
import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  try {
    await m.react('🛸');
    await conn.reply(m.chat, '🌸 𝖲𝗎𝗄𝗂 está invocando un sticker de Among Us... espere un momento ✨', m);

    const res = await fetch('https://api.lolhuman.xyz/api/sticker/amongus?apikey=85faf717d0545d14074659ad');
    const { url} = await res.json();

    if (!url) throw 'No se pudo obtener el sticker.';

    await conn.sendFile(
      m.chat,
      url,
      'amongus.webp',
      '',
      m,
      true,
      {
        asSticker: true,
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: false,
            title: '🌌 Sticker Among Us',
            body: '𝖲𝗎𝗄𝗂Bot_MD te acompaña en cada misión 🛸',
            mediaType: 2,
            sourceUrl: global.linkgc || 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
            thumbnail: global.miniurl || 'https://files.catbox.moe/rkvuzb.jpg'
}
}
}
);
} catch (e) {
    console.error('[❌] Error en sticker-amongus:', e);
    conn.reply(m.chat, '❎ No se pudo generar el sticker. Intenta de nuevo más tarde.', m);
}
};

handler.help = ['smongus', 'stickersus'];
handler.tags = ['sticker'];
handler.command = ['smongus', 'stickersus'];

export default handler;
