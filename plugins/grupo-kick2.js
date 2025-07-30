// código creado por fedexyz 🍁 
// no quites creditos 

let handler = async (m, { conn, participants, isAdmin, isBotAdmin, args, command}) => {
  const creatorJID = '521XXXXXXXXXX@s.whatsapp.net'; // ← reemplaza por tu número real
  const nombreBot = 'SukiBot_MD'; // ← personaliza el nombre del bot
  const targetMentioned = m.mentionedJid && m.mentionedJid[0];
  const sender = m.sender;

  if (!m.isGroup) return m.reply('❌ Este comando solo puede usarse en grupos.');
  if (!isAdmin && sender!== creatorJID) return m.reply(`⛔ Solo administradores o el creador de ${nombreBot} pueden usar este comando.`);
  if (!isBotAdmin) return m.reply('⚠️ No tengo permisos de administrador para expulsar usuarios.');

  let target;
  if (targetMentioned) {
    target = targetMentioned;
} else if (args[0]) {
    const numero = args[0].replace(/[^0-9]/g, '');
    if (!numero) return m.reply('👤 Proporciona un número válido para expulsar.');
    target = numero + '@s.whatsapp.net';
} else {
    return m.reply('👤 Menciona al usuario o escribe su número para expulsarlo.');
}

  if (target === sender) return m.reply('🚫 No puedes expulsarte a ti mismo.');
  if (target === creatorJID) return m.reply(`🛡️ No puedes expulsar al creador de ${nombreBot}.`);
  const esAdmin = participants.find(p => p.id === target)?.admin;
  if (esAdmin) return m.reply('⚠️ No puedo expulsar a otro administrador.');

  try {
    // Puedes subir tu imagen a un host y reemplazar la URL abajo
    const imageURL = 'https://files.catbox.moe/1u7rkx.jpg';
    const buffer = await fetch(imageURL).then(res => res.buffer());

    const mensajeExpulsion = `
🌸 *${nombreBot} — Panel de Moderación*

✅ Usuario *@${target.split('@')[0]}* ha sido expulsado del grupo.
🔐 Acción ejecutada por: *@${sender.split('@')[0]}*

Gracias por mantener el bosque libre de caos 🧹✨
    `.trim();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: mensajeExpulsion,
      mentions: [target, sender]
}, { quoted: m});

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
} catch (e) {
    console.error('❌ Error al expulsar:', e);
    m.reply('❌ No pude expulsar al usuario. Puede que haya salido, sea administrador o hubo un error.');
}
};

handler.help = ['kick2 @usuario', 'kick2 número'];
handler.tags = ['group'];
handler.command = /^kick2$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
