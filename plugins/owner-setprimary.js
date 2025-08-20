const fs = require('fs');
const path = require('path');

const PRIMARY_FILE = path.join(__dirname, '../database/primaryBots.json');

// Cargar datos persistentes
let primaryBots = [];
if (fs.existsSync(PRIMARY_FILE)) {
  try {
    primaryBots = JSON.parse(fs.readFileSync(PRIMARY_FILE));
} catch (err) {
    console.error('Error al leer primaryBots.json:', err);
    primaryBots = [];
}
}

// Guardar cambios
function savePrimaryBots() {
  fs.writeFileSync(PRIMARY_FILE, JSON.stringify(primaryBots, null, 2));
}

let handler = async (m, { command, args, isOwner, conn}) => {
  const botId = args[0];
  if (!isOwner) {
    return m.reply('❌ Solo el dueño puede usar este comando.');
}

  if (!botId) {
    return m.reply('❌ Debes proporcionar el ID o número del sub-bot.');
}

  if (command === 'setprimary') {
    if (primaryBots.includes(botId)) {
      return m.reply(`⚠️ El sub-bot ${botId} ya está marcado como primario.`);
}
    primaryBots.push(botId);
    savePrimaryBots();
    return m.reply(`✅ El sub-bot ${botId} ha sido marcado como bot primario.`);
}

  if (command === 'delprimary') {
    if (!primaryBots.includes(botId)) {
      return m.reply(`⚠️ El sub-bot ${botId} no está marcado como primario.`);
}
    primaryBots = primaryBots.filter(id => id!== botId);
    savePrimaryBots();
    return m.reply(`🗑️ El sub-bot ${botId} ha sido removido como bot primario.`);
}
};

handler.command = ['setprimary', 'delprimary'];
handler.owner = true; // Solo el dueño puede usarlo
handler.help = ['setprimary <id>', 'delprimary <id>'];
handler.tags = ['owner'];

module.exports = handler;
