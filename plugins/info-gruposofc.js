import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `╭─❀ 𝖦𝗋𝗎𝗉𝗈𝗌 𝗈𝖿𝗂𝖼𝗂𝖺𝗅𝗂𝗌 ❀─╮

- ${namegrupo}
↳ *❀* ${gp1}

${namecomu}
↳ *❀* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ${namechannel}
↳ *❀* ${channel}

> ${dev}`

await conn.sendFile(m.chat, catalogo, "grupos.jpg", grupos, m)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
