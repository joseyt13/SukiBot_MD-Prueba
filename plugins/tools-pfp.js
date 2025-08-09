// código creado por fedexyz
// no quites creditos 

let handler = async (m, { conn, args, text}) => {
  let who;

  if (m.quoted) {
    who = m.quoted.sender;
} else if (m.mentionedJid && m.mentionedJid[0]) {
    who = m.mentionedJid[0];
} else if (text && text.replace(/\D/g, '').length> 4) {
    who = text.replace(/\D/g, '') + '@s.whatsapp.net';
} else {
    who = m.fromMe? conn.user.jid: m.sender;
}

  try {
    let name = await conn.getName(who);
    let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/9y329o.jpg');

    await conn.sendFile(
      m.chat,
      pp,
      'pfp.jpg',
      `╭───❀\n│ 🧋 𝖲𝗎𝗄𝗂𝗕𝗈𝖳_𝖬𝖣\n│ 📸 𝖥𝗈𝗍𝗈 𝖽𝖾 𝗉𝗋𝗈𝗋𝗂𝗅:\n│ 🎀 *${name}*\n╰─────────────❀`,
      m
);
} catch (e) {
    await m.reply('❎ Suki no pudo encontrar la foto entre los pétalos 🌸.');
}
};

handler.help = ['pfp @usuario', 'pfp +numero'];
handler.tags = ['tools'];
handler.command = ['pfp', 'getpic'];

export default handler;
