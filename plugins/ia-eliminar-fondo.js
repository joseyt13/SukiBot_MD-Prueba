import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { conn, usedPrefix, command}) => {
  const quoted = m.quoted || m;
  const mime = quoted.mimetype || '';

  // Validar si es imagen
  if (!/image\/(png|jpe?g|webp)/i.test(mime)) {
    await conn.sendMessage(m.chat, {
      react: { text: '💔', key: m.key}
});
    return conn.sendMessage(m.chat, {
      text: `🌸 *SukiBot_MD* te dice:
🖼️ Responde a una imagen con *${usedPrefix + command}* para eliminar el fondo mágicamente ✨`
});
}

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '🔮', key: m.key}
});

    const buffer = await quoted.download();
    const ext = mime.split('/')[1] || 'png';
    const fileName = `Suki_${Date.now()}.${ext}`;

    const form = new FormData();
    form.append('image', buffer, fileName);
    form.append('format', 'png');
    form.append('model', 'v1');

    const headers = {
...form.getHeaders(),
      accept: 'application/json, text/plain, */*',
      'x-client-version': 'web',
      'x-locale': 'en'
};

    const response = await axios.post('https://api2.pixelcut.app/image/matte/v1', form, {
      headers,
      responseType: 'arraybuffer'
});

    await conn.sendMessage(m.chat, {
      image: response.data,
      caption: `✨ *¡Fondo eliminado con exito!*
🍁 *Bot:* SukiBot_MD
📌 *Formato:* PNG
🔮 *Modelo:* v1
🧚‍♀️ ¡Tu imagen está lista para brillar!`
});

    await conn.sendMessage(m.chat, {
      react: { text: '🌷', key: m.key}
});

} catch (error) {
    console.error('[❌] Error en eliminar el fondo:', error.message);
    await conn.sendMessage(m.chat, {
      react: { text: '💢', key: m.key}
});
    await conn.sendMessage(m.chat, {
      text: `⚠️ *Ups, algo salió mal...*
🌧️ SukiBot_MD no pudo eliminar el fondo esta vez. Intenta de nuevo más tarde.`
});
}
};

handler.help = ['elimarfd <responder a imagen>'];
handler.tags = ['ai'];
handler.command = ['eliminarfd', 'bg', 'bgremóver'];
handler.register = true;
handler.limit = true;

export default handler;
