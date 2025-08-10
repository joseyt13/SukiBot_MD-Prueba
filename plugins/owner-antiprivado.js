const handler = async (m, { conn}) => {
  // Detecta si el mensaje es privado y no es del dueño del bot
  if (!m.isGroup &&!m.fromMe) {
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

handler.all = true; // Se ejecuta en todos los mensajes
export default handler;
