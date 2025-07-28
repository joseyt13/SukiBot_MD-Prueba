import { promises} from 'fs';
import { join} from 'path';
import { xpRange} from '../lib/levelling.js';

const defaultMenu = {
  before: `╭───🎀 𝗜𝗡𝗙𝗢 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 🎀─────╮
🌸 Nombre: %name
🍡 Nivel: %level
💫 Experiencia: %exp
╰───────────────────────╯

╭───🧋 𝗜𝗡𝗙𝗢 𝗗𝗘 𝗕𝗢𝗧 🧋─────╮
🌷 Estado: Modo %mode
🎀 Plataforma: Baileys MD
⏳ Tiempo activo: %muptime
👥 Usuarios registrados: %totalreg
%readmore
`,
  header: '┏━━ ❀ %category ❀ ━━┓',
  body: '┃ ⊹ %cmd',
  footer: '┗━━━━━━━━━━━━━━━━━━',
  after: `\n𓆩♡𓆪 Suki_Bot_MD powered by Dev_fedexyz13 ✨`
};

const tags = {
  main: '𝗜𝗡𝗙𝗢',
  juegos: '𝗝𝗨𝗘𝗚𝗢𝗦',
  anime: '𝗔𝗡𝗜𝗠𝗘',
  rpg: '𝗥𝗣𝗚',
  rg: '𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢',
  serbot: '𝗦𝗨𝗕 𝗕𝗢𝗧𝗦',
  sticker: '𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
  img: '𝗜𝗠Á𝗚𝗘𝗡𝗘𝗦',
  group: '𝗚𝗥𝗨𝗣𝗢𝗦',
  search: '𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔',
  tools: '𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦',
  fun: '𝗗𝗜𝗩𝗘𝗥𝗦𝗜Ó𝗡',
  downloader: '𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦',
  premium: '𝗣𝗥𝗘𝗠𝗜𝗨𝗠',
  owner: '𝗖𝗥𝗘𝗔𝗗𝗢𝗥'
};

const handler = async (m, { conn, usedPrefix: _p, __dirname}) => {
  try {
    const packageInfo = JSON.parse(await promises.readFile(join(__dirname, '../package.json')));
    const { exp, limit, level} = global.db.data.users[m.sender];
    const { min, xp, max} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const uptime = clockString(process.uptime() * 1000);
    const muptime = clockString(process.uptime() * 1000);
    const totalreg = Object.keys(global.db.data.users).length;

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium
}));

    let menuText = defaultMenu.before + '\n';

    for (let tag of Object.keys(tags)) {
      const section = help.filter(h => h.tags.includes(tag) && h.help.length);
      if (!section.length) continue;

      menuText += defaultMenu.header.replace(/%category/g, tags[tag]) + '\n';
      for (let cmd of section.flatMap(p => p.help)) {
        menuText += defaultMenu.body.replace(/%cmd/g, `${_p}${cmd}`) + '\n';
}
      menuText += defaultMenu.footer + '\n';
}

    menuText += defaultMenu.after;

    const replace = {
      '%name': name,
      '%level': level,
      '%exp': exp - min,
      '%totalreg': totalreg,
      '%muptime': muptime,
      '%mode': global.opts.self? 'Privado': 'Público',
      '%readmore': readMore
};

    menuText = menuText.replace(new RegExp(`%(${Object.keys(replace).join('|')})`, 'g'), (_, key) => replace[key]);

    const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg';

    await conn.sendMessage(
      m.chat,
      {
        image: { url: imageUrl},
        caption: menuText
},
      { quoted: m}
);
} catch (e) {
    console.error(e);
    conn.reply(m.chat, '😿 Ocurrió un error al mostrar el menú encantado...', m);
}
};

handler.command = ['menu', 'allmenu', 'ayuda', 'help'];
handler.help = ['menu'];
handler.tags = ['main'];
handler.register = true;

export default handler;

const readMore = String.fromCharCode(8206).repeat(4001);

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
