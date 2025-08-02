// creado por fedexyz 🍓

import ws from 'ws';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Suki_Bot_MD Canal Oficial'
};

async function handler(m, { conn}) {
  const subList = new Map();

  global.conns.forEach(bot => {
    if (bot.user && bot.ws?.socket?.readyState!== ws.CLOSED) {
      const id = bot.user.jid.replace(/[^0-9]/g, '');
      subList.set(id, bot.user);
}
});

  const ahora = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss');

  const mensaje = Array.from(subList.values()).map((user, i) => `
╭─🌙 SUBBOT #${i + 1}
│ 🧸 Usuario: @${user.jid.replace(/[^0-9]/g, '')}
│ 🔗 Link: wa.me/${user.jid.replace(/[^0-9]/g, '')}
│ 💖 Nombre: ${user.name || '🌸 Suki_Bot_MD'}
│ 🕒 Hora de conexión: ${ahora}
│ 📡 Estado: 🔛 En línea
╰─────────────────────────`).join('\n');

  const final = mensaje.length === 0
? '🌙 No hay SubBots activos en este momento. El cielo pastel está en calma~'
: `𓆩♡𓆪 𝗟𝗶𝘀𝘁𝗮 𝗱𝗲 𝗦𝘂𝗯𝗕𝗼𝘁𝘀 𝗮𝗰𝘁𝗶𝘃𝗼𝘀 💠\n\n${mensaje}\n\n📡 Canal mágico: ${channelRD.name}\n🔗 https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N`;

  const img = await fetch(imgURL).then(res => res.buffer());

  await conn.sendFile(m.chat, img, 'suki-subbots.jpg', final, m, false, {
    mentions: conn.parseMention(final),
    contextInfo: {
      forwardingScore: 777,
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
