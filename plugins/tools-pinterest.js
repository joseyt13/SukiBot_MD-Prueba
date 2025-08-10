// 🌸 𝖢𝗈́𝖽𝗂𝗀𝗈 𝖼𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 🍁
// 𝖲𝗂𝗆𝗎𝗅𝖺 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖨𝗆𝖺𝗀𝖾𝗇.jpg estilo Pinterest

import { writeFile, unlink, readFile} from 'fs/promises';
import { join} from 'path';
import { fileTypeFromBuffer} from 'file-type';

let handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, { react: { text: '📌', key: m.key}});

  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime ||!mime.startsWith('image/')) {
      return m.reply('🖼️ *𝖲𝗎𝗄𝗂 𝗇𝖾𝖼𝖾𝗌𝗂𝗍𝖺 𝗊𝗎𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖺𝗌 𝖺 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇 𝗉𝖺𝗋𝖺 𝗌𝗎𝖻𝗂𝗋𝗅𝖺.*');
}

    const media = await q.download();
    if (!media) return m.reply('☁️ *𝖭𝗈 𝗉𝗎𝖽𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋 𝗅𝖺 𝗂𝗆𝖺𝗀𝖾𝗇. ¿𝗆𝖾 𝗅𝖺 𝗋𝖾𝖾𝗇𝗏𝗂𝖺𝗌?*');

    const url = await uploadToCatbox(media);
    if (!url) throw '❌ *𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝗌𝗎𝖻𝗂𝗋 𝗅𝖺 𝗂𝗆𝖺𝗀𝖾𝗇.*';

    await conn.sendMessage(m.chat, {
      text: `🖼️ *𝖨𝗆𝖺𝗀𝖾𝗇 𝖲𝗎𝖻𝗂𝖽𝖺 𝖾𝗇 𝖾𝗌𝗍𝗂𝗅𝗈 Pinterest*\n🔗 ${url}`,
      contextInfo: {
        externalAdReply: {
          title: '📌 Imagen estilo Pinterest',
          body: '✨ Tu imagen fue subida con éxito',
          thumbnailUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: url
}
}
}, { quoted: m});

} catch (e) {
    await m.reply(typeof e === 'string'? e: '💔 *𝖴𝗉𝗌… 𝗁𝗎𝗏𝗈 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋 𝖺𝗅 𝗌𝗎𝖻𝗂𝗋 𝗍𝗎 𝗂𝗆𝖺𝗀𝖾𝗇.*');
} finally {
    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}});
}
};

handler.command = ['pinjp', 'pinimg', 'imgp'];
handler.tags = ['tools'];
handler.register = true;

export default handler;

// 🌷 Subida mágica a Catbox
async function uploadToCatbox(buffer) {
  const { ext, mime} = await fileTypeFromBuffer(buffer) || {};
  if (!ext ||!mime) return null;

  const tempPath = join('./tmp', `pinterest.${ext}`);
  await writeFile(tempPath, buffer);
  const fileData = await readFile(tempPath);

  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', new File([fileData], `pinterest.${ext}`, { type: mime}));

  try {
    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form
});
    const url = await res.text();
    await unlink(tempPath).catch(() => null);
    return url.startsWith('https://')? url: null;
} catch (err) {
    console.error('💥 Error al subir a Catbox:', err);
    await unlink(tempPath).catch(() => null);
    return null;
}
}
