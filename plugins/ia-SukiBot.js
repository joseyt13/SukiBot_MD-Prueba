/* Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
/* no quites los créditos 🍂

import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

let handler = async (m, { conn}) => {
  if (!m.quoted ||!/image/.test(m.quoted.mimetype)) {
    return m.reply(`🌸 𝖯𝗈𝗋𝖿𝗂𝗌... responde a una imagen que quieras mejorar en HD~`);
}

  await m.react('🧠');

  try {
    const mediaPath = await conn.downloadAndSaveMediaMessage(m.quoted);
    const form = new FormData();
    form.append('image', fs.createReadStream(mediaPath));

    const res = await axios.post('https://api.upscale.media/api/v1/upscale', form, {
      headers: {
...form.getHeaders(),
        'Authorization': 'Bearer TU_API_KEY_AQUI' // ← Reemplaza con tu API Key real
}
});

    const hdImageUrl = res.data?.output?.url;
    if (!hdImageUrl) throw new Error('No se recibió imagen mejorada');

    await conn.sendMessage(m.chat, {
      image: { url: hdImageUrl},
      caption: `🎀 *𝖲𝗎𝗄𝗂𝗂𝗔 - Imagen mejorada en HD~*\n✨ ¡Tu imagen fue procesada con IA pastelcore!`,
      headerType: 1
}, { quoted: m});

    await m.react('🌸');
    fs.unlinkSync(mediaPath); // Limpia archivo temporal

} catch (e) {
    await m.react('💥');
    m.reply(`😿 *Upss... ocurrió un error*\n💬 \`${e.message}\``);
}
};

handler.help = ['iahd'];
handler.tags = ['ia', 'media'];
handler.command = ['iahd', 'mejorarimg', 'hdmagic'];
handler.register = true;

export default handler;
