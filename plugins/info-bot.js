// Código creado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

const handler = async (m, { conn}) => {
  if (!m.isGroup) return; // Solo responde en grupos

  const texto = m.text?.toLowerCase();
  if (!texto) return;

  const respuestas = {
    bug: '🐞 Tu mamá tiene más bugs que mi código 💻',
    pene: '🍆 Te gusta comer... snacks raros 🤨',
    lento: '🐢 Tu abuela corre en modo tortuga 🐌',
    bot: '🤖 ¿Bot? Tu existencia fue programada por error 💥'
};

  for (const palabra in respuestas) {
    if (texto.includes(palabra)) {
      return conn.reply(m.chat, respuestas[palabra], m);
}
}
};

handler.customPrefix = /^(bug|pene|lento|bot)$/i;
handler.command = new RegExp;
handler.group = true;

export default handler;.
