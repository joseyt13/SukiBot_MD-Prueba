//🌸 ᴄᴏ́ᴅɪɢᴏ ʀᴇɪᴍᴀɢɪɴᴀᴅᴏ ᴘᴀʀᴀ Sᴜᴋɪ_ʙᴏᴛ_ᴍᴅ ✨
//🌈 ᴅᴀᴛᴏꜱ ʏ ᴇᴍᴏᴄɪᴏɴᴇꜱ ᴀʟ ᴇɴᴛʀᴀʀ ꜱᴜ ɢʀᴜᴘᴏ 💌

export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;
  if (!db.data.chats[m.chat].welcome) return; // verificación de bienvenida activa

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const date = new Date();
  const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  for (const user of participants) {
    let name = await conn.getName(user);
    let pp = await conn.profilePictureUrl(user, 'image').catch(() =>
      'https://files.catbox.moe/rkvuzb.jpg'
);
    const taguser = '@' + user.split('@')[0];

    // 🌷 Bienvenida
    if (m.messageStubType === 27 || m.messageStubType === 31) {
      await conn.sendMessage(m.chat, {
        text: `
🌸 𝒞𝒶𝓁𝒾𝒹𝒶 𝒷𝒾𝑒𝓃𝓋𝑒𝓃𝒾𝒹𝒶, ${taguser} ✨

🎀 Te damos la bienvenida al reino de *${groupMetadata.subject}*
🧸 Tu nombre mágico: *${name}*
📱 Tu ID encantado: *${user}*
📆 Llegaste el: *${fecha}*

Por favor, acomódate en tu nube favorita ☁️ y revisa las reglas con ternura 🫶`,
        mentions:: [user],
        contextInfo: {
          externalAdReply: {
            title: `Nuevo miembro del grupo`,
            body: `${name} se ha unido 🥳`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: pp
          }
        }
      });
    }

    // DESPEDIDA
    if (m.messageStubType === 28 || m.messageStubType === 32) {
      await conn.sendMessage(m.chat, {
        text: `👋 ${taguser} ha salido del grupo *${groupMetadata.subject}*.\n\n🧑 Nombre: *${name}*\n📱 ID: ${user}\n📆 Fecha: ${fecha}\n\n¡Buena suerte en tu camino!`,
        mentions: [user],
        contextInfo: {
          externalAdReply: {
            title: `Miembro salió del grupo`,
            body: `${name} se fue 🍁`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: pp
          }
        }
      });
    }
  }
}
