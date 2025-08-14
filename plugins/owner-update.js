import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const output = execSync('git pull' + (args.length? ' ' + args.join(' '): '')).toString();
    let response = output.includes('Already up to date')
? '✅ *𝖲𝗎𝗄𝗂Bot_MD ya está actualizado.*'
: `✅ *Actualización aplicada correctamente:*\n\n\`\`\`\n${output}\n\`\`\``;

    await conn.sendMessage(m.chat, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗎𝗄𝗂Bot_MD',
          body: '🔧 𝖲𝗎𝗄𝗂𝖻𝗈𝗍_𝗆𝖽 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝖺',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});

} catch (error) {
    const errorMsg = `❌ *Error al actualizar:*\n${error.message || 'Error desconocido.'}`;
    await conn.sendMessage(m.chat, {
      text: errorMsg,
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗎𝗄𝗂Bot_MD',
          body: '⚙ 𝖲𝗎𝗄𝗂𝖻𝗈𝗍_𝗆𝖽 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝖺',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});
}
};

handler.customPrefix = /^(fix|update|up)$/i;
handler.command = new RegExp;
handler.owner = true;
handler.register = true;

export default handler;
