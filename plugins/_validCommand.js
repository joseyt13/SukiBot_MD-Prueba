import fetch from 'node-fetch'; // Asegurate de tener node-fetch instalado si usás Node <18

export async function before(m, { conn}) {
  try {
    if (!m.text ||!global.prefix ||!global.prefix.test(m.text)) return;

    const metanombre = global.metanombre || '𓆩 SᴜᴋɪBᴏᴛ_ᴍᴅ 🌸';
    const creador = 'ꜰᴇᴅᴇxʏᴢ';
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
          quoted: { key: { fromMe: false, participant: '0@s.whatsapp.net'}, message: { conversation: metanombre}}
});
}

      if (user) {
        user.commands = (user.commands || 0) + 1;
        user.lastCommand = command;
        user.lastActive = Date.now();
        user.errores = 0;
}
} else {
      const errores = (user.errores = (user.errores || 0) + 1);
      const thumbnail = await (await fetch('https://files.catbox.moe/rkvuzb.jpg')).buffer();

      const mensaje = errores>= 3
? `🚫 *¿Estás bien?*\nHas escrito mal los comandos *${errores} veces seguidas*.\n🌸 Usa *${usedPrefix}menu* para ver tus hechizos disponibles.\n🧁 *${metanombre}* también se cansa de tus intentos fallidos.`
: `❌ El hechizo *${command}* no existe.\n🌷 Usa *${usedPrefix}menu* para ver tus poderes disponibles.\n🧁 Si necesitas ayuda, puedes usar *${usedPrefix}ayuda*.`;

      await conn.sendMessage(m.chat, {
        image: thumbnail,
        caption: mensaje,
        footer: 'SᴜᴋɪBᴏᴛ_ᴍᴅ 🍓',
        buttons: [
          { buttonId: '.menu', buttonText: { displayText: '📜 Ver Menú'}, type: 1}
        ],
        headerType: 4
}, { quoted: m});
}
} catch (e) {
    console.error(`⚠️ Error en validCommand.js: ${e}`);
    await m.reply(`💥 Ups... ocurrió un error mágico.\n🔧 Detalles: ${e.message}`);
}
}
