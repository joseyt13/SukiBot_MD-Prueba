import { xpRange} from '../lib/levelling.js';
import fetch from 'node-fetch';

const channelSuki = {
  id: '120363402097425674@newsletter',
  name: '🌸 会 Suki_Bot_MD - Noticias'
};

const textFantasy = (text) => {
  const charset = {
    a:'𝒶', b:'𝒷', c:'𝒸', d:'𝒹', e:'𝑒', f:'𝒻', g:'𝑔',
    h:'𝒽', i:'𝒾', j:'𝒿', k:'𝓀', l:'𝓁', m:'𝓂', n:'𝓃',
    o:'𝑜', p:'𝓅', q:'𝓆', r:'𝓇', s:'𝓈', t:'𝓉', u:'𝓊',
    v:'𝓋', w:'𝓌', x:'𝓍', y:'𝓎', z:'𝓏'
};
  return text.toLowerCase().split('').map(c => charset[c] || c).join('');
};

let tags = {
  main: textFantasy('panel solar'),
  group: textFantasy('respiración grupal'),
  serbot: textFantasy('clon espiritual')
};

const defaultMenu = {
  before: `
🩵 ⟦ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ⟧
╭───────────────༓
│💠 Nombre: %name
│🌸 Nivel: %level
│🔮 EXP: %exp/%maxexp
│👥 En este grupo: ${groupUserCount}
│📝 Registro: ${registered? '✅ Sí': '❌ No'}
╰───────────────༓

🧿 ⟦ 𝗕𝗼𝘁 ⟧
╭───────────────༓
│🌺 Nombre: Suki_Bot_MD
│🕰️ Activo: %muptime
│👑 Creador: fedexyz
│🌐 Modo: %mode
│📊 Usuarios: %totalreg
╰───────────────༓

🦋 Bienvenido al Bosque de Comandos 🍃`.trimStart(),

  header: '\n🌸 %category\n',
  body: '┃ ✦ %cmd %iscorazones %isPremium',
  footer: '\n╰──────༓',
  after: '\n🧸 Gracias por visitar el menú encantado de Suki 💮'
};

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const { exp = 0, level = 0} = global.db.data.users[m.sender];
    const { min, xp} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const _uptime = process.uptime() * 1000;
    const muptime = clockString(_uptime);
    const totalreg = Object.keys(global.db.data.users).length;
    const mode = global.opts["self"]? "Privado 🔒": "Público 🌐";
    const registered = global.db.data.users[m.sender]?.registered || false;
    const groupUserCount = m.isGroup? (await conn.groupMetadata(m.chat)).participants.length: 1;

    let help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
        enabled:!p.disabled
}));

    for (const plugin of help) {
      for (const t of plugin.tags) {
        if (!(t in tags)) tags[t] = textFantasy(t);
}
}

    const { before, header, body, footer, after} = defaultMenu;

    let _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n')
).join('\n');
        return `${header.replace(/%category/g, tags[tag])}${cmds}${footer}`;
}),
      after
    ].join('\n');

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
};

    const text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '');

    // Mensaje inicial con enlace
    await conn.sendMessage(m.chat, {
      text: '📩 Enviando menú de *Suki_Bot_MD*: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelSuki.id,
          serverMessageId: 102,
          newsletterName: channelSuki.name
}
}
}, { quoted: m});

    // Imagen y menú
    const imageURL = 'https://files.catbox.moe/rkvuzb.jpg';
    const imgBuffer = await fetch(imageURL).then(res => res.buffer());

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: text,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelSuki.id,
          serverMessageId: 103,
          newsletterName: channelSuki.name
}
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error en menú Suki_Bot_MD:', e);
    conn.reply(m.chat, '🌪️ El bosque encantado se desvió entre los vientos. Inténtalo de nuevo 🌸', m);
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menucompleto'];
handler.register = false;
export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
