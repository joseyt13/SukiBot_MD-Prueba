// 🧠 Código adaptado por @fedexyz 🍁 No quites créditos ⚔️

import {
  readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync,
  promises as fsPromises
} from 'fs';
const fs = {...fsPromises, existsSync};
import path from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
  const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isPauseBot = /^(stop|pausarbot|detenersuki)$/i.test(command);
  const isListBots = /^(bots|listjadibots|subbots|sukibots)$/i.test(command);

  const reportError = async (e) => {
    await m.reply(`❌ Ups... algo falló en el sistema de SukiBot_MD 🌸`);
    console.error(e);
};

  switch (true) {
    case isDeleteSession: {
      const mentionedJid = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
      const uniqid = mentionedJid.split('@')[0];
      const sessionPath = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(sessionPath)) {
        await conn.sendMessage(m.chat, {
          text: `📦 No se encontró ninguna sesión activa.
🧋 Usa: *${usedPrefix}${command}*
🆔 Si tienes ID, puedes ejecutar:\n${usedPrefix + command} \`\`\`(ID)\`\`\``
}, { quoted: m});
        return;
}

      if (global.conn.user.jid!== conn.user.jid) {
        await conn.sendMessage(m.chat, {
          text: `🔐 Este comando solo está disponible desde el bot principal.
🌸 Pulsa aquí para ir al core:\nhttps://wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}${command}`
}, { quoted: m});
        return;
}

      await conn.sendMessage(m.chat, {
        text: `💫 Sesión SukiBot_MD finalizada.
📚 El vínculo escolar fue cerrado correctamente.`
}, { quoted: m});

      try {
        fs.rmdir(`./${jadi}/${uniqid}`, { recursive: true, force: true});
        await conn.sendMessage(m.chat, {
          text: `✅ SubBot eliminado.
🧋 La unidad ha sido desconectada del grupo de estudio.`
}, { quoted: m});
} catch (e) {
        reportError(e);
}
      break;
}

    case isPauseBot: {
      if (global.conn.user.jid === conn.user.jid) {
        conn.reply(m.chat, `👑 Eres el bot principal, y no puedes ser pausado por ti mismo 💅`, m);
} else {
        await conn.reply(m.chat, `💤 SubBot detenido.
🧃 SukiBot_MD ha pausado este nodo temporalmente.`, m);
        conn.ws.close();
}
      break;
}

    case isListBots: {
      const botsActivos = global.conns.filter(conn =>
        conn.user && conn.ws.socket && conn.ws.socket.readyState!== ws.CLOSED
);

      const formatUptime = (ms) => {
        const seg = Math.floor(ms / 1000),
              min = Math.floor(seg / 60),
              hr = Math.floor(min / 60),
              day = Math.floor(hr / 24);
        return `${day? `${day}d `: ''}${hr % 24}h ${min % 60}m ${seg % 60}s`;
};

      const listado = botsActivos.map((bot, i) => {
        const jid = bot.user.jid.replace(/[^0-9]/g, '');
        return `📖 「 ${i + 1} 」
👤 Nombre: ${bot.user.name || 'SubBot'}
⏱️ Activo: ${bot.uptime? formatUptime(Date.now() - bot.uptime): 'Desconocido'}
📎 Enlace: https://wa.me/${jid}?text=${usedPrefix}serbot%20--code`;
}).join('\n\n🍓──────────────────🍓\n\n');

      const mensajeFinal = `🌸 *SukiBot_MD | SubBots en línea*

🧋 ¿Quieres conectarte como ayudante pastelcore?
Pulsa en alguno de los enlaces y únete a la clase 🍑

📊 SubBots activos: *${botsActivos.length || '0'}*

${listado || '🚫 Ningún SubBot está en línea en este momento.'}`;

      await _envio.sendMessage(m.chat, {
        text: mensajeFinal,
        mentions: _envio.parseMention(mensajeFinal)
}, { quoted: m});
      break;
}
}
};

handler.command = [
  'deletesesion', 'deletebot', 'deletesession', 'deletesesaion',
  'stop', 'pausarbot', 'detenersuki',
  'bots', 'listjadibots', 'subbots', 'sukibots'
];

export default handler;
