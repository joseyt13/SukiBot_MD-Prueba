import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) throw `💮 Ingresa el nombre de la aplicación que deseas descargar.\nEjemplo:\n${usedPrefix + command} Clash Royale`;

  const res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(args[0])}`);
  const result = await res.json();

  if (!result?.dllink) throw `❌ No encontré esa app.\n🌸 Intenta con otro nombre más claro~`;

  const { name, dllink: URL} = result;

  await conn.sendMessage(m.chat, {
    document: { url: URL},
    mimetype: 'application/vnd.android.package-archive',
    fileName: `${name}.apk`,
    caption: `📦 *${name}* descargada correctamente 💖`,
}, { quoted: m});
};

handler.command = ['apk'];
export default handler;
