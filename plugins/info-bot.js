const handler = async (m, { conn}) => {
  if (!m.isGroup) return; // Solo responde en grupos
  if (!m.text) return;

  const texto = m.text.toLowerCase();

  // Frases de broma automáticas
  const respuestas = {
    bug: '🐞 Tu mamá tiene más bugs que mi código, we 💻',
    pene: '🍆 Te gusta comer... ya sabes qué 😏',
    lento: '🐢 Tu abuela pendejo, va en modo tortuga 🐌'
};

  for (const palabra in respuestas) {
    if (texto.includes(palabra)) {
      return conn.reply(m.chat, respuestas[palabra], m);
}
}
};

handler.customPrefix = /^(bug|pene|lento)$/i;
handler.command = new RegExp; // Sin prefijo
handler.group = true;

export default handler;
