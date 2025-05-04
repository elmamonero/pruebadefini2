import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args || args.length === 0) {
    return conn.reply(m.chat, `*[ 🎧 ] Hace falta el búsqueda para SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} cruz trueno`, m);
  }

  const searchWords = args.join(' ');
  console.log(`[INFO] Búsqueda de SoundCloud: ${searchWords}`);

  await m.react('🕒');

  try {
    // Buscar en API de SoundCloud
    const soundcloudSearchUrl = `https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(searchWords)}`;
    console.log(`[DEBUG] Buscando en SoundCloud: ${soundcloudSearchUrl}`);

    const searchResponse = await fetch(soundcloudSearchUrl);
    const searchJson = await searchResponse.json();

    if (!searchJson || !searchJson.length || !searchJson[0].url) {
      console.log(`[ERROR] No se encontró resultado para: ${searchWords}`);
      return conn.reply(m.chat, `No se encontró ningún resultado para: ${searchWords}`, m);
    }

    const { url: trackUrl, title } = searchJson[0];
    console.log(`[INFO] Encontré: ${title} | URL: ${trackUrl}`);

    // API para obtener descarga directa
    const soundcloudApiUrl = `https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(trackUrl)}`;
    console.log(`[DEBUG] Obteniendo enlace de descarga: ${soundcloudApiUrl}`);

    const apiResponse = await fetch(soundcloudApiUrl);
    const json = await apiResponse.json();

    if (!json || !json.link) {
      console.log(`[ERROR] No se pudo obtener el enlace directo para: ${trackUrl}`);
      return conn.reply(m.chat, `No se pudo obtener el audio de SoundCloud. Verifica el enlace y vuelve a intentarlo.`, m);
    }

    const { link: dl_url, title: apiTitle } = json;
    console.log(`[INFO] enlace de descarga: ${dl_url}`);

    const audioBuffer = await getBuffer(dl_url);
    console.log(`[INFO] Buffer de audio listo.`);

    let txt = `*${apiTitle}*\n`;
    txt += `${trackUrl}\n\n`;
    txt += `> [ ℹ️ ] sᥱ ᥱs𝗍ᥲ́ ᥱᥒ᥎іᥲᥒძ᥆ ᥱᥣ ᥲᥙძі᥆ ᥱs⍴ᥱrᥱ ᥙᥒ m᥆mᥱᥒ𝗍᥆...\n> sі ᥒ᥆ sᥱ ᥱᥒ᥎іᥲ ⍴rᥙᥱᑲᥱ ᥴ᥆᥅ ᥱᥣ ᥴ᥆᥎  \n*Descargando...*`;

    await conn.reply(m.chat, txt, m);
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${apiTitle}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    console.log(`[INFO] Audio enviado correctamente.`);

  } catch (e) {
    console.log(`[ERROR] ${e}`);
    await m.react('❌');
  }
};

handler.help = ['soundcloudtest'];
handler.tags = ['descargas'];
handler.command = ['soundcloudtest'];
handler.register = true;

export default handler;

const getBuffer = async (url, options) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (e) {
    console.log(`Error en getBuffer: ${e}`);
  }
};
