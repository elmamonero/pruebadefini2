import fetch from 'node-fetch';  

let handler = async (m, { args, command }) => {  
  if (!args[0]) {  
    console.log('No se proporcionó el enlace de YouTube.');  
    return m.reply(`🍭 Ingresa un enlace de YouTube.`);  
  }  

  const videoUrl = args[0];  

  const prueba1Url = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoUrl}`;  
  const prueba2Url = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoUrl}`;  

  try {  
    console.log(`Solicitando prueba1 (MP3) desde: ${prueba1Url}`);  
    const prueba1Respuesta = await fetch(prueba1Url);  
    const prueba1Data = await prueba1Respuesta.json();  
    console.log('Respuesta prueba1:', prueba1Data);  

    console.log(`Solicitando prueba2 (MP4) desde: ${prueba2Url}`);  
    const prueba2Respuesta = await fetch(prueba2Url);  
    const prueba2Data = await prueba2Respuesta.json();  
    console.log('Respuesta prueba2:', prueba2Data);  

    // Aquí puedes agregar lógica para enviar los archivos o mencionar en consola  

  } catch (error) {  
    console.error('Error:', error);  
  }  
};  

// Aquí defines los comandos en la lista, por ejemplo  
handler.command = ['prueba1', 'prueba2'];  
export default handler;  
