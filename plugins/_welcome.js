// código creado por fedexyz 🍁 
// no quites creditos ⚔ 

export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;

  const who = m.messageStubParameters?.[0];
  if (!who) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const fecha = new Date().toLocaleDateString('es-AR');

  const bienvenidaAudios = [
    'https://files.cloudkuimages.guru/audios/MVdamiSr.mp3'
  ];

  const despedidaAudios = [
    'https://files.cloudkuimages.guru/audios/aTh4HrjO.mp3'
  ];

  const sitioSuki = 'https://sukibot-site.vercel.app/';
  const canalSuki = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() =>
      'https://files.catbox.moe/rkvuzb.jpg'
);
    const tag = `@${user.split("@")[0]}`;

    // 🎀 Bienvenida mágica
    if ([27, 31].includes(m.messageStubType)) {
      const audioWelcome = bienvenidaAudios[Math.floor(Math.random() * bienvenidaAudios.length)];

      await conn.sendMessage(m.chat, {
        text: `
🫧 ¡Bienvenid@ al Reino pastel de *Suki_Bot_MD* ${tag}~! 🍓

🎀 Grupo: *${groupMetadata.subject}*
🌸 Nombre estelar: *${name}*
🆔 Identificador mágico: *${user}*
📆 Fecha de entrada: *${fecha}*

▢───────《💮》───────▢
✨ *¿Qué es Suki_Bot_MD?*

• Un bot pastelcore lleno de comandos encantadores
• Diseñado para grupos mágicos y aventuras kawaii
• Administra, diviértete y personaliza tu espacio
• ¡Más que un bot, es tu compañera de estrella! 💫

🎐 Sitio oficial: ${sitioSuki}
📡 Canal oficial: ${canalSuki}

Disfruta tu estancia, preciosura. Suki te abraza con dulzura desde este mundo encantado~ 🌷`,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: '💮 Nuevo miembro pastelcore',
            body: `${name} acaba de aterrizar entre pétalos 💫`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: canalSuki
}
}
});

      await conn.sendMessage(m.chat, {
        audio: { url: audioWelcome},
        mimetype: 'audio/mpeg',
        ptt: true
});
}

    // 🌙 Despedida celestial
    if ([28, 32].includes(m.messageStubType)) {
      const audioBye = despedidaAudios[Math.floor(Math.random() * despedidaAudios.length)];

      await conn.sendMessage(m.chat, {
        text: `
🌙 ${tag} ha dejado el Reino *${groupMetadata.subject}* 🍃

🧾 Nombre estelar: *${name}*
🆔 ID de viajero astral: *${user}*
📅 Fecha de salida: *${fecha}*

Gracias por compartir tu luz aquí ✨
Suki siempre recordará tu esencia mágica~ 🌸

🎀 Si deseas saber más sobre el bot:
🔮 Web: ${sitioSuki}
📡 Canal: ${canalSuki}`,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: '🌠 Despedida pastel de Suki',
            body: `${name} continúa su viaje con elegancia 🕊️`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: canalSuki
}
}
});

      await conn.sendMessage(m.chat, {
        audio: { url: audioBye},
        mimetype: 'audio/mpeg',
        ptt: true
});
}
}
}
