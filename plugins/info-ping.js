import speed from 'performance-now';
import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  let timestamp = speed();
  let latencia = speed() - timestamp;

  exec(`neofetch --stdout`, async (error, stdout, stderr) => {
    let info = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    const respuesta = `
╭─❀ *𝖲𝗎𝗄𝗂Bot_MD* ❀─╮
┃ ✨ 𝖯𝗂𝗇𝗀 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈
┃ 🕐 𝖳𝗂𝖾𝗆𝗉𝗈 𝖽𝖾 𝗋𝖾𝗌𝗉𝗎𝖾𝗌𝗍𝖺: *${latencia.toFixed(4)} ms*
┃ 📊 𝖨𝗇𝖿𝗈 𝗌𝗂𝗌𝗍𝖾𝗆𝖺:
╰───────────────╯

${info}
`.trim();

    await conn.sendMessage(m.chat, {
      text: respuesta,
      footer: '🌐 Visita el sitio oficial o abre el menú',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '📜 Menú de comandos'},
          type: 1
}
      ],
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗂𝗍𝗂𝗈 𝗈𝗳𝗂𝗰𝗂𝗮𝗅 𝖽𝖾 𝖲𝗎𝗄𝗂Bot_MD',
          body: '🕹 Canal de soporte y novedades',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});
});
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];
handler.register = true;

export default handler;
