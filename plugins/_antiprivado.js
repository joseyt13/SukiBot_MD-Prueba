let modoAntiprivado = false; // Estado del modo antiprivado

const channelLink = "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N";

// Reemplaza este número con el del dueño del bot (incluye prefijo de país)
const dueñoBot = "5491156178758@s.whatsapp.net";

sock.ev.on("messages.upsert", async ({ messages}) => {
  const msg = messages[0];
  if (!msg.message || msg.key.fromMe) return;

  const sender = msg.key.remoteJid;
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

  // Activar/desactivar modo antiprivado con el comando
  if (text.toLowerCase() === ".antiprivado") {
    if (sender === dueñoBot) {
      modoAntiprivado =!modoAntiprivado;
      await sock.sendMessage(sender, {
        text: `🛡️ Modo *antiprivado* ${modoAntiprivado? "activado ✅": "desactivado ❌"} correctamente.`,
});
} else {
      await sock.sendMessage(sender, {
        text: `🚫 No tienes permisos para usar este comando.`,
});
}
    return;
}

  // Ejecuta bloqueo si está activado y el mensaje no es de grupo
  if (modoAntiprivado &&!sender.endsWith("@g.us")) {
    const mensaje = `🚫 *El modo antiprivado fue activado por mi creador.*\n\n📢 Únete al canal oficial para noticias, actualizaciones y contenido exclusivo:\n${channelLink}\n\n🔒 Este chat será bloqueado automáticamente.`;

    await sock.sendMessage(sender, { text: mensaje});
    await sock.updateBlockStatus(sender, "block");
    console.log(`🛑 Usuario bloqueado: ${sender}`);
    return;
}

  // XD...
});
