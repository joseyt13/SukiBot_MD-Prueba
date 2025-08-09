// 🌿 Estilizador tipográfico
var xStr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
var yStr = Object.freeze({
  10: ['𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆','𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓','1','2','3','4','5','6','7','8','9','0'],
  7: ['ᗩ','ᗷ','ᑕ','ᗪ','ᗴ','ᖴ','ᘜ','ᕼ','I','ᒍ','K','ᒪ','ᗰ','ᑎ','O','ᑭ','ᑫ','ᖇ','Տ','T','ᑌ','ᐯ','ᗯ','᙭','Y','ᘔ','1','2','3','4','5','6','7','8','9','0']
});

global.style = async function style(text, style = 10) {
  let replacer = [];
  xStr.map((v, i) => replacer.push({ original: v, convert: yStr[style][i]}));
  let str = text.toLowerCase().split("");
  let output = str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    return find? find.convert: v;
});
  return output.join("");
};

// 🌅 Saludo por hora
import moment from "moment-timezone";
function ucapan() {
  const time = moment.tz("America/Los_Angeles").format("HH");
  if (time>= 18) return "Good night.";
  if (time>= 15) return "Good afternoon.";
  if (time>= 10) return "Good afternoon.";
  if (time>= 4) return "Good morning.";
  return "Hello.";
}

// 🐾 Pie de página del menú
global.footer = "🌸 SukiBot_MD | powered by @⁨~3icha⁩";

// 📜 Generador de menú dinámico
global.menu = async function getMenu() {
  let text = "";
  let help = Object.values(global.plugins)
.filter((plugin) =>!plugin.disabled)
.map((plugin) => ({
      help: Array.isArray(plugin.help)? plugin.help: [plugin.help],
      tags: Array.isArray(plugin.tags)? plugin.tags: [plugin.tags],
}));

  let tags = {};
  for (let plugin of help) {
    for (let tag of plugin.tags) {
      if (tag) tags[tag] = tag.toUpperCase();
}
}

  for (let category of Object.keys(tags)) {
    let cmds = await Promise.all(
      help
.filter((menu) => menu.tags.includes(category))
.map(async (menu) =>
          Promise.all(menu.help.map(async (cmd) => `𖦹 𓈒 \`${await style(cmd, 10)}\``))
)
);

    if (cmds.length> 0) {
      text += `乂 \`${await style(tags[category], 7)}\`\n\n${cmds.map(cmdArray => cmdArray.join('\n')).join('\n')}\n\n`;
}
}

  text += `\`${footer}\``;
  global.menutext = text;
};
