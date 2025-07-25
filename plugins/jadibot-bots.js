import ws from 'ws';
import fetch from 'node-fetch';

async function handler(m, { conn: _envio, usedPrefix}) {
  const uniqueUsers = new Map();

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState!== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid.replace(/[^0-9]/g, ''), conn.user);
}
});

  const message = Array.from(uniqueUsers.values()).map((user, index) => `
╭───────⋆｡˚❀ BOT #${index + 1}
│ 🍡 Usuario: @${user.jid.replace(/[^0-9]/g, '')}
│ 💫 Link: wa.me/${user.jid.replace(/[^0-9]/g, '')}
│ 🩷 Nombre: ${user.name || 'Suki_Bot_MD 🌸'}
╰───────────────`).join('\n');

  const replyMessage = message.length === 0
? '🌸 No hay bots activos en este momento en el reino de Suki~'
: message;

  const responseMessage = `꒰🌙꒱ *Subbots activos con Suki_Bot_MD* ✨\n\n${replyMessage}`;

  const imageURL = 'https://files.catbox.moe/erkz66.jpg';
  const img = await (await fetch(imageURL)).buffer();

  await _envio.sendFile(m.chat, img, 'suki-jadibots.jpg', responseMessage, m, false, {
    mentions: _envio.parseMention(responseMessage)
});
}

handler.command = ['listjadibot', 'bots'];
handler.help = ['bots'];
handler.tags = ['serbot'];
export default handler;
