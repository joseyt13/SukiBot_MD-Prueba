import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn}) => {
  const nombreBot = 'ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ';
  const creador = 'ꜰᴇᴅᴇxʏᴢ';
  const nomorown = '5491156178758'; // número del creador
  const dev = 'ꜰᴇᴅᴇxʏᴢ'';
  const packname = '🌸 SukiBot_MD';
  const yt = 'https://youtube.com/@fedexyz';
  const github = 'https://github.com/sukiprivado';

  const who = m.mentionedJid?.[0] || m.fromMe? conn.user.jid: m.sender;
  const pp = await conn.profilePictureUrl(who).catch(_ => 'https://files.catbox.moe/rkvuzb.jpg');
  const bioCreador = await conn.fetchStatus(nomorown + '@s.whatsapp.net').catch(_ => 'Sin Biografía');
  const bioBot = await conn.fetchStatus(conn.user.jid).catch(_ => 'Sin Biografía');

  const bio1 = bioCreador.status?.toString() || 'Sin Biografía';
  const bio2 = bioBot.status?.toString() || 'Sin Biografía';

  const contactos = [
    [
      `${nomorown}`,
      `👑 Propietario`,
      dev,
      '📩 fedelanyt20@gmail.com',
      '🇻🇪 Venezuela',
      yt,
      bio1
    ],
    [
      `${conn.user.jid.split('@')[0]}`,
      `🤖 Bot Oficial`,
      packname,
      '📵 No hacer spam',
      '📩 fedelanyt20@gmail.com',
      '🇺🇸 U.S.A',
      github,
      bio2
    ]
  ];

  await sendContactArray(conn, m.chat, contactos, m);
  await m.react('🌸');
};

handler.help = ['creador', 'owner'];
handler.tags = ['info'];
handler.command = /^(owner|creador)$/i;
export default handler;

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
  let contacts = [];

  for (let [number, name, org, email, region, link, bio] of data) {
    number = number.replace(/[^0-9]/g, '');
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name}
item.ORG:${org}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:Contacto
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:📧 Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🌍 Región
item4.URL:${link}
item4.X-ABLabel:🌐 Enlace
item5.X-ABLabel:${bio}
END:VCARD`.trim();

    contacts.push({ vcard, displayName: name});
}

  return await conn.sendMessage(
    jid,
    {
      contacts: {
        displayName: contacts.length> 1? '🌸 Contactos mágicos': contacts[0].displayName,
        contacts
}
},
    {
      quoted,
...options
}
);
}
