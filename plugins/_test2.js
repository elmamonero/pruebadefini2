import fetch from 'node-fetch';  

let handler = async (m, { args, conn, command, reply }) => {  
  if (!args[0]) {  
    console.log('No se proporcionó el enlace de YouTube.');  
    return reply(`🍭 Ingresa un enlace de YouTube.`);  
  }  

  const videoUrl = args[0];  

  const prueba1Url = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoUrl}`;  
  const prueba2Url = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoUrl}`;  

  try {  
    // Solicitud a prueba1 (MP3)  
    console.log(`Solicitando prueba1 (MP3) desde: ${prueba1Url}`);  
    const prueba1Respuesta = await fetch(prueba1Url);  
    const prueba1Data = await prueba1Respuesta.json();  
    console.log('Respuesta prueba1:', prueba1Data);  

    // Enviar MP3  
    if (prueba1Data.status && prueba1Data.data.download.url) {  
      await conn.sendMessage(  
        m.chat,  
        {  
          audio: { url: prueba1Data.data.download.url },  
          mimetype: 'audio/mpeg',  
          fileName: prueba1Data.data.download.filename,  
        },  
        { quoted: m }  
      );  
    } else {  
      reply('No se pudo obtener el archivo de audio.');  
    }  

    // Solicitud a prueba2 (MP4)  
    console.log(`Solicitando prueba2 (MP4) desde: ${prueba2Url}`);  
    const prueba2Respuesta = await fetch(prueba2Url);  
    const prueba2Data = await prueba2Respuesta.json();  
    console.log('Respuesta prueba2:', prueba2Data);  

    // Enviar MP4  
    if (prueba2Data.status && prueba2Data.data.download.url) {  
      await conn.sendMessage(  
        m.chat,  
        {  
          video: { url: prueba2Data.data.download.url },  
          caption: `${prueba2Data.data.title}`,  
          mimetype: 'video/mp4'  
        },  
        { quoted: m }  
      );  
    } else {  
      reply('No se pudo obtener el video.');  
    }  
  } catch (error) {  
    console.error('Error:', error);  
    reply('Hubo un error al procesar la solicitud.');  
  }  
};  

handler.command = ['prueba1', 'prueba2'];  
export default handler;  
