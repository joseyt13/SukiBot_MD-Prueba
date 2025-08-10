// 🌸 Código creado por 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 🍁
// Convierte una imagen en un enlace público de Telegram

import axios from 'axios';

const TELEGRAM_BOT_TOKEN = 'TU_TOKEN_AQUI';
const TELEGRAM_CHAT_ID = '@tu_canal_privado'; // o chat_id numérico

let handler = async (m, { conn}) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime ||!mime.startsWith('image/')) {
    return m.reply('🖼️ *Por favor, responde a una imagen para convertirla en enlace de Telegram.*');
}

  const media = await q.download();
  if (!media) return m.reply('☁️ *No pude descargar la imagen. ¿Puedes reenviarla?*');

  try {
    const form = new FormData();
    form.append('chat_id', TELEGRAM_CHAT_ID);
    form.append('photo', new File([media], 'telegram.jpg', { type: mime}));

    const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, form);
    const msg = res.data?.result;

    if (!msg?.message_id) throw new Error('No se pudo obtener el enlace');

    const link = `https://t.me/${TELEGRAM_CHAT_ID.replace('@', '')}/${msg.message_id}`;
    await m.reply(`✅ *Imagen subida a Telegram*\n🔗 ${link}`);
} catch (e) {
    console.error('Error al subir a Telegram:', e);
    await m.reply('❌ *No se pudo subir la imagen a Telegram.*');
}
};

handler.command = ['telegramjpg', 'tgimg', 'tmjpg'];
handler.tags = ['tools'];
handler.register = true;

export default handler;
