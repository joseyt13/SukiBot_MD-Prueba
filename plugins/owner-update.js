import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const output = execSync('git pull' + (args.length? ' ' + args.join(' '): '')).toString();
    let response = output.includes('Already up to date')
? '✅ *SukiBot_MD ya está actualizado.*'
: `✅ *Actualización aplicada correctamente:*\n\n\`\`\`\n${output}\n\`\`\``;

    await conn.sendMessage(m.chat, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: 'SukiBot_MD',
          body: '🕹 Canal de oficial',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg', // puedes cambiar la imagen
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
          title: 'SukiBot_MD',
          body: '🕹 Canal de oficial',
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
