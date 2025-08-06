const cooldowns = {};

let handler = async (m, { conn}) => {
  const users = global.db.data.users;
  const senderId = m.sender;
  const sender = users[senderId];
  if (!sender) return;

  const cooldownMs = 5 * 60 * 1000;
  const now = Date.now();

  if (cooldowns[senderId] && now - cooldowns[senderId] < cooldownMs) {
    const restante = Math.ceil((cooldowns[senderId] + cooldownMs - now) / 1000);
    return m.reply(`🚨 Ya cometiste un crimen hace poco.\n⏱️ Espera *${segundosAHMS(restante)}* antes de volver a arriesgarte.`);
}

  cooldowns[senderId] = now;
  const senderName = await conn.getName(senderId);
  const senderCoin = sender.coin || 0;

  // Buscar víctima aleatoria (evitando al propio usuario)
  let victimId;
  do {
    victimId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)];
} while (victimId === senderId);

  const victim = users[victimId];
  const victimCoin = victim?.coin || 0;

  const min = 15;
  const max = 50;
  const action = Math.floor(Math.random() * 3);

  switch (action) {
    case 0: {
      const stolen = getSafeAmount(victimCoin, min, max);
      sender.coin += stolen;
      victim.coin -= stolen;

      await conn.sendMessage(m.chat, {
        text: `🕶️ Crimen exitoso!\nRobaste *${stolen}💸* de @${victimId.split('@')[0]}.\n🔺 Se suman *+${stolen} monedas* a ${senderName}.`,
        contextInfo: { mentionedJid: [victimId]}
}, { quoted: m});
      break;
}
    case 1: {
      const lost = getSafeAmount(senderCoin, min, max);
      sender.coin -= lost;

      await conn.reply(m.chat, `👮 Fuiste atrapado durante el crimen.\n🔻 Se restan *-${lost} monedas* a ${senderName}.`, m);
      break;
}
    case 2: {
      const stolen = getSafeAmount(Math.floor(victimCoin / 2), min, max);
      sender.coin += stolen;
      victim.coin -= stolen;

      await conn.sendMessage(m.chat, {
        text: `💨 Crimen semi exitoso.\nLograste robar *${stolen}💸* de @${victimId.split('@')[0]}, pero te descubrieron.\n🔺 Se suman *+${stolen} monedas* a ${senderName}.`,
        contextInfo: { mentionedJid: [victimId]}
}, { quoted: m});
      break;
}
}

  global.db.write();
};

handler.help = ['crimen'];
handler.tags = ['economy'];
handler.command = ['crimen', 'crime'];
handler.register = true;
handler.group = true;

export default handler;

// Funciones auxiliares
function getSafeAmount(balance, min, max) {
  return Math.min(Math.floor(Math.random() * (max - min + 1)) + min, balance);
}

function segundosAHMS(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
