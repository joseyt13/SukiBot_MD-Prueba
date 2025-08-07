let handler = async (m, { conn}) => {
  const start = performance.now();
  await m.reply('🏓 𓆩 ꒰ Probando velocidad ꒱ 𓆪');
  const end = performance.now();
  const ping = end - start;

  const respuesta = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 ꒱ 𖥔˚₊

✅ *Estado:* Activo y con energía mágica
📡 *Velocidad:* ${ping.toFixed(2)} ms
🧁 *Latido pastelcore:* Estable y encantador

✨ Usa *.menu* para explorar mis comandos mágicos.
`.trim();

  await conn.sendMessage(m.chat, { text: respuesta}, { quoted: m});
};

handler.command = ['ping', 'p'];
handler.tags = ['info'];
handler.help = ['ping'];
handler.register = true;

export default handler;
