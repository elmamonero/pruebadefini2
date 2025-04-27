import fetch from 'node-fetch';  
import ytdl from 'ytdl-core';  

let handler = async (m, { conn, args, text }) => {  
    if (!text) {  
        return m.reply(`🍭 Ingresa Un Link De YouTube\n> *Ejemplo:* https://youtube.com/shorts/ZisXJqH1jtw?si=0RZacIJU5zhoCmWh`);  
    }  

    // Define tus emojis de reacción  
    const rwait = '⏳'; // Emojis para indicar que se está procesando  
    const done = '✅'; // Emojis para indicar que se completó la tarea  

    m.react(rwait);  

    try {  
        // Usando ytdl-core para obtener el video  
        const stream = ytdl(text, { quality: 'highestvideo' });  

        // Enviar el video directamente  
        await conn.sendMessage(m.chat, {  
            video: { url: stream },  
            mimetype: "video/mp4",  
            caption: `${dev}`, // Asegúrate de definir `dev` o eliminar esta línea si no se usa.  
        }, { quoted: m });  

        m.react(done);  
    } catch (error) {  
        console.error(error); // Imprime el error en la consola para depuración  

        if (error.message.includes('410')) {  
            m.reply('《✧》El video solicitado ya no está disponible. Asegúrate de que el enlace sea correcto.');  
        } else {  
            m.reply('《✧》Hubo un error al intentar acceder al link.\n> Si el problema persiste, reportalo en el grupo de soporte.');  
        }  
    }  
}  

handler.command = ['ytv', 'ytmp4', 'ymp4'];  

export default handler;  
