export async function before(m, { conn}) {
  try {
    if (!m.text ||!global.prefix ||!global.prefix.test(m.text)) return;

    const metanombre = global.metanombre || '𓆩 SukiBot_MD 🌸';
    const creador = 'ꜰᴇᴅᴇxʏᴢ';
    const Buffer = global.Buffer || ((...args) => new Uint8Array(...args));

    // Añadir método getRandom si no existe
    if (!Array.prototype.getRandom) {
      Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
};
}

    // Contacto decorativo
    global.fkontak = {
      key: { participant: '0@s.whatsapp.net'},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${metanombre}\nORG:${creador}\nEND:VCARD`
}
}
};

    // Mensaje falso decorado
    global.fakeMetaMsg = {
      key: {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: 'FFAC1BC46FF49C35',
        participant: '0@s.whatsapp.net'
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${metanombre}\nORG:Reino Encantado\nEND:VCARD`,
          jpegThumbnail: Buffer.from([]),
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true
}
}
}
};

    const usedPrefix = global.prefix.exec(m.text)[0];
    const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
    if (!command || command === 'bot') return;

    const isValid = Object.values(global.plugins).some(p =>
      p?.command && (Array.isArray(p.command)? p.command: [p.command]).includes(command)
);

    const chat = global.db.data.chats[m.chat];
    const user = global.db.data.users[m.sender];

    if (isValid) {
      if (chat?.isBanned) {
        return conn.sendMessage(m.chat, {
          text: `🔒 *${metanombre}* está silenciado en este grupo.\n🌸 Usa *${usedPrefix}bot on* para activarlo.`,
          quoted: global.fakeMetaMsg
});
}

      if (user) {
        user.commands = (user.commands || 0) + 1;
        user.lastCommand = command;
        user.lastActive = Date.now();
        user.errores = 0; // Reinicia contador de errores
}
} else {
      const cmd = m.text.trim().split(' ')[0];
      const errores = (user.errores = (user.errores || 0) + 1);

      let respuesta;
      if (errores>= 3) {
        respuesta = `
🚫 *¿Estás bien?*
Has escrito mal los comandos *${errores} veces seguidas*.
🌸 Usa *${usedPrefix}menu* antes de seguir lanzando hechizos fallidos.

🧁 SukiBot_MD también se cansa de tus intentos fallidos.
`.trim();
} else {
        respuesta = `
❌ El hechizo *${cmd}* no existe.

🌷 Usa *${usedPrefix}menu* para ver tus poderes disponibles.
🧁 Si necesitas ayuda, puedes usar *${usedPrefix}ayuda*.
`.trim();
}

      return conn.sendMessage(m.chat, { text: respuesta}, { quoted: global.fakeMetaMsg});
}
} catch (e) {
    console.error(`⚠️ Error en before: ${e}`);
    await m.reply(`💥 Ups... ocurrió un error mágico.\n🔧 Detalles: ${e.message}`);
}
}
