import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `*[ 🎧 ] Hace falta el URL de SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} https://soundcloud.com/twice-57013/one-spark`, m, rcanal);

  await m.react('🕒');
  try {
    // Llamada a la API con la URL proporcionada
    const soundcloudApiUrl = `https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(text)}`;
    const apiResponse = await fetch(soundcloudApiUrl);
    const json = await apiResponse.json();

    if (!json || !json.link) {
      // Si no hay enlace en la respuesta
      return conn.reply(m.chat, `❌ No se pudo obtener el audio de SoundCloud. Verifica el enlace y vuelve a intentarlo.`, m);
    }

    const { link: dl_url, title } = json;
    const audio = await getBuffer(dl_url);

    let txt = `*${title}*\n`;
    txt += `${text}\n\n`;
    txt += `> [ ℹ️ ] sᥱ ᥱs𝗍ᥲ́ ᥱᥒ᥎іᥲᥒძ᥆ ᥱᥣ ᥲᥙძі᥆ ᥱs⍴ᥱrᥱ ᥙᥒ m᥆mᥱᥒ𝗍᥆...\n> sі ᥒ᥆ sᥱ ᥱᥒ᥎іᥲ ⍴rᥙᥱᑲᥱ ᥴ᥆᥅ ᥱᥣ ᥴ᥆᥎  \n*Descargando...*`;

    await conn.reply(m.chat, txt, fkontak, m);
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    
  } catch (e) {
    await m.react('❌');
    console.error(e);
  }
};

handler.help = ['splay', 'soundcloud'];
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
    console.log(`Error: ${e}`);
  }
};
