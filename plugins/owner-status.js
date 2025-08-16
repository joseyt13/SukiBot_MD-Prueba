import moment from 'moment-timezone';

let handler = async function (m, { conn, command}) {
  const nombreBot = '𝖲𝗎𝗄𝗂𝖡𝗈𝗍 -  𝖬𝖣';
  const creador = '﹫𝖿𝖾𝖽𝖾𝗑𝗒𝗓';
  const zonaHoraria = 'America/Lima';

  const ahora = moment().tz(zonaHoraria);
  const fecha = ahora.format('dddd, DD [de] MMMM [de] YYYY');
  const hora = ahora.format('HH:mm:ss');

  const uptimeMs = process.uptime() * 1000;
  const tiempoActivo = clockString(uptimeMs);

  const descripcion = `『${nombreBot}』 | 🕒 Activo: ${tiempoActivo} | 📅 ${fecha} | ⏰ ${hora} | 👑 Dev: ${creador}`;

  try {
    await conn.updateProfileStatus(descripcion);
    if (command === 'statusbot') m.reply('✅ Biografía actualizada con éxito por 𝖲𝗎𝗄𝗂Bot_MD.');
    console.log('[✅] Biografía actualizada.');
} catch (e) {
    console.error('[❌] Error al actualizar la biografía:', e);
    if (command === 'statusbot') m.reply('❎ Suki se tropezó entre pétalos. Intenta de nuevo.');
}
};

// Se ejecuta automáticamente al iniciar el bot
handler.all = async function ({ conn}) {
  const nombreBot = '𝖲𝗎𝗄𝗂Bot_MD';
  const creador = 'Fedexyz';
  const zonaHoraria = 'America/Lima';

  const ahora = moment().tz(zonaHoraria);
  const fecha = ahora.format('dddd, DD [de] MMMM [de] YYYY');
  const hora = ahora.format('HH:mm:ss');

  const uptimeMs = process.uptime() * 1000;
  const tiempoActivo = clockString(uptimeMs);

  const descripcion = `『${nombreBot}』 | 🕒 Activo: ${tiempoActivo} | 📅 ${fecha} | ⏰ ${hora} | 👑 Dev: ${creador}`;

  try {
    await conn.updateProfileStatus(descripcion);
    console.log('[✅] Biografía actualizada automáticamente al iniciar.');
} catch (e) {
    console.error('[❌] Error al actualizar la biografía al iniciar:', e);
}
};

handler.help = ['statusbot'];
handler.tags = ['owner'];
handler.command = ['statusbot'];
handler.owner = true;

export default handler;

// Función auxiliar para formatear tiempo
function clockString(ms) {
  const d = isNaN(ms)? '--': Math.floor(ms / 86400000);
  const h = isNaN(ms)? '--': Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  const s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [d, ' » ', h, ' ・ ', m, ' ・ ', s].map(v => v.toString().padStart(2, '0')).join('');
}
