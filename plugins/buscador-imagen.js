
import { googleImage} from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) throw `🌸 Uso correcto: *${usedPrefix + command} personaje anime, objeto, etc.*`;

  await m.react(rwait);

  // 💬 Mensaje inicial kawaii
  conn.reply(m.chat, '🫧 Buscando imágenes mágicas, espera un momento preciosura~', m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: 'Suki_Bot_MD • Imagen kawaii',
        body: '💖 Buscador encantado por Dev_fedexyz13',
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel
}
}
});

  // 🖼️ Resultado de búsqueda
  const res = await googleImage(text);

  const messages = [
    ['🌸 Imagen 1', 'SukiBot te muestra esta belleza~', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['🍡 Imagen 2', 'Aquí va otra ternura digital', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['🧋 Imagen 3', 'Pura estética pastelcore', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['🎀 Imagen 4', 'Elegancia visual activada~', await res.getRandom(), [[]], [[]], [[]], [[]]]
  ];

  await conn.sendCarousel(
    m.chat,
    `✨ Resultado encantado para: *${text}*`,
    '🔎 Imagen - Búsqueda mágica por Suki_Bot_MD',
    null,
    messages,
    m
);
};

handler.help = ['imagen <término>'];
handler.tags = ['buscador', 'descargas', 'suki'];
handler.command = ['imagen', 'image', 'img'];
handler.group = true;
handler.register = true;

export default handler;
