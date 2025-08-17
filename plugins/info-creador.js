let handler = async (m, { conn}) => {
  // Datos del creador
  const creator = {
    name: 'fedexyz',
    number: '549115617878',
    email: 'fedelanyt130@gmail.com',
    org: 'Creador de SukiBot_MD',
    note: 'Soy mini desarrollador de bots'
}

  // Datos del colaborador
  const collaborator = {
    name: 'DevBrayan',
    number: '573001533523',
    email: 'brayanfree881@gmail.com',
    org: 'Colaborador de SukiBot-MD',
    note: 'Creador de RoxyBot-MD & NagiBot-MDN'
}

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
`.trim()

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
`.trim()

  // Enviar ambos contactos
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Equipo SukiBot-MD',
      contacts: [
        { vcard: vcardCreator},
        { vcard: vcardCollaborator}
      ]
}
}, { quoted: m})
}

handler.help = ['creador']
handler.tags = ['info']
handler.command = ['creador', 'owner', 'creator']

export default handler
