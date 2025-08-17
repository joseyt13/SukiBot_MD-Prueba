import axios from 'axios';

// Generador de ID aleatorio para la sesión
const randomUserId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

let handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply('🌸 *Uso correcto:*\n.gptoss <tu pregunta>\n\nEjemplo:\n.gptoss ¿Cuál es el significado de la vida?');
}

  try {
    // Solicitud a la API GPT-OSS
    const { data: rawSSE} = await axios.post(
      'https://api.gpt-oss.com/chatkit',
      {
        op: 'threads.create',
        params: {
          input: {
            text,
            content: [{ type: 'input_text', text}],
            quoted_text: '',
            attachments: []
}
}
},
      {
        headers: {
          authority: 'api.gpt-oss.com',
          accept: 'text/event-stream',
          'accept-language': 'es-ES,es;q=0.9',
          'content-type': 'application/json',
          origin: 'https://gpt-oss.com',
          cookie: `user_id=${randomUserId()}`,
          referer: 'https://gpt-oss.com/',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
          'x-selected-model': 'gpt-oss-120b'
},
        responseType: 'text'
}
);

    // Procesar respuesta SSE
    const events = rawSSE
.split('\n')
.filter(line => line.startsWith('data: '))
.map(line => line.slice(6).trim())
.filter(Boolean)
.map(str => {
        try {
          return JSON.parse(str);
} catch {
          return null;
}
})
.filter(Boolean);

    // Extraer respuesta del asistente
    const response = events
.filter(e => e.type === 'thread.item_done' && e.item?.type === 'assistant_message')
.map(e => e.item.content?.[0]?.text)
.filter(Boolean)
.join('\n\n');

    if (!response) {
      return m.reply('⚠️ No se recibió respuesta del asistente. Intentá de nuevo.');
}

    await m.reply(`🤖 *Respuesta de GPT-OSS:*\n\n${response}`);
} catch (e) {
    m.reply(`❌ *Error al procesar tu solicitud:*\n${e.message}`);
}
};

handler.help = ['gptoss <texto>'];
handler.tags = ['ai'];
handler.command = ['gptoss'];

export default handler;
