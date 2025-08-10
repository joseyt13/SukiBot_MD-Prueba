// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂

import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const encabezado = '🎀 `*𝖡𝖴𝖲𝖢𝖠𝖭𝖣𝖮 𝖠𝖢𝖳𝖴𝖠𝖫𝖨𝖹𝖠𝖢𝖨𝖮𝖭...`';
    const inicio = '🌸 *𝖤𝖲𝖯𝖤𝖱𝖤 𝖤𝖲𝖳𝖮𝖸 𝖡𝖴𝖲𝖢𝖠𝖭𝖣𝖮...*';
    await conn.reply(m.chat, `${encabezado}\n\n${inicio}`, m);

    const comando = 'git pull' + (args.length? ' ' + args.join(' '): '');
    const output = execSync(comando).toString();
    const actualizado = output.includes('Already up to date');

    const mensajeFinal = actualizado
? '✨ _𝖤𝗅 𝖻𝗈𝗍 𝗒𝖺 𝖾𝗌𝗍𝖺́ 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝗈 𝖼𝗈𝗇 𝗅𝖺 𝗎́𝗅𝗍𝗂𝗆𝖺 𝗍𝖾𝗋𝗇𝗎𝗋𝖺 𝗉𝖺𝗌𝗍𝖾𝗅𝖼𝗈𝗋𝖾~_'
: `*⚙ ᴄᴏᴍᴘʟᴇᴛᴀɴᴅᴏ ᴀᴄᴛᴜᴀʟɪ𝘇𝘢𝘤𝘪𝘰́𝘯...*\n\n\`\`\`${output}\`\`\`\n\n🔧 *𝘙𝘦𝘪𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘦𝘭 𝘴𝘦𝘳𝘷𝘪𝘥𝘰𝘳 𝘦𝘴𝘱𝘦𝘳𝘦..*`;

    await conn.reply(m.chat, mensajeFinal, m);

} catch (error) {
    try {
      const estado = execSync('git status --porcelain').toString().trim();
      if (estado) {
        const conflictos = estado
.split('\n')
.filter(line =>
!line.includes('roxySession/') &&
!line.includes('.cache/') &&
!line.includes('tmp/')
);

        if (conflictos.length> 0) {
          const conflictMsg = `⚠️ *Conflictos detectados en los siguientes archivos:*\n\n` +
            conflictos.map(f => '• ' + f.slice(3)).join('\n') +
            `\n\n🔧 *Para solucionarlo:*\n- Reinstala el bot\n- O actualiza manualmente los archivos afectados`;

          return await conn.reply(m.chat, conflictMsg, m);
}
}
} catch (statusError) {
      console.error('🌧️ Error al verificar conflictos:', statusError);
}

    const errorMsg = `❌ *Upss... ocurrió un error al actualizar:*\n\`\`\`${error.message || 'Error desconocido.'}\`\`\``;
    await conn.reply(m.chat, errorMsg, m);
}
};

handler.help = ['update', 'actualizar', 'fix', 'up'];
handler.command = ['update', 'actualizar', 'fix', 'up'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;
