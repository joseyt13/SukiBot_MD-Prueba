let activarAntiprivado = false; // Estado inicial del sistema

const handler = async (m, { conn, command}) => {
  const isPrivate =!m.isGroup;

  // Activar el sistema con.antiprivado
  if (command === 'antiprivado') {
    activarAntiprivado = true;
    return conn.reply(m.chat, '✅ *Antiprivado activado.*\n🔒 Los usuarios que escriban al bot en privado serán bloqueados automáticamente.', m);
}

  // Desactivar el sistema con.delantiprivado
  if (command === 'delantiprivado') {
    activarAntiprivado = false;
    return conn.reply(m.chat, '❎ *Antiprivado desactivado.*\n🔓 El bot ya no bloqueará en privado.', m);
}

  // Si está activado y el mensaje es privado (y no es del dueño)
  if (activarAntiprivado && isPrivate &&!m.fromMe) {
    await conn.reply(m.chat, `
👋 ¡Hola!

🚫 *Mi creador ha desactivado los comandos en privado.*

🔒 *Serás bloqueado permanentemente por seguridad.*

📌 *Únete al grupo oficial para usar el bot:*
https://chat.whatsapp.com/Bt6O68OzrIN28UZz5Ka1hV
`, m);

    await conn.updateBlockStatus(m.sender, 'block');
}
};

handler.command = ['antiprivado', 'delantiprivado'];
handler.tags = ['owner'];
handler.rowner = true; // Solo el dueño puede usar estos comandos

export default handler;
