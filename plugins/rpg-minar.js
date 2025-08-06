let handler = async (m, { conn}) => {
  let user = global.db.data.users[m.sender];
  if (!user) return;

  const cooldown = 10 * 60 * 1000; // 10 minutos
  const now = Date.now();
  const remaining = user.lastmiming + cooldown - now;

  if (remaining> 0) {
    return conn.reply(
      m.chat,
      `🕒 Debes esperar ${msToTime(remaining)} para volver a minar.`,
      m
);
}

  // Recursos aleatorios
  const coin = pickRandom([5, 7, 20, 40, 50, 70, 88, 90, 300, 999]);
  const emerald = pickRandom([1, 5, 7, 8]);
  const iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 40, 60, 80]);
  const gold = pickRandom([5, 7, 20, 40, 50, 88]);
  const coal = pickRandom([5, 7, 20, 40, 50, 64, 60, 80, 100, 120, 600, 700]);
  const stone = pickRandom([200, 300, 500, 700, 800, 900, 4000]);
  const exp = Math.floor(Math.random() * 1000);

  const image = 'https://qu.ax/JguPr.jpg';
  const message = `
⛏️ *¡Has descendido en las cavernas!*
🧰 Recursos recolectados:

✨ *Exp*: ${exp}
💰 *Monedas*: ${coin}
♦️ *Esmeralda*: ${emerald}
🔩 *Hierro*: ${iron}
🏅 *Oro*: ${gold}
🕋 *Carbón*: ${coal}
🪨 *Piedra*: ${stone}
`.trim();

  await conn.sendFile(m.chat, image, 'mina.jpg', message, m);
  await m.react('⛏️');

  // Actualiza inventario
  user.health -= 50;
  user.pickaxedurability -= 30;
  user.coin += coin;
  user.emerald += emerald;
  user.iron += iron;
  user.gold += gold;
  user.coal += coal;
  user.stone += stone;
  user.exp += exp;
  user.lastmiming = now;
};

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

// Función auxiliar
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes} m y ${seconds} s`;
}
