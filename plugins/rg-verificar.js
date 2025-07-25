import { createHash} from 'crypto';

function generarID(sender) {
  return createHash('md5').update(sender).digest('hex');
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender];

  if (user.registered) {
    return m.reply(`🩵 ¡Ya estás parte del mundo mágico de *Suki_Bot_MD*!\n✨ Si deseas reiniciar tu aventura, escribe: *${usedPrefix}unreg*`);
}

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i;
  let [_, name, __, age] = text.match(match) || [];

  if (!name ||!age) {
    return m.reply(`🌸 ¡Oh no~! Formato incorrecto 🍥\n\n📖 Usa: *${usedPrefix + command} tuNombre.edad*\n✨ Ejemplo: *${usedPrefix + command} Nako.17*`);
}

  age = parseInt(age);
  if (isNaN(age) || age < 5 || age> 100) {
    return m.reply(`💫 Edad inválida~ Debe estar entre *5 y 100 años kawaii*.`);
}

  // 🧋 Registro dulce oficial
  user.name = name.trim();
  user.age = age;
  user.regTime = Date.now();
  user.registered = true;
  user.exp += 300;

  const sn = generarID(m.sender);

  const mensaje = `
꒰🌸꒱ *Registro exitoso con Suki_Bot_MD* ✨

👩‍💻 Nombre: *${user.name}*
🎂 Edad: *${user.age}* años
🧁 ID Encantado: *${sn}*

💖 ¡Tu aura está conectada al corazón de Suki!
🧃 Usa *#perfil* para ver tu progreso mágico~`.trim();

  await m.react('🧋');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🍓 Registro Completado en Suki_Bot_MD',
        body: 'Tu viaje kawaii ha comenzado~',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: 'https://github.com/TuProyectoSuki',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.help = ['reg'];
handler.tags = ['registro', 'rg'];
handler.command = ['register', 'reg', 'registrar'];
export default handler;
