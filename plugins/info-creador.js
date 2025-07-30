// código creado por fedexyz 🍁 
// no quites creditos 👻

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

  const mensajePrincipal = `
🩵 *${creadorPrincipal.nombre}* 🩵
👑 Rol: ${creadorPrincipal.rol}
📱 Número: ${creadorPrincipal.numero}

📌 Para soporte técnico, colaboraciones o consultas, contáctalo directamente.
`.trim();

  const mensajeSecundario = `
💠 *${creadorSecundario.nombre}* 💠
💻 Rol: ${creadorSecundario.rol}
📱 Número: ${creadorSecundario.numero}

🌸 Agradecemos su apoyo en el desarrollo continuo de Suki_Bot_MD.
`.trim();

  // Enviar imagen del creador principal
  await conn.sendMessage(m.chat, {
    image: { url: creadorPrincipal.imagen},
    caption: mensajePrincipal,
    mentions: [m.sender]
}, { quoted: m});

  // Enviar imagen del creador secundario
  await conn.sendMessage(m.chat, {
    image: { url: creadorSecundario.imagen},
    caption: mensajeSecundario,
    mentions: [m.sender]
}, { quoted: m});
};

handler.help = ['creadores', 'creator'];
handler.tags = ['info'];
handler.command = /^creador(es)?$/i;
export default handler;
