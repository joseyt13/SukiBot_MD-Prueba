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
          tiempoBloqueo: 0
});

        await conn.sendMessage(m.chat, {
          text: `🔓 *¡El sello ha sido roto!*\n\n🌠 @${m.sender.split('@')[0]}, tus cadenas se han desvanecido...\n✨ Puedes volver a usar mis poderes.`,
          mentions: [m.sender]
});
} else {
        return false;
}
}

    // 🚫 Bloqueo inmediato si antiPrivado está activado
    if (!m.isGroup && bot.antiprivado &&!isOwner &&!isROwner) {
      await conn.sendMessage(m.chat, {
        text: `
💀 *SENTENCIA CÓSMICA ACTIVADA* 💀
━━━━━━━━━━━━━━━━━━━━━━
👁️ Usuario: @${m.sender.split('@')[0]}
📛 Has invocado al grimorio sin autorización.

🔒 Estado: *BLOQUEADO POR 2 DÍAS*
🕰️ Todos los canales mágicos han sido sellados.

🔮 Busca redención en el gremio oficial:
🌐 ${grupoOficial}
━━━━━━━━━━━━━━━━━━━━━━`.trim(),
        mentions: [m.sender]
});

      await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
      Object.assign(user, {
        bloqueado: true,
        tiempoBloqueo: Date.now()
});

      return false;
}

    return true;

} catch (e) {
    console.error('[❌ ERROR EN SISTEMA ANTIPRIVADO - SukiBot_MD]', e);
    return true;
}
}
