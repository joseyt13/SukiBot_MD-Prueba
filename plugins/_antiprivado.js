// código creado por fedexyz 🍁 
// no quites los créditos xd 

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion} = require('@whiskeysockets/baileys');
const P = require('pino');
let modoAntiprivado = false;

const channelLink = "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N";
// Reemplaza este número con el del dueño del bot en formato internacional
const dueñoBot = "5491156178758@s.whatsapp.net"; // Ej: 5215512345678@s.whatsapp.net

async function startBot() {
  const { state, saveCreds} = await useMultiFileAuthState('./auth_info_suki');
  const { version} = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: 'silent'}),
});

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on("messages.upsert", async ({ messages}) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    // 🔐 Comando para activar/desactivar modo antiprivado
    if (text.toLowerCase() === ".antiprivado") {
      if (sender === dueñoBot) {
        modoAntiprivado =!modoAntiprivado;
        await sock.sendMessage(sender, {
          text: `🛡️ Modo *antiprivado* ${modoAntiprivado? "activado ✅": "desactivado ❌"} correctamente.`,
});
} else {
        await sock.sendMessage(sender, {
          text: `⛔ No tienes permisos para usar este comando.`,
});
}
      return;
}

    // 🚫 Si está activado y el mensaje es privado, responde y bloquea
    if (modoAntiprivado &&!sender.endsWith("@g.us")) {
      const mensaje = `🚫 *El modo antiprivado fue activado por mi creador.*\n\n📢 Únete al canal oficial para noticias y contenido exclusivo:\n${channelLink}\n\n🔒 Este chat será bloqueado automáticamente.\n\n🛠 Comando usado:.antiprivado`;

      await sock.sendMessage(sender, { text: mensaje});
      await sock.updateBlockStatus(sender, "block");
      console.log(`🛑 Usuario bloqueado: ${sender}`);
      return;
}

    // XD...
});
}

startBot();
