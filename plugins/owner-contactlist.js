// Código creado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// Lista de contactos con nombre agregado ✨

let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) throw '🔐 Este comando es solo para el dueño del bot.';

  const contactos = Object.entries(conn.contacts);

  if (!contactos.length) {
    return conn.reply(m.chat, '📭 El bot no tiene contactos guardados.', m);
}

  let texto = `
╭─❀ 🌸 𝗟𝗶𝘀𝘁𝗮 𝗱𝗲 𝗰𝗼𝗻𝘁𝗮𝗰𝘁𝗼𝘀 ❀─╮
📱 Total: *${contactos.length}*
╰──────────────────────╯\n\n`;

  for (let i = 0; i < contactos.length; i++) {
    const [jid, info] = contactos[i];
    const nombre = info?.name || conn.getName(jid) || 'Sin nombre';
    texto += `📖 ${i + 1}. ${nombre}\n🆔 ${jid}\n\n`;
}

  await conn.sendMessage(m.chat, {
    text: texto.trim()
}, { quoted: m});
};

handler.help = ['contactlist'];
handler.tags = ['owner'];
handler.command = ['contactlist', 'vercontactos', 'listcontactos'];
handler.rowner = true;

export default handler;
