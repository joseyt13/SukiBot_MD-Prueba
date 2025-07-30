let handler = async (m, { conn}) => {
  await m.react('🌸');

  const creadorPrincipal = {
    nombre: 'fedexyz.13',
    rol: '👑 Creador Principal de Suki_Bot_MD',
    numero: '+54 9 11 56178758',
    imagen: 'https://files.catbox.moe/rkvuzb.jpg'
};

  const creadorSecundario = {
    nombre: 'DevBrayan',
    rol: '🧠 Creador Secundario y colaborador técnico',
    numero: '+57 300 1533523',
    imagen: 'https://files.cloudkuimages.guru/images/fJk8xWXl.jpg'
};

  // Imagen 1: Creador Principal
  await conn.sendMessage(m.chat, {
    image: { url: creadorPrincipal.imagen},
    caption: `
🩵 *${creadorPrincipal.nombre}*
${creadorPrincipal.rol}
📱 Número: ${creadorPrincipal.numero}

🌟 Contacto directo para soporte, ideas o proyectos con SukiBot_MD.
`.trim(),
    mentions: [m.sender]
}, { quoted: m});

  // Imagen 2: Creador Secundario
  await conn.sendMessage(m.chat, {
    image: { url: creadorSecundario.imagen},
    caption: `
💠 *${creadorSecundario.nombre}*
${creadorSecundario.rol}
📱 Número: ${creadorSecundario.numero}

🌸 Agradecimientos por su apoyo técnico y desarrollo.
`.trim(),
    mentions: [m.sender]
}, { quoted: m});
};

handler.help = ['creadores', 'creador'];
handler.tags = ['info'];
handler.command = /^creador(es)?$/i;
export default handler;
