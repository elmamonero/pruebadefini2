import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      console.log("No se ingresó la URL del video");
      return conn.reply(m.chat, `*🧇 Por favor, ingresa la URL del vídeo de YouTube.*`, m);
    }

    console.log("Verificando enlace:", args[0]);
    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      console.log("Enlace inválido:", args[0]);
      return m.reply(`*⚠️ Enlace inválido, por favor coloque un enlace válido de YouTube.*`);
    }

    m.react('🕒');
    console.log("Llamando a ytdl con URL:", args[0]);
    let json = await ytdl(args[0]);
    console.log("Respuesta de ytdl:", json);

    console.log("Obteniendo tamaño del video...");
    let size = await getSize(json.url);
    console.log("Tamaño obtenido:", size);
    let sizeStr = size ? await formatSize(size) : 'Desconocido';

    const cap = `\`\`\`◜YouTube - MP4◞\`\`\`\n\n*${json.title}*\n≡ *🌴 \`URL:\`* ${args[0]}\n≡ *⚖️ \`Peso:\`* ${sizeStr}`;

    console.log("Preparando para enviar archivo...");
    const buffer = await (await fetch(json.url)).buffer();
    await conn.sendFile(m.chat, buffer, `${json.title}.mp4`, cap, m, null, { asDocument: true, mimetype: "video/mp4" });
    console.log("Archivo enviado correctamente.");

    m.react('✅');
  } catch (e) {
    console.error("Error detectado:", e);
    m.reply(`Ocurrió un error:\n${e.message}`);
  }
};

handler.help = ['testdoc'];
handler.command = ['testdoc'];
handler.tags = ['dl'];

export default handler;

async function ytdl(url) {
  console.log("Iniciando ytdl para URL:", url);
  const headers = {
    "accept": "*/*",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://id.ytmp3.mobi/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const initial = await fetch(`https://d.ymcpp.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  console.log("Respuesta inicial:", initial);
  const init = await initial.json();
  console.log("Respuesta JSON inicial:", init);

  const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/);
  const id = idMatch ? idMatch[1] : null;
  console.log("ID extraído:", id);

  if (!id) {
    throw new Error('ID de video no encontrado');
  }

  const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;
  console.log("URL de conversión:", convertURL);

  const converts = await fetch(convertURL, { headers });
  console.log("Respuesta de converts:", converts);
  const convert = await converts.json();
  console.log("Respuesta JSON de convert:", convert);

  let info = {};
  for (let i = 0; i < 3; i++) {
    console.log(`Intento de obtener progreso (${i + 1})`);
    const progressResponse = await fetch(convert.progressURL, { headers });
    info = await progressResponse.json();
    console.log("Progreso actual:", info);
    if (info.progress === 3) {
      console.log("Proceso completado");
      break;
    }
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video'
  };
}

async function formatSize(bytes) {
  console.log("Formateando tamaño:", bytes);
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;

  if (!bytes || isNaN(bytes)) {
    console.log("Tamaño inválido o desconocido");
    return 'Desconocido';
  }

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  const sizeString = `${bytes.toFixed(2)} ${units[i]}`;
  console.log("Tamaño formateado:", sizeString);
  return sizeString;
}

async function getSize(url) {
  console.log("Obteniendo tamaño para URL:", url);
  try {
    const response = await axios.head(url);
    const contentLength = response.headers['content-length'];
    console.log("Content-Length header:", contentLength);
    if (!contentLength) {
      console.log("No se encontró 'content-length' en las cabeceras");
      return null;
    }
    const size = parseInt(contentLength, 10);
    console.log("Tamaño en bytes:", size);
    return size;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}
