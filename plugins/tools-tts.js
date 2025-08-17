import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command}) => {
  // Validación: texto requerido
  if (!text) {
    return m.reply(`🌸 *Uso correcto:*\n${usedPrefix + command} Tu texto aquí\n\nEjemplo:\n${usedPrefix + command} Hola, soy SukiBot-MD`);
}

  try {
    // URL de la API TTS con voz "nova"
    const apiUrl = `https://api.nekorinn.my.id/tools/openai-tts?text=${encodeURIComponent(text)}&voice=nova`;

    // Solicitud a la API
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Convertir respuesta en audio
    const audioBuffer = await res.arrayBuffer();

    // Enviar audio como nota de voz (PTT)
    await conn.sendMessage(m.chat, {
      audio: Buffer.from(audioBuffer),
      mimetype: 'audio/mpeg',
      ptt: true
}, { quoted: m});

} catch (e) {
    // Mensaje de error personalizado
    m.reply(`❌ *Ups, Suki no pudo generar el audio.*\n📌 Error: ${e.message}`);
}
};

// Ayuda y configuración del comando
handler.help = ['tts <texto>'];
handler.tags = ['tools'];
handler.command = ['tts'];

export default handler;
