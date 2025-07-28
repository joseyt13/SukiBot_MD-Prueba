import { promises} from 'fs';
import { join} from 'path';
import { xpRange} from '../lib/levelling.js';

const handler = async (m, { conn, usedPrefix: _p, __dirname}) => {
  try {
    const packageInfo = JSON.parse(await promises.readFile(join(__dirname, '../package.json')));
    const { exp, level} = global.db.data.users[m.sender];
    const { min, xp, max} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const uptime = clockString(process.uptime() * 1000);
    const muptime = uptime;
    const totalreg = Object.keys(global.db.data.users).length;
    const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg';

    const pastelHeader = `
🩷︵₊˚⊹𓏲𓈒 Bienvenid@ al mundo pastelcore de Suki_Bot_MD 𓈒˚₊⊹︵

╭─❀ INFO DE USUARIO ❀─╮
🌸 Nombre: ${name}
🍡 Nivel: ${level}
💫 Experiencia: ${exp}
╰─────────────────────╯

╭─❀ INFO DEL BOT ❀─╮
🎀 Plataforma: Baileys MD
⏳ Tiempo activo: ${muptime}
👥 Usuarios mágicos: ${totalreg}
╰────────────────────╯

✨ Comandos disponibles:
`;

    const categories = {
      juegos: '🎲 Juegos kawaii',
      anime: '🎌 Anime mágico',
      sticker: '🧁 Stickers encantados',
      img: '📸 Imágenes visuales',
      downloader: '📥 Descargas pastelcore',
      group: '👑 Gestión de grupos',
      search: '🔍 Buscador adorable',
      tools: '🧰 Herramientas suaves',
      rpg: '🎮 RPG Suki',
      fun: '🎈 Diversión ligera',
      premium: '💎 Beneficios premium',
      owner: '🪄 Contacto creador',
      serbot: '🌪 Subbots'
};

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p
}));

    let commands = '';

    for (const [key, label] of Object.entries(categories)) {
      const filtered = help.filter(h => h.tags.includes(key));
      if (!filtered.length) continue;

      commands += `\n🌷 *${label}*\n`;
      for (const item of filtered) {
        for (const cmd of item.help) {
          commands += `⪼ ${_p}${cmd}\n`;
}
}
}

    const menuText = `
${pastelHeader.trim()}
${commands.trim()}

𓆩♡𓆪 Suki_Bot_MD powered by Dev_fedexyz13 ✨
Con ternura, utilidad y estética encantada~ 🌈🧋
`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: imageUrl},
        caption: menuText.trim()
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
