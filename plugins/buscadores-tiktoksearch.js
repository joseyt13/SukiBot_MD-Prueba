import axios from 'axios';
const {
  proto,
  generateWAMessageContent,
  generateWAMessageFromContent
} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text}) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa un texto para realizar la búsqueda en TikTok.', m);
}

  const fuente = 'https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + encodeURIComponent(text);
  let res, videos;

  try {
    res = await axios.get(fuente);
    videos = res?.data?.data || [];
} catch (e) {
    return conn.reply(m.chat, `❌ Error al obtener datos: ${e.message}`, m);
}

  if (!videos.length) {
    return conn.reply(m.chat, '🔍 No se encontraron resultados para tu búsqueda.', m);
}

  // Aleatoriza resultados
  shuffle(videos);
  const topVideos = videos.slice(0, 5);

  // Construye los elementos del carrusel
  const cards = await Promise.all(topVideos.map(async (video) => {
    const videoMessage = (await generateWAMessageContent({
      video: { url: video.nowm}
}, { upload: conn.waUploadToServer})).videoMessage;

    return {
      body: proto.Message.InteractiveMessage.Body.create({ text: ''}),
      footer: proto.Message.InteractiveMessage.Footer.create({ text: 'SukiBot_MD'}),
      header: proto.Message.InteractiveMessage.Header.create({
        title: video.title || 'Video TikTok',
        hasMediaAttachment: true,
        videoMessage
}),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: []})
};
}));

  const content = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `🎬 Resultados de búsqueda para: ${text}`
}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'SukiBot_MD'
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
}),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
            cards
})
})
}
}
}, { quoted: m});

  await conn.relayMessage(m.chat, content.message, { messageId: content.key.id});
};

handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.tags = ['buscador'];
handler.help = ['tiktoksearch <texto>'];
handler.group = true;
handler.register = true;

export default handler;

// Auxiliares
function shuffle(arr) {
  for (let i = arr.length - 1; i> 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
}
