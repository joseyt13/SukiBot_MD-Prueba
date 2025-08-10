// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂

import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const encabezado = '🎀 *𝖡𝖴𝖲𝖢𝖠𝖭𝖣𝖮 𝖠𝖢𝖳𝖴𝖠𝖫𝖨𝖹𝖠𝖢𝖨𝖮𝖭...*';
    await conn.reply(m.chat, `${encabezado}\n\n🌸 *SukiBot_MD-V2 está buscando actualizaciones mágicas...*`, m);

    const output = execSync('git pull' + (args.length? ' ' + args.join(' '): '')).toString();
    const response = output.includes('Already up to date')
? '✨ *El bot ya está actualizado con la última ternura pastelcore~*'
: `🎀 *Actualización aplicada con éxito:*\n\n\`\`\`${output}\`\`\``;

    await conn.reply(m.chat, response, m);

} catch (error) {
    try {
      const status = execSync('git status --porcelain').toString().trim();
      if (status) {
        const conflictedFiles = status.split('\n').filter(line =>
!line.includes('roxySession/') &&
!line.includes('.cache/') &&
!line.includes('tmp/')
);

        if (conflictedFiles.length> 0) {
          const conflictMsg = `⚠️ *Conflictos detectados en los siguientes archivos:*\n\n` +
            conflictedFiles.map(f => '• ' + f.slice(3)).join('\n') +
            `\n\n🔧 *Para solucionarlo:*\n- Reinstala el bot\n- O actualiza manualmente los archivos afectados`;

          return await conn.reply(m.chat, conflictMsg, m);
}
}
} catch (statusError) {
      console.error('🌧️ Error al verificar conflictos:', statusError);
}

    await conn.reply(m.chat, `❌ *Upss... ocurrió un error al actualizar:*\n\`\`\`${error.message || 'Error desconocido.'}\`\`\``, m);
}
};

handler.help = ['update', 'actualizar'];
handler.command = ['update', 'actualizar'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;
