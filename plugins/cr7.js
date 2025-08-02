import axios from "axios";

const handler = async (m, { conn}) => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json");
    const cristianoPics = res.data;

    if (!Array.isArray(cristianoPics) || cristianoPics.length === 0) {
      return m.reply("⚠️ No se encontraron imágenes de Cristiano Ronaldo.");
}

    const img = cristianoPics[Math.floor(Math.random() * cristianoPics.length)];
    const frases = [
      "🔝 El mejor del mundo: CR7",
      "⚽ Ronaldo, leyenda viva",
      "🔥 ¡Síuuuuu!",
      "🏆 Él no corre... ¡vuela!",
      "👑 Cristiano nunca falla"
    ];

    const texto = frases[Math.floor(Math.random() * frases.length)];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: img},
        caption: `*${texto}*`,
        viewOnce: true
},
      { quoted: m}
);
} catch (err) {
    console.error(err);
    m.reply("❌ Error al obtener imagen de Cristiano.");
}
};

handler.help = ["cr7"];
handler.tags = ["futbol", "celebridades"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
