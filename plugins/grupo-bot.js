// Mapa para guardar el estado del bot por grupo
const estadoBot = new Map();

const handler = async (m, { conn, command}) => {
  const idGrupo = m.chat;

  if (!m.isGroup) return conn.reply(m.chat, '🚫 *Este comando solo funciona en grupos.*', m);

  if (command === 'botoff') {
    estadoBot.set(idGrupo, false);
    return conn.reply(m.chat, '❎ *El bot ha sido desactivado en este grupo.*\n🔕 No responderá a comandos hasta que se active con *.boton*', m);
}

  if (command === 'boton') {
    estadoBot.set(idGrupo, true);
    return conn.reply(m.chat, '✅ *El bot ha sido activado en este grupo.*\n🌟 Ya puedes usar comandos normalmente.', m);
}
};

// Middleware global para bloquear comandos si el bot está desactivado
handler.all = async function (m, { isCommand}) {
  if (!m.isGroup ||!isCommand) return;

  const estado = estadoBot.get(m.chat);
  if (estado === false) {
    return!1; // Ignora el comando
}
};

handler.command = ['botoff', 'boton'];
handler.tags = ['grupo'];
handler.group = true;
handler.admin = true; // Solo admins pueden usarlo

export default handler;
