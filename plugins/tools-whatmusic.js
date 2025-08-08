import fetch from 'node-fetch';
import FormData from 'form-data';

const handler = async (m, { conn, usedPrefix, command}) => {
  const quoted = m.quoted || m;
  const mime = quoted.mimetype || quoted.msg?.mimetype || '';

  if (!/audio|video/.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key}});
    return m.reply(`🌸 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋 𝖾𝗇𝗏𝗂𝖺 𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇 𝖺𝗎𝖽𝗂𝗈 𝗈 𝗇𝗈𝗍𝖺 𝖽𝖾 𝗏𝗈𝗓\n✨ 𝖴𝗌𝖺: *${usedPrefix + command}*`);
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key}});

    const audioBuffer = await quoted.download();

    const form = new FormData();
    form.append('file', audioBuffer, {
      filename: 'audio.mp3',
      contentType: mime
});
    form.append('api_token', 'tu_token_aqui'); // Reemplaza con tu token de Audd.io
    form.append('return', 'spotify,apple_music');

    const res = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
});

    const json = await res.json();

    if (!json.result ||!json.result.title) {
      await conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key}});
      return m.reply(`❌ 𝖲𝗎𝗄𝗂 no pudo identificar la canción.\n🎧 Intenta con un audio más claro o más largo.`);
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
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key}});
} catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key}});
    m.reply(`❌ 𝖲𝗎𝗄𝗂 no pudo identificar la canción:\n${err.message || err}`);
}
};

handler.help = ['whatmusic'];
handler.tags = ['tools', 'audio'];
handler.command = ['whatmusic', 'idmusic', 'musica'];

export default handler;
