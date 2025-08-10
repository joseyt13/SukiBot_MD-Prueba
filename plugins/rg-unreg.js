// Código refinado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

let handler = async (m, { conn}) => {
  const user = global.db.data.users[m.sender];

  if (!user.registered) {
    return m.reply(`🛑 *𝖠𝗎́𝗇 𝗇𝗈 𝖾𝗌𝗍𝖺́𝗌 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈 𝖾𝗇 𝖾𝗅 𝗆𝗎𝗇𝖽𝗈 𝗆𝖺́𝗀𝗂𝖼𝗈 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣*~\n\n✨ 𝖯𝖺𝗋𝖺 𝖼𝗈𝗆𝖾𝗇𝗓𝖺𝗋 𝗍𝗎 𝖺𝗏𝖾𝗇𝗍𝗎𝗋𝖺 𝖾𝗌𝖼𝗋𝗂𝖻𝖾:\n*.reg TuNombre Edad*\n🍓 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *.reg Suki 18*`);
}

  const nombre = user.name || '𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈';
  const edad = user.age || '???';

  // 💨 Resetear datos mágicos
  user.registered = false;
  user.name = '';
  user.age = 0;
  user.regTime = -1;
  user.exp = 0;
  user.money = 0;

  let pp = 'https://files.catbox.moe/07fyj3.jpg';
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
} catch (e) {}

  await conn.sendMessage(m.chat, {
    text: `
🍂 *𝖳𝗎 𝖺𝗎𝗋𝖺 𝗁𝖺 𝗌𝗂𝖽𝗈 𝗅𝗂𝖻𝖾𝗋𝖺𝖽𝖺 𝖾𝖷𝗂𝗍𝗈𝗌𝖺𝗆𝖾𝗇𝗍𝖾* 🍃

👩‍💻 𝖭𝗈𝗆𝖻𝗋𝖾 𝖺𝗇𝗍𝖾𝗋𝗂𝗈𝗋: *${nombre}*
🎂 𝖤𝖽𝖺𝖽: *${edad} 𝖺𝗇̃𝗈𝗌*

🌷 𝖤𝗌𝗉𝖾𝗋𝖺𝗆𝗈𝗌 𝗏𝖾𝗋𝗍𝖾 𝖽𝖾 𝗇𝗎𝖾𝗏𝗈, 𝖾𝗌𝗍𝗋𝖾𝗅𝗅𝗂𝗍𝖺~

✨ 𝖯𝗎𝖾𝖽𝖾𝗌 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗋𝗍𝖾 𝗇𝗎𝖾𝗏𝖺𝗆𝖾𝗇𝗍𝖾 𝖾𝗌𝖼𝗋𝗂𝖻𝗂𝖾𝗇𝖽𝗈:
*.reg TuNombre Edad*
`.trim(),
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '🩵 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈 𝖾𝗇 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣',
        body: `𝖭𝗈𝗆𝖻𝗋𝖾: ${nombre} • 𝖤𝖽𝖺𝖽: ${edad} 𝖺𝗇̃𝗈𝗌`,
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: pp
}
}
}, { quoted: m});
};

handler.command = ['unreg', 'únreg', 'delperfil'];
handler.register = true;

export default handler;
