const handler = async (m, { conn, text}) => {
  const emoji = '🌸';
  const done = '✅';

  if (!text) throw `${emoji} No se encontró ningún prefijo. Por favor, escribe uno.\n> Ejemplo: *prefix!*`;

  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

  const mensaje = `
╭─❀ 𝖲ᴜᴋ𝗂Bot_MD ❀─╮
┃ ${done} Prefijo actualizado con éxito
┃ ✨ Nuevo prefijo: *${text}*
╰─────────────────╯`;

  conn.fakeReply(m.chat, mensaje.trim(), '0@s.whatsapp.net', '🌟 PREFIJO NUEVO 🌟');
};

handler.help = ['prefix [símbolo]'];
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;
