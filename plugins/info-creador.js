let handler = async (m, { conn}) => {
  await m.react('🌺');

  const creadorPrincipal = {
    nombre: 'fedexyz.13',
    rol: 'Creador Principal de Suki_Bot_MD',
    numero: '+54 9 11 56178758',
    imagen: 'https://files.catbox.moe/rkvuzb.jpg'
};

  const creadorSecundario = {
    nombre: 'DevBrayan',
    rol: 'Creador Secundario y colaborador técnico',
    numero: '+57 300 1533523',
    imagen: 'https://files.cloudkuimages.guru/images/fJk8xWXl.jpg'
};

  const mensaje = `
🩵 *Creadores de Suki_Bot_MD* 🩵

╭───── ✦ ─────╮
🎀 *${creadorPrincipal.nombre}*
┆ Rol: ${creadorPrincipal.rol}
┆ Número: ${creadorPrincipal.numero}
╰─────────────────╯

╭───── ✦ ─────╮
🎀 *${creadorSecundario.nombre}*
┆ Rol: ${creadorSecundario.rol}
┆ Número: ${creadorSecundario.numero}
╰─────────────────╯

🌸 Gracias por confiar en nuestro proyecto
🧋 Suki sigue creciendo con ternura digital
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: creadorPrincipal.imagen},
    caption: mensaje,
    mentions: [m.sender]
}, { quoted: m});

  await m.react('✅');
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creadores', 'owner', 'creditos'];
export default handler;
