// Código creado y mejorado por fedexyz 🍁
// no quites los créditos 🍂

import { createHash} from 'crypto';

const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';
const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

function generarID(sender) {
  return createHash('md5').update(sender).digest('hex');
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const user = global.db.data.users[m.sender];
  const name = conn.getName(m.sender);

  if (user.registered) {
    return conn.reply(
      m.chat,
      `🩷 *Preciosura ${name}~ ya estás registrada en el mundo mágico de Suki_Bot_MD*\n\n🌙 Si deseas reiniciar tu aventura, escribe:\n✨ *${usedPrefix}unreg*`,
      m
);
}

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i;
  let [_, nombre, __, edad] = text.match(match) || [];

  if (!nombre ||!edad) {
    return conn.reply(
      m.chat,
      `🌸 *Oh no~* Formato incorrecto 🍥\n\n🧃 Usa: *${usedPrefix + command} tuNombre.edad*\n✨ Ejemplo: *${usedPrefix + command} Nako.17*`,
      m
);
}

  edad = parseInt(edad);
  if (isNaN(edad) || edad < 5 || edad> 100) {
    return conn.reply(
      m.chat,
      `💫 Edad inválida, preciosura~ Debe estar entre *5 y 100 años kawaii* 🧁`,
      m
);
}

  // 🌀 Inicio del registro
  await conn.sendMessage(m.chat, {
    text: `🌸 *Iniciando registro de perfil mágico...*`,
}, { quoted: m});

  // Guardar datos
  user.name = nombre.trim();
  user.age = edad;
  user.regTime = Date.now();
  user.registered = true;
  user.exp += 300;

  const sn = generarID(m.sender);

  // 🧋 Mensaje final de registro
  const mensaje = `
꒰🌸꒱ *Registro exitoso con Suki_Bot_MD* ✨

👩‍💻 Nombre: *${user.name}*
🎂 Edad: *${user.age}* años
🧁 ID Encantado: *${sn}*

💖 ¡Tu aura está conectada al corazón de Suki nako ga~!
🧋 Usa *#perfil* para ver tu progreso mágico ✨`.trim();

  await m.react('🧋');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🍓 Registro Completado en Suki_Bot_MD',
        body: 'Tu viaje kawaii ha comenzado~',
        thumbnailUrl: sukiIcon,
        sourceUrl: channelRD,
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
