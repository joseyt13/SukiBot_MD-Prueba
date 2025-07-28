// 🌸 ᴄᴏ́ᴅɪɢᴏ ᴅᴇ Sᴜᴋɪ_Bᴏᴛ_MD — ʀᴇᴍɪx ᴋᴀᴡᴀɪɪ ʙʏ Bʀᴀʏᴀɴ ✨

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
    'https://files.cloudkuimages.guru/audios/ozBxb1si.mp3'
  ];

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() =>
      'https://files.catbox.moe/rkvuzb.jpg'
);
    const tag = `@${who.split("@")[0]}`;

    // 🌷 Bienvenida
    if (m.messageStubType === 27 || m.messageStubType === 31) {
      const audioWelcome = bienvenidaAudios[Math.floor(Math.random() * bienvenidaAudios.length)];

      await conn.sendMessage(m.chat, {
        text: `
🌸 ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ te da la bienvenida, ${tag} 🎀

💖 Grupo: *${groupMetadata.subject}*
📛 Nombre mágico: *${name}*
🆔 ID brillante: *${user}*
📆 Fecha de entrada: *${fecha}*

Por favor, encontrá tu nube favorita ☁️ y disfrutá con amor. ¡Suki está feliz de tenerte aquí! 🫧`,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: '🌟 Nuevo miembro encantado',
            body: `${name} se unió con dulzura 💫`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: pp
}
}
});

      await conn.sendMessage(m.chat, {
        audio: { url: audioWelcome},
        mimetype: 'audio/mpeg',
        ptt: true
});
}

    // 🕊️ Despedida
    if (m.messageStubType === 28 || m.messageStubType === 32) {
      const audioBye = despedidaAudios[Math.floor(Math.random() * despedidaAudios.length)];

      await conn.sendMessage(m.chat, {
        text: `
🌙 ${tag} ha dejado el reino *${groupMetadata.subject}* 🫧

🧾 Nombre: *${name}*
🆔 ID de viajero: *${user}*
📅 Salida registrada: *${fecha}*

Le deseamos viento a favor en su viaje. Suki te abraza desde la distancia 💞`,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: '🕊️ Despedida de Suki',
            body: `${name} se despidió con respeto 🌺`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: pp
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
