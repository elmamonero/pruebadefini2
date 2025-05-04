import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args || args.length === 0) {
    return conn.reply(m.chat, `*[ 🎧 ] Hace falta la búsqueda para SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} cruz trueno`, m);
  }

  const searchQuery = args.join(' ');
  console.log(`[INFO] Búsqueda en API: ${searchQuery}`);

  await m.react('🕒');

  try {
    // Buscar en API
    const searchUrl = `https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(searchQuery)}`;
    console.log(`[DEBUG] URL de búsqueda: ${searchUrl}`);

    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();

    if (!searchJson || !searchJson.length || !searchJson[0].url) {
      console.log(`[ERROR] No se encontró resultado para: ${searchQuery}`);
      return conn.reply(m.chat, `No se encontró ningún resultado para: ${searchQuery}`, m);
    }

    const { url: trackUrl, title } = searchJson[0];
    console.log(`[INFO] Encontrado: ${title} | URL: ${trackUrl}`);

    // Obtenemos la API que devuelve el enlace `.m3u8`
    const apiUrl = `https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(trackUrl)}`;
    console.log(`[DEBUG] Solicitando enlace: ${apiUrl}`);

    const resApi = await fetch(apiUrl);
    const dataApi = await resApi.json();

    if (!dataApi || !dataApi.url) {
      console.log(`[ERROR] No se pudo obtener el enlace `.m3u8` para: ${trackUrl}`);
      return conn.reply(m.chat, `No se pudo obtener el audio. Es posible que este contenido no esté disponible para descarga.\n\nTítulo: ${title}\nEnlace: ${trackUrl}`, m);
    }

    const { url: m3u8Url, title: apiTitle } = dataApi;
    console.log(`[INFO] Enlace de streaming: ${m3u8Url}`);

    // Envía la info y el enlace
    await conn.reply(m.chat, `
🔊 *${apiTitle}*
📶 Reproduce en formato `.m3u8` (requiere reproductor compatible)
📝 Enlace: ${m3u8Url}

🖼️ Imagen del artista:
${searchJson[0].imageURL}

🎤 Autor: ${searchJson[0].author.username}
`, m);

    console.log(`[INFO] Información compartida.`);

  } catch (e) {
    console.log(`[ERROR] ${e}`);
    await conn.react('❌');
  }
};

handler.help = ['soundcloudtest'];
handler.tags = ['descargas'];
handler.command = ['soundcloudtest'];
handler.register = true;

export default handler;
