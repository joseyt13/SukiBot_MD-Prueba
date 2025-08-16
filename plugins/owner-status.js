import moment from 'moment-timezone';

let handler = async function (m, { conn, command}) {
  const setting = global.db.data.settings[conn.user.jid];
  const INTERVAL = 30 * 60 * 1000; // 30 minutos

  // Si autobio está activo y no ha pasado el intervalo, no actualiza
  if (command!== 'status' && setting.autobio && (new Date() - setting.autobio < INTERVAL)) return;

  let _uptime = process.uptime() * 1000;
  let _muptime;

  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 2000);
}) * 1000;
}

  const uptime = clockString(_muptime || _uptime);
  const fecha = moment().tz('America/Lima').format('dddd, DD [de] MMMM [de] YYYY');
  const hora = moment().tz('America/Lima').format('HH:mm:ss');

  const bio = `『SukiBot_MD』 | 🕒 Activo: ${uptime} | 📅 ${fecha} | 🧭 ${hora} | 👑 Dev: Fedexyz`;

  try {
    await conn.updateProfileStatus(bio);
    if (command === 'status') m.reply('✅ Estado actualizado con éxito por SukiBot_MD.');
    setting.autobio = new Date() * 1;
} catch (e) {
    console.error('[❌] Error al actualizar el estado:', e);
    if (command === 'status') m.reply('❎ Suki se tropezó entre pétalos. Intenta de nuevo.');
}
};

handler.help = ['status'];
handler.tags = ['owner'];
handler.command = ['status'];
handler.owner = true;
handler.all = handler;

export default handler;

// Función auxiliar para formatear tiempo
function clockString(ms) {
  const d = isNaN(ms)? '--': Math.floor(ms / 86400000);
  const h = isNaN(ms)? '--': Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  const s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [d, ' » ', h, ' ・ ', m, ' ・ ', s].map(v => v.toString().padStart(2, '0')).join('');
