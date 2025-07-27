import fetch from 'node-fetch';

const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';
const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg'; // Imagen personalizada

let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    throw `
🐉 *Suki nako ga está lista para ayudarte* 💮

💖 Por favor escribe el nombre de la aplicación que deseas instalar.
🧸 Ejemplo:
${usedPrefix + command} Clash Royale

🍙 ¡Déjalo en mis manos, preciosura!`.trim();
}

  let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(args[0])}`);
  let result = await res.json();

  if (!result?.dllink) {
    throw '🌪️ Suki no pudo encontrar esa app... ¿Me das otro nombre más claro, porfa~? 🩵';
}

  let { name, size, lastUpdate, dllink: URL, package: packe} = result;

  let preparing = `
\`\`\`
🌸 Descargando aplicación kawaii... Por favor espera 🌸
     – Suki_Bot_MD te lo trae con cariño –
\`\`\``.trim();

  await conn.sendFile(m.chat, sukiIcon, 'suki-icon.jpg', preparing, m);

  await conn.sendMessage(m.chat, {
    document: { url: URL},
    mimetype: 'application/vnd.android.package-archive',
    fileName: `${name}.apk`,
    caption: `📦 *${name}* ha sido descargada exitosamente 💖

🪄 ¡Tu aventura comienza al instalarla, preciosura~!`,
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

handler.command = ['apk2', 'dapk2'];
handler.group = false;
handler.help = ['apk2'];
handler.tags = ['Descargas'];

export default handler;
