import { googleImage} from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) return conn.reply(m.chat, '🍬 Por favor, dime qué quieres buscar~', m);

  await m.react(rwait);

  conn.reply(m.chat, '🍭 Buscando imágenes mágicas... espera un momento, preciosura ✨', m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: 'Suki_Bot_MD 📸',
        body: 'Imágenes kawaii encontradas~',
        previewType: 0,
        thumbnail: icons,  // asegúrate de tener una variable `icons` con imagen
        sourceUrl: channel // link de canal, por ejemplo 'https://whatsapp.com/channel/...'
}
}
});

  const res = await googleImage(text);

  const messages = [
    ['Imagen 1', 'Resultado encantado 1', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 2', 'Resultado encantado 2', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 3', 'Resultado encantado 3', await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 4', 'Resultado encantado 4', await res.getRandom(), [[]], [[]], [[]], [[]]]
  ];

  await conn.sendCarousel(m.chat, `🎀 Resultado para: *${text}*`, '⪛✰ Imágenes encontradas ✰⪜', null, messages, m);
};

handler.help = ['imagen <término>'];
handler.tags = ['buscador', 'herramientas', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true;

export default handler;
