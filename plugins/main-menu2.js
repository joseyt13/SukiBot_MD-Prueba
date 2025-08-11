import fetch from 'node-fetch';

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

╰─𓆩 *SukiBot_MD descarga con estilo pastel y glitter digital* 🌈𓆪─╯`.trim();

  const bannerURL = 'https://files.catbox.moe/cvpwkk.jpg';
  const imagenBuffer = await fetch(bannerURL).then(res => res.buffer());

  const buttons = [
    { buttonId: '.menu', buttonText: { displayText: '📜 Menú principal'}, type: 1},
    { buttonId: '.code', buttonText: { displayText: '🌸 serbot'}, type: 1},
    { buttonId: '.grupos', buttonText: { displayText: '👥 Grupos oficiales'}, type: 1}
  ];

  await conn.sendMessage(m.chat, {
    image: imagenBuffer,
    caption: textoDescargas,
    footer: 'ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • Descargas encantadas',
    buttons: buttons,
    headerType: 4
}, { quoted: m});
};

handler.command = ['menu2', 'menudl'];
handler.tags = ['menu'];
handler.help = ['menu2', 'menudl'];

export default handler;
