// Mapa para guardar el estado del bot por grupo
const estadoBot = new Map();

const handler = async (m, { conn, command}) => {
  const idGrupo = m.chat;

  if (!m.isGroup) return conn.reply(m.chat, '🚫 *Este comando solo funciona en grupos.*', m);

  if (command === 'botoff') {
    estadoBot.set(idGrupo, false);
    return conn.reply(m.chat, '❎ *El bot ha sido desactivado en este grupo.*', m);
}

  if (command === 'boton') {
    estadoBot.set(idGrupo, true);
    return conn.reply(m.chat, '✅ *El bot ha sido activado en este grupo.*', m);
}
};

// Middleware para ignorar comandos si el bot está desactivado en el grupo
handler.before = async (m) => {
  if (m.isGroup && estadoBot.has(m.chat) && estadoBot.get(m.chat) === false) {
    return!1; // Ignora el mensaje
}
};

handler.command = ['botoff', 'boton'];
handler.tags = ['group'];
handler.group = true;
handler.admin = true; // Solo admins pueden usarlo

export default handler;
