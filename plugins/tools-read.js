import { downloadContentFromMessage} from '@whiskeysockets/baileys';

let handler = async (m, { conn}) => {
  if (!m.quoted) {
    return conn.reply(
      m.chat,
      '🌸 *Responde a un mensaje con imagen o video ViewOnce para que pueda abrirlo ✨',
      m
);
}

  if (!m.quoted.viewOnce) {
    return conn.reply(
      m.chat,
      '🍓 Ese mensaje no es ViewOnce, intenta con uno que desaparece al abrirse 🌷',
      m
);
}

  try {
    let buffer = await m.quoted.download();

    if (/videoMessage/.test(m.quoted.mtype)) {
      return conn.sendFile(
        m.chat,
        buffer,
        'suki_video.mp4',
        m.quoted.caption || '🎀 Video ViewOnce recuperado por SukiBot_MD',
        m
);
} else if (/imageMessage/.test(m.quoted.mtype)) {
      return conn.sendFile(
        m.chat,
        buffer,
        'suki_image.jpg',
        m.quoted.caption || '📸 Imagen ViewOnce recuperada por SukiBot_MD',
        m
);
} else {
      return conn.reply(
        m.chat,
        '❎ Suki solo puede abrir imágenes o videos ViewOnce por ahora 🍃',
        m
);
}
} catch (e) {
    console.error('[❌] Error al recuperar ViewOnce:', e);
    return conn.reply(
      m.chat,
      '💔 Suki se tropezó intentando abrir el mensaje... ¿Seguro que era ViewOnce?',
      m
);
}
};

handler.help = ['readviewonce', 'read', 'readvo', 'ver'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'readvo', 'ver'];

export default handler;
