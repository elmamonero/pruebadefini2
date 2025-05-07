import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix }) => {
  // Función auxiliar para reaccionar si está disponible
  const reactIfPossible = async (message, emoji) => {
    if (message && message.react) {
      await message.react(emoji);
    }
  };

  if (!args[0]) {
    await reactIfPossible(m, '🕒');
    return conn.reply(m.chat, '*🧇 Por favor, ingresa un link de YouTube.*\n> *\`Ejemplo:\`* https://youtube.com/xxx', m);
  }

  await reactIfPossible(m, '🕒');
  try {
    const api = `https://ytdlpyton.nvlgroup.my.id/download/?url=${encodeURIComponent(args[0])}&mode=url`;

    await conn.reply(m.chat, '✧ Espere...', m);

    // Obtener datos de la API
    const res = await axios.get(api, {
        headers: { 'accept': 'application/json' }
    });

    if (!res.data.download_url) throw new Error('Error link');

    // Descargar el archivo mp4
    const response = await axios.get(res.data.download_url, { responseType: 'arraybuffer' });

    // Obtener y formatear tamaño
    let sizeStr = 'Desconocido';
    try {
      const headResponse = await axios.head(res.data.download_url);
      const sizeBytes = parseInt(headResponse.headers['content-length']);
      if (!isNaN(sizeBytes)) {
        sizeStr = await formatSize(sizeBytes);
      }
    } catch (e) {}

    // Crear caption
    const caption = `\`\`\`◜YouTube - MP4◞\`\`\`\n\n${res.data.title}\n≡ *🌴 URL:* ${args[0]}`;

    // Enviar archivo
    await conn.sendFile(m.chat, response.data, `${res.data.title}.mp4`, caption, m);

    // Reacción de éxito
    await reactIfPossible(m, '✅');
  } catch (er) {
    await reactIfPossible(m, '❌');
    conn.reply(m.chat, `${er.message || 'Error en la API'}`, m);
  }
};

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// Datos del handler
handler.help = ['yt', 'ytdl'];
handler.tags = ['downloader'];
handler.command = /^ytdl$/i;
handler.limit = true;

export default handler;
