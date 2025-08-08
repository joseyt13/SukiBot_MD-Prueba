// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command}) => {
  const quoted = m.quoted || m;
  const mime = quoted.mimetype || quoted.msg?.mimetype || '';

  if (!/audio|video/.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key}});
    return m.reply(`🌸 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋 𝖾𝗇𝖵𝗂𝖺 𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇 𝖺𝗎𝖽𝗂𝗈 𝗈 𝗇𝗈𝗍𝖺 𝖽𝖾 𝗏𝗈𝗓\n✨ 𝖴𝗌𝖺: *${usedPrefix + command}*`);
}

  try {
    await m.react('🔍');
    const audio = await quoted.download();

    const formData = new FormData();
    formData.append('audio', audio, { filename: 'audio.mp3'});

    const res = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData,
      headers: {
...formData.getHeaders(),
        'api-token': 'tu_token_aqui' // Reemplaza con tu token de Audd.io
}
});

    const json = await res.json();

    if (!json.result) {
      throw new Error('No se pudo identificar la canción.');
}

    const { title, artist, album, release_date} = json.result;

    const info = `
🎶 𝖢𝖺𝗇𝖼𝗂𝗈𝗇 𝗂𝖽𝖾𝗇𝗍𝗂𝖿𝗂𝖼𝖺𝖽𝖺:

🌸 𝖳𝗂𝗍𝗎𝗅𝗈: *${title}*
🎤 𝖠𝗋𝗍𝗂𝗌𝗍𝖺: *${artist}*
💿 𝖠𝗅𝖻𝗎𝗆: ${album || 'Desconocido'}
📅 𝖥𝖾𝖼𝗁𝖺: ${release_date || 'No disponible'}
    `.trim();

    await conn.sendMessage(m.chat, { text: info}, { quoted: m});
    await m.react('✅');
} catch (err) {
    await m.react('❌');
    m.reply(`❌ 𝖲𝗎𝗄𝗂 no pudo identificar la canción:\n${err.message || err}`);
}
};

handler.help = ['whatmusic'];
handler.tags = ['tools', 'audio'];
handler.command = ['whatmusic', 'idmusic', 'musica'];

export default handler;
