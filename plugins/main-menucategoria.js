let handler = async (m, { conn, usedPrefix}) => {
  let name = await conn.getName(m.sender);
  let number = m.sender.split('@')[0];
  let user = global.db.data.users[m.sender];
  let creatorName = '🌸 Bienvenido a SukiBot_MD-V2, disfruta tu experiencia pastelcore';

  let info = `
╭━━〔 SukiBot_MD-V2 〕━━⬣
┃ 👤 *Nombre:* ${name}
┃ 🪪 *Número:* wa.me/${number}
┃ 🧬 *Experiencia:* ${user.exp}
┃ 💎 *Diamantes:* ${user.diamond || 0}
┃ 🎟 *Tokens:* ${user.joincount || 0}
┃ 🔋 *Nivel:* ${user.level}
┃ 🧪 *Rango:* ${user.role}
╰━━━━━━━━━━━━━━━━━━━━⬣

🌷 *Hola ${name}, selecciona una opción con los botones de abajo:*`.trim();

  const imagen = 'https://files.catbox.moe/rkvuzb.jpg'; // Imagen decorativa pastelcore

  await conn.sendMessage(m.chat, {
    image: { url: imagen},
    caption: info,
    footer: '🍁 SukiBot_MD-V2 • Devfedexyz13',
    buttons: [
      { buttonId: `${usedPrefix}help`, buttonText: { displayText: '📜 Menú Principal'}, type: 1},
      { buttonId: `${usedPrefix}grupos`, buttonText: { displayText: '🎋 Grupos Oficiales'}, type: 1},
      { buttonId: `${usedPrefix}reg soyFedexyz.13`, buttonText: { displayText: '🌐 Auto Verificar'}, type: 1}
    ],
    headerType: 4
}, { quoted: m});
};

handler.command = ['menuu', 'menú', 'abrirmenu'];
export default handler;
