const prefijosBloqueados = [
  '212','213','216','218','20','966','971','962','961','963','964','965','967','968','973','90'
];

const creadorJID = '521XXXXXXXXXX@s.whatsapp.net'; // Reemplaza con tu número en formato WhatsApp
const antiSpamActivo = true;

let handler = async (m, { conn}) => {
  if (!m.isGroup ||!antiSpamActivo || m.fromMe) return;

  const sender = m.sender.replace(/@s\.whatsapp\.net$/, '');
  const prefijo = sender.slice(0, sender.length - 7);
  const isCreador = m.sender === creadorJID;

  const metadata = await conn.groupMetadata(m.chat);
  const botNumber = conn.user.jid.split('@')[0];
  const botIsAdmin = metadata.participants.find(p => p.id.includes(botNumber))?.admin;

  const esSpam = m.message?.conversation?.includes('http') || m.message?.conversation?.length> 300;

  if (esSpam && prefijosBloqueados.some(code => sender.startsWith(code)) &&!isCreador) {
    if (botIsAdmin) {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await conn.reply(m.chat, `⛔ Usuario con número +${sender} eliminado por spam detectado.`, m);
} else {
      await conn.reply(m.chat, `⚠️ El bot detectó spam pero no tiene permisos de administrador para eliminar al usuario.`, m);
}
}
};

handler.command = /^.*$/; // Evalúa todos los mensajes
export default handler;
