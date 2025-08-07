import { xpRange} from '../lib/levelling.js';

if (user) {
  user.exp = (user.exp || 0) + 10; // gana 10 exp por comando

  const { min, xp} = xpRange(user.level, global.multiplier || 1);
  const nivelActual = user.level;
  const expActual = user.exp;

  if (expActual>= xp) {
    const anterior = xpRange(nivelActual, global.multiplier || 1);
    user.level++;
    const nuevo = xpRange(user.level, global.multiplier || 1);

    const mensaje = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 🌟 𝖭𝗂𝗏𝖾𝗅 𝖢𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝖽𝗈 ꒱ 𖥔˚₊

🎀 ¡Genial, *${await conn.getName(m.sender)}* subiste de nivel!

📈 𝗡𝗂𝗏𝗲𝗹 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿: *${nivelActual}* — 𝖤𝗑𝗉: *${expActual}/${anterior.xp}*
✨ 𝗡𝗂𝗏𝗲𝗹 𝗮𝗰𝘁𝘂𝗮𝗹: *${user.level}* — 𝖤𝗑𝗉: *${expActual}/${nuevo.xp}*

🧁 Sigue usando comandos mágicos para crecer aún más~ 🌸
`.trim();

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: [m.sender]
});
}
}
