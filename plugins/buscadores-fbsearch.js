import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { text}) => {
  if (!text) return m.reply('🌐 *Uso correcto:*\n.facebooksearch <palabra clave>\n\nEjemplo:\n.facebooksearch Messi');

  const searchUrl = `https://www.facebook.com/search/videos/?q=${encodeURIComponent(text)}`;

  try {
    const { data: html} = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9'
}
});

    const $ = cheerio.load(html);
    const links = [];

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('/videos/')) {
        const fullLink = href.startsWith('http')? href: `https://facebook.com${href}`;
        if (!links.includes(fullLink)) links.push(fullLink);
}
});

    if (!links.length) return m.reply('⚠️ No se encontraron videos públicos con ese término.');

    const resultado = links.slice(0, 5).map((v, i) => `🎬 *${i + 1}.* ${v}`).join('\n\n');
    await m.reply(`📘 *Videos encontrados en Facebook:*\n\n${resultado}`);
} catch (e) {
    m.reply(`❌ *Error al buscar videos:*\n${e.message}`);
}
};

handler.help = ['fbsearch <texto>'];
handler.tags = ['search'];
handler.command = ['fbsearch'];

export default handler;
