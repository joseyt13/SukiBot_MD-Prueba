import moment from 'moment-timezone';

export async function before(m, { conn}) {
  try {
    const nombreBot = '𝖲𝗎𝗄𝗂𝖡𝗈𝗍 -  𝖬𝖣';
    const creador = '﹫𝖿𝖾𝖽𝖾𝗑𝗒𝗓';
    const zonaHoraria = 'America/Lima';

    const ahora = moment().tz(zonaHoraria);
    const fecha = ahora.format('dddd, DD [de] MMMM [de] YYYY');
    const hora = ahora.format('HH:mm:ss');

    const uptimeMs = process.uptime() * 1000;
    const tiempoActivo = clockString(uptimeMs);

    const descripcion = `『${nombreBot}』 | 🕒 Activo: ${tiempoActivo} | 📅 ${fecha} | ⏰ ${hora} | 👑 Dev: ${creador}`;

    await conn.updateProfileStatus(descripcion);
    console.log('[✅] Biografía actualizada automáticamente al iniciar SukiBot_MD.');
} catch (e) {
    console.error('[❌] Error al actualizar la biografía al iniciar:', e);
}
}

function clockString(ms) {
  const d = isNaN(ms)? '--': Math.floor(ms / 86400000);
  const h = isNaN(ms)? '--': Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  const s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [d, ' » ', h, ' ・ ', m, ' ・ ', s].map(v => v.toString().padStart(2, '0')).join('');
}
