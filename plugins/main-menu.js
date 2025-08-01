//código creado por fedexyz 🍁 
//no quites creditos ⚔ 

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
🧋 Bienvenid@ a *Suki_Bot_MD*
🎀 Tu guía pastelcore con comandos encantadores

🌸 Perfil de usuario 🌸
👤 Nombre: *%name*
🎀 Nivel: *%level* | ✨ Exp: *%exp/%maxexp*
🔓 Modo: *%mode*
📈 Registro global: *%totalreg*
🕐 Tiempo activo: *%muptime*

%readmore`.trim(),

  header: '\n𖦹 ꒰ %category ꒱ 💠\n',
  body: '┃ ⊹ %cmd %iscorazones %isPremium',
  footer: '\n',
  after: `
🌺︶︶︶︶︶︶︶︶︶︶︶︶︶
Gracias por usar *Suki_Bot_MD*
Creado con cariño por: *fedexyz.13*
📡 Canal oficial: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
🧋 Contacto directo: wa.me/5491156178758
╰─𓆩♡𓆪─⬣`
};

let handler = async (m, { conn, usedPrefix: _p}) => {
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menukawaii', 'menucompleto'];
handler.register = false;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
    }
