import axios from 'axios';
const {
  proto,
  generateWAMessageContent,
  generateWAMessageFromContent
} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text}) => {
  if (!text) {
    return conn.reply(m.chat, '🌸 Por favor, escribe algo para buscar en TikTok.', m);
}

  await conn.reply(m.chat, '🔍 𓆩 ꒰ Iniciando búsqueda en TikTok ꒱ 𓆪', m);

  const fuente = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`;
  let res, videos;

  try {
    res = await axios.get(fuente);
    videos = res?.data?.data || [];
} catch (e) {
    return conn.reply(m.chat, `❌ Error al obtener resultados: ${e.message}`, m);
}

  if (!videos.length) {
    return conn.reply(m.chat, '🔍 No se encontraron videos relacionados con tu búsqueda.', m);
}

  // Mezcla aleatoria de resultados
  shuffle(videos);
  const topVideos = videos.slice(0, 5);

  // Construcción del carrusel
  const cards = await Promise.all(topVideos.map(async (video) => {
    const videoMessage = (await generateWAMessageContent({
      video: { url: video.nowm}
}, { upload: conn.waUploadToServer})).videoMessage;

    return {
      body: proto.Message.InteractiveMessage.Body.create({ text: ''}),
      footer: proto.Message.InteractiveMessage.Footer.create({ text: '🌷 SukiBot_MD'}),
      header: proto.Message.InteractiveMessage.Header.create({
        title: video.title || '🎬 Video TikTok',
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
            text: `🎀 Resultados para: *${text}*`
}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'SukiBot_MD • powered by ꜰᴇᴅᴇxʏᴢ'
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

// 🎀 Función auxiliar para mezclar resultados
function shuffle(arr) {
  for (let i = arr.length - 1; i> 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
}
