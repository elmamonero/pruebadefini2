import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './media/catalgo.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `👋🏻 ¡Hola! ${taguser}
Welcome to group *nsfw* 🔞

╭────• *ʙᴜsᴄᴀᴅᴏʀᴇs* •─────╮
➦.xnxxsearch *texto*
➦.xvsearch *texto*
➦.phsearch *texto*
➦.r34 *texto*
╰──────༺♡༻──────╯

╭────• *ᴅᴇsᴄᴀʀɢᴀs* •─────╮
➳ .xnxxdl *ulr*
➳ .xvdl *url*
➳ .phdl *url*
╰──────༺♡༻──────╯

╭────• *ɢɪғs ɴsғᴡ* •─────╮
➻ .follar *@tag*
➻ .coger *@tag*
➻ .coger2 *@tag*
➻ .penetrar *@tag*
➻ .anal *@tag*
➻ .sexo *@tag*
➻ .violar *@tag*
➻ .rusa *@tag*
➻ .sixnine *@tag*
➻ .pies *@tag*
➻ .mamada *@tag*
➻ .lickpussy *@tag*
➻ .grabboobs *@tag*
➻ .suckboobs *@tag*
➻ .cum *@tag*
➻ .fap *@tag*
➻ .manosear *@tag*
➻ .lesbianas *@tag*
╰──────༺♡༻──────╯

╭────• *ᴄᴏɴᴛᴇɴɪᴅᴏ* •─────╮
➼ .pack
➼ .pack2
➼ .pack3
➼ .videoxxx
➼ .videoxxx2
➼ .randomxxx
➼ .nsfwloli
➼ .nsfwfoot
➼ .nsfwass
➼ .nsfwbdsm
➼ .nsfwcum
➼ .nsfwero
➼ .nsfwfemdom
➼ .nsfwglass
➼ .nsfworgy
➼ .yuri
➼ .yuri2
➼ .yaoi
➼ .yaoi2
➼ .panties
➼ .tetas
➼ .booty
➼ .ecchi
➼ .furro
➼ .hentai
➼ .trapito
➼ .imagenlesbians
➼ .pene
➼ .porno
➼ .pechos
╰──────༺♡༻──────╯

> © mᥱᥒᥙ *ᥒs𝖿ᥕ* ᑲᥡ  ᥴrіss.᥎᥊`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat,'*🧡 Error al enviar el menú.*\n\n> ${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler;