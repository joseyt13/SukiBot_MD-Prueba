// creado por fedexyz 🍁
// no quites los créditos ⚔️

import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Suki_Bot_MD Canal Oficial'
};

const handler = async (m, { conn, usedPrefix}) => {
  const texto = `
╭━─━──────━─━╮
╰╮» 🧁 ᴄᴏɴꜰɪɢᴜʀᴀᴄɪóɴ ᴘᴀꜱᴛᴇʟᴄᴏʀᴇ
╭━─━──────━─━╯

📥 Bienvenida dulce:
⊹ ${usedPrefix}welcome
⊹ ${usedPrefix}bv
⊹ ${usedPrefix}bienvenida

🎭 Reacciones mágicas:
⊹ ${usedPrefix}reaction
⊹ ${usedPrefix}reaccion

🔍 Detectores encantados:
⊹ ${usedPrefix}detect
⊹ ${usedPrefix}detect2
⊹ ${usedPrefix}nsfw

🛡️ Protección estelar:
⊹ ${usedPrefix}modoadmin
⊹ ${usedPrefix}soloadmin
⊹ ${usedPrefix}antisubbots
⊹ ${usedPrefix}antisub
⊹ ${usedPrefix}antilink
⊹ ${usedPrefix}antilink2

🤖 Subsistema kawaii:
⊹ ${usedPrefix}jadibotmd
⊹ ${usedPrefix}modejadibot
⊹ ${usedPrefix}antiprivado

👑 Autoridad brillante:
⊹ ${usedPrefix}daradmin @usuario
⊹ ${usedPrefix}kick2 @usuario
⊹ ${usedPrefix}kick2 <número>

🖼️ Imagen grupal:
⊹ ${usedPrefix}setppgrupo (responde a imagen)

╰─𓆩♡𓆪─💫─𓆩♡𓆪─╯

📡 Canal oficial de magia:
${channelRD.name}
🔗 https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
`.trim();

  const imageURL = 'https://files.catbox.moe/cvpwkk.jpg';
  const img = await fetch(imageURL).then(res => res.buffer());

  await conn.sendMessage(m.chat, {
    image: img,
    caption: texto,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 777,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 120,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.help = ['menu3', 'menuconfig'];
handler.tags = ['main'];
handler.command = ['menuconfig', 'menu3'];
handler.register = false;

export default handler;
