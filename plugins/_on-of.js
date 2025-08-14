import { createHash} from 'crypto'
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin}) => {
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}
  const type = command.toLowerCase()
  let isGlobal = false
  let isEnable = chat[type] || bot[type] || false

  // 🧭 Panel de configuración
  if (!args[0] ||!['on', 'off', 'enable', 'disable'].includes(args[0].toLowerCase())) {
    const estado = isEnable? '✅ Activado': '❌ Desactivado'
    return conn.reply(m.chat,
`📍 *Panel de configuración*

🔧 Comando: *${command}*
📊 Estado actual: ${estado}

Usa uno de estos comandos:
• *${usedPrefix + command} on* — Activar
• *${usedPrefix + command} off* — Desactivar`, m)
}

  const activar = /on|enable/i.test(args[0])
  const desactivar = /off|disable/i.test(args[0])
  isEnable = activar? true: desactivar? false: isEnable

  // 🔐 Validación de permisos
  const requiereAdmin = m.isGroup &&!(isAdmin || isOwner)
  const requiereOwner =!isOwner

  const opcionesGrupo = [
    'welcome', 'bienvenida', 'reaction', 'reaccion',
    'detect', 'avisos', 'nsfw', 'modohorny',
    'antilink', 'antifake', 'autoaceptar', 'aceptarauto',
    'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond',
    'antisubbots', 'antibot2', 'antibot', 'antibots',
    'modoadmin', 'soloadmin'
  ]

  const opcionesGlobales = [
    'antiprivado', 'antiprivate', 'restrict', 'restringir',
    'jadibotmd', 'modejadibot'
  ]

  if (opcionesGrupo.includes(type)) {
    if (requiereAdmin) {
      global.dfail('admin', m, conn)
      throw false
}
    chat[type] = isEnable
} else if (opcionesGlobales.includes(type)) {
    isGlobal = true
    if (requiereOwner) {
      global.dfail('rowner', m, conn)
      throw false
}
    bot[type] = isEnable
} else {
    return conn.reply(m.chat, '⚠️ Esta opción no está disponible.', m)
}

  // ✅ Confirmación
  const destino = isGlobal? '🌐 Global': '👥 Grupo'
  const estadoFinal = isEnable? '✅ Activado': '❌ Desactivado'

  return conn.reply(m.chat,
`✅ *Configuración actualizada*

🔧 Opción: *${type}*
📊 Estado: ${estadoFinal}
📍 Aplicación: ${destino}`, m)
}

handler.help = [
  'welcome', 'bienvenida', 'antiprivado', 'antiprivate',
  'restrict', 'restringir', 'autolevelup', 'autonivel',
  'antibot', 'antibots', 'autoaceptar', 'aceptarauto',
  'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond',
  'antisubbots', 'antibot2', 'modoadmin', 'soloadmin',
  'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam',
  'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos',
  'antilink', 'antifake'
]
handler.tags = ['settings', 'group', 'config']
handler.command = handler.help
handler.register = true

export default handler
