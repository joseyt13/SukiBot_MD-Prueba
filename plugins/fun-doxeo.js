import { performance} from 'perf_hooks';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

let handler = async (m, { conn, text}) => {
  let who;
  let userName;

  if (m.isGroup) {
    if (m.mentionedJid.length> 0) {
      who = m.mentionedJid[0];
} else if (m.quoted) {
      who = m.quoted.sender;
} else {
      who = m.sender;
}
} else {
    who = m.sender;
}

  userName = global.db?.data?.users?.[who]?.name || text || 'Usuario desconocido';

  const pasos = [
    '🧑‍💻 Iniciando doxeo virtual...',
    '🔍 Obteniendo información del usuario...',
    '📡 Analizando red y actividad reciente...',
    '📂 Accediendo a documentación simulada...',
    '🌐 Rastreo de perfiles sociales...',
    '🛰️ Localizando última ubicación conocida...'
  ];

  for (const paso of pasos) {
    await conn.sendMessage(m.chat, { text: paso}, { quoted: m});
    await delay(1200);
}

  const documentosFalsos = `
📂 *Documentación simulada*

• DNI: 45.982.317
• Pasaporte: XR9203845AR
• Licencia de conducir: B-928374-AZ
• Registro académico: Universidad Pastelcore — Ingeniería en Bots
• Matrícula profesional: BOT-AR-2025-001
• Certificado de vacunación: COVID-19 (3 dosis) + AnimeVirus
• Número de seguridad social: 697-91-9151
• ID de empleado: SukiCorp-8821
• Estado civil: En relación con el código fuente
• Firma digital: ✒️ 0xA7F9B2C1D3E4F5
`;

  const perfilesSociales = `
🌐 *Perfiles digitales simulados*

• Facebook: @${userName.toLowerCase().replace(/\s/g, '')}.official
• Instagram: @${userName.toLowerCase().replace(/\s/g, '')}_md
• TikTok: @${userName.toLowerCase().replace(/\s/g, '')}_core
• Twitter: @${userName.toLowerCase().replace(/\s/g, '')}_suki
• Discord: ${userName}#8821
• Steam: ${userName.toLowerCase().replace(/\s/g, '')}_gamerx
• GitHub: github.com/${userName.toLowerCase().replace(/\s/g, '')}-dev
• Última conexión: hace 2 horas
• Estado: Activa en modo pastelcore
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
• Nodo de conexión: SukiBot_MD - Nodo 4

${documentosFalsos}
${perfilesSociales}

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
