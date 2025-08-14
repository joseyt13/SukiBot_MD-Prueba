import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text}) => {
  if (!text) {
    return conn.reply(message.chat, '🌸 𝖲𝗎𝗄𝗂 necesita que escribas algo para buscar en TikTok.\nEjemplo: *.tiktoksearch gatos bailando*', message);
}

  await conn.reply(message.chat, '🔍 𓆩 ꒰ 𝖲𝗎𝗄𝗂 está buscando magia en TikTok ꒱ 𓆪', message, {
    contextInfo: {
      externalAdReply: {
        title: '𝖲𝗎𝗄𝗂Bot_MD • TikTok Search',
        body: '✨ Resultados encantados en camino...',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
}
}
});

  try {
    const { data} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);
    const searchResults = data?.data || [];

    if (!searchResults.length) {
      return conn.reply(message.chat, '🔍 𝖲𝗎𝗄𝗂 no encontró nada con ese hechizo. Intenta otro término.', message);
}

    shuffle(searchResults);
    const topResults = searchResults.slice(0, 7);

    const cards = await Promise.all(topResults.map(async (result) => {
      const { videoMessage} = await generateWAMessageContent({
        video: { url: result.nowm}
}, { upload: conn.waUploadToServer});

      return {
        body: proto.Message.InteractiveMessage.Body.create({ text: ''}),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: '🌷 𝖲𝗎𝗄𝗂Bot_MD'}),
        header: proto.Message.InteractiveMessage.Header.create({
          title: result.title || '🎬 𝖵𝗂𝖽𝖾𝗈 𝖳𝗂𝗄𝖳𝗈𝗄',
          hasMediaAttachment: true,
          videoMessage
}),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: []})
};
}));

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🎀 𝖱𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌 𝗉𝖺𝗋𝖺: *${text}*`
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '𝖲𝗎𝗄𝗂Bot_MD • powered by ꜰᴇᴅᴇxʏᴢ'
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
}, { quoted: message});

    await conn.relayMessage(message.chat, messageContent.message, {
      messageId: messageContent.key.id
});

} catch (error) {
    conn.reply(message.chat, `⚠️ 𝖤𝗋𝗋𝗈𝗋 𝗆á𝗀𝗂𝖼𝗈: ${error.message}`, message);
}
};

handler.help = ['tiktoksearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
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
