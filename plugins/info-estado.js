import ws from 'ws';

let handler = async (m, { conn, usedPrefix}) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const totalreg = Object.keys(global.db.data.users).length;
  const totalchats = Object.keys(global.db.data.chats).length;

  const users = [...new Set(global.conns.filter(c => c.user && c.ws.socket && c.ws.socket.readyState!== ws.CLOSED))];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const totalUsers = users.length;

  const speed = (performance.now() - performance.now()) * 1000;
  const used = process.memoryUsage();

  const info = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖤𝗌𝗍𝖺𝖽𝗈 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 ꒱ 𖥔˚₊

🧁 𝖢𝗋𝖾𝖺𝖽𝗈𝗋: ꜰᴇᴅᴇxʏᴢ 🍁
📎 𝖯𝗋𝖾𝖿𝗂𝗃𝗈: [ ${usedPrefix} ]
🎀 𝖵𝖾𝗋𝗌𝗂𝗈𝗇: ${global.vs || '1.0.0'}

╭─❀ 𝖢𝗁𝖺𝗍𝗌 ❀─╮
💌 𝖯𝗋𝗂𝗏𝖺𝖽𝗈𝗌: ${chats.length - groupsIn.length}
👥 𝖦𝗋𝗎𝗉𝗈𝗌: ${groupsIn.length}
📊 𝖳𝗈𝗍𝖺𝗅: ${chats.length}

╭─❀ 𝖴𝗌𝗎𝖺𝗋𝗂𝗈𝗌 ❀─╮
🌸 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈𝗌: ${totalreg}
✨ 𝖲𝗎𝖻-𝖡𝗈𝗍𝗌 𝖠𝖼𝗍𝗂𝗏𝗈𝗌: ${totalUsers || '0'}

╭─❀ 𝖲𝗂𝗌𝗍𝖾𝗆𝖺 ❀─╮
🕒 𝖳𝗂𝖾𝗆𝗉𝗈 𝖠𝖼𝗍𝗂𝗏𝗈: ${uptime}
⚡️ 𝖵𝖾𝗅𝗈𝖼𝗂𝖽𝖺𝖽: ${(speed / 1000).toFixed(2)}s

⧉ 𝖲𝗎𝗄𝗂 𝖿𝗎𝗇𝖼𝗂𝗈𝗇𝖺 𝖼𝗈𝗇 𝖾𝗇𝖾𝗋𝗀𝗂́𝖺 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈𝗋𝖺 ✨
`.trim();

  await conn.sendFile(m.chat, global.banner || 'https://files.catbox.moe/rkvuzb.jpg', 'estado.jpg', info, m);
};

handler.help = ['estado'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return `${h}h ${m}m ${s}s`;
}
