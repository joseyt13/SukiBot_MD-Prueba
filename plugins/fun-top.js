import util from 'util';
import path from 'path';

const user = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata, command, conn, text}) {
  if (!text) {
    return conn.reply(m.chat, `
❌ *𝖤𝗋𝗋𝗈𝗋 𝖾𝗇 𝖾𝗅 𝖼𝗈𝗆𝖺𝗇𝖽𝗈*

📌 *𝖴𝗌𝗈 correcto:*
#top <tema>

📍 *Ejemplo:*
#top waifus
`, m);
}

  const ps = groupMetadata.participants.map(v => v.id);
  const nombres = Array.from({ length: 10}, () => ps.getRandom());
  const emoji = pickRandom(['🤓','😅','😂','😳','😎','🥵','😱','🤑','🙄','💩','🍑','🤨','🥴','🔥','👇🏻','😔','👀','🌚']);
  const decorativo = '♡';
  const sonido = Math.floor(Math.random() * 70);
  const vn = `https://hansxd.nasihosting.com/sound/sound${sonido}.mp3`;

  let top = `*${emoji} ${decorativo} 𝖳𝗈𝗉 10 ${toSerifBold(text)} ${decorativo} ${emoji}*\n\n`;
  nombres.forEach((id, index) => {
    top += ``${index + 1}. ${user(id)}`\n`;
});
  top += `\n${decorativo} *𝖲𝗎𝗄𝗂 𝖡𝗈𝗍 𝖳𝖾𝖺𝗆* ${decorativo}`;

  m.reply(top.trim(), null, { mentions: nombres});
}

handler.help = ['top <tema>'];
handler.command = ['top'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function toSerifBold(text) {
  const map = {
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴',
    h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻',
    o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂',
    v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚',
    H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡',
    O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨',
    V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
};
  return text.split('').map(c => map[c] || c).join('');
}
