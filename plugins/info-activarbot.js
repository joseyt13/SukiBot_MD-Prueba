// Variables globales para el estado del bot
global.botActivoPrivado = true; // estado por defecto en privado
global.botActivoGrupo = true;   // estado por defecto en grupos

const creadorJID = '5491156178758@s.whatsapp.net'; // tu número como creador (formato WhatsApp)

let handler = async (m, { command, isGroup}) => {
  const sender = m.sender;
  const isCreador = sender === creadorJID;

  // Comandos para chats privados
  if (!isGroup) {
    if (command === 'activarbot') {
      if (!isCreador) return;
      global.botActivoPrivado = true;
      return m.reply('✅ Bot activado en chat privado.');
}
    if (command === 'desactivarbot') {
      if (!isCreador) return;
      global.botActivoPrivado = false;
      return m.reply('⛔ Bot desactivado en chat privado. Solo el creador puede usar comandos.');
}

    // Si está desactivado y no es el creador
    if (!global.botActivoPrivado &&!isCreador) {
      return m.reply('⚠️ El bot está desactivado aquí. Solo el creador puede usar comandos.');
}
}

  // Comandos para grupos
  if (isGroup) {
    if (command === 'grupobot') {
      if (!isCreador) return;
      let arg = (m.text || '').trim().toLowerCase();
      if (arg === 'on') {
        global.botActivoGrupo = true;
        return m.reply('✅ Bot activado en este grupo.');
}
      if (arg === 'off') {
        global.botActivoGrupo = false;
        return m.reply('⛔ Bot desactivado en este grupo. Solo el creador puede usar comandos.');
}
}

    // Si está desactivado y no es el creador
    if (!global.botActivoGrupo &&!isCreador) {
      return m.reply('⚠️ El bot está desactivado en este grupo. Solo el creador puede usar comandos.');
}
}

  // Si llegó aquí, es un comando permitido
};

handler.command = ['activarbot', 'desactivarbot', 'grupobot'];
export default handler;
