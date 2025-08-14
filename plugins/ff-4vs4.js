let salaFF = {}

let handler = async (m, { args, command, groupMetadata}) => {
  const chatId = m.chat
  const sender = m.sender

  if (!m.isGroup) throw '❌ Este comando solo funciona en grupos.'
  const groupName = groupMetadata.subject

  switch (args[0]) {
    case 'crear':
      if (salaFF[chatId]) throw '⚠️ Ya hay una sala activa en este grupo.'
      salaFF[chatId] = {
        creador: sender,
        jugadores: [],
        estado: 'esperando'
}
      return m.reply(`🎮 Sala 4vs4 creada por @${sender.split('@')[0]}\n\nUsa *.4vs4 unir* para entrar.`, { mentions: [sender]})

    case 'unir':
      if (!salaFF[chatId]) throw '❌ No hay ninguna sala activa. Usa *.4vs4 crear* primero.'
      if (salaFF[chatId].jugadores.includes(sender)) throw '⚠️ Ya estás registrado en esta sala.'
      if (salaFF[chatId].jugadores.length>= 8) throw '🚫 La sala ya está llena (8 jugadores).'

      salaFF[chatId].jugadores.push(sender)
      return m.reply(`✅ @${sender.split('@')[0]} se ha unido a la sala. (${salaFF[chatId].jugadores.length}/8)`, { mentions: [sender]})

    case 'equipos':
      if (!salaFF[chatId]) throw '❌ No hay ninguna sala activa.'
      if (salaFF[chatId].jugadores.length < 8) throw '⚠️ Se necesitan 8 jugadores para formar equipos.'

      let jugadores = salaFF[chatId].jugadores
      let equipo1 = jugadores.slice(0, 4)
      let equipo2 = jugadores.slice(4, 8)

      return m.reply(
        `🎯 Equipos para la partida 4vs4:\n\n` +
        `🔵 *Equipo 1:*\n${equipo1.map(j => '• @' + j.split('@')[0]).join('\n')}\n\n` +
        `🔴 *Equipo 2:*\n${equipo2.map(j => '• @' + j.split('@')[0]).join('\n')}`,
        { mentions: [...equipo1,...equipo2]}
)

    case 'cancelar':
      if (!salaFF[chatId]) throw '❌ No hay ninguna sala activa.'
      if (salaFF[chatId].creador!== sender) throw '🚫 Solo el creador puede cancelar la sala.'

      delete salaFF[chatId]
      return m.reply('🗑️ La sala ha sido cancelada.')

    default:
      return m.reply(
        `🎮 Comando 4vs4 Free Fire\n\n` +
        `📌 *.4vs4 crear* — Crea una sala\n` +
        `📌 *.4vs4 unir* — Únete a la sala\n` +
        `📌 *.4vs4 equipos* — Mostrar equipos\n` +
        `📌 *.4vs4 cancelar* — Cancelar sala (solo creador)`
)
}
}

handler.help = ['4vs4']
handler.tags = ['games']
handler.command = ['4vs4']
handler.group = true

export default handler
