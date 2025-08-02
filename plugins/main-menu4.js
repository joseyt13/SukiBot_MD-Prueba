// creado por fedexyz 🍁
// no quites los créditos ⚔️

import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Suki_Bot_MD Canal Oficial'
};

const handler = async (m, { conn, usedPrefix}) => {
  const texto = `
╭── 🎀 ꜱᴜᴋɪᴘᴀꜱᴛᴇʟ — ʜᴇʀʀᴀᴍɪᴇɴᴛᴀꜱ ᴇɴᴄᴀɴᴛᴀᴅᴀꜱ 🎀 ──╮

📸 Imagen y Web:
⊹ ${usedPrefix}imagen <tema>
⊹ ${usedPrefix}ssweb <url>
⊹ ${usedPrefix}ss <url>
⊹ ${usedPrefix}tourl
⊹ ${usedPrefix}tourl2
⊹ ${usedPrefix}hd

🖼️ Canal mágico:
⊹ ${usedPrefix}nuevafotochannel
⊹ ${usedPrefix}eliminarfotochannel
⊹ ${usedPrefix}nuevonombrecanal
⊹ ${usedPrefix}nuevadescchannel

🔕 Silencio & Avisos:
⊹ ${usedPrefix}nosilenciarcanal
⊹ ${usedPrefix}silenciarcanal
⊹ ${usedPrefix}avisoschannel
⊹ ${usedPrefix}resiviravisos

🔗 Sincronización:
⊹ ${usedPrefix}noseguircanal
⊹ ${usedPrefix}seguircanal

🔍 Exploración mágica:
⊹ ${usedPrefix}inspect
⊹ ${usedPrefix}inspeccionar

💬 Reacciones pastel:
⊹ ${usedPrefix}reactioneschannel
⊹ ${usedPrefix}reaccioneschannel

🎶 Audio encantado:
⊹ ${usedPrefix}quemusica (responde audio)
⊹ ${usedPrefix}rvocal
⊹ ${usedPrefix}iqc <texto>

🧁 Sticker mágico:
⊹ ${usedPrefix}fstik

╰─𓆩♡𓆪─ Canal oficial: ${channelRD.name} ─𓆩♡𓆪─╯
🔗 https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
`.trim();

  const imageURL = 'https://files.catbox.moe/cvpwkk.jpg';
  const img = await fetch(imageURL).then(res => res.buffer());

  await conn.sendMessage(m.chat, {
    image: img,
    caption: texto,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 888,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 120,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.help = ['menu4'];
handler.tags = ['tools', 'magic'];
handler.command = ['menu4', 'menuherramientas'];
handler.register = false;

export default handler;
