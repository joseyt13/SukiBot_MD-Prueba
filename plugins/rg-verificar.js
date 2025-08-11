// Código creado y mejorado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

import { createHash} from 'crypto';

const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';
const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

function generarID(sender) {
  return createHash('md5').update(sender).digest('hex');
}

let handler = async (m, { conn, text, usedPrefix, command, isOwner}) => {
  const user = global.db.data.users[m.sender];
  const name = conn.getName(m.sender);

  if (user.registered) {
    return conn.reply(m.chat, `🩷 *𝖯𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺 ${name}~ 𝗒𝖺 𝖾𝗌𝗍𝖺́𝗌 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝖺 𝖾𝗇 𝖾𝗅 𝗆𝗎𝗇𝖽𝗈 𝗆𝖺́𝗀𝗂𝖼𝖔 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣*\n\n🌙 𝖲𝗂 𝖽𝖾𝗌𝖾𝖺𝗌 𝗋𝖾𝗂𝗇𝗂𝖼𝗂𝖺𝗋 𝗍𝗎 𝖺𝗏𝖾𝗇𝗍𝗎𝗋𝖺, 𝖾𝗌𝖼𝗋𝗂𝖻𝖾:\n✨ *${usedPrefix}unreg*`, m);
}

  const partes = text.trim().split(/\s+/);
  const nombre = partes[0];
  const edadTexto = partes[1];
  const paisTexto = partes.slice(2).join(' ') || null;

  if (!nombre ||!edadTexto) {
    return conn.reply(m.chat, `🌸 *𝖮𝗁 𝗇𝗈~* 𝖥𝗈𝗋𝗆𝖺𝗍𝗈 𝗂𝗇𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝗈 🍥\n\n🧃 𝖴𝗌𝖺: *${usedPrefix + command} 𝗇𝗈𝗆𝖻𝗋𝖾 𝖾𝖽𝖺𝖽 𝗉𝖺𝗂́𝗌(opcional)*\n✨ 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *${usedPrefix + command} Suki 18 Japón*`, m);
}

  const edad = parseInt(edadTexto);
  if (isNaN(edad) || edad < 5 || edad> 100) {
    return conn.reply(m.chat, `💫 *𝖤𝖽𝖺𝖽 𝗂𝗇𝗏𝖺́𝗅𝗂𝖽𝖺, 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺~* 𝖣𝖾𝖻𝖾 𝖾𝗌𝗍𝖺𝗋 𝖾𝗇𝗍𝗋𝖾 *5 𝗒 100 𝖺𝗇̃𝗈𝗌 𝗄𝖺𝗐𝖺𝗂𝗂* 🧁`, m);
}

  const yaRegistrado = Object.values(global.db.data.users).some(u =>
    u.registered && u.name === nombre.trim() && u.age === edad
);

  if (yaRegistrado &&!isOwner) {
    return conn.reply(m.chat, `🚫 *𝖤𝗌𝖾 𝗇𝗈𝗆𝖻𝗋𝖾 𝖼𝗈𝗇 𝖾𝖽𝖺𝖽 𝗒𝖺 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈 𝗉𝗈𝗋 𝗈𝗍𝗋𝖺 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺.*\n🧃 𝖴𝗌𝖺 𝗎𝗇 𝗇𝗈𝗆𝖻𝗋𝖾 𝖽𝗂𝖿𝖾𝗋𝖾𝗇𝗍𝖾 𝗈 𝖼𝖺𝗆𝖻𝗂𝖺 𝗍𝗎 𝖾𝖽𝖺𝖽.`, m);
}

  await conn.sendMessage(m.chat, {
    text: `🎀 *𝖴𝗇 𝗆𝗈𝗆𝖾𝗇𝗍𝗂𝗍𝗈... 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 𝖾𝗌𝗍𝖺́ 𝗂𝗇𝗂𝖼𝗂𝖺𝗇𝖽𝗈 𝗍𝗎 𝗉𝗋𝗈𝖿𝗂𝗅 𝗆𝖺́𝗀𝗂𝖼𝗈~*`
}, { quoted: m});

  user.name = nombre.trim();
  user.age = edad;
  user.country = paisTexto? paisTexto.trim(): '🌍 𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈';
  user.regTime = Date.now();
  user.registered = true;
  user.exp += 300;

  const sn = generarID(m.sender);

  const mensaje = `
꒰꒰🌸꒱ *𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝖽𝗈 𝖼𝗈𝗇 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣* 🍓

👩‍💻 𝖭𝗈𝗆𝖻𝗋𝖾: *${user.name}*
🎂 𝖤𝖽𝖺𝖽: *${user.age}* 𝖺𝗇̃𝗈𝗌 𝗄𝖺𝗐𝖺𝗂𝗂
🌎 𝖯𝖺𝗂́𝗌: *${user.country}*
🧁 𝖨𝖣 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈: *${sn}*

🌐 𝖳𝗎 𝖾𝗇𝖾𝗋𝗀í𝖺 𝗆𝖺́𝗀𝗂𝖼𝖺 𝗁𝖺 𝗌𝗂𝗇𝖼𝗋𝗈𝗇𝗂𝗓𝖺𝖽𝗈 𝖼𝗈𝗇 *𝖲𝗎𝗄𝗂 𝗇𝖺𝗄𝗈 𝗀𝖺~*
📢 𝖲𝗂𝗀𝗎𝖾 𝖾𝗅 𝖼𝖺𝗇𝖺𝗅 𝗈𝖿𝗂𝖼𝗂𝖺𝗅 𝗉𝖺𝗋𝖺 𝗌𝗈𝗋𝗉𝗋𝖾𝗌𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌:
${channelRD}

✨ 𝖴𝗌𝖺 *#perfil* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗍𝗎 𝗉𝗋𝗈𝗀𝗋𝖾𝗌𝗈 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈.
🌈 ¡𝖳𝗎 𝖺𝗏𝖾𝗇𝗍𝗎𝗋𝖺 𝖺𝗉𝖾𝗇𝖺𝗌 𝖼𝗈𝗆𝗂𝖾𝗇𝖹𝖺, 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺~!*`.trim();

  await m.react('🧋');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🌷 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝖺 𝖺 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣',
        body: '𝖳𝗎 𝖼𝗈𝗋𝖺𝗓𝗈́𝗇 𝖾𝗌𝗍𝖺́ 𝖾𝗇𝗅𝖺𝗓𝖺𝖽𝗈 𝖺𝗅 𝖼𝖺𝗇𝖺𝗅 𝖽𝖾 𝗆𝖺𝗀𝗂𝖺',
        thumbnailUrl: sukiIcon,
        sourceUrl: channelRD,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
 };

handler.help = ['reg'];
handler.tags = ['registro', 'rg'];
handler.command = ['register', 'reg', 'registrar'];

export default handler;
