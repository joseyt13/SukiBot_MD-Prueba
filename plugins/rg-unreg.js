let handler = async (m, { conn}) => {
  const user = global.db.data.users[m.sender];

  if (!user.registered) {
    return m.reply(`🛑 Aún no te has unido al mundo mágico de *Suki_Bot_MD*~\n\n✨ Para comenzar tu aventura escribe:\n*.reg TuNombre Edad*\n🍓 Ejemplo: *.reg Nako 16*`);
}

  const nombre = user.name || 'Desconocido';
  const edad = user.age || '???';

  // 💨 Resetear datos del usuario
  user.registered = false;
  user.name = '';
  user.age = 0;
  user.regTime = -1;
  user.exp = 0;
  user.money = 0;

  let pp = 'https://files.catbox.moe/07fyj3.jpg';
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
} catch (e) {}

  await conn.sendMessage(m.chat, {
    text: `
🍂 *Tu aura ha sido liberada exitosamente* 🍃

👩‍💻 Nombre anterior: *${nombre}*
🎂 Edad: *${edad} años*

🌷 Esperamos verte de nuevo, estrellita~

✨ Puedes registrarte nuevamente escribiendo:
*.reg TuNombre Edad*
`.trim(),
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '🩵 Registro Eliminado en Suki_Bot_MD',
        body: `Nombre: ${nombre} • Edad: ${edad} años`,
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: pp
}
}
}, { quoted: m});
};

handler.command = ['unreg', 'únreg', 'deleteprofile'];
handler.register = true;

export default handler;
