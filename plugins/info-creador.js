let handler = async (m, { conn}) => {
  // Imagen temática
  const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg';

  // Datos del creador
  const creator = {
    name: 'fedexyz',
    number: '549115617878',
    email: 'fedelanyt130@gmail.com',
    note: 'Soy mini desarrollador de bots'
};

  // Datos del colaborador
  const collaborator = {
    name: 'DevBrayan',
    number: '573001533523',
    email: 'brayanfree881@gmail.com',
    note: 'Creador de RoxyBot-MD & NagiBot-MD'
};

  // Enviar imagen con texto personalizado
  await conn.sendFile(m.chat, imageUrl, 'suki.jpg', `
👑 *Creador:* ${creator.name}
📧 *Email:* ${creator.email}
📱 *WhatsApp:* wa.me/${creator.number}
📝 *Nota:* ${creator.note}

🤝 *Colaborador:* ${collaborator.name}
📧 *Email:* ${collaborator.email}
📱 *WhatsApp:* wa.me/${collaborator.number}
📝 *Nota:* ${collaborator.note}

📌 *Grupo Oficial:* https://chat.whatsapp.com/F23muyMASZgK1RcVziBrPZ
📣 *Canal Oficial:* https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
🧊 *Canal Updates:* https://whatsapp.com/channel/0029VbBCdev6RGJ81i7RwY1j
`, m);
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'owner', 'creator'];

export default handler;
