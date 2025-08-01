import fs from 'fs'
const path = './bloqueados.json'

// 🧩 Crear archivo si no existe
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]))

const handler = async (m, { conn, args, usedPrefix, command}) => {
  const ownerNumber = '5491156178758' // 🎯 Número del dueño
  const senderNumber = m.sender.split('@')[0]

  // 🔐 Validar si es el dueño
  if (senderNumber!== ownerNumber) {
    return m.reply('❌ No tienes permiso para usar este comando.')
}

  if (!args[0]) {
    return m.reply(`❗ *Uso correcto:*\n${usedPrefix}${command} <número>\n📌 Ejemplo: ${usedPrefix}${command} 573001234567`)
}

  const numero = args[0].replace(/\D/g, '') + '@s.whatsapp.net'
  let bloqueados = JSON.parse(fs.readFileSync(path))

  // 🚫 Mandar al soporte
  if (/^soporte$/i.test(command)) {
    if (!bloqueados.includes(numero)) {
      bloqueados.push(numero)
      fs.writeFileSync(path, JSON.stringify(bloqueados))
}

    await conn.sendMessage(numero, { text: '⚠️ Has sido puesto en soporte temporalmente. Contacta al administrador si crees que es un error.'})
    await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
      text: `📩 *Número en soporte:* https://wa.me/${args[0]}\n🛑 *Bloqueado temporalmente del bot.*`
})

    m.reply(`✅ *Número ${args[0]} fue mandado a soporte.*`)
}

  // 🔓 Aceptar y desbloquear
  else if (/^aceptar$/i.test(command)) {
    if (bloqueados.includes(numero)) {
      bloqueados = bloqueados.filter(n => n!== numero)
      fs.writeFileSync(path, JSON.stringify(bloqueados))
}

    await conn.sendMessage(numero, {
      text: '✅ Has sido removido del soporte. Ya puedes usar el bot nuevamente.'
})
    await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
      text: `🔓 *Número liberado de soporte:* https://wa.me/${args[0]}`
})

    m.reply(`🔓 *Número ${args[0]} ha sido desbloqueado.*`)
}
}

handler.command = /^soporte|aceptar$/i
handler.owner = true
handler.help = ['soporte <número>', 'aceptar <número>']
handler.tags = ['admin']
export default handler
