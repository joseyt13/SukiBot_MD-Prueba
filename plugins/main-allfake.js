import pkg from '@whiskeysockets/baileys';
import fs from 'fs';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';
import getMensajeSistema from '../lib/msmwarning.js';

const { generateWAMessageFromContent, prepareWAMessageMedia, proto} = pkg;

let handler = m => m;

handler.all = async function (m, { conn}) {
  if (!conn) return;

  // Función para obtener buffer desde URL
  global.getBuffer = async function getBuffer(url, options = {}) {
    try {
      const res = await axios({
        method: 'get',
        url,
        headers: {
          'DNT': 1,
          'User-Agent': 'GoogleBot',
          'Upgrade-Insecure-Request': 1
},
...options,
        responseType: 'arraybuffer'
});
      return res.data;
} catch (e) {
      console.log(`Error en getBuffer: ${e}`);
      return null;
}
};

  // Datos del bot
  global.creador = 'Wa.me/5491156178758';
  global.ofcbot = `Wa.me/${conn.user.jid.split('@')[0]}?text=✨️hl`;
  global.asistencia = 'Wa.me/5491176429275';
  global.namechannel = '🍒 Sᴜᴋɪ𝐁𝐨𝐭_MD 🍁';
  global.namegrupo = '🍒 Sᴜᴋɪ𝐁𝐨𝐭_MD 🍁';
  global.namecomu = '⍴᥆ᥕᥱrᥱძ ᑲᥡ 𝖿ᥱძᥱ᥊ᥡz';
  global.listo = 'listo aquí tienes tu pedido 🍁';

  // Imagen de perfil del usuario
  global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(() => null);

  // Canal
  global.idchannel = '120363402097425674@newsletter';
  global.canalIdM = [global.idchannel];
  global.canalNombreM = [global.namechannel];
  global.channelRD = await getRandomChannel();

  // Mensajes decorativos
  global.mensajes = getMensajeSistema();

  // Fecha y hora
  const d = new Date(new Date + 3600000);
  global.dia = d.toLocaleDateString('es', { weekday: 'long'});
  global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric'});
  global.mes = d.toLocaleDateString('es', { month: 'long'});
  global.año = d.toLocaleDateString('es', { year: 'numeric'});
  global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

  // Reacciones globales
  global.rwait = '✨️';
  global.done = '✅';
  global.error = '✖️';
  global.msm = '⚠️';

  // Emojis decorativos
  const emojis = [
    '૮₍ ˶•⤙•˶ ₎ა ✨️',
    '૮₍ ˶•⤙•˶ ₎ა 🌸',
    '૮₍ ˶•⤙•˶ ₎ა 🍓',
    '૮₍ ˶•⤙•˶ ₎ა 🪷',
    '૮₍ ˶•⤙•˶ ₎ა 💮'
  ];
  global.emoji = emojis[Math.floor(Math.random() * emojis.length)];

  // Mensajes de espera
  global.wait = '🌸 𝗧𝗘 𝗣𝗜𝗗𝗢 𝗤𝗨𝗘 𝗠𝗘 𝗘𝗦𝗣𝗘𝗥𝗘𝗦 ʕ•ᴥ•ʔ';

  // Datos aleatorios
  global.edadaleatoria = ['10', '28', '20', '40', '18', '21', '15', '11', '9', '17', '25'][Math.floor(Math.random() * 11)];
  global.user2 = m.pushName || 'Anónimo';
  global.verifyaleatorio = ['registrar', 'reg', 'verificar', 'verify', 'register'][Math.floor(Math.random() * 5)];

  // Enlaces
  const enlaces = [
    'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W',
    'https://github.com/El-brayan502',
    'https://github.com/El-brayan502/RoxyBot-MD'
  ];
  global.redes = enlaces[Math.floor(Math.random() * enlaces.length)];

  // Imagen decorativa
  const iconos = [
    'https://files.catbox.moe/rkvuzb.jpg',
    'https://files.catbox.moe/3ngnnn.jpg',
    'https://files.catbox.moe/07fyj3.jpg',
    'https://files.catbox.moe/erkz66.jpg'
  ];
  global.icono = iconos[Math.floor(Math.random() * iconos.length)];

  // Saludo por hora
  const hour = d.getHours();
  const saludos = {
    noche: 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃',
    mañana: 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄',
    dia: 'Lɪɴᴅᴏ Dɪᴀ 🌤',
    tarde: 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'
};
  global.saludo =
    hour < 4? saludos.noche:
    hour < 10? saludos.mañana:
    hour < 15? saludos.dia:
    hour < 18? saludos.tarde:
    saludos.noche;

  // Etiquetas
  global.nombre = m.pushName || 'Anónimo';
  global.taguser = '@' + m.sender.split('@')[0];
  global.readMore = String.fromCharCode(8206).repeat(850);

  // Contacto fake
  let pp = null;
  try {
    pp = await conn.profilePictureUrl('5491156178758@s.whatsapp.net', 'image');
} catch (e) {
    pp = null;
}

  global.fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
...(m.chat? { remoteJid: '120363402481697721@g.us'}: {})
},
    message: {
      contactMessage: {
        displayName: 'fedexyz owner 🍁',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;fedexyz owner🍁,;;;\nFN:DevBrayan creador\nitem1.TEL;waid=5491156178758:5491156178758\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        jpegThumbnail: pp? await (await fetch(pp)).buffer(): null,
        thumbnail: null,
        sendEphemeral: true
}
}
};

  // Canal visual
  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardingScore: 100,
      externalAdReply: {
        showAdAttribution: true,
        title: global.namechannel,
        body: global.namecomu,
        mediaUrl: null,
        description: null,
        previewType: 'PHOTO',
        thumbnailUrl: global.icono,
        sourceUrl: global.redes,
        mediaType: 1,
        renderLargerThumbnail: false
}
}
};
};

export default handler;

async function getRandomChannel() {
  const index = Math.floor(Math.random() * global.canalIdM.length);
  return {
    id: global.canalIdM[index],
    name: global.canalNombreM[index]
};
}
