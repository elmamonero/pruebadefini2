import axios from 'axios';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0]) {
        return conn.reply(m.chat,
            `✧ YT Downloader ✧\n` +
            `Ejemplo: ${usedPrefix + command} *link*`,
            m);
    }
    try {
        const api = `https://ytdlpyton.nvlgroup.my.id/download/?url=${encodeURIComponent(args[0])}&mode=url`;

        await conn.reply(m.chat, '✧ Espere...', m);

        const res = await axios.get(api, {
            headers: {
                'accept': 'application/json'
            }
        });

        if (!res.data.download_url) throw new Error('Error link');

        // Descargamos el archivo en Buffer
        const response = await axios.get(res.data.download_url, { responseType: 'arraybuffer' });
        const buffer = response.data;

        // Texto del mensaje
        const caption = `\`\`\`◜YouTube - MP4◞\`\`\`\n\n${res.data.title}\n≡ *🌴 URL:* ${args[0]}\n≡ *⚖ Peso:* ${await formatSize(res.data.size)}\n`;

        // Enviamos el archivo como documento con el nombre correcto
        await conn.sendFile(m.chat, buffer, `${res.data.title}.mp4`, caption, m);

    } catch (er) {
        conn.reply(m.chat, `${er.message || 'Error en la api'}`, m);
    }
};
handler.help = ['test4'];
handler.tags = ['downloader'];
handler.command = /^test4$/i;
handler.limit = true;

export default handler;

// Función auxiliar para formatear el tamaño
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
