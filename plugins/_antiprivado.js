const TIEMPO_BLOQUEO_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.message || typeof m.text!== 'string') return false;

    const bot = global.db.data.settings[conn.user.jid] || {};
    const user = global.db.data.users[m.sender] || {};
    const grupoOficial = global.gp1 || 'https://chat.whatsapp.com/tu-enlace-grupo';

    // 🔓 Desbloqueo automático si ya pasó el tiempo
    if (user.bloqueado && user.tiempoBloqueo) {
      const tiempoTranscurrido = Date.now() - user.tiempoBloqueo;
      if (tiempoTranscurrido>= TIEMPO_BLOQUEO_MS) {
        await conn.updateBlockStatus(m.chat, 'unblock').catch(() => {});
        Object.assign(user, {
          bloqueado: false,
          tiempoBloqueo: 0,
          warnPrivado: 0
});

        await conn.sendMessage(m.chat, {
          text: `🔓 *¡El sello ha sido roto!*\n\n✨ @${m.sender.split('@')[0]}, tus cadenas han sido disueltas.\nPuedes volver a invocar mis poderes.`,
          mentions: [m.sender]
});
} else {
        return false;
}
}

    // 🚫 Bloqueo automático si AntiPrivado está activado
    if (!m.isGroup && bot.antiprivado &&!isOwner &&!isROwner) {
      user.warnPrivado = (user.warnPrivado || 0) + 1;

      if (user.warnPrivado>= 3) {
        await conn.sendMessage(m.chat, {
          text: `
🚫 *ACCESO DENEGADO* 🚫
━━━━━━━━━━━━━━━━━━━━━━
👤 Usuario: @${m.sender.split('@')[0]}
📵 Has invocado al bot sin autorización.

⛔ Estado: *Bloqueado por 2 días*
🕰️ Todos los canales han sido cerrados.

🔄 Puedes buscar redención en el gremio oficial:
🌐 ${grupoOficial}
━━━━━━━━━━━━━━━━━━━━━━`.trim(),
          mentions: [m.sender]
});

        await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
        Object.assign(user, {
          bloqueado: true,
          tiempoBloqueo: Date.now(),
          warnPrivado: 0
});

        return false;
} else {
        await conn.sendMessage(m.chat, {
          text: `
⚠️ *ZONA RESTRINGIDA* ⚠️
━━━━━━━━━━━━━━━━━━━━━━
🧙‍♂️ @${m.sender.split('@')[0]}, no puedes contactar al bot por privado.

🔁 Advertencia: ${user.warnPrivado}/3
⏳ Al tercer intento, serás bloqueado por 2 días.

📜 Únete al gremio oficial:
🌐 ${grupoOficial}
━━━━━━━━━━━━━━━━━━━━━━`.trim(),
          mentions: [m.sender]
});

        return false;
}
}

    return true;

} catch (e) {
    console.error('[❌ ERROR EN SISTEMA ANTIPRIVADO]', e);
    return true;
}
}
