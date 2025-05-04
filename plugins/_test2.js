import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args || args.length === 0) {
    return conn.reply(m.chat, `*[ 🎧 ] Hace falta la búsqueda para SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} cruz trueno`, m);
  }

  const searchQuery = args.join(' ');
  console.log(`[INFO] Búsqueda en API: ${searchQuery}`);

  await m.react('🕒');

  try {
    // Realizamos la búsqueda en la API que devolvió el JSON
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

    // Ahora usamos la API que devuelve el enlace .m3u8
    const apiUrl = `https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(trackUrl)}`;
    console.log(`[DEBUG] Obteniendo enlace de descarga: ${apiUrl}`);

    const resApi = await fetch(apiUrl);
    const dataApi = await resApi.json();

    if (!dataApi || !dataApi.url) {
      console.log(`[ERROR] No se pudo obtener enlace directo para: ${trackUrl}`);
      return conn.reply(m.chat, `No se pudo obtener el audio de SoundCloud. El enlace puede estar restringido o no soportado.\n\nTítulo: ${title}\nEnlace SoundCloud: ${trackUrl}`, m);
    }

    const { url: m3u8Url, title: apiTitle } = dataApi;
    console.log(`[INFO] Enlace `.m3u8`: ${m3u8Url}`);

    // Enviamos la info al usuario
    await conn.reply(m.chat, `
🔊 *${apiTitle}*
📶 Reproduce en formato .m3u8 (recomendado usar un reproductor compatible)
📝 Enlace: ${m3u8Url}

📸 Imagen del artista:
${searchJson[0].imageURL}

🎵 Autor: ${searchJson[0].author.username}
`, m);

    // Si quieres enviar el enlace directamente, descomenta la siguiente línea:
    // await conn.sendMessage(m.chat, { text: `Enlace de la pista: ${m3u8Url}` }, { quoted: m });

    console.log(`[INFO] Información enviada.`);

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
