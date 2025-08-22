import { watchFile, unwatchFile} from 'fs';
import { fileURLToPath} from 'url';
import chalk from 'chalk';
import fs from 'fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

// 🧑‍💻 Propietarios y permisos
global.owner = [
  ['5491156178758', '୧ ꜰᴇᴅᴇxʏᴢㅤ🎋', true],
  ['573001533523', '୧ Colaborador Brayans 🎋', true],
  ['5491156178758@s.whatsapp.net', 'fedexyz', true]
];
global.mods = ['5491156178758'];
global.prems = ['5491156178758'];

// 🌐 APIs y claves
global.APIs = {
  xteam: 'https://api.xteam.xyz',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
};
global.APIKeys = {
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a',
  'https://api-fgmods.ddns.net': 'TU-APIKEY'
};

// 🖼️ Branding del bot
global.botname = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 🎋';
global.packname = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 𝐁ᥡ ꜰᴇᴅᴇxʏᴢ';
global.footer = '୧ ꜰᴇᴅᴇxʏᴢㅤ🎋';
global.wm = global.botname;
global.author = global.botname;
global.logo = 'https://qu.ax/tyxJP.jpg';
global.link = 'https://chat.whatsapp.com/IVgxD0TWWuSA0lVoexudIS';

// 📢 Canal y boletines
global.namecanal = 'Sᴜᴋɪ𝐁𝐨𝐭_MD';
global.canal = 'https://whatsapp.com/channel/0029Vb63Kf9KwqSQLOQOtk3N';
global.idcanal = '120363402097425674@boletin informativo';
global.canalreg = '120363417208139711@boletin informativo';
global.ch = {
  cap1: '120363402097425674@newsletter'
};

// 💬 Mensajes y emojis
global.wait = '`Cargando... Espera un momento.`';
global.rwait = '⌛';
global.dmoji = '🤭';
global.done = '✅';
global.error = '❌';
global.xmoji = '🔥';

// 📂 Recursos y librerías
global.imagen = fs.readFileSync('./src/catalogo.jpg');
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

// 📁 Sesiones personalizadas
global.nameqr = 'SukiBot';
global.namebot = 'SukiBot';
global.sessions = 'SukiSessions';
global.jadi = 'JadiBots';
global.sukiJadibts = true;

// 🕒 Tiempo y fecha
global.d = new Date(Date.now() + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(global.locale, { weekday: 'long'});
global.fecha = d.toLocaleDateString(global.locale, { day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString(global.locale, { month: 'long'});
global.año = d.toLocaleDateString(global.locale, { year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
global.botdate = `⫹⫺ Date: ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}`;
global.bottime = `𝗧 𝗜 𝗠 𝗘: ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`;

// ⚙️ Configuración general
global.multiplier = 250;
global.maxwarn = '2'; // Máximo de advertencias

// 🔄 Recarga automática del archivo
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("🔄 Config.js actualizado"));
  import(`${file}?update=${Date.now()}`);
});
