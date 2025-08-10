const handler = async (m, { conn, text, usedPrefix, command, participants, groupMetadata, isAdmin, isBotAdmin}) => {
  if (!m.isGroup) return m.reply('🚫 *𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗌𝖾 𝗉𝗎𝖾𝖽𝖾 𝗎𝗌𝖺𝗋 𝖾𝗇 𝗀𝗋𝗎𝗉𝗈𝗌.*');
  if (!isAdmin) return m.reply('🔒 *𝖲𝗈𝗅𝗈 𝗅𝗈𝗌 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝖽𝗈𝗋𝖾𝗌 𝗉𝗎𝖾𝖽𝖾𝗇 𝗎𝗌𝖺𝗋 𝖾𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈.*');

  const user = m.mentionedJid?.[0];
  const mensaje = text.split(" ").slice(1).join(" ");

  if (!user) return m.reply(`📌 *𝖣𝖾𝖻𝖾𝗌 𝗆𝖾𝗇𝖼𝗂𝗈𝗇𝖺𝗋 𝖺 𝗎𝗇 𝗎𝗌𝗎𝖺𝗋𝗂𝗈.*\n🧃 Ejemplo: *${usedPrefix}${command} @usuario razón*`);
  if (!mensaje) return m.reply('📝 *𝖣𝖾𝖻𝖾𝗌 𝖾𝗌𝖼𝗋𝗂𝖻𝗂𝗋 𝗎𝗇 𝗆𝗈𝗍𝗂𝗏𝗈 𝗉𝖺𝗋𝖺 𝗅𝖺 𝖺𝖽𝗏𝖾𝗋𝗍𝖾𝗇𝖼𝗂𝖺.*');

  const date = new Date().toLocaleDateString('es-ES');
  const groupName = groupMetadata.subject;
  const senderName = await conn.getName(m.sender);

  const advertenciaTexto = `
⚠️ *𝖠𝖣𝖵𝖤𝖱𝖳𝖤𝖭𝖢𝖨𝖠 𝖱𝖤𝖢𝖨𝖡𝖨𝖣𝖠* ⚠️

🔰 *𝖦𝗋𝗎𝗉𝗈:* ${groupName}
👮‍♂️ *𝖬𝗈𝖽𝖾𝗋𝖺𝖽𝗈𝗋:* ${senderName}
📅 *𝖥𝖾𝖼𝗁𝖺:* ${date}

📝 *𝖬𝖾𝗇𝗌𝖺𝗃𝖾:*
${mensaje}

❗ *𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗏𝗂𝗍𝖺 𝖿𝗎𝗍𝗎𝗋𝖺𝗌 𝖿𝖺𝗅𝗍𝖺𝗌.*`.trim();

  const imagen = 'https://files.cloudkuimages.guru/images/gtsfn9HU.jpg';

  const preview = {
    contextInfo: {
      externalAdReply: {
        title: '⚠️ 𝖠𝖽𝗏𝖾𝗋𝗍𝖾𝗇𝖼𝗂𝖺 𝗈𝖿𝗂𝖼𝗂𝖺𝗅',
        body: '𝖧𝖺𝗌 𝗋𝖾𝖼𝗂𝖻𝗂𝖽𝗈 𝗎𝗇𝖺 𝖺𝖽𝗏𝖾𝗋𝗍𝖾𝗇𝖼𝗂𝖺 𝖽𝖾𝗅 𝗀𝗋𝗎𝗉𝗈',
        thumbnailUrl: imagen,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: false,
        sourceUrl: 'https://whatsapp.com'
}
}
};

  try {
    await conn.sendMessage(user, { text: advertenciaTexto}, { quoted: m,...preview});
    await m.reply('✅ *𝖠𝖽𝗏𝖾𝗋𝗍𝖾𝗇𝖼𝗂𝖺 𝖾𝗇𝗏𝗂𝖺𝖽𝖺 𝗉𝗈𝗋 𝗉𝗋𝗂𝗏𝖺𝖽𝗈 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝖺𝗆𝖾𝗇𝗍𝖾.*');
} catch (e) {
    await m.reply('❌ *𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝖾𝗇𝗏𝗂𝖺𝗋 𝗅𝖺 𝖺𝖽𝗏𝗂𝗌𝗈𝗋𝗂𝖺. 𝖤𝗅 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 𝗉𝗎𝖾𝖽𝖾 𝗇𝗈 𝗍𝖾𝗇𝖾𝗋 𝖼𝗁𝖺𝗍 𝖺𝖻𝗂𝖾𝗋𝗍𝗈 𝖼𝗈𝗇 𝖾𝗅 𝖻𝗈𝗍.*');
}
};

handler.command = ['advertencia', 'ad', 'daradvertencia'];
handler.tags = ['grupo'];
handler.group = true;
handler.admin = true;

export default handler;
