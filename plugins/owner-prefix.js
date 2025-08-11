const handler = async (m, { conn, text, usedPrefix, command}) => {
  const emoji = '🌸';
  const done = '✅';

  if (!text) throw `${emoji} 𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗇𝗂𝗇𝗀𝗎𝗇 𝗉𝗋𝖾𝖿𝗂𝗃𝗈. 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋 𝖾𝗌𝖼𝗋𝗂𝖻𝖾 𝗎𝗇 𝗉𝗋𝖾𝖿𝗂𝗃𝗈.\n> 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *${usedPrefix + command}!*`;

  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

  const mensaje = `
╭─❀ 𝖲𝗎𝗄𝗂Bot_MD ❀─╮
┃ ${done} 𝖯𝗋𝖾𝖿𝗂𝗃𝗈 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝗈 𝖼𝗈𝗇 𝖾́𝗑𝗂𝗍𝗈
┃ ✨ 𝖯𝗋𝖾𝖿𝗂𝗃𝗈 𝗇𝗎𝖾𝗏𝗈: *${text}*
╰───────────────╯`;

  conn.fakeReply(m.chat, mensaje.trim(), '0@s.whatsapp.net', '🌟 𝖯𝖱𝖤𝖥𝖨𝖩𝖮 𝖭𝖴𝖤𝖵𝖮 🌟');
};

handler.customPrefix = /^prefix$/i;
handler.command = new RegExp;
handler.owner = true;
handler.register = true;

export default handler;
