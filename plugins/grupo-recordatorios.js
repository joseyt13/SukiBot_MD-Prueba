// 🌸 Código creado por fedexyz 🍁
// No quites créditos ⚔️

import fetch from 'node-fetch';
let recordatorios = {};

// 📡 Canal oficial de SukiBot_MD
const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 SukiBot_MD Canal Oficial'
};

// 📷 Imagen decorativa para el recordatorio
const imageURL = 'https://files.catbox.moe/nwgsz3.jpg';

async function handler(m, { args, command, conn, participants}) {
  const chatId = m.chat;

  // Cargar imagen como thumbnail decorativa
  const thumbBuffer = await fetch(imageURL).then(res => res.buffer());

  // Mensaje kawaii para citar con letra decorada
  const mensajeDecorado = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Suki_MD'
},
    message: {
      locationMessage: {
        name: '𝗥𝗘𝗖𝗢𝗥𝗗𝗔𝗧𝗢𝗥𝗜𝗢 𝗦𝗨𝗞𝗜𝗕𝗢𝗧_𝗠𝗗',
        jpegThumbnail: thumbBuffer
}
},
    participant: '0@s.whatsapp.net'
};

  if (command === 'recordatorio') {
    if (args.length < 2) return m.reply('🌸 Uso correcto: *!recordatorio [minutos] [mensaje]*');

    let tiempo = parseInt(args[0]);
    if (isNaN(tiempo) || tiempo <= 0) return m.reply('⏱️ El tiempo debe ser un número válido en minutos.');

    let mensaje = args.slice(1).join(' ');

    if (recordatorios[chatId]) clearTimeout(recordatorios[chatId].timeout);

    let contador = 0;
    function enviarRecordatorio() {
      if (contador < 2) {
        const mencionados = participants.map(u => u.id);
        conn.sendMessage(chatId, {
          text: `🔔 *𝗥𝗲𝗰𝗼𝗿𝗱𝗮𝘁𝗼𝗿𝗶𝗼 𝗦𝘂𝗸𝗶:*\n${mensaje}`,
          mentions: mencionados
}, { quoted: mensajeDecorado});

        contador++;
        recordatorios[chatId].timeout = setTimeout(enviarRecordatorio, tiempo * 60000);
} else {
        delete recordatorios[chatId];
}
}

    recordatorios[chatId] = {
      timeout: setTimeout(enviarRecordatorio, tiempo * 60000)
};

    m.reply(`✅ Recordatorio activado por *SukiBot_MD* 🌸\n📝 *${mensaje}*\n⏳ Cada ${tiempo} min\n📡 Canal: ${channelRD.name}`);
}

  if (command === 'cancelarrecordatorio') {
    if (recordatorios[chatId]) {
      clearTimeout(recordatorios[chatId].timeout);
      delete recordatorios[chatId];
      m.reply('❌ Recordatorio cancelado por *SukiBot_MD* 🌸');
} else {
      m.reply('🧋 No hay recordatorios activos en este grupo.');
}
}
}

handler.help = ['recordatorio', 'delrc'];
handler.tags = ['grupo'];
handler.command = ['recordatorio', 'delrd'];
handler.admin = true;
handler.group = true;

export default handler;
