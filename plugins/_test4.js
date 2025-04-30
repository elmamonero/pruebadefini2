/* By WillZek  
- https:// github.com/WillZek   
*/  

import fetch from 'node-fetch';  

let handler = async (m, { conn, args, command }) => {  

  if (!args[0]) {  
    console.log('No se proporcionó un enlace de YouTube.');  
    return m.reply(`🍭 Ingresa Un Link De YouTube.`);  
  }  

  console.log(`Recibiendo datos para video: ${args[0]}`);  

  let pene;  
  try {  
    pene = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${args[0]}`)).json();  
    console.log('Datos del video:', pene);  
  } catch (err) {  
    console.error('Error fetching video info:', err);  
    return m.reply('Error al obtener los datos del video.');  
  }  

  let texto = `「❖」𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼 𝗗𝗲 ${pene.data.title}\n\n✦ *Autor:* ${pene.data.author}\n✦ *Duración:* ${pene.data.duration}\n✦ *Comentarios:* ${pene.data.comments}\n✦ *Vistas:* ${pene.data.views}\n> ${dev}`;  

  console.log('Enviando imagen y detalles...');  
  m.react(rwait);  
  await conn.sendMessage(m.chat, { image: { url: pene.data.image }, caption: texto }, { quoted: m });  
  m.react(done);  

  // Para la conversión a MP3  
  if (command == 'ytmp3doc' || command == 'mp3doc' || command == 'ytadoc') {  
    console.log('Procesando conversión a MP3...');  
    let api;  
    try {  
      api = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${args[0]}&type=audio&quality=128kbps&apikey=GataDios`)).json();  
      console.log('Respuesta API MP3:', api);  
    } catch (err) {  
      console.error('Error en API MP3:', err);  
      return m.reply('Error al obtener el audio MP3.');  
    }  
    if (!api?.data?.url) {  
      console.log('No se encontró resultado para MP3.');  
      return m.reply('No Se  Encontraron Resultados');  
    }  
    console.log('Enviando archivo MP3...');  
    await conn.sendMessage(m.chat, { document: { url: api.data.url }, mimetype: 'audio/mpeg', fileName: `${pene.data.title}.mp3` }, { quoted: m });  
  }  

  // Para la conversión a MP4  
  if (command == 'ytmp4doc' || command == 'mp4doc' || command == 'ytvdoc') {  
    console.log('Procesando conversión a MP4...');  
    let video;  
    try {  
      video = await (await fetch(`https://api.agungny.my.id/api/youtube-video?url=${args[0]}`)).json();  
      console.log('Respuesta API Video:', video);  
    } catch (err) {  
      console.error('Error en API Video:', err);  
      return m.reply('Error al obtener el video.');  
    }  

    let data;  
    try {  
      data = await fg.ytmp4(args[0]);  
      console.log('Datos de fg.ytmp4:', data);  
    } catch (err) {  
      console.error('Error en fg.ytmp4:', err);  
      return m.reply('Error al obtener el link del video.');  
    }  

    let url = data?.dl_url;  
    console.log('URL descargable:', url);  

    if (!url) {  
      console.log('No se encontró link para MP4.');  
      return m.reply('No Hubo Resultados');  
    }  

    // Aquí verificamos qué datos estamos enviando  
    console.log('Preparando para enviar archivo MP4:', {  
      url: url,  
      filename: `${pene.data.title}.mp4`,  
      caption: `> ${wm}`,  
      mimetype: 'video/mp4'  
    });  

    try {  
      await conn.sendMessage(m.chat, { document: { url: url }, filename: `${pene.data.title}.mp4`, caption: `> ${wm}`, mimetype: 'video/mp4' }, { quoted: m });  
      console.log('Mensaje MP4 enviado correctamente.');  
    } catch (err) {  
      console.error('Error enviando MP4:', err);  
    }  
  }  
}  

handler.help = ['ytmp3doc', 'ytmp4doc'];  
handler.tag = ['descargas'];  
handler.command = ['ytmp3doc', 'mp3doc', 'ytmp4doc', 'mp4doc', 'ytadoc', 'ytvdoc'];  

export default handler;  
