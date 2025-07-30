// código creado por fedexyz 🍁 
// no quites creditos 

let handler = async (m, { conn, participants, isAdmin, isBotAdmin, args, command}) => {
  const creatorJID = '5491156178758@s.whatsapp.net'; // ← tu número WhatsApp, reemplaza esto
  const targetMentioned = m.mentionedJid && m.mentionedJid[0];
  const sender = m.sender;

  if (!m.isGroup) return m.reply('❌ Este comando solo puede usarse en grupos.');
  if (!isAdmin && sender!== creatorJID) return m.reply('⛔ Solo administradores o el creador de SukiBot_MD pueden usar este comando.');
  if (!isBotAdmin) return m.reply('⚠️ No puedo expulsar porque no tengo permisos de administrador en este grupo.');

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
  if (target === creatorJID) return m.reply('🛡️ No puedes expulsar al creador de SukiBot_MD.');
  const esAdmin = participants.find(p => p.id === target)?.admin;
  if (esAdmin) return m.reply('⚠️ No puedo expulsar a otro administrador.');

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
    await m.reply(`✅ Usuario *@${target.split('@')[0]}* ha sido eliminado del grupo.`, null, {
      mentions: [target]
});
} catch (e) {
    console.error('❌ Error al expulsar:', e);
    m.reply('❌ No pude expulsar al usuario. Puede que ya haya salido, sea administrador o hubo un error.');
}
};

handler.help = ['kick2 @usuario', 'kick2 número'];
handler.tags = ['group'];
handler.command = /^kick2$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
