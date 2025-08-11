const handler = async (m, { conn, usedPrefix}) => {
  const name = await conn.getName(m.sender);
  const number = m.sender.split('@')[0];
  const user = global.db.data.users[m.sender];
  const imagen = 'https://files.catbox.moe/rkvuzb.jpg'; // Puedes cambiarla por una imagen pastelcore

  const info = `
╭─╼ ❀ 𝖯𝖠𝖭𝖤𝖫 𝖣𝖤 𝖴𝖲𝖴𝖠𝖱𝖨𝖮 ❀ ╾─╮
│
│ 🌸 𝖭𝗈𝗆𝖻𝗋𝖾: ${name}
│ 📱 𝖭𝗎́𝗆𝖾𝗋𝗈: wa.me/${number}
│ 🍁 Channel: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
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
      { buttonId: `${usedPrefix}menucompleto`, buttonText: { displayText: '📜 Menú completo'}, type: 1},
      { buttonId: `${usedPrefix}grupos`, buttonText: { displayText: '🎋 Grupos Oficiales'}, type: 1},
      { buttonId: `${usedPrefix}reg soyGay 90`, buttonText: { displayText: '🌐 Auto Verificar'}, type: 1}
    ],
    headerType: 4
}, { quoted: m});
};

handler.command = ['menu', 'menú', 'allmenu'];
export default handler;
