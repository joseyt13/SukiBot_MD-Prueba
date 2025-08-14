let handler = async (m, { conn, args, isAdmin, isBotAdmin}) => {
  if (!m.isGroup) throw '❌ Este comando solo funciona en grupos.'
  if (!isAdmin) throw '🚫 Solo los administradores pueden usar este comando.'
  if (!isBotAdmin) throw '⚠️ El bot necesita permisos de administrador para expulsar.'

  if (!args.length) throw '📌 Ingresa uno o más números o prefijos.\nEjemplo:.kicknum 521234567890 +212 +91'

  let groupMetadata = await conn.groupMetadata(m.chat)
  let participants = groupMetadata.participants.map(p => p.id).filter(id => id.endsWith('@s.whatsapp.net'))

  let targets = []

  for (let arg of args) {
    let clean = arg.replace(/[^0-9+]/g, '')
    if (clean.startsWith('+')) {
      let prefix = clean.slice(1)
      let matched = participants.filter(id => id.startsWith(prefix))
      targets.push(...matched)
} else if (clean.length> 5) {
      targets.push(`${clean}@s.whatsapp.net`)
}
}

  let uniqueTargets = [...new Set(targets)].filter(jid => jid!== conn.user.jid)

  let failed = []
  for (let jid of uniqueTargets) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [jid], 'remove')
} catch (e) {
      failed.push(jid)
}
}

  let success = uniqueTargets.filter(jid =>!failed.includes(jid))
  let msg = `✅ Expulsados:\n${success.map(j => `• @${j.split('@')[0]}`).join('\n')}`
  if (failed.length) msg += `\n\n⚠️ Fallaron:\n${failed.map(j => `• @${j.split('@')[0]}`).join('\n')}`

  await m.reply(msg, { mentions: [...success,...failed]})
}

handler.help = ['kicknum <número(s) o prefijo(s)>']
handler.tags = ['group']
handler.command = ['kicknum']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
