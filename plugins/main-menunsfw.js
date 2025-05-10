import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    await m.react('🧡');

    let img = 'https://files.catbox.moe/kmfqee.jpg';
    let insta = 'https://chat.whatsapp.com/HvDCvNqXSiW19MFXJmWhoF';

    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    const user = global.db.data.users[m.sender] || {};
    const { money = 0, joincount = 0, exp = 0, limit = 0, level = 0, role = '' } = user;

    let totalreg = Object.keys(global.db.data.users || {}).length;
    let rtotalreg = Object.values(global.db.data.users || {}).filter(user => user.registered).length;

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const botname = 'Pantheon Bot';

    const text = `👋🏻 ¡Hᴏʟᴀ! ${taguser}
Bɪᴇɴᴠᴇɴɪᴅᴏ ᴀʟ ᴍᴇɴᴜ *ɴsғᴡ* 🔞

\`\`\`${fechaHora}\`\`\`

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`* 🪱 ᦡᦡ
ര ׄ⃟🪱˚ .xnxxsearch *texto*
ര ׄ⃟🪱˚ .xvsearch *texto*
ര ׄ⃟🪱˚ .phsearch *texto*
ര ׄ⃟🪱˚ .r34 *texto*

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`* 🧋ᦡᦡ
ര ׄ⃟🧋˚ .xnxxdl *ulr*
ര ׄ⃟🧋˚ .xvdl *url*
ര ׄ⃟🧋˚ .phdl *url*

𓂂𓏸  𐅹੭੭   *\`gі𝖿s\`* 🦪 ᦡᦡ
ര ׄ⃟🦪˚ .follar *@tag*
ര ׄ⃟🦪˚ .coger *@tag*
ര ׄ⃟🦪˚ .coger2 *@tag*
ര ׄ⃟🦪˚ .penetrar *@tag*
ര ׄ⃟🦪˚ .anal *@tag*
ര ׄ⃟🦪˚ .sexo *@tag*
ര ׄ⃟🦪˚ .violar *@tag*
ര ׄ⃟🦪˚ .rusa *@tag*
ര ׄ⃟🦪˚ .sixnine *@tag*
ര ׄ⃟🦪˚ .pies *@tag*
ര ׄ⃟🦪˚ .mamada *@tag*
ര ׄ⃟🦪˚ .lickpussy *@tag*
ര ׄ⃟🦪˚ .grabboobs *@tag*
ര ׄ⃟🦪˚ .suckboobs *@tag*
ര ׄ⃟🦪˚ .cum *@tag*
ര ׄ⃟🦪˚ .fap *@tag*
ര ׄ⃟🦪˚ .manosear *@tag*
ര ׄ⃟🦪˚ .lesbianas *@tag*

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ𝗍ᥱᥒіძ᥆\`* 🍒 ᦡᦡ
ര ׄ⃟🍒˚ .pack
ര ׄ⃟🍒˚ .pack2
ര ׄ⃟🍒˚ .pack3
ര ׄ⃟🍒˚ .videoxxx
ര ׄ⃟🍒˚ .videoxxx2
ര ׄ⃟🍒˚ .randomxxx
ര ׄ⃟🍒˚ .nsfwloli
ര ׄ⃟🍒˚ .nsfwfoot
ര ׄ⃟🍒˚ .nsfwass
ര ׄ⃟🍒˚ .nsfwbdsm
ര ׄ⃟🍒˚ .nsfwcum
ര ׄ⃟🍒˚ .nsfwero
ര ׄ⃟🍒˚ .nsfwfemdom
ര ׄ⃟🍒˚ .nsfwglass
ര ׄ⃟🍒˚ .nsfworgy
ര ׄ⃟🍒˚ .yuri
ര ׄ⃟🍒˚ .yuri2
ര ׄ⃟🍒˚ .yaoi
ര ׄ⃟🍒˚ .yaoi2
ര ׄ⃟🍒˚ .panties
ര ׄ⃟🍒˚ .tetas
ര ׄ⃟🍒˚ .booty
ര ׄ⃟🍒˚ .ecchi
ര ׄ⃟🍒˚ .furro
ര ׄ⃟🍒˚ .hentai
ര ׄ⃟🍒˚ .trapito
ര ׄ⃟🍒˚ .imagenlesbians
ര ׄ⃟🍒˚ .pene
ര ׄ⃟🍒˚ .porno
ര ׄ⃟🍒˚ .pechos`.trim();

    conn.sendMessage(m.chat, {
      text: text,
      contextInfo: {
        mentionedJid: conn.parseMention(text),
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '',
          body: 'Pantheon Bot',
          thumbnail: await (await fetch(img)).buffer(),
          sourceUrl: insta,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, '❎ Error en el comando. Inténtalo más tarde.', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
