import db from '../lib/database.js';

const img = 'https://files.catbox.moe/al4kc8.jpg';

const handler = async (m, { conn, usedPrefix}) => {
  const who =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    m.sender;

  if (who === conn.user.jid) {
    await m.react('✖️');
    return;
}

  const user = global.db.data.users[who];
  if (!user) {
    return m.reply(`⚠️ El usuario no se encuentra en la base de datos.`);
}

  const name = await conn.getName(who);
  const fecha = new Date().toLocaleString('es-AR');

  const moneda = 'Pesos'; // Cambia esto por tu moneda preferida
  const packname = 'Banco SukiBot'; // Cambia si tienes un nombre decorativo
  const fkontak = { key: { fromMe: false, participant: '0@s.whatsapp.net'}, message: { conversation: 'Perfil bancario'}};

  const txt = who === m.sender
? `╭━〔 💰  Banco Central 〕\n` +
      `┃ 👤 *Usuario:* ${name}\n` +
      `┃ 💸 *${moneda} en cartera:* ${user.coin}\n` +
      `┃ 🏦 *${moneda} en banco:* ${user.bank}\n` +
      `┃ ✨ *Experiencia:* ${user.exp}\n` +
      `┃ 🆙 *Nivel:* ${user.level}\n` +
      `┃ ⚜️ *Rol:* ${user.role}\n` +
      `┃ 📅 *Fecha:* ${fecha}\n` +
      `╰━━━━━━━━━━━━━━━⬣`
: `╭━〔 ${packname} 〕\n` +
      `┃ 👤 *Usuario:* @${who.split('@')[0]}\n` +
      `┃ 💸 *${moneda} en cartera:* ${user.coin}\n` +
      `┃ 🏦 *${moneda} en banco:* ${user.bank}\n` +
      `┃ ✨ *Experiencia:* ${user.exp}\n` +
      `┃ 🆙 *Nivel:* ${user.level}\n` +
      `┃ ⚜️ *Rol:* ${user.role}\n` +
      `┃ 📅 *Fecha:* ${fecha}\n` +
      `╰━━━━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'bank.jpg', txt, fkontak, null, { mentions: [who]});
};

handler.help = ['bank', 'banco'];
handler.tags = ['economy'];
handler.command = ['bank', 'banco'];
handler.register = true;
handler.group = true;

export default handler;
