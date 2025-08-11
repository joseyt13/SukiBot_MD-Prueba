// Código creado por 𝖋𝖊𝖉𝖾𝖝𝖞𝖟 🍁
// Lista de contactos y SubBots activos ✨

import ws from 'ws';

let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) throw '🔐 Este comando es solo para el dueño del bot.';

  const contactos = Object.keys(conn.contacts);
  const subbots = global.conns.filter(bot =>
    bot.user && bot.ws.socket && bot.ws.socket.readyState!== ws.CLOSED
);

  let texto = `
╭─❀ 🌸 𝗟𝗶𝘀𝘁𝗮 𝗱𝗲 𝗰𝗼𝗻𝘁𝗮𝗰𝘁𝗼𝘀 ❀─╮
📱 Total de contactos: *${contactos.length}*
🤖 SubBots activos: *${subbots.length}*
╰──────────────────────╯\n\n`;

  for (let i = 0; i < contactos.length; i++) {
    const jid = contactos[i];
    const nombre = conn.getName(jid);
    const esSubBot = subbots.some(bot => bot.user.jid === jid);
    texto += `📖 ${i + 1}. ${nombre || 'Sin nombre'}\n🆔 ${jid}\n${esSubBot? '🤖 SubBot activo': '👤 Usuario normal'}\n\n`;
}

  await conn.sendMessage(m.chat, {
    text: texto.trim()
}, { quoted: m});
};

handler.help = ['contactlist'];
handler.tags = ['owner'];
handler.command = ['contactlist', 'listcontacts', 'vercontactos'];
handler.rowner = true;

export default handler;
