import fs from 'fs';
import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

const handler = async (m) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';

  if (!/audio|video/.test(mime)) {
    throw '💭 Por favor, responde a un *audio* o *video corto* para que pueda identificar la melodía~ 🎶';
}

  try {
    const media = await q.download();
    const ext = mime.split('/')[1];
    const tempPath = `./tmp/${m.sender}.${ext}`;
    fs.writeFileSync(tempPath, media);

    const res = await acr.identify(fs.readFileSync(tempPath));
    fs.unlinkSync(tempPath);

    const { code, msg} = res.status;
    if (code!== 0) throw `😿 Error: ${msg}`;

    const music = res.metadata?.music[0];
    if (!music) throw '🧁 No encontré coincidencias musicales... prueba con otro fragmento más clarito~';

    const {
      title,
      artists = [],
      album = {},
      genres = [],
      release_date
} = music;

    const responseText = `
🧋 *Suki_Bot_MD — Resultado Musical* 💫

• 🌸 *Título*: ${title || 'No encontrado'}
• 🎤 *Artista*: ${artists.map(v => v.name).join(', ') || 'No encontrado'}
• 💽 *Álbum*: ${album.name || 'No encontrado'}
• 🍡 *Género*: ${genres.map(v => v.name).join(', ') || 'No encontrado'}
• 📅 *Lanzamiento*: ${release_date || 'No encontrado'}

✨ ¿Quieres que te envíe un link si está disponible en YouTube o Spotify?~ 🩷
`.trim();

    await m.reply(responseText);
} catch (e) {
    console.error(e);
    throw '😿 Ocurrió un error al intentar identificar la canción~ Intenta de nuevo con otro audio mágico 🎶';
}
};

handler.command = ['quemusica', 'quemusicaes', 'whatmusic'];
handler.help = ['quemusica <responde audio>'];
handler.tags = ['tools', 'buscador', 'suki'];
handler.register = true;

export default handler;
