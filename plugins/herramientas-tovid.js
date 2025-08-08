// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

const handler = async (m, { conn}) => {
  const quoted = m.quoted || m;
  const mime = quoted?.mimetype || '';

  if (!/webp/.test(mime)) {
    return conn.sendMessage(m.chat, {
      text: `🎀 *𝖲𝗎𝗄𝗂 necesita que respondas a un sticker animado para convertirlo en video.*\n✨ Usa *.tovid* sobre un sticker con movimiento.`,
      quoted: m
});
}

  try {
    await m.react('🪄');
    const stickerBuffer = await quoted.download();

    // Convertir sticker animado a video
    await conn.sendMessage(m.chat, {
      video: stickerBuffer,
      caption: `🎬 *Aquí está tu sticker convertido en video por 𝖲𝗎𝗄𝗂Bot_MD.*\n💖 ¡Listo para compartir tu magia animada!`,
      mimetype: 'video/mp4',
      quoted: m
});

    await m.react('🌸');
} catch (e) {
    console.error('[❌] Error al convertir sticker animado:', e);
    await m.react('💥');
    return conn.sendMessage(m.chat, {
      text: `💔 *Ups… 𝖲𝗎𝗄𝗂 no pudo convertir el sticker animado.*\nIntenta con otro o verifica que tenga movimiento.`,
      quoted: m
});
}
};

handler.command = ['tovid', 'tovideo'];
handler.help = ['tovid'];
handler.tags = ['herramientas'];
handler.register = true;

export default handler;
