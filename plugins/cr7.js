import axios from "axios";

const handler = async (m, { conn}) => {
  try {
    const url = "https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json";
    const response = await axios.get(url);
    const images = response.data;

    if (!Array.isArray(images) || images.length === 0) {
      return m.reply("⚠️ No se encontraron imágenes de Cristiano Ronaldo.");
}

    const selectedImage = images[Math.floor(Math.random() * images.length)];
    const frases = [
      "⚽ ¡El Bicho está suelto!",
      "🔥 No es magia... es Cristiano.",
      "👑 CR7: el único, el rey.",
      "🥇 100% Leyenda viva.",
      "🕊️ Él no juega... domina."
    ];
    const caption = frases[Math.floor(Math.random() * frases.length)];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: selectedImage},
        caption: `*${caption}*`,
        viewOnce: true
},
      { quoted: m}
);
} catch (e) {
    console.error("Error CR7:", e);
    await m.reply("❌ Error al obtener imagen de Cristiano.");
}
};

handler.help = ["cr7"];
handler.tags = ["celebridades", "futbol"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
