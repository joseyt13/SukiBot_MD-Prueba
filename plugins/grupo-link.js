let handler = async (m, { conn, isAdmin, isBotAdmin}) => {
  const grupo = await conn.groupMetadata(m.chat);
  const nombreGrupo = grupo.subject;
  const grupoID = m.chat;

  if (!m.isGroup) {
    return m.reply('🌸 Este comando solo funciona en grupos.');
}

  if (!isBotAdmin) {
    return m.reply('⚠️ Suki necesita ser admin para obtener el link.');
}

  const link = `https://chat.whatsapp.com/${await conn.groupInviteCode(grupoID)}`;

  const texto = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖫𝗂𝗇𝗄 𝖽𝖾 𝖦𝗋𝗎𝗉𝗈 ꒱ 𖥔˚₊

🧁 𝖭𝗈𝗆𝖻𝗋𝖾: *${nombreGrupo}*
📎 𝖤𝗇𝗅𝖺𝖼𝖾:
${link}

⧉ 𝖲𝗈𝗅𝗈 𝗉𝖺𝗋𝖺 𝗎𝗌𝗈 𝗆𝖺𝗀𝗂𝖼𝗈 ✧
`.trim();

  await m.reply(texto);
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = ['link', 'linkgrupo', 'grouplink'];
handler.group = true;

export default handler;
