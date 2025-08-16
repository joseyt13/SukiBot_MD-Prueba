// Código creado y mejorado por 𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁
// no quites los créditos 🍂

const { generateWAMessageFromContent, proto} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn}) => {
  const emoji = '🌸';
  const marco = `┏━༺❀༻━┓\n`;
  const cierre = `┗━༺❀༻━┛`;

  const chiste = pickRandom(global.chiste);

  await m.react('🧁');
  await conn.reply(m.chat, `${emoji} 𝖲𝗎𝗄𝗂 está buscando un chiste mágico...`, m);

  await conn.sendMessage(m.chat, {
    text: `${marco}\n🍥 *${chiste}*\n\n${cierre}`,
    contextInfo: {
      mentionedJid: [m.sender]
}
}, { quoted: m});
};

handler.help = ['chiste'];
handler.tags = ['fun'];
handler.command = ['chiste'];
handler.group = true;
handler.register = true;
handler.exp = 5;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin.",
  "¿Cómo se dice pañuelo en japonés? Saka-moko.",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala.",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar en el tejado. Otro gato le dice: ¿Por qué ladras? El gatito responde: ¿No puedo aprender otro idioma?",
  "El doctor le dice al paciente: respire profundo. El paciente responde: ¿De quién me va a ocultar si no le debo a nadie?",
  "Un pez le pregunta a otro: ¿Qué hace tu mamá? Nada. ¿Y la tuya? Nada también.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "El profesor le dice al estudiante: Tu trabajo me ha conmovido. El estudiante pregunta: ¿Por qué? El profesor responde: Porque me dio pena.",
  "Le dice el niño a la madre: No quiero jugar más con Pedrito. ¿Por qué? Porque cuando le pego con un taco en la cabeza, se pone a llorar.",
  "Juanito, ¿qué harías si te ahogas en la piscina? Me pondría a llorar para desahogarme.",
  "Hijo, me veo gorda, fea y vieja. ¿Qué tengo? Mamá, tienes toda la razón.",
  "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
  "Había una vez un niño tan despistado que... ¡da igual, me olvidé del chiste!",
  "Una amiga le dice a otra: ¿Qué tal la vida de casada? No me puedo quejar. ¿Va bien? No, no me puedo quejar porque mi marido está al lado.",
  "¿Por qué las focas miran siempre hacia arriba? Porque ahí están los focos.",
  "Camarero, ese filete tiene muchos nervios. Normal, es la primera vez que se lo comen.",
  "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
  "Una madre le dice a su hijo: Me dijo un pajarito que te drogas. El hijo responde: La que se droga eres tú, que hablas con pajaritos."
];
