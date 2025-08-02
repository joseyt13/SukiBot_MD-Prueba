// creado por fedexyz 🍓

import ws from 'ws';
import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Suki_Bot_MD Canal Oficial'
};

async function handler(m, { conn: env}) {
  const subBots = new Map();

  global.conns.forEach(conn => {
    if (conn.user && conn.ws?.socket?.readyState!== ws.CLOSED) {
      const id = conn.user.jid.replace(/[^0-9]/g, '');
      subBots.set(id, conn.user);
}
});

  const estrellas = Array.from(subBots.values()).map((user, index) => `
🔮 𝗘𝘀𝘁𝗿𝗲𝗹𝗹𝗮 #${index + 1}
🧁 Nombre: ${user.name || 'Suki_Bot_MD'}
🪐 Usuario: @${user.jid.replace(/[^0-9]/g, '')}
🌐 Portal: wa.me/${user.jid.replace(/[^0-9]/g, '')}
`).join('\n');

  const mensaje = estrellas.length === 0
? '🌙 No hay SubBots activos en la galaxia pastel de Suki por ahora~'
: `✧ 𝗖𝗼𝗻𝘀𝘁𝗲𝗹𝗮𝗰𝗶ó𝗻 𝗦𝘂𝗯𝗕𝗼𝘁 ✧\n\n${estrellas}`;

  const imageURL = 'https://files.catbox.moe/erkz66.jpg';
  const imageBuffer = await fetch(imageURL).then(res => res.buffer());

  await env.sendFile(m.chat, imageBuffer, 'constelacion-suki.jpg', mensaje, m, false, {
    mentions: env.parseMention(mensaje),
    contextInfo: {
      forwardingScore: 888,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 120,
        newsletterName: channelRD.name
}
}
});
}

handler.command = ['listjadibot', 'bots', 'subbots'];
handler.help = ['bots'];
handler.tags = ['serbot'];
handler.register = false;

export default handler;
