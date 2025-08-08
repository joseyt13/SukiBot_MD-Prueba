// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

const handler = async (m, { conn}) => {
  const quoted = m.quoted || m;
  const mime = quoted?.mimetype || '';

  if (!/webp/.test(mime)) {
    return conn.sendMessage(m.chat, {
      text: `🌷 *𝖲𝗎𝗄𝗂 necesita que respondas a un sticker para convertirlo en imagen.*\n✨ Usa *.toimg* sobre un sticker mágico.`,
      quoted: m
});
}

  try {
    await m.react('🪄');
    const stickerBuffer = await quoted.download();

    await conn.sendMessage(m.chat, {
      image: stickerBuffer,
      caption: `🖼️ *Aquí está tu sticker convertido en imagen por 𝖲𝗎𝗄𝗂Bot_MD.*\n💖 ¡Listo para compartir tu magia!`,
      quoted: m
});

    await m.react('🌸');
} catch (e) {
    console.error('[❌] Error al convertir sticker:', e);
    await m.react('💥');
    return conn.sendMessage(m.chat, {
      text: `💔 *Ups… 𝖲𝗎𝗄𝗂 no pudo convertir el sticker.*\nIntenta con otro o verifica que sea válido.`,
      quoted: m
});
}
};

handler.command = ['toimg', 'toimage'];
handler.help = ['toimg'];
handler.tags = ['herramientas'];
handler.register = true;

export default handler;
