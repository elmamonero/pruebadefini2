import fetch from 'node-fetch';  
import ytdl from 'ytdl-core';  

let handler = async(m, { conn, args, text }) => {  
    if (!text) return m.reply(`🍭 Ingresa Un Link De YouTube\n> *Ejemplo:* https://youtube.com/shorts/ZisXJqH1jtw?si=0RZacIJU5zhoCmWh`);  

    m.react(rwait);  

    // Usando ytdl-core para obtener la URL del video  
    let stream = ytdl(text, { quality: 'highestvideo' });  

    // Enviar el video directamente  
    await conn.sendMessage(m.chat, {  
        video: { url: stream },  
        mimetype: "video/mp4",  
        caption: `${dev}`,  
    }, { quoted: m });  
    
    m.react(done);  
}  

handler.command = ['ytv', 'ytmp4', 'ymp4'];  

export default handler;  
