export async function before(m, { conn}) {
  try {
    if (!m.text ||!global.prefix ||!global.prefix.test(m.text)) return;

    const Buffer = global.Buffer || ((...args) => new Uint8Array(...args));
    const metanombre = global.metanombre || 'Suki_Bot_MD';

    if (!Array.prototype.getRandom) {
      Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
};
}

    global.fkontak = {
      key: {
        participant: '0@s.whatsapp.net',
...(m.chat? { remoteJid: 'status@broadcast'}: {})
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${metanombre},;;;\nFN:${metanombre}\nEND:VCARD`,
          sendEphemeral: true
}
}
};

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
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Suki_Bot_MD\nORG:Reino de los Encantamientos\nEND:VCARD`,
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
    if (!command) return;

    const validCommand = (cmd, plugins) => {
      return Object.values(plugins).some(plugin =>
        plugin?.command &&
        (Array.isArray(plugin.command)? plugin.command: [plugin.command]).includes(cmd)
);
};

    if (command === 'bot') return;

    if (validCommand(command, global.plugins)) {
      const chat = global.db.data.chats[m.chat];
      const user = global.db.data.users[m.sender];

      if (chat?.isBanned) {
        const reply = {
          text: `🔒 Oh no~ *Suki_Bot_MD* ha sido silenciada aquí…\n🌸 Solo un *guardian celestial* puede restaurarla con:\n🎀 *${usedPrefix}bot on*`,
          contextInfo: {
            mentionedJid: [m.sender]
}
};

        try {
          await conn.sendMessage(m.chat, reply, { quoted: global.fakeMetaMsg});
} catch {
          await m.reply(`🌸 *Suki_Bot_MD* está dormidita en este chat.\n✨ Usa *${usedPrefix}bot on* para despertarla~`);
}
        return;
}

      if (user) user.commands = (user.commands || 0) + 1;

} else {
      const comando = m.text.trim().split(' ')[0];
      const reply = {
        text: `💫 El hechizo *${comando}* no está en el grimorio mágico...\n🧁 Consulta el menú con *${usedPrefix}menu* para ver tus poderes disponibles 🌷`,
        contextInfo: {
          mentionedJid: [m.sender]
}
};

      try {
        await conn.sendMessage(m.chat, reply, { quoted: global.fakeMetaMsg});
} catch {
        await m.reply(`❌ El comando *${comando}* no existe por ahora~\n🪄 Revisa el panel con *${usedPrefix}menu* para ver qué puedes invocar!`);
}
}

} catch (error) {
    console.error(`⚠️ Error en validCommand.js de Suki_Bot_MD: ${error}`);
}
}
