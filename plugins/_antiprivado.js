export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.message || typeof m.text!== 'string') return false;

    const bot = global.db.data.settings[conn.user.jid] || {};
    const user = global.db.data.users[m.sender] || {};
    const gremioOficial = global.gp1 || 'https://chat.whatsapp.com/tu-enlace-grupo';

    // 🚫 Si el usuario ya está bloqueado, no se desbloquea automáticamente
    if (user.bloqueado) {
      // Si el bot fue desbloqueado manualmente, lo vuelve a bloquear al primer mensaje
      await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
      user.bloqueado = true;
      user.tiempoBloqueo = Date.now();

      return false;
}

    // 🚫 Bloqueo inmediato si antiPrivado está activado
    if (!m.isGroup && bot.antiprivado &&!isOwner &&!isROwner) {
      await conn.sendMessage(m.chat, {
        text: `
╭─❖─「 👻 𝑺𝒆𝒏𝒕𝒆𝒏𝒄𝒊𝒂 𝑪𝒐́𝒔𝒎𝒊𝒄𝒂 👻 」─❖─╮
👁️ Usuario: @${m.sender.split('@')[0]}
📛 Has invocado al grimorio sin autorización.

🔒 Estado: *BLOQUEADO PERMANENTEMENTE*
🕰️ Todos los canales mágicos han sido sellados.

🔮 Busca redención en el gremio oficial:
🌐 ${gremioOficial}
╰─◇───────────────◇─╯
🌸 *SukiBot_MD* te observa desde las sombras...`.trim(),
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
