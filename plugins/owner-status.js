import moment from 'moment-timezone';

let handler = async function (m, { conn}) {
  // Configuración personalizada
  const nombreBot = '𝖲𝗎𝗄𝗂Bot_MD';
  const creador = 'Fedexyz';
  const zonaHoraria = 'America/Lima';

  // Obtener fecha y hora actual
  const ahora = moment().tz(zonaHoraria);
  const fecha = ahora.format('dddd, DD [de] MMMM [de] YYYY');
  const hora = ahora.format('HH:mm:ss');

  // Calcular tiempo activo
  const uptimeMs = process.uptime() * 1000;
  const tiempoActivo = clockString(uptimeMs);

  // Construir descripción
  const descripcion = `『${nombreBot}』 | 🕒 Activo: ${tiempoActivo} | 📅 ${fecha} | ⏰ ${hora} | 👑 Dev: ${creador}`;

  try {
    await conn.updateProfileStatus(descripcion);
    m.reply('✅ Descripción actualizada con éxito por 𝖲𝗎𝗄𝗂Bot_MD.');
} catch (e) {
    console.error('[❌] Error al actualizar la descripción:', e);
    m.reply('❎ 𝖲𝗎𝗄𝗂 se tropezó entre pétalos. Intenta de nuevo.');
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
