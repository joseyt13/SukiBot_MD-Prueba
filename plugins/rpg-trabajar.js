// === Sistema de cooldown por usuario ===
const cooldowns = {}

// === Frases de trabajo aleatorias ===
const trabajo = [
  "Trabajas como cortador de galletas y ganas",
  "Diseñas un logo corporativo y recibes",
  "Desarrollas videojuegos y te pagan",
  "Cocinas en el restaurante de la abuela y ganas",
  "Actúas como panda en Disneyland y cobras",
  "Limpias una chimenea y encuentras",
  "Vendes sándwiches de pescado y obtienes",
  "Trabajas como artista callejero y recibes",
  "Organizas un torneo de ajedrez y ganas",
  "Reparas máquinas recreativas y obtienes",
  "Trabajas como podador de arbustos y consigues",
  "Cultivas rábanos mágicos y los vendes por",
  "Trabajas todo el día en la empresa y recibes",
  "Diseñas tarjetas de cumpleaños y cobras",
  "Limpias ventilaciones tóxicas y te pagan",
  "Revisas tu bolso y vendes lo inútil por",
  "Resuelves misterios y el gobierno te premia con",
]

// === Formateador de números grandes ===
function toNum(n) {
  if (Math.abs(n)>= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (Math.abs(n)>= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

// === Conversor de segundos a minutos + segundos ===
function segundosAHMS(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}m y ${r}s`
}

// === Selector aleatorio de array ===
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

let handler = async (m, { conn}) => {
  const user = global.db.data.users[m.sender]
  if (!user) return

  const cooldown = 5 * 60 * 1000 // 5 minutos
  const now = Date.now()

  if (cooldowns[m.sender] && now - cooldowns[m.sender] < cooldown) {
    const restante = Math.ceil((cooldowns[m.sender] + cooldown - now) / 1000)
    return conn.reply(m.chat, `⏳ Espera *${segundosAHMS(restante)}* para volver a trabajar.`, m)
}

  const cantidad = Math.floor(Math.random() * 500)
  const frase = pickRandom(trabajo)

  cooldowns[m.sender] = now
  user.coin += cantidad

  await conn.reply(
    m.chat,
    `💼 ${frase} *${toNum(cantidad)}* (${cantidad}) monedas 💸.`,
    m
)
}

handler.command = ['w', 'work', 'chambear', 'chamba', 'trabajar']
handler.tags = ['economy']
handler.help = ['trabajar']
handler.group = true
handler.register = true

export default handler
