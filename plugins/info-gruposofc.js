import fetch from 'node-fetch';
import { gruposOficiales as cfg} from '../config.js';

let handler = async (m, { conn}) => {
  const texto = `
╭─❀ 𝖦𝗋𝗎𝗉𝗈𝗌 𝗈𝖿𝗂𝖼𝗂𝖺𝗅𝗂𝗌 ❀─╮

🌷 ¡Hola! Te invito a unirte a los espacios mágicos de *${cfg.nombreBot}* para compartir, aprender y disfrutar con la comunidad:

🍡 ${cfg.grupoPrincipal.nombre}
↳ *❀* ${cfg.grupoPrincipal.link}

🍰 ${cfg.comunidad.nombre}
↳ *❀* ${cfg.comunidad.link}

🧋 ¿Enlace roto? Aquí tienes el canal oficial:
📡 ${cfg.canal.nombre}
↳ *❀* ${cfg.canal.link}

╰─❀ 👨🏻‍💻 𝘾𝙧𝙚𝙖𝙙𝙤𝙧: ${cfg.creador} ❀─╯
`.trim();

  await conn.sendFile(m.chat, cfg.catalogo, 'grupos.jpg', texto, m);
  await m.react(cfg.emoji);
};

handler.help = ['grupos'];
handler.tags = ['info'];
handler.command = ['grupos', 'links', 'groups'];

export default handler;
