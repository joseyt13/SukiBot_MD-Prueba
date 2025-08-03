import fetch from 'node-fetch';

let handler = async (m, { conn, args, text}) => {
  if (!text) return m.reply('🌸 Porfi, ingresa un link de YouTube para que SukiBot_MD te regale el video 🍡');

  m.react("⏳");

  let video, resolution = 'Desconocida';
  try {
    video = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${text}&type=video&quality=480p&apikey=GataDios`)).json();
    resolution = '480p';
} catch (error) {
    try {
      video = await (await fetch(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${text}&quality=480p&apikey=be9NqGwC`)).json();
      resolution = '480p';
} catch (error) {
      try {
        video = await (await fetch(`https://api.alyachan.dev/api/ytv?url=${text}&apikey=uXxd7d`)).json();
        resolution = video?.result?.quality || 'Desconocida';
} catch (error) {
        video = await (await fetch(`https://good-camel-seemingly.ngrok-free.app/download/mp4?url=${text}`)).json();
        resolution = video?.resolution || 'Desconocida';
}
}
}

  let link = video?.data?.url || video?.download_url || video?.result?.dl_url || video?.downloads?.link?.[0];
  if (!link) return m.reply('💔 Owww... No pude encontrar el video.\n✨ Si el problema persiste, avísalo al grupito de soporte mágico 🧚‍♀️');

  // Mensaje de espera con ternura
  await conn.sendMessage(m.chat, {
    text: `
╭🌸─── ⋆｡°✩ ───🌸╮
⌛ *SukiBot_MD está preparando tu regalito...*
📥 *Descargando desde el reino de YouTube...*
💖 *Espera un poquito, ya casi está~*
╰🌸───────────────🌸╯`,
}, { quoted: m});

  // Video enviado con decoración
  await conn.sendMessage(m.chat, {
    video: { url: link},
    mimetype: "video/mp4",
    caption: `
╭━〔 🎀 𝒱𝒾𝒹𝑒𝑜 𝐸𝓃𝒸𝒶𝓃𝓉𝒶𝒹𝑜 🍓 〕━⬣
┃ 🧚‍♀️ ¡Tu video está listito para brillar!
┃ 🎞 Resolución: *${resolution}*
┃ ✅ Descarga completada con magia kawaii 🌷
┃ 🌐 powered by: SukiBot_MD 🌟
╰━━━⊹⊱🌸⊰⊹━━━╯`,
}, { quoted: m});

  m.react("🌟");
};

handler.command = ['ytv', 'ytmp4', 'yt'];
handler.register = true;
handler.estrellas = 0;

export default handler;
