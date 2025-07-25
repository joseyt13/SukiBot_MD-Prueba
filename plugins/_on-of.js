import { createHash} from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = command.toLowerCase();
  let isAll = false;

  let isEnable = chat[type] || false;

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false;
} else {
    const estado = isEnable? '🟢 ACTIVADO': '🔴 DESACTIVADO';
    return conn.reply(m.chat,
      `꒰🌸꒱ *Suki Configuración Mística* 💫
━━━━━━━━━━━━━━━━━━
💖 Puedes controlar la función: *${command}*

🌈 Usa:
• *${usedPrefix}${command} on* – Activar la ternura ✨
• *${usedPrefix}${command} off* – Dormir la función 💤

🔧 Estado actual: ${estado}
━━━━━━━━━━━━━━━━━━`, m);
}

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup?!isOwner:!isAdmin) throw false;
      chat.welcome = isEnable;
      break;

    case 'antisubbots':
    case 'antisub':
    case 'antisubot':
    case 'antibot2':
      if (m.isGroup &&!(isAdmin || isOwner)) throw false;
      chat.antiBot2 = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup &&!(isAdmin || isOwner)) throw false;
      chat.modoadmin = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
    case 'emojis':
      if (!m.isGroup?!isOwner:!isAdmin) throw false;
      chat.reaction = isEnable;
      break;

    case 'nsfw':
    case 'nsfwhot':
    case 'nsfwhorny':
      if (!m.isGroup?!isOwner:!isAdmin) throw false;
      chat.nsfw = isEnable;
      break;

    case 'jadibotmd':
    case 'modejadibot':
      isAll = true;
      if (!isOwner) throw false;
      bot.jadibotmd = isEnable;
      break;

    case 'detect':
    case 'avisos':
      if (!m.isGroup?!isOwner:!isAdmin) throw false;
      chat.detect = isEnable;
      break;

    case 'detect2':
    case 'eventos':
      if (!m.isGroup?!isOwner:!isAdmin) throw false;
      chat.detect2 = isEnable;
      break;

    case 'antilink':
      if (m.isGroup &&!(isAdmin || isOwner)) throw false;
      chat.antiLink = isEnable;
      break;

    case 'antilink2':
      if (m.isGroup &&!(isAdmin || isOwner)) throw false;
      chat.antiLink2 = isEnable;
      break;

    default:
      return conn.reply(m.chat, '⚠️ Esta función aún no está disponible en el reino de Suki~', m);
}

  chat[type] = isEnable;

  conn.reply(m.chat,
    `🌸꒰ *Suki_Bot_MD ha actualizado tus encantos* ꒱✨
━━━━━━━━━━━━━━━━━━
🧋 *Función:* ${type}
🎀 *Estado:* ${isEnable? '✅ ACTIVADO~ yay!': '❌ DESACTIVADO~ zzz…'}
${isAll? '🌐 *Aplicado globalmente a Suki_Bot_MD*': '👑 *Solo afecta este grupito mágico*'}
━━━━━━━━━━━━━━━━━━
🌟 Sigue configurando tu mundo kawaii~`, m);
};

handler.help = [
  'welcome', 'bv', 'bienvenida',
  'antisubbots', 'antisub', 'antisubot', 'antibot2',
  'modoadmin', 'soloadmin',
  'reaction', 'reaccion', 'emojis',
  'nsfw', 'nsfwhot', 'nsfwhorny',
  'jadibotmd', 'modejadibot',
  'detect', 'avisos',
  'detect2', 'eventos',
  'antilink', 'antilink2'
];

handler.tags = ['group', 'settings'];
handler.command = handler.help;
handler.register = true;

export default handler;
