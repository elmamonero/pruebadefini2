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

        await conn.sendMessage(m.chat, {
            document: {
                url: res.data.download_url
            },
            mimetype: 'video/mp4',
            filename: `${res.data.title}.mp4`,
            caption: `Listo: ${res.data.title}`
        }, {
            quoted: m
        });

    } catch (er) {
        conn.reply(m.chat, `${er.message || 'Error en la api'}`, m);
    }
};
handler.help = ['test4'];
handler.tags = ['downloader'];
handler.command = /^test4$/i; // Aquí cambias el comando a 'test4'
handler.limit = true;

export default handler;
