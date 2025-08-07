let handler = async (m, { conn}) => {
  const texto = `
𓆩𖥧𖥣𖥧𓆪 ꒰ ʜᴏʟᴀ ꒱ 𖥔˚₊
ᰨᰍ ׅ🌱᤻᪲ׄ᎒᎓

🌸 ʏᴏ sᴏʏ *ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ*
🧁 ᴜɴ ʙᴏᴛ ᴘᴀsᴛᴇʟᴄᴏʀᴇ ʟʟᴇɴᴏ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs ᴇɴᴄᴀɴᴛᴀᴅᴏʀᴇs
🎀 ᴅɪsᴇɴ̃ᴀᴅᴏ ᴘᴀʀᴀ ɢʀᴜᴘᴏs ᴍᴀ́ɢɪᴄᴏs ʏ ᴀᴠᴇɴᴛᴜʀᴀs ᴋᴀᴡᴀɪɪ
📡 ᴄᴏɴᴇᴄᴛᴀᴅᴀ ᴀ ᴄᴀɴᴀʟᴇs ʏ ᴍᴇɴᴜ́s ᴅᴇ ʟᴜᴢ

𐌗 ᴄʀᴇᴀᴅᴀ ᴘᴏʀ: ꜰᴇᴅᴇxʏᴢ 🍁
⧉ ᴘᴀʀᴀ ᴍᴀ́s ɪɴꜰᴏ ᴜsᴀ: *.menu*
`.trim();

  await m.reply(texto);
};

handler.help = ['bot'];
handler.tags = ['info'];
handler.command = ['bot'];
handler.register = true;

export default handler;
