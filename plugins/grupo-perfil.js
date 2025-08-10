// Código creado y mejorado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

import fs from 'fs';

const sukiBanner = 'https://files.catbox.moe/07fyj3.jpg'; // imagen de perfil predeterminada

const loadMarriages = () => {
  const path = './media/database/marry.json';
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    global.db.data.marriages = data;
} else {
    global.db.data.marriages = {};
}
};

let handler = async (m, { conn}) => {
  loadMarriages();

  const who = m.quoted?.sender || m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
  const user = global.db.data.users[who] || {};

  const {
    registered = false,
    level = 0,
    exp = 0,
    age = '🌙 𝖭𝗈 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝖺',
    genre = '💫 𝖭𝗈 𝖽𝖾𝖿𝗂𝗇𝗂𝖽𝗈',
    role = '𝖭𝗈𝗏𝖺𝗍@',
    description = '🍃 𝖲𝗂𝗇 𝖿𝗋𝖺𝗌𝖾 𝗆𝖺́𝗀𝗂𝖼𝖺 𝖺𝗎́𝗇~'
} = user;

  if (!registered) {
    return conn.reply(
      m.chat,
      `🛑 *𝖯𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺, 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾𝗌 𝗎𝗌𝖺𝗋.perfil 𝗌𝗂𝗇 𝖾𝗌𝗍𝖺𝗋 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽@*\n\n✨ 𝖯𝖺𝗋𝖺 𝗂𝗇𝗂𝖼𝗂𝖺𝗋 𝗍𝗎 𝖺𝗏𝖾𝗇𝗍𝗎𝗋𝖺 𝖾𝗌𝖼𝗋𝗂𝖻𝖾:\n*.reg TuNombre Edad*\n🍓 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *.reg Suki 18*`,
      m
);
}

  const isMarried = global.db.data.marriages?.[who];
  const partnerName = isMarried? await conn.getName(global.db.data.marriages[who]): '🩷 𝖲𝗂𝗇 𝖼𝗈𝗆𝗉𝖺𝗇̃𝖾𝗋@';

  const username = await conn.getName(who);
  const perfilpic = await conn.profilePictureUrl(who, 'image').catch(() => sukiBanner);

  await conn.sendMessage(m.chat, {
    text: `🌸 *𝖴𝗇 𝗆𝗈𝗆𝖾𝗇𝗍𝗂𝗍𝗈 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺...*\n𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 𝖾𝗌𝗍𝖺́ 𝗂𝗇𝗏𝗈𝖼𝖺𝗇𝖽𝗈 𝗍𝗎 𝗉𝖾𝗋𝖿𝗂𝗅 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈 ✨`,
}, { quoted: m});

  const mensaje = `
🌸 ꒰ ✨ 𝖯𝖾𝗋𝖿𝗂𝗅 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈 𝖽𝖾 ${username} ✨ ꒱

🧋 𝖭𝗈𝗆𝖻𝗋𝖾: *${username}*
🎂 𝖤𝖽𝖺𝖽: *${age}*
📖 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈: *✅ 𝖠𝖼𝗍𝗂𝗏𝗈*
💫 𝖱𝖺𝗇𝗀𝗈 𝖾𝗌𝗉𝗂𝗋𝗂𝗍𝗎𝖺𝗅: *${role}*
✨ 𝖭𝗂𝗏𝖾𝗅: *${level}* | 𝖤𝖷𝖯: *${exp}*
💞 𝖢𝗈𝗆𝗉𝖺𝗇̃𝖾𝗋@: *${partnerName}*

📢 𝖲𝗂𝗀𝗎𝖾 𝖻𝗋𝗂𝗅𝗅𝖺𝗇𝖽𝗈 𝖼𝗈𝗇 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣
🌈 ¡𝖳𝗎 𝖾𝗌𝖾𝗇𝖼𝗂𝖺 𝗄𝖺𝗐𝖺𝗂𝗂 𝗂𝗅𝗎𝗆𝗂𝗇𝖺 𝖾𝗌𝗍𝖾 𝗆𝗎𝗇𝖽𝗈!`.trim();

  await conn.sendFile(m.chat, perfilpic, 'perfil.jpg', mensaje, m, { mentions: [who]});
};

handler.help = ['perfil'];
handler.tags = ['info', 'rg'];
handler.command = ['perfil', 'profile'];
handler.register = true;

export default handler;
