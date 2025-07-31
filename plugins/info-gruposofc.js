import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 Suki_Bot_MD Canal Oficial'
};

const handler = async (m, { conn}) => {
  await m.react('🌟');

  const imgURL = 'https://files.catbox.moe/rkvuzb.jpg';
  const imgBuffer = await fetch(imgURL).then(res => res.buffer());

  const texto = `
🌸︵︵︵︵︵︵︵︵︵︵︵︵︵︵
🎀 ˗ˏˋ *Panel Mágico — SukiBot_MD* ˎˊ˗ 🎀

🧁 Este es el rincón pastel de *fedexyz.13*
🩷 Donde los comandos se convierten en pétalos digitales 🌷

𖧷 ꒰ 𝙎𝙄𝙏𝙄𝙊𝙎 𝘾𝙊𝙍𝙊𝙉𝘼 ꒱
• 🌐 https://sukibot-site.vercel.app
• 🌐 https://sukibot-md-sites.vercel.app

𖧷 ꒰ 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙉𝙊𝙑𝙀𝘿𝘼𝘿𝙀𝙎 ꒱
• 📡 https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N

𖧷 ꒰ 𝙂𝙍𝙐𝙋𝙊 𝘿𝙀 𝘿𝙐𝙇𝘻𝙐𝙍𝘼 ꒱
• 👥 https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ

𖧷 ꒰ 𝘾𝙊𝙉𝙏𝘼𝘾𝙏𝙊𝙎 𝘿𝙄𝙂𝙄𝙏𝘼𝙇𝙀𝙎 ꒱
• 💌 fedexyz.13 → wa.me/5491156178758
• 🍁 DevBrayan → wa.me/573001533523

𖧷 ꒰ 𝙍𝙀𝘿𝙀𝙎 𝙆𝘼𝙒𝘼𝙄𝙄 ꒱
• 🎬 TikTok → https://www.tiktok.com/@fedexyz13
• 📷 Instagram → https://www.instagram.com/fedexyz.13/

𖧷 ꒰ 𝘼𝙍𝙏𝙀 𝙔 𝙄𝘿𝙀𝙉𝙏𝙄𝘿𝘼𝘿 ꒱
• 🌸 Imagen oficial → “imagen.jpg”
• 🧿 Canal vinculado: *${channelRD.name}*

🧋 Gracias por visitar el universo de *SukiBot_MD*
Que tus comandos florezcan con magia, luz y estilo pastel ✨
╰─𓆩♡𓆪─💫
`.trim();

  await conn.sendMessage(m.chat, {
    image: imgBuffer,
    caption: texto,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 888,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 124,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.command = ['menuSites', 'sitios', 'links', 'enlaces'];
handler.help = ['menuSites'];
handler.tags = ['info', 'suki'];
handler.register = true;

export default handler;
