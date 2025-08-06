// código creado por fedexyz, no quites creditos ⚔ 

import { sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png} from '../lib/webp2mp4.js';

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};

let handler = async (m, { conn, args}) => {
  let stiker = false;
  try {
    let q = m.quoted? m.quoted: m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds> 15) {
        return m.reply(`⚠️ 𝖤𝗅 𝗏𝗂𝖽𝖾𝗈 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾 𝖽𝗎𝗋𝖺𝗋 𝗆𝖺𝗌 𝖽𝖾 𝟣𝟧 𝗌𝖾𝗀𝗎𝗇𝖽𝗈𝗌...`);
}

      let img = await q.download?.();
      if (!img) return conn.reply(m.chat, `🍁 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗇𝗏í𝖺 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇 𝗈 𝗏𝗂𝖽𝖾𝗈 𝗉𝖺𝗋𝖺 𝗁𝖺𝖼𝖾𝗋 𝗎𝗇 𝗌𝗍𝗂𝖼𝗄𝖾𝗋.`, m);

      let out;
      try {
        // ✨ Marca de agua con fuente decorativa
        let texto1 = '𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁';
        let texto2 = '𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣';

        stiker = await sticker(img, false, texto1, texto2);
} finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out!== 'string') out = await uploadImage(img);

          stiker = await sticker(false, out, '𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁', '𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣');
}
}

} else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], '𝖋𝖊𝖉𝖊𝖝𝖞𝖟 🍁', '𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣');
} else {
        return m.reply(`⚠️ 𝖤𝗅 𝖴𝖱𝖫 𝗇𝗈 𝖾𝗌 𝗏𝖺𝗅𝗂𝖽𝗈...`);
}
}

} finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
} else {
      return conn.reply(m.chat, `🍁 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗇𝗏í𝖺 𝗎𝗇𝖺 𝗂𝗆𝖺𝗀𝖾𝗇 𝗈 𝗏𝗂𝖽𝖾𝗈 𝗉𝖺𝗋𝖺 𝗁𝖺𝖼𝖾𝗋 𝗎𝗇 𝗌𝗍𝗂𝖼𝗄𝖾𝗋.`, m);
}
}
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;
