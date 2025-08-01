// 🌸 Código creado por fedexyz 🍁
// No quites créditos ⚔

import { xpRange} from '../lib/levelling.js';
import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 Suki_Bot_MD Canal Oficial'
};

const textSuki = (text) => {
  const charset = {
    a:'ᴀ', b:'ʙ', c:'ᴄ', d:'ᴅ', e:'ᴇ', f:'ꜰ', g:'ɢ',
    h:'ʜ', i:'ɪ', j:'ᴊ', k:'ᴋ', l:'ʟ', m:'ᴍ', n:'ɴ',
    o:'ᴏ', p:'ᴘ', q:'ǫ', r:'ʀ', s:'ꜱ', t:'ᴛ', u:'ᴜ',
    v:'ᴠ', w:'ᴡ', x:'ˣ', y:'ʏ', z:'ᴢ'
};
  return text.toLowerCase().split('').map(c => charset[c] || c).join('');
};

let tags = {
  main: textSuki('Menú principal'),
  group: textSuki('Comandos grupales'),
  serbot: textSuki('Función clon'),
  tools: textSuki('Herramientas mágicas'),
  kawaii: textSuki('Anime encantado'),
  descargas: textSuki('Descargas pastel')
};

const defaultMenu = {
  before: `
💮︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵
˗ˏˋ こんにちは \`%name\` ˎˊ˗
🧋 Bienvenid@ a *Suki_Bot_MD* — tu guía pastelcore
🎀 El bot más adorable para automatizar tu mundo

🌸 Perfil de usuario 🌸
👤 Nombre: *%name*
🧠 Nivel: *%level* | ✨ Exp: *%exp/%maxexp*
🔓 Modo: *%mode*
📈 Registro global: *%totalreg*
🕐 Tiempo activo: *%muptime*

%readmore`.trim(),

  header: '\n𖦹 ꒰ %category ꒱ 💠\n',
  body: '┃ ⊹ %cmd %iscorazones %isPremium',
  footer: '\n',
  after: `
🌺︶︶︶︶︶︶︶︶︶︶︶︶︶
Gracias por usar *Suki_Bot_MD* 🌸
🧋 Creado con cariño por: *fedexyz.13*
📡 Canal oficial: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
📞 WhatsApp Business: wa.me/5491156178758
📷 Instagram: @fedexyz_13

💸 Métodos de pago:
• 💖 PayPal → https://paypal.me/fedexyzsuki13
• 🍓 Mercado Pago → https://link.mercadopago.com.ar/fedexyz13

📷 Imagen representativa de Suki nako ga
🧁 Estado: ✅ Bot funcionando perfectamente
╰─𓆩♡𓆪─⬣`
};

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    // 🎀 Carga visual antes del menú
    const loadingImage = 'https://files.catbox.moe/q8b2br.jpg';
    const imgRandom = [
      'https://iili.io/FKVDVAN.jpg',
      'https://iili.io/FKVbUrJ.jpg'
    ];
    const textInvocacion = [
      '*✦ 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀 𝐁𝐘 SukiBot_MD ✦*',
      '⚜️ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐞𝐧 𝐜𝐮𝐫𝐬𝐨...',
      '🔮 𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚𝐧𝐝𝐨 𝐚 𝐥𝐚𝐬 𝐚𝐥𝐦𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐚𝐬'
    ];
    const fraseElegida = textInvocacion[Math.floor(Math.random() * textInvocacion.length)];

    await conn.sendMessage(m.chat, {
      text: `╭─〔 ⚙️ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 𝐌𝐄𝐍𝐔́ 〕─⬣
┃ 🛰️ *Conectando a la base de datos...*
┃ 📡 *Sincronizando comandos pastelcore...*
┃ 💬 ${fraseElegida}
╰────────────────⬣`,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🌸 SukiBot_MD — Tu bot adorable',
          body: '🍁fedexyz13 🍁⚘',
          thumbnailUrl: loadingImage,
          sourceUrl: 'https://github.com/Yuji-XDev',
          mediaType: 1,
          renderLargerThumbnail: true
}
}
});

    const { exp = 0, level = 0} = global.db.data.users[m.sender];
    const { min, xp} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const _uptime = process.uptime() * 1000;
    const muptime = clockString(_uptime);
    const totalreg = Object.keys(global.db.data.users).length;
    const mode = global.opts['self']? 'Privado 🔒': 'Público 🌐';

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled:!p.disabled
}));

    for (const plugin of help) {
      if (plugin.tags) {
        for (const t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textSuki(t);
          }
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
      channelName: channelRD.name,
      readmore: String.fromCharCode(8206).repeat(4001)
};

    const text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '');

    const imageURL = 'https://files.catbox.moe/cvpwkk.jpg';
    const imgBuffer = await fetch(imageURL).then(res => res.buffer());

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: text,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 888,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 120,
          newsletterName: channelRD.name
}
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error en menú decorado:', e);
    conn.reply(m.chat, '❎ Suki se tropezó entre pétalos 🌸. Inténtalo otra vez, porfa.', m);
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menukawaii', 'menucompleto'];
handler.register = false;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms /⁽¹⁾⁽²⁾
