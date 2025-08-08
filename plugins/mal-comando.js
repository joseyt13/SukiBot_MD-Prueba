export async function before(m, { conn, isCommand, usedPrefix}) {
  if (!isCommand) return;

  const comandosValidos = conn?.commands? Object.keys(conn.commands): [];
  const texto = m.text?.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!comandosValidos.includes(text)) {
    const respuesta = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖢𝗈𝗆𝖺𝗇𝖽𝗈 𝖭𝗈 𝖱𝖾𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈 ꒱ 𖥔˚₊

❌ *${usedPrefix}${texto}* no es un comando válido.

🌸 Usa *${usedPrefix}menu* para ver todos los comandos disponibles.
🧁 Si necesitas ayuda, puedes usar *${usedPrefix}ayuda* o preguntar con dulzura.
`.trim();

    await conn.sendMessage(m.chat, { text: respuesta}, { quoted: m});
    return true; // evita que el bot siga procesando
}
}
