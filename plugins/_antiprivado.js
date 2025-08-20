// Código creado por The Carlos ✨ 
// editado por fede 👻

const TIEMPO_BLOQUEO_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.message || typeof m.text!== 'string') return false;

    const text = m.text.toUpperCase();
    const exentos = ['PIEDRA', 'PAPEL', 'TIJERA', 'SERBOT', 'JADIBOT'];
    const comandosPermitidosBloqueados = ['CODE'];

    const botConfig = global.db?.data?.settings?.[conn.user?.jid] || {};
    const userData = global.db?.data?.users?.[m.sender] || {};
    const grupoOficial = global.gp1 || 'https://chat.whatsapp.com/tu-enlace-grupo';

    const esExento = exentos.some(word => text.includes(word));
    const esComandoPermitido = comandosPermitidosBloqueados.some(cmd => text.startsWith(cmd));

    // Permitir comandos exentos o permitidos aunque el usuario esté bloqueado
    if (esExento || esComandoPermitido) return true;

    // Desbloqueo automático si ya pasó el tiempo
    if (userData.bloqueado && userData.tiempoBloqueo) {
      const tiempoTranscurrido = Date.now() - userData.tiempoBloqueo;

      if (tiempoTranscurrido>= TIEMPO_BLOQUEO_MS) {
        await conn.updateBlockStatus(m.chat, 'unblock').catch(() => {});
        Object.assign(userData, {
          bloqueado: false,
          tiempoBloqueo: 0,
          warnPrivado: 0
});

        await conn.sendMessage(m.chat, {
          text: `🔓 *¡El sello ha sido roto!*\n\n🌠 @${m.sender.split('@')[0]}, tus cadenas se han desvanecido...\n✨ Puedes volver a usar mis poderes.`,
          mentions: [m.sender]
});
} else {
        return false; // Aún está bloqueado
}
}

    // Anti privado: advertencias y bloqueo si no es owner
    const esPrivado =!m.isGroup;
    const antiPrivadoActivo = botConfig.antiPrivate;

    if (esPrivado && antiPrivadoActivo &&!isOwner &&!isROwner) {
      userData.warnPrivado = (userData.warnPrivado || 0) + 1;

      if (userData.warnPrivado>= 3) {
        const mensajeBloqueo = `
💀 *SENTENCIA CÓSMICA ACTIVADA* 💀
━━━━━━━━━━━━━━━━━━━━━━
👁️ Usuario: @${m.sender.split('@')[0]}
📛 Has accedido al grimorio sin autorización.

🔒 Estado: *BLOQUEADO POR 2 DÍAS*
🕰️ Todos los canales mágicos han sido sellados.

💡 Busca redención en el gremio:
🌐 ${grupoOficial}
━━━━━━━━━━━━━━━━━━━━`.trim();

        await m.reply(mensajeBloqueo, false, { mentions: [m.sender]});
        await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
        Object.assign(userData, {
          bloqueado: true,
          tiempoBloqueo: Date.now(),
          warnPrivado: 0
});

        return false;
} else {
        const mensajeAdvertencia = `
⚠️ *¡ACCESO RESTRINGIDO!* ⚠️
━━━━━━━━━━━━━━━━━━━
🧛‍♂️ @${m.sender.split('@')[0]}, no puedes contactar al grimorio sagrado por privado.

🔁 Advertencia ${userData.warnPrivado}/3
🕳️ Al tercer intento, serás sellado por 2 días (privado + grupos).

📜 Únete al gremio oficial:
🌐 ${grupoOficial}
━━━━━━━━━━━━━━━━━━`.trim();

        await m.reply(mensajeAdvertencia, false, { mentions: [m.sender]});
        return false;
}
}

    return true;

} catch (error) {
    console.error('[❌ ERROR EN ANTI-PRIVADO Y GRUPAL]', error);
    return true; // No bloquear por error
}
}
