import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 Suki_Bot_MD Canal Oficial'
};

const handler = async (m, { conn}) => {
  await m.react('💫');

  const imagenURL = 'https://files.catbox.moe/rkvuzb.jpg'; // Imagen decorativa pastel
  const imgBuffer = await fetch(imagenURL).then(res => res.buffer());

  const textoCreador = `
🌸 *Panel del Creador — SukiBot_MD* 🧋

𖧷 ꒰ 𝗖𝗥𝗘𝗔𝗗𝗢𝗥𝗘𝗦 ꒱
• 💌 fedexyz → wa.me/5491156178758
• 🍁 DevBrayan → wa.me/573001533523

𖧷 ꒰ 𝗖𝗔𝗡𝗔𝗟 𝗢𝗙𝗜𝗖𝗜𝗔𝗟 ꒱
📡 https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N

𖧷 ꒰ 𝗚𝗥𝗨𝗣𝗢 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ꒱
👥 https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ

𖧷 ꒰ 𝗦𝗜𝗧𝗜𝗢𝗦 𝗠𝗔𝗚𝗜𝗖𝗢𝗦 ꒱
📚 https://sukibot-site.vercel.app/
📚 https://sukibot-md-sites.vercel.app/

🌺 Gracias por formar parte del universo pastelcore de *SukiBot_MD*
Tu compañer@ digital con ternura encantadora ✨
`.trim();

  await conn.sendMessage(m.chat, {
    image: imgBuffer,
    caption: textoCreador,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 888,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 123,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.command = ['creador', 'creator', 'owner'];
handler.help = ['creador'];
handler.tags = ['info', 'suki'];

export default handler;
