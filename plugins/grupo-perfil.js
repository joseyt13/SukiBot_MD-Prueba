import fs from 'fs'

const loadMarriages = () => {
  const path = './media/database/marry.json'
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'))
    global.db.data.marriages = data
} else {
    global.db.data.marriages = {}
}
}

let handler = async (m, { conn}) => {
  loadMarriages()

  let who = m.quoted?.sender || m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender)
  const user = global.db.data.users[who] || {}

  const {
    registered = false,
    level = 0,
    exp = 0,
    age = 'Sin registrar 🌙',
    genre = 'No definido 💫',
    role = 'Novat@',
    description = '🍃 Sin frase mágica aún~'
} = user

  const isMarried = global.db.data.marriages?.[who]
  const partnerName = isMarried? await conn.getName(global.db.data.marriages[who]): '🩷 Sin compañer@'

  const username = await conn.getName(who)
  const perfilpic = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/07fyj3.jpg')

  const mensaje = `
🌸 ꒰ Perfil encantado de ${username} ꒱

🧋 Nombre: *${username}*
🎂 Edad: *${registered? age: 'No registrada'}*
📖 Registro: *${registered? '✅ Activo': '❌ Pendiente'}*
💫 Rango espiritual: *${role}*
✨ Nivel: *${level}* | EXP: *${exp}*
🧠 Género: *${genre}*
💕 Pareja: *${partnerName}*
🌷 Frase: *${description}*

🪄 *Sigue brillando en el mundo de Suki_Bot_MD~*`.trim()

  await conn.sendFile(m.chat, perfilpic, 'perfil.jpg', mensaje, m, { mentions: [who]})
}

handler.help = ['perfil']
handler.tags = ['info', 'rg']
handler.command = ['perfil', 'profile']
handler.register = true

export default handler
