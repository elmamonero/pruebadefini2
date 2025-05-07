import axios from 'axios';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0]) {
        // Reacciona con reloj si no hay link
        await conn.react(m.chat, '🕒', m);
        return conn.reply(m.chat,
            `✧ YT Downloader ✧\n` +
            `Ejemplo: ${usedPrefix + command} *link*`,
            m);
    }
    try {
        // Reaccionar con reloj al comenzar
        await conn.react(m.chat, '🕒', m);

        const api = `https://ytdlpyton.nvlgroup.my.id/download/?url=${encodeURIComponent(args[0])}&mode=url`;

        const res = await axios.get(api, {
            headers: {
                'accept': 'application/json'
            }
        });

        if (!res.data.download_url) throw new Error('Error link');

        // Descarga el archivo en Buffer
        const response = await axios.get(res.data.download_url, { responseType: 'arraybuffer' });

        // Obtener el tamaño del archivo
        let sizeStr = 'Desconocido';
        try {
            const headResponse = await axios.head(res.data.download_url);
            const sizeBytes = parseInt(headResponse.headers['content-length']);
            if (!isNaN(sizeBytes)) {
                sizeStr = await formatSize(sizeBytes);
            }
        } catch (e) {
            // No se pudo obtener el tamaño
        }

        const caption = `\`\`\`◜YouTube - MP4◞\`\`\`\n\n${res.data.title}\n≡ *🌴 URL:* ${args[0]}`;

        await conn.sendFile(m.chat, response.data, `${res.data.title}.mp4`, caption, m);

        // Reaccionar con check después de enviar
        await conn.react(m.chat, '✅', m);
    } catch (er) {
        // Reaccionar con cruz si hay error
        await conn.react(m.chat, '❌', m);
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

handler.help = ['yt link'];
handler.tags = ['downloader'];
handler.command = /^(yt|ytdl)$/i;
handler.limit = true;

export default handler;
