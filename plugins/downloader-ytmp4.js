// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

import fetch from 'node-fetch';

const channelRD = "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N"; // Canal oficial de Suki_Bot_MD

let HS = async (m, { conn, text}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      image: { url: 'imagen.jpg'},
      caption: `❌ *Suki_Bot_MD dice:* Por favor, proporciona un enlace válido de YouTube para descargar el video.\n\n🌸 Recuerda que también puedes usar el nombre del video.`,
}, { quoted: m});
}

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!youtubeRegex.test(text)) {
    return conn.sendMessage(m.chat, {
      image: { url: 'imagen.jpg'},
      caption: `🚫 *Enlace inválido.*\nAsegúrate de que sea un link correcto de YouTube.\n🧠 Ejemplo válido: https://youtu.be/abc123`,
}, { quoted: m});
}

  try {
    await conn.reply(m.chat, '⏳ *Suki_Bot_MD está preparando tu video...*', m);

    const api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}&quality=360`);
    if (!api.ok) throw new Error('La API falló en responder correctamente.');

    const json = await api.json();
    if (!json.data ||!json.data.download) {
      throw new Error('No se pudo obtener los datos del video. Verifica el enlace.');
}

    const { title} = json.data.metadata;
    const dl_url = json.data.download.url;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: 'imagen.jpg'},
        caption:
          `🎥 *Suki_Bot_MD ha invocado tu video*\n\n` +
          `📌 *Título:* ${title}\n` +
          `📤 *Video listo para descargar.*\n\n` +
          `🌐 *Canal oficial:* ${channelRD}\n🔮 *Gracias por confiar en Suki na Ko 💕*`,
},
      { quoted: m}
);

    await conn.sendMessage(
      m.chat,
      {
        document: { url: dl_url},
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
},
      { quoted: m}
);

    await conn.reply(
      m.chat,
      `✅ *Tu video fue enviado con éxito.*\n🎉 *Gracias por usar Suki_Bot_MD* 🌸`,
      m
);

} catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, {
      image: { url: 'imagen.jpg'},
      caption:
        `❌ *Error al procesar tu solicitud:*\n${error.message}\n\n🔁 Intenta nuevamente más tarde o revisa el enlace.`,
}, { quoted: m});
}
};

HS.command = ['ytmp4'];
export default HS;
