let handler = async (m, { conn}) => {
  const texto = `
╭─❀ 🍒 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝗮 𝗦𝘂𝗸𝗶𝗕𝗼𝘁_𝗠𝗗 ❀─╮

¿Quieres dominar WhatsApp con el bot más encantado y poderoso del reino digital?
✨ *¡Suki está aquí para ti!* ✨
Transforma tu experiencia con funciones mágicas, estilo pastelcore y control total.

╰─❀ 💖 𝖯𝗋𝖾𝖼𝗂𝗈𝗌 𝖽𝖾𝗅 𝖡𝗈𝗍 ❀─╯

🎀 \`𝗣𝗘𝗥𝗠𝗔𝗡𝗘𝗡𝗧𝗘\`
• 🧁 *Un grupo:* 𝟧 USD / 6 mil 🇦🇷
• 🍰 *Dos grupos:* 𝟣0 USD / 13 mil 🇦🇷
• 🍡 *Tres grupos:* 15 USD / 19 mil 🇦🇷
• 🍓 *Cuatro grupos:* 20 USD / 26 mil 🇦🇷

🌷 \`𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟𝗜𝗭𝗔𝗗𝗢\`
• 🎨 Desde 50 MIL 🇦🇷 (con diseño y funciones a medida)

🧚 \`𝗣𝗥𝗨𝗘𝗁𝗔 & 𝗖𝗢𝗠𝗣𝗥𝗔\`
🔗 [Grupo de prueba y compra](https://chat.whatsapp.com/IJyN3cklID5HVKU3nAi0XL?mode=ac_t)

╭─❀ 𝖲ᴜᴋ𝗂Bot_MD ❀─╮
𝖯𑄜𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖲ᴜᴋ𝗂′𝗌 𝖢𝗅𝗎𝖻 🌸
╰────────────────────╯
`.trim();

  await conn.reply(m.chat, texto, m);
};

handler.help = ['precios', 'info'];
handler.tags = ['info'];
handler.command = ['precios', 'info bot', 'botinfo'];

export default handler;
