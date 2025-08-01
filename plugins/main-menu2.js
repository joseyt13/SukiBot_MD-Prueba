import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌸 SukiBot_MD Canal Oficial'
};

let handler = async (m, { conn}) => {
  const textoDescargas = `
*⊹˚₊‧ 🧋 𝒟𝑒𝓈𝒸𝒶𝓇𝑔𝒶𝓈 𝒫𝒶𝓈𝓉𝑒𝓁 ‧₊˚⊹*

𖦹 ꒰ 📸 *Imagen & Creatividad* ꒱ 💠
┃ ⊹.imagen <tema>
┃ ⊹.pinterest <palabra clave>
┃ ⊹.pindl <enlace Pinterest>

𖦹 ꒰ 🎶 *Música & Audio* ꒱ 💠
┃ ⊹.play <nombre de canción>
┃ ⊹.ytmp3 <link YouTube>
┃ ⊹.playaudio <título>
┃ ⊹.spotify <link Spotify>

𖦹 ꒰ 📺 *Video & Redes* ꒱ 💠
┃ ⊹.facebook <link>
┃ ⊹.fb <link>
┃ ⊹.instagram <link>
┃ ⊹.insta <link>
┃ ⊹.igdl <link Instagram>
┃ ⊹.tiktoks search <palabra clave>
┃ ⊹.ytsearch <título>
┃ ⊹.yts <palabra clave>

𖦹 ꒰ 📦 *Apps & Extras* ꒱ 💠
┃ ⊹.apkmod <nombre o enlace>
┃ ⊹.apk <nombre>

╭─𓆩 *SukiBot_MD descarga con estilo pastel y glitter digital* 🌈𓆪─╯`;

  const bannerURL = 'https://files.catbox.moe/cvpwkk.jpg'; // Puedes cambiar esta imagen
  const imagenBuffer = await fetch(bannerURL).then(res => res.buffer());

  await conn.sendMessage(m.chat, {
    image: imagenBuffer,
    caption: textoDescargas,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 777,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 100,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.command = ['menu2', 'menudl'];
handler.tags = ['menu'];
handler.help = ['menu2', 'menudl'];
export default handler;
