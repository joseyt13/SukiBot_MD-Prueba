export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
if (m.chat === '120363402097425674@newsletter) return !0
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`🍁 holis @${m.sender.split`@`[0]}, mi creador activo el antiprivado serás bloqueado...\nUnete al canal https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
      }
