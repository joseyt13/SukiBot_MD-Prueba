// 🧁 Código creado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

const estilos = [
  { id: '1', nombre: '𝒞𝓊𝓇𝓈𝒾𝓋𝒶', map: cursiva()},
  { id: '2', nombre: '𝔊𝔬𝔱𝔦𝔠𝔞', map: gotica()},
  { id: '3', nombre: '🅑🅤🅡🅑🅤🅙🅐', map: burbuja()},
  { id: '4', nombre: '𝙈𝙤𝙣𝙤𝙨𝙥𝙖𝙘𝙚', map: mono()},
  { id: '5', nombre: '𝖋𝖗𝖆𝖐𝖙𝖚𝖗', map: fraktur()},
  { id: '6', nombre: 'Ｆｕｌｌｗｉｄｔｈ', map: full()},
  { id: '7', nombre: '𝗡𝗲𝗴𝗿𝗶𝘁𝗮', map: bold()},
  { id: '8', nombre: '𝘊𝘶𝘳𝘴𝘪𝘷𝘢 𝘚𝘢𝘯𝘴', map: sansItalic()},
  { id: '9', nombre: '𝘽𝙤𝙡𝙙 𝙎𝙖𝙣𝙨', map: sansBold()}
];

function generateMap(chars) {
  const map = {};
  for (let i = 0; i < 26; i++) {
    map[String.fromCharCode(97 + i)] = chars[i];
    map[String.fromCharCode(65 + i)] = chars[i + 26];
}
  return map;
}

function cursiva() {
  return generateMap("𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
}
function gotica() {
  return generateMap("𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ".split(''));
}
function burbuja() {
  return generateMap("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ".split(''));
}
function mono() {
  return generateMap("𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙂𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉".split(''));
}
function fraktur() {
  return generateMap("𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅".split(''));
}
function full() {
  return generateMap("ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ".split(''));
}
function bold() {
  return generateMap("𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split(''));
}
function sansItalic() {
  return generateMap("𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡".split(''));
}
function sansBold() {
  return generateMap("𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭".split(''));
}

function transformar(texto, mapa) {
  return texto.split('').map(c => mapa[c] || c).join('');
}

let handler = async (m, { command, args}) => {
  const input = args.join(' ');
  if (!input) return m.reply('🌸 Escribe un texto para transformarlo.\nEjemplo: *.letra SukiBot*');

  if (command === 'letra') {
    let preview = estilos.map(e => `*${e.id}.* ${e.nombre}\n> ${transformar(input, e.map)}`).join('\n\n');
    return m.reply(`🧁 *Estilos disponibles para:* _${input}_\n\n${preview}`);
}

  const estilo = estilos.find(e => e.id === command.replace('.', ''));
  if (!estilo) return m.reply('❌ Estilo no encontrado. Usa *.letra* para ver todos.');

  const resultado = transformar(input, estilo.map);
  return m.reply(`✨ *Texto transformado en estilo ${estilo.nombre}:*\n${resultado}`);
};

handler.help = ['letra <texto>', '.1 <texto>', '.2 <texto>', '.3 <texto>', '.4 <texto>', '.5 <texto>', '.6 <texto>', '.7 <texto>', '.8
