let handler = async (m, { conn}) => {
  // Imagen temática
  const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg';

  // Datos del creador
  const creator = {
    name: 'fedexyz',
    number: '549115617878',
    email: 'fedelanyt130@gmail.com',
    org: 'Creador de SukiBot_MD',
    note: 'Soy mini desarrollador de bots'
};

  // Datos del colaborador
  const collaborator = {
    name: 'DevBrayan',
    number: '573001533523',
    email: 'brayanfree881@gmail.com',
    org: 'Colaborador de SukiBot-MD',
    note: 'Creador de RoxyBot-MD & NagiBot-MDN'
};

  // VCard del creador
  const vcardCreator = `
BEGIN:VCARD
VERSION:3.0
N:${creator.name}
FN:${creator.name}
ORG:${creator.org}
EMAIL;type=EMAIL:${creator.email}
TEL;type=CELL;type=VOICE;waid=${creator.number}:${creator.number}
NOTE:${creator.note}
END:VCARD
`.trim();

  // VCard del colaborador
  const vcardCollaborator = `
BEGIN:VCARD
VERSION:3.0
N:${collaborator.name}
FN:${collaborator.name}
ORG:${collaborator.org}
EMAIL;type=EMAIL:${collaborator.email}
TEL;type=CELL;type=VOICE;waid=${collaborator.number}:${collaborator.number}
NOTE:${collaborator.note}
END:VCARD
`.trim();

  // Enviar imagen con texto informativo
  await conn.sendFile(m.chat, imageUrl, 'suki.jpg', `
🌸 *Información del equipo SukiBot-MD* 🌸

👑 *Creador:* ${creator.name}
📧 *Email:* ${creator.email}
📱 *WhatsApp:* wa.me/${creator.number}
📝 *Nota:* ${creator.note}

🤝 *Colaborador:* ${collaborator.name}
📧 *Email:* ${collaborator.email}
📱 *WhatsApp:* wa.me/${collaborator.number}
📝 *Nota:* ${collaborator.note}

📌 *Grupo Oficial:* https://chat.whatsapp.com/F23muyMASZgK1RcVziBrPZ?mode=ac_t
📣 *Canal Oficial:* https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
🧊 *Canal Updates:* https://whatsapp.com/channel/0029VbBCdev6RGJ81i7RwY1j
`, m);

  // Enviar contactos como vCards
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Equipo SukiBot-MD',
      contacts: [
        { vcard: vcardCreator},
        { vcard: vcardCollaborator}
      ]
}
}, { quoted: m});
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'owner', 'creator'];

export default handler;
