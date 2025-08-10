import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text}) => {
  if (!text) return m.reply('🌸 𝖯𝗈𝗋𝖿𝗂𝗌... escribe el nombre de usuario\n💡 Ejemplo: cscstalk ZenzzXD');

  await m.reply('🔍 𝖡𝗎𝗌𝖼𝖺𝗇𝖽𝗈 𝗉𝖾𝗋𝖿𝗂𝗅 𝗆𝖺́𝗀𝗂𝖼𝗈...');

  try {
    let username = text.trim();
    let result = await cscstalk(username);

    if (!result ||!result.profile) return m.reply('😿 𝖭𝗈 𝗌𝖾 𝗉𝗎𝖾𝖽𝖾 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝗅𝖺 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝖼𝗂𝗈́𝗇.');

    let txt = `🎀 *𝖯𝗋𝗈𝗋𝗂𝗅𝗈 𝖽𝖾 Codeshare*\n`;
    txt += `• 𝖴𝗌𝖾𝗋𝗇𝖺𝗆𝖾: ${result.profile.username}\n`;
    txt += `• 𝖡𝗂𝗈: ${result.profile.bio || '—'}\n`;
    txt += `• 𝖲𝗂𝗀𝗎𝖾𝗇: ${result.profile.following}\n`;
    txt += `• 𝖲𝗂𝗀𝗎𝖾𝗅𝗈𝗌: ${result.profile.followers}\n\n`;

    if (result.snippets.length) {
      txt += `📦 *𝖲𝗇𝗂𝗉𝗉𝖾𝗍𝗌 (${result.snippets.length})*\n`;
      result.snippets.forEach((snip, i) => {
        txt += `\n${i + 1}. ${snip.title} (${snip.language})\n`;
        txt += `   🕒 ${snip.date} | 👁️ ${snip.views} vistas\n`;
        txt += `   🔗 ${snip.url}`;
});
} else {
      txt += `🚫 𝖤𝗌𝗍𝖾 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 𝗇𝗈 𝗍𝗂𝖾𝗇𝖾 𝗌𝗇𝗂𝗉𝗉𝖾𝗍𝗌.`;
}

    let thumb = result.profile.avatar || result.profile.banner || null;
    if (thumb) {
      await conn.sendFile(m.chat, thumb, 'suki_profile.jpg', txt, m);
} else {
      m.reply(txt);
}

} catch (e) {
    m.reply(`💥 *𝖤𝗋𝗋𝗈𝗋:* ${e.message}\n🌧️ ¿Seguro que el usuario existe?`);
}
};

handler.help = ['cscstalk <username>'];
handler.command = ['cscstalk'];
handler.tags = ['stalker'];

export default handler;

// 🌐 Función principal para obtener perfil
async function cscstalk(username) {
  const url = `https://codeshare.cloudku.click/profile?user=${username}`;
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
}
});

  if (!res.data || res.status!== 200 || res.data.includes('404') || res.data.includes('Not Found')) {
    throw new Error('Perfil no encontrado o página caída 💔');
}

  const $ = cheerio.load(res.data);
  const banner = $('#banner-preview').attr('src');
  const avatar = $('#avatar-preview').attr('src');
  const bio = $('.profile-bio').text().trim();
  const followers = $('.profile-stats.stat-item').first().find('strong').text().trim();
  const following = $('.profile-stats.stat-item').last().find('strong').text().trim();

  const snippets = [];
  $('.snippets-grid.snippet-card').each((i, el) => {
    const title = $(el).find('h3').text().trim();
    const date = $(el).find('.snippet-meta time').text().trim();
    const lang = $(el).find('.lang-tag').text().trim();
    const views = $(el).find('.card-stats span').text().trim();
    const link = $(el).find('a').attr('href');
    snippets.push({
      title,
      date,
      language: lang,
      views: parseInt(views || '0'),
      url: link? (link.startsWith('http')? link: `https://codeshare.cloudku.click/${link}`): null
});
});

  return {
    profile: {
      username,
      banner: banner? (banner.startsWith('http')? banner: `https://codeshare.cloudku.click/${banner}`): null,
      avatar: avatar? (avatar.startsWith('http')? avatar: `https://codeshare.cloudku.click/${avatar}`): null,
      bio,
      followers: parseInt(followers || '0'),
      following: parseInt(following || '0')
},
    snippets
};
}
