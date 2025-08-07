import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  const nombreBot = 'ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ';
  const creador = 'ꜰᴇᴅᴇxʏᴢ';
  const catalogo = 'https://files.catbox.moe/rkvuzb.jpg'; // imagen decorativa
  const emojis = '🌸';

  // enlaces personalizados
  const namegrupo = 'Grupo Oficial';
  const gp1 = 'https://chat.whatsapp.com/Bt6O68OzrIN28UZz5Ka1hV';

  const namecomu = 'Comunidad Pastelcore';
  const comunidad1 = 'https://chat.whatsapp.com/Bt6O68OzrIN28UZz5Ka1hV';

  const namechannel = 'Canal de Noticias';
  const channel = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

  const dev = `👨🏻‍💻 𝘾𝙧𝙚𝙖𝙙𝙤𝙧: ${creador}`;

  const texto = `
╭─❀ 𝖦𝗋𝗎𝗉𝗈𝗌 𝗈𝖿𝗂𝖼𝗂𝖺𝗅𝗂𝗌 ❀─╮

🌷 ¡Hola! Te invito a unirte a los espacios mágicos de *${nombreBot}* para compartir, aprender y disfrutar con la comunidad:

🍡 ${namegrupo}
↳ *❀* ${gp1}

🍰 ${namecomu}
↳ *❀* ${comunidad1}

🧋 ¿Enlace roto? Aquí tienes el canal oficial:
📡 ${namechannel}
↳ *❀* ${channel}

╰─❀ ${dev} ❀─╯
`.trim();

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', texto, m);
  await m.react(emojis);
};

handler.help = ['grupos'];
handler.tags = ['info'];
handler.command = ['grupos', 'links', 'groups'];

export default handler;
