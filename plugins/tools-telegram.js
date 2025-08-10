// 🌸 Código creado por 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 🍁
// no quites los créditos 🍂 

import axios from 'axios';
import FormData from 'form-data';
import { writeFile, unlink} from 'fs/promises';
import { tmpdir} from 'os';
import { join} from 'path';

const TELEGRAM_BOT_TOKEN = 'TU_TOKEN_AQUI'; // ← Reemplaza con tu token
const TELEGRAM_CHAT_ID = '@tu_canal_privado'; // ← Reemplaza con tu canal

let handler = async (m, { conn}) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime ||!mime.startsWith('image/')) {
    return m.reply('🖼️ *Por favor, responde a una imagen para convertirla en enlace de Telegram.*');
}

  const media = await q.download();
  if (!media) return m.reply('☁️ *No pude descargar la imagen. ¿Puedes reenviarla?*');

  const tempPath = join(tmpdir(), `telegram_${Date.now()}.jpg`);
  await writeFile(tempPath, media);

  try {
    const form = new FormData();
    form.append('chat_id', TELEGRAM_CHAT_ID);
    form.append('photo', require('fs').createReadStream(tempPath));

    const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, form, {
      headers: form.getHeaders()
});

    const msg = res.data?.result;
    if (!msg?.message_id) throw new Error('No se pudo obtener el enlace');

    const link = `https://t.me/${TELEGRAM_CHAT_ID.replace('@', '')}/${msg.message_id}`;
    await m.reply(`✅ *Imagen subida a Telegram*\n🔗 ${link}`);
} catch (e) {
    console.error('❌ Error al subir a Telegram:', e.message);
    await m.reply(`❌ *No se pudo subir la imagen a Telegram.*\n💬 ${e.message}`);
} finally {
    await unlink(tempPath).catch(() => null);
}
};

handler.command = ['telegramjpg', 'tgimg', 'tmjpg'];
handler.tags = ['tools'];
handler.register = true;

export default handler;
