import { performance} from 'perf_hooks';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

let handler = async (m, { conn, text}) => {
  let who;
  let userName;

  if (m.isGroup) {
    if (m.mentionedJid.length> 0) {
      who = m.mentionedJid[0];
      userName = await conn.getName(who);
} else if (m.quoted) {
      who = m.quoted.sender;
      userName = await conn.getName(who);
} else {
      who = m.chat;
}
} else {
    who = m.chat;
}

  if (!who) return conn.reply(m.chat, '📌 Por favor, etiqueta a alguien o responde a un mensaje.', m);
  if (!userName) userName = text || 'Usuario desconocido';

  const { key} = await conn.sendMessage(m.chat, { text: '🧑‍💻 *Iniciando doxeo virtual*...'}, { quoted: m});
  const boosts = [
    pickRandom(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']),
    pickRandom(['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']),
    pickRandom(['41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60']),
    pickRandom(['61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80']),
    pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])
  ];

  for (const boost of boosts) {
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `📡 Progreso: *${boost}%*`, edit: key});
}

  const doxeo = `👤 *Persona doxeada virtualmente*

📅 ${new Date().toLocaleDateString()}
⏰ ${new Date().toLocaleTimeString()}

📢 Resultados simulados:

*Nombre:* ${userName}
*IP:* 92.28.211.234
*MAC:* 5A:78:3E:7E:00
*ISP:* Ucom Universal
*DNS:* 8.8.8.8 / 1.1.1.1
*WAN:* 100.23.10.15
*GATEWAY:* 192.168.0.1
*SUBNET:* 255.255.0.255
*PUERTOS:* TCP: 443 / UDP: 8080
*DISPOSITIVO:* WIN32-X
*ROUTER:* ERICCSON
*CONEXIÓN:* TPLINK COMPANY
*SS NUMBER:* 6979191519182016
*IPV6:* fe80::5dcd::ef69::fb22::d9888%12
*HTTP:* 192.168.3.1:433 → 92.28.211.234:80
*MODEM JUMPS:* 64
*HOST:* host-132.12.32.167.ucom.com

🧃 Información generada por SukiBot_MD 🍓`;

  await conn.sendMessage(m.chat, { text: doxeo}, { quoted: m});

  // 📍 Ubicación falsa simulada
  await conn.sendMessage(m.chat, {
    location: {
      degreesLatitude: -34.6037,
      degreesLongitude: -58.3816,
      name: '📍 Última ubicación detectada',
      address: 'Nodo pastelcore - SukiBot_MD'
}
}, { quoted: m});
};

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = ['doxear', 'doxxeo', 'doxeo'];
handler.register = true;
handler.group = true;

export default handler;
