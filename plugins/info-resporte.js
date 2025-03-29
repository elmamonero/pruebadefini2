let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        text = text.trim();
        if (!text) return m.reply('*😸 Ingrese el error que desea reportar.*');
        if (text.length < 10) return m.reply('*😾 Especifique bien el error, mínimo 10 caracteres.*');
        if (text.length > 1000) return m.reply('*⚠️  Máximo 1000 caracteres para enviar el error.*');

        const sender = m.sender.split('@')[0];
        const teks = `
*\`REPORTE - ERROR\`*

\`\`\`👤CLIENTE\`\`\`
✑ Wa.me/${sender}

\`\`\`📩MENSAJE\`\`\`
> ${text}`;

        const ownerJid = global.creadorbot[0][0] + '@s.whatsapp.net';
        await conn.reply(ownerJid, m.quoted ? `${teks}\n\n📎 *Mensaje citado:* ${m.quoted.text}` : teks, m, {
            mentions: conn.parseMention(teks),
        });

        m.reply(`*✅ ${m.pushName || 'Usuario'}, tu reporte ha sido enviado a mi creador. Recuerda que los informes falsos pueden ocasionar baneo.*`);
    } catch (err) {
        console.error(err);
        m.reply('*❌ Ocurrió un error al enviar tu reporte. Inténtalo de nuevo más tarde.*');
    }
};

handler.help = ['reportar'];
handler.tags = ['info'];
handler.command = /^(reporte|report|reportar|bug|error)$/i;

export default handler;