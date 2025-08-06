let handler = async (m, { conn}) => {
  const user = global.db.data.users[m.sender];
  if (!user) return;

  const cooldown = 2 * 60 * 60 * 1000; // 2 horas
  const now = Date.now();
  const nextClaim = user.lastclaim + cooldown;

  if (now < nextClaim) {
    const restante = msToTime(nextClaim - now);
    return conn.reply(m.chat, `⏳ Recompensa no disponible aún.\nVuelve en *${restante}*.`, m);
}

  // Recompensas aleatorias
  const coin = randomBetween(100, 500);
  const exp = randomBetween(100, 500);
  const diamond = randomBetween(100, 500);

  // Suma recompensas
  user.coin += coin;
  user.exp += exp;
  user.diamond += diamond;
  user.lastclaim = now;

  const mensaje = `
🎁 *Recompensa Diaria*

✨ *Experiencia*: +${exp}
💎 *Diamantes*: +${diamond}
💸 *Monedas*: +${coin}
`.trim();

  await conn.reply(m.chat, mensaje, m);
};

handler.command = ['daily', 'diario'];
handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.group = true;
handler.register = true;

export default handler;

// Funciones auxiliares
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function msToTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);
  return `${hours}h ${minutes}m`;
}
