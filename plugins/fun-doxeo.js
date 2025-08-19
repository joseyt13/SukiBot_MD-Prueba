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

  const { key} = await conn.sendMessage(m.chat, { text: '🧑‍💻 *Iniciando escaneo de red*...'}, { quoted: m});
  const boosts = [
    pickRandom(['3','7','12','18','25']),
    pickRandom(['31','36','42','47','53']),
    pickRandom(['58','63','69','74','80']),
    pickRandom(['85','89','93','97','100'])
  ];

  for (const boost of boosts) {
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `📡 Progreso: *${boost}%*`, edit: key});
}

  const documentosFalsos = `
📂 *Documentación simulada*

• DNI: 45.982.317
• Pasaporte: XJ9203845AR
• Licencia de conducir: B-928374-AZ
• Registro académico: Universidad Pastelcore — Ingeniería en Bots
• Matrícula profesional: BOT-AR-2025-001
• Certificado de vacunación: COVID-19 (3 dosis) + AnimeVirus
• Número de seguridad social: 697-91-9151
• ID de empleado: SukiCorp-8821
• Estado civil: En relación con el código fuente
• Firma digital: ✒️ 0xA7F9B2C1D3E4F5
`;

  const doxeo = `🛰️ *Análisis de red completado*

📅 Fecha: ${new Date().toLocaleDateString()}
⏰ Hora: ${new Date().toLocaleTimeString()}

📡 Información simulada:

• Nombre de usuario: ${userName}
• Dirección IP: 172.31.255.204
• ISP: FiberLink Communications
• MAC: 00:1A:2B:3C:4D:5E
• DNS primario: 8.8.8.8
• DNS alternativo: 1.1.1.1
• Puertos abiertos: TCP 443, UDP 53, TCP 22
• Sistema operativo: Android 13 (emulado)
• Dispositivo: Xiaomi MiBot-X
• Red: NAT privada
• Gateway: 192.168.1.1
• Subnet: 255.255.255.0
• Hostname: user-172-31-255-204.fiberlink.net
• Última actividad: hace 3 minutos
• Nodo de conexión: SukiBot_MD - Nodo 4

${documentosFalsos}

🧃 Datos generados por el sistema de simulación pastelcore 🍓`;

  await conn.sendMessage(m.chat, { text: doxeo}, { quoted: m});

  await conn.sendMessage(m.chat, {
    location: {
      degreesLatitude: 37.7749,
      degreesLongitude: -122.4194,
      name: '📍 Última ubicación detectada',
      address: 'Zona industrial - Nodo 4'
}
}, { quoted: m});
};

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = ['doxear', 'doxxeo', 'doxeo'];
handler.register = true;
handler.group = true;

export default handler;
