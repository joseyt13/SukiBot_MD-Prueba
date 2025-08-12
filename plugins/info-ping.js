import speed from 'performance-now';
import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  let timestamp = speed();
  let latencia = speed() - timestamp;

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let info = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    const respuesta = `
╭─❀ `𝖲𝗎𝗄𝗂Bot_MD` ❀─╮
┃ ✨ 𝖯𝗂𝗇𝗀 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈
┃ 🕐 𝖳𝗂𝖾𝗆𝗉𝗈 𝖽𝖾 𝗋𝖾𝗌𝗉𝗎𝖾𝗌𝗍𝖺: *${latencia.toFixed(4)} ms*
┃ 📊 𝖨𝗇𝖿𝗈 𝗌𝗂𝗌𝗍𝖾𝗆𝖺:
╰───────────────╯

${info}
`.trim();

    conn.reply(m.chat, respuesta, m);
});
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];
handler.register = true;

export default handler;
