import axios from "axios";

const handler = async (m, { conn, usedPrefix, command}) => {
  try {
    const response = await axios.get("https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json");
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      return m.reply("⚠️ No se encontraron imágenes de Cristiano Ronaldo.");
}

    const ronaldoImg = data[Math.floor(Math.random() * data.length)];
    const frases = [
      "⚽ *¡El Bicho está suelto!*",
      "🔥 *No es magia... es Cristiano.*",
      "👑 *CR7: el único, el rey.*",
      "🥇 *100% Leyenda viva.*",
      "🕊️ *Él no juega... domina.*"
    ];
    const caption = frases[Math.floor(Math.random() * frases.length)];

    const buttons = [
      {
        buttonId: `${usedPrefix}${command}`,
        buttonText: { displayText: "⚽ Ver más"},
        type: 1
}
    ];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: ronaldoImg},
        caption: caption,
        buttons: buttons,
        footer: "SukiBot_MD • CR7 Edition",
        headerType: 4
},
      { quoted: m}
);
} catch (e) {
    console.error("❌ Error CR7:", e.message);
    await m.reply("❌ Error al obtener imagen de Cristiano. Intenta de nuevo más tarde.");
}
};

handler.help = ["cr7"];
handler.tags = ["futbol", "celebridades"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
