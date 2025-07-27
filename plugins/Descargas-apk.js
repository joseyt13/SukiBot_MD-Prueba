import fetch from 'node-fetch';

const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';
const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    throw `
🐉 *Suki nako ga necesita un nombre~* 💮

💖 Por favor escribe el nombre de la app que deseas instalar.
🧸 Ejemplo:
${usedPrefix + command} Clash Royale

🍡 ¡Suki la buscará con todo su kokoro!`.trim();
}

  const res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(args[0])}`);
  const result = await res.json();

  if (!result ||!result.dllink) {
    throw '💔 Lo siento, preciosura... No encontré esa app.\n🌸 Intenta con un nombre más claro o verifica la ortografía~';
}

  const { name, size, lastUpdate, icon, dllink: URL, package: packe} = result;

  const texto = `
\`\`\`
🌺 Descargando aplicación... por favor espera 🌺
   – Suki_Bot_MD está en acción –
\`\`\``.trim();

  await conn.sendFile(m.chat, sukiIcon, 'suki-icon.jpg', texto, m);

  await conn.sendMessage(m.chat, {
    document: { url: URL},
    mimetype: 'application/vnd.android.package-archive',
    fileName: `${name}.apk`,
    caption: `📦 *${name}* fue descargada exitosamente 💖\n\n🧋 ¡Instálala y empieza tu aventura, preciosura!`,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: '✨ Suki nako ga | Descarga de App',
        body: 'Archivo APK listo para instalar 🌸',
        thumbnailUrl: sukiIcon,
        sourceUrl: channelRD,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.command = ['apk', 'dapk'];
handler.group = false;
handler.help = ['apk'];
handler.tags = ['descargas'];

export default handler;
