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

  const match = /\|?(.*)([.|] *?)([0-9]*)$/i;
  const [_, nombre, __, edadTexto] = text.match(match) || [];

  if (!nombre ||!edadTexto) {
    return conn.reply(
      m.chat,
      `🌸 *Oh no~* Formato incorrecto 🍥\n\n🧃 Usa: *${usedPrefix + command} tuNombre.edad*\n✨ Ejemplo: *${usedPrefix + command} Nako.17*`,
      m
);
}

  const edad = parseInt(edadTexto);
  if (isNaN(edad) || edad < 5 || edad> 100) {
    return conn.reply(
      m.chat,
      `💫 Edad inválida, preciosura~ Debe estar entre *5 y 100 años kawaii* 🧁`,
      m
);
}

  // 🚫 Verificar si el nombre + edad ya existen registrados
  const yaRegistrado = Object.values(global.db.data.users).some(u => u.registered && u.name === nombre.trim() && u.age === edad);
  if (yaRegistrado) {
    return conn.reply(
      m.chat,
      `🚫 *Ese nombre con edad ya está registrado por otra preciosura.*\n🧃 Usa un nombre diferente o cambia tu edad.`,
      m
);
}

  // 🌸 Mensaje de inicio del registro
  await conn.sendMessage(m.chat, {
    text: `🎀 *Un momentito... Suki_Bot_MD está iniciando tu perfil mágico~*`,
}, { quoted: m});

  // 🪄 Guardar datos
  user.name = nombre.trim();
  user.age = edad;
  user.regTime = Date.now();
  user.registered = true;
  user.exp += 300;

  const sn = generarID(m.sender);

  const mensaje = `
꒰🌸꒱ *Registro completado con Suki_Bot_MD* 🍓

👩‍💻 Nombre: *${user.name}*
🎂 Edad: *${user.age}* años kawaii
🧁 ID encantado: *${sn}*

🌐 Tu energía mágica ha sido sincronizada con *Suki nako ga~*
📢 Sigue el canal oficial para sorpresas mágicas:
${channelRD}

✨ Usa *#perfil* para ver tu progreso encantado.
🌈 ¡Tu aventura apenas comienza, preciosura~!*`.trim();

  await m.react('🧋');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🌷 Bienvenida a Suki_Bot_MD',
        body: 'Tu corazón está enlazado al canal de magia',
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
