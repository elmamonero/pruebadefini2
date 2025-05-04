const handler = async (m, { conn, args }) => {
    if (args.length < 4) {
        conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM), AM/PM, el país (MX, CO, CL, AR, PE, EC), y el color de la ropa.', m);
        return;
    }

    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, 'Formato de hora incorrecto. Debe ser HH:MM en formato de 12 horas.', m);
        return;
    }

    const horaUsuario = args[0];
    const ampm = args[1].toUpperCase();
    const pais = args[2].toUpperCase();
    const colorRopa = args[3];

    if (!['AM', 'PM'].includes(ampm)) {
        conn.reply(m.chat, 'Formato AM/PM incorrecto. Debe ser AM o PM.', m);
        return;
    }

    let [hora, minutos] = horaUsuario.split(':').map(Number);
    if (ampm === 'PM' && hora !== 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;

    const diferenciasHorarias = {
        MX: -1, // UTC-6
        CO: 0,  // UTC-5
        CL: 2,  // UTC-4
        AR: 2,  // UTC-3
        PE: 0,  // UTC-5
        EC: 0   // UTC-5
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina, PE para Perú o EC para Ecuador.', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];

    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });

    const horasEnPais = {};
    for (const key in diferenciasHorarias) {
        const horaActual = new Date();
        horaActual.setHours(hora);
        horaActual.setMinutes(minutos);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));
        horasEnPais[key] = formatTime(horaEnPais);
    }

    const message = `╭──────>⋆☽⋆ 🆚 ⋆☾⋆<──────╮
ㅤ  ㅤ        12 𝐕𝐄𝐑𝐒𝐔𝐒 12
╰──────>⋆☽⋆ 🆚 ⋆☾⋆<──────╯

╭──────>⋆☽⋆ 🔥 ⋆☾⋆<──────╮
│⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎:
│🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horasEnPais.MX}
│🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horasEnPais.CO}
│🇵🇪 𝐏𝐄𝐑𝐔 : ${horasEnPais.PE}
│🇪🇨 𝐄𝐂𝐔𝐀𝗗𝗢𝗥 : ${horasEnPais.EC}
│🇨🇱 𝐂𝐇𝐈𝗟𝗘 : ${horasEnPais.CL}
│🇦🇷 𝐀𝗥𝗚𝗘𝗡𝗧𝗜𝗡𝗔 : ${horasEnPais.AR} 
│👕┨𝐕𝐄𝐒𝐓𝐈𝐌𝐄𝗡𝐓𝐀 : ${colorRopa}
│
│➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒: 
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│     
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│ㅤʚ 𝐒𝐔𝗣𝗟𝗘𝗡𝗧𝐄:
│⚜️ ➤ 
│⚜️ ➤ 
│
│ㅤʚ 𝗢𝗥𝗚𝗔𝗡𝗜𝗭𝗔𝗗𝗢𝗥:
│@${m.sender.split('@')[0]}
╰──────>⋆☽⋆ 🔥 ⋆☾⋆<──────╯
`.trim();

    const mentionedJid = [m.sender]; // Lista de personas a mencionar
    conn.sendMessage(m.chat, { text: message, mentions: mentionedJid }, { quoted: m });
};

handler.help = ['12vs12'];
handler.tags = ['freefire'];
handler.command = /^(12vs12|12x12|12v12|v12|vs12)$/i;

export default handler;
