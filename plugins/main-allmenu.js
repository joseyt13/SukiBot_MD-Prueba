const handler = async (m, { conn, usedPrefix}) => {
  const name = await conn.getName(m.sender);
  const number = m.sender.split('@')[0];
  const user = global.db.data.users[m.sender];
  const imagen = 'https://qu.ax/STCTA.jpg'; // Puedes cambiarla por una imagen pastelcore

  const info = `
╭─╼ ❀ 𝖯𝖠𝖭𝖤𝖫 𝖣𝖤 𝖴𝖲𝖴𝖠𝖱𝖨𝖮 ❀ ╾─╮
│
│ 🌸 𝖭𝗈𝗆𝖻𝗋𝖾: ${name}
│ 📱 𝖭𝗎́𝗆𝖾𝗋𝗈: wa.me/${number}
│ 🧬 𝖤𝗑𝗉: ${user.exp}
│ 💎 𝖣𝗂𝖺𝗆𝖺𝗇𝗍𝖾𝗌: ${user.diamond || 0}
│ 🎟️ 𝖳𝗈𝗄𝖾𝗇𝗌: ${user.joincount || 0}
│ 🔋 𝖭𝗂𝗏𝖾𝗅: ${user.level}
│ 🧪 𝖱𝖺𝗇𝗀𝗈: ${user.role}
│
╰─╼ ❀ 𝖲𝗎𝗄𝗂𝗕𝗈𝗍_𝖬𝖣 ❀ ╾─╯

🌷 *¡Bienvenido a SukiBot_MD!*
✨ Elige una opción mágica para comenzar:
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imagen},
    caption: info,
    footer: '🌸 𝖲𝗎𝗄𝗂𝗕𝗈𝗍_𝖬𝖣 • Fedexyz  🐾',
    buttons: [
      { buttonId: `${usedPrefix}help`, buttonText: { displayText: '📜 Menú Encantado'}, type: 1},
      { buttonId: `${usedPrefix}grupos`, buttonText: { displayText: '🎋 Grupos Oficiales'}, type: 1},
      { buttonId: `${usedPrefix}reg soyGay.444`, buttonText: { displayText: '🌐 Auto Verificar'}, type: 1}
    ],
    headerType: 4
}, { quoted: m});
};

handler.command = ['menu', 'menú', 'allmenu'];
export default handler;
