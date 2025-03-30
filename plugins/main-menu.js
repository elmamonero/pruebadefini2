/*import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, diamantes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

        const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('🍪')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoUrl = 'https://files.catbox.moe/7ha109.mp4' // URL fija del video

        let menu = `
︵᷼     ⿻ *Morchi* ࣪   ࣭  ࣪ *WA* ࣭  🐈  ࣪   ࣭ 
✧ *Hola ${taguser}*\n${saludo}

*꒰꛱ ͜Desarrollado por Cristian Escobar +51927238856*

*𓈒𓏸🌴 \`Bot Name:\`* ${botname}
*𓈒𓏸🌵 \`Activo:\`* ${uptime}
*𓈒𓏸🍃 \`Usuarios:\`* ${totalreg}
*𓈒𓏸🌿 \`Version:\`* ${version}

> 😸 Si encuentra un comando con errores no dudes en reportarlo con el *Creador*
${readmore}
↷✦; \`MENÚS\` ❞ 🌷︵᷼  
⠞🌷੭‎ ${usedPrefix}menunsfw
⠞🌷੭‎ ${usedPrefix}menuowner
⠞🌷੭‎ ${usedPrefix}menulogos

↷✦; \`INFO BOT\` ❞ 🍄︵᷼  
⠞🍄੭‎ ${usedPrefix}totalf
⠞🍄੭‎ ${usedPrefix}grupos
⠞🍄੭‎ ${usedPrefix}sugerir
⠞🍄੭‎ ${usedPrefix}report
⠞🍄੭‎ ${usedPrefix}owner
⠞🍄੭‎ ${usedPrefix}ping
⠞🍄੭‎ ${usedPrefix}uptime
⠞🍄੭‎ ${usedPrefix}horario
⠞🍄੭‎ ${usedPrefix}precios

↷✦; \`CONFIG\` ❞ 🪻︵᷼ 
⠞🪻੭‎ ${usedPrefix}enable *opción*
⠞🪻੭‎ ${usedPrefix}disable *opción*
⠞🪻੭‎ ${usedPrefix}on *opción*
⠞🪻੭‎ ${usedPrefix}off *opción*
⠞🪻੭‎ ${usedPrefix}manual

↷✦; \`DOWNLOAD\` ❞ 🪷︵᷼ 
⠞🪷੭‎ ${usedPrefix}play *texto*
⠞🪷੭‎ ${usedPrefix}ytmp4doc *texto*
⠞🪷੭‎ ${usedPrefix}ytmp3doc *texto*
⠞🪷੭‎ ${usedPrefix}apk *texto*
⠞🪷੭‎ ${usedPrefix}pinterest *texto*
⠞🪷੭‎ ${usedPrefix}pinvid *url*
⠞🪷੭‎ ${usedPrefix}ytmp4 *url*
⠞🪷੭‎ ${usedPrefix}ytmp3 *url*
⠞🪷੭‎ ${usedPrefix}tiktok *url*
⠞🪷੭‎ ${usedPrefix}instagram *url*
⠞🪷੭‎ ${usedPrefix}facebook *url*
⠞🪷੭‎ ${usedPrefix}mediafire *url*
⠞🪷੭‎ ${usedPrefix}mega *url*
⠞🪷੭‎ ${usedPrefix}playstore *url*
⠞🪷੭‎ ${usedPrefix}xnxxdl *url*
⠞🪷੭‎ ${usedPrefix}xvideosdl *url*

↷✦; \`SEARCH\` ❞ 🍮︵᷼ 
⠞🍮੭‎ ${usedPrefix}aplaysearch *texto*
⠞🍮੭‎ ${usedPrefix}ttsearch *texto*
⠞🍮੭‎ ${usedPrefix}ttsearch2 *texto*
⠞🍮੭‎ ${usedPrefix}ytsearch *texto*
⠞🍮੭‎ ${usedPrefix}spotifysearch *texto*
⠞🍮੭‎ ${usedPrefix}playstoresearch *texto*
⠞🍮੭‎ ${usedPrefix}xnxxsearch *texto*
⠞🍮੭‎ ${usedPrefix}xvsearch *texto*
⠞🍮੭‎ ${usedPrefix}gnula *texto*
⠞🍮੭‎ ${usedPrefix}mercadolibre *texto*

↷✦; \`LISTAS\` ❞ 📜︵᷼ 
⠞📜੭‎ ${usedPrefix}v4fem *hr + p*
⠞📜੭‎ ${usedPrefix}v4masc *hr + p*
⠞📜੭‎ ${usedPrefix}v4mixto *hr + p*
⠞📜੭‎ ${usedPrefix}v6fem *hr + p*
⠞📜੭‎ ${usedPrefix}v6masc *hr + p*
⠞📜੭‎ ${usedPrefix}v6mixto *hr + p*

↷✦; \`FRASES\` ❞ 🌻︵᷼ 
⠞🌻੭‎ ${usedPrefix}piropo
⠞🌻੭‎ ${usedPrefix}consejo
⠞🌻੭‎ ${usedPrefix}fraseromantica

↷✦; \`CONVERTERS\` ❞ 🧸︵᷼ 
⠞🧸੭‎ ${usedPrefix}tourl *img*
⠞🧸੭‎ ${usedPrefix}tourl *aud*
⠞🧸੭‎ ${usedPrefix}toptt *aud*
⠞🧸੭‎ ${usedPrefix}toptt *vid*
⠞🧸੭‎ ${usedPrefix}tourl *vid*
⠞🧸੭‎ ${usedPrefix}tomp3 *vid*
⠞🧸੭‎ ${usedPrefix}toimg *sticker*

↷✦; \`TOOLS\` ❞ 🛠️︵᷼ 
⠞🛠️੭‎ ${usedPrefix}clima *texto*
⠞🛠️੭‎ ${usedPrefix}readmore *texto*
⠞🛠️੭‎ ${usedPrefix}read *texto*
⠞🛠️੭‎ ${usedPrefix}fake *texto + user + texto*
⠞🛠️੭‎ ${usedPrefix}traducir *idioma + texto*
⠞🛠️੭‎ ${usedPrefix}hd *img*
⠞🛠️੭‎ ${usedPrefix}whatmusic *aud*
⠞🛠️੭‎ ${usedPrefix}whatmusic *vid*
⠞🛠️੭‎ ${usedPrefix}flag *país*
⠞🛠️੭‎ ${usedPrefix}inspect *link*
⠞🛠️੭‎ ${usedPrefix}inspeccionar *link*
⠞🛠️੭‎ ${usedPrefix}nuevafotochannel
⠞🛠️੭‎ ${usedPrefix}nosilenciarcanal
⠞🛠️੭‎ ${usedPrefix}silenciarcanal
⠞🛠️੭‎ ${usedPrefix}seguircanal
⠞🛠️੭‎ ${usedPrefix}avisoschannel
⠞🛠️੭‎ ${usedPrefix}resiviravisos
⠞🛠️੭‎ ${usedPrefix}eliminarfotochannel
⠞🛠️੭‎ ${usedPrefix}reactioneschannel
⠞🛠️੭‎ ${usedPrefix}reaccioneschannel
⠞🛠️੭‎ ${usedPrefix}nuevonombrecanal
⠞🛠️੭‎ ${usedPrefix}nuevadescchannel

↷✦; \`GROUPS\` ❞ 🌿︵᷼ 
⠞🌿੭‎ ${usedPrefix}add *número*
⠞🌿੭‎ ${usedPrefix}grupo *abrir / cerrar*
⠞🌿੭‎ ${usedPrefix}grouptime *tiempo*
⠞🌿੭‎ ${usedPrefix}notify *texto*
⠞🌿੭‎ Aviso *texto*
⠞🌿੭‎ Admins *texto*
⠞🌿੭‎ ${usedPrefix}todos *texto*
⠞🌿੭‎ ${usedPrefix}setwelcome *texto*
⠞🌿੭‎ ${usedPrefix}groupdesc *texto*
⠞🌿੭‎ ${usedPrefix}setbye *texto*
⠞🌿੭‎ ${usedPrefix}promote *@tag*
⠞🌿੭‎ ${usedPrefix}demote *@tag*
⠞🌿੭‎ ${usedPrefix}kick *@tag*
⠞🌿੭‎ ${usedPrefix}mute *@tag*
⠞🌿੭‎ ${usedPrefix}inactivos *opción*
⠞🌿੭‎ ${usedPrefix}tagnum *prefix*
⠞🌿੭‎ ${usedPrefix}link
⠞🌿੭‎ ${usedPrefix}fantasmas

𓂂𓏸  𐅹੭੭   *\`ᥱ𝖿ᥱᥴ𝗍᥆s\`*   🪻ᩚ꤬ᰨᰍ
ര ׄ 🪻˚ ${usedPrefix}bass *vid*
ര ׄ 🪻˚ ${usedPrefix}blown *vid*
ര ׄ 🪻˚ ${usedPrefix}deep *vid*
ര ׄ 🪻˚ ${usedPrefix}earrape *vid*
ര ׄ 🪻˚ ${usedPrefix}fast *vid*
ര ׄ 🪻˚ ${usedPrefix}smooth *vid*
ര ׄ 🪻˚ ${usedPrefix}tupai *vid*
ര ׄ 🪻˚ ${usedPrefix}nightcore *vid*
ര ׄ 🪻˚ ${usedPrefix}reverse *vid*
ര ׄ 🪻˚ ${usedPrefix}robot *vid*
ര ׄ 🪻˚ ${usedPrefix}slow *vid*
ര ׄ 🪻˚ ${usedPrefix}squirrel *vid*
ര ׄ 🪻˚ ${usedPrefix}chipmunk *vid*
ര ׄ 🪻˚ ${usedPrefix}reverb *vid*
ര ׄ 🪻˚ ${usedPrefix}chorus *vid*
ര ׄ 🪻˚ ${usedPrefix}flanger *vid*
ര ׄ 🪻˚ ${usedPrefix}distortion *vid*
ര ׄ 🪻˚ ${usedPrefix}pitch *vid*
ര ׄ 🪻˚ ${usedPrefix}highpass *vid*
ര ׄ 🪻˚ ${usedPrefix}lowpass *vid*
ര ׄ 🪻˚ ${usedPrefix}underwater *vid*

𓂂𓏸  𐅹੭੭   *\`ძі᥎ᥱrsі᥆ᥒ\`*   🥯ᩚ꤬ᰨᰍ
ര ׄ 🥯˚ ${usedPrefix}gay *@tag*
ര ׄ 🥯˚ ${usedPrefix}lesbiana *@tag*
ര ׄ 🥯˚ ${usedPrefix}pajero *@tag*
ര ׄ 🥯˚ ${usedPrefix}pajera *@tag*
ര ׄ 🥯˚ ${usedPrefix}puto *@tag*
ര ׄ 🥯˚ ${usedPrefix}puta *@tag*
ര ׄ 🥯˚ ${usedPrefix}manco *@tag*
ര ׄ 🥯˚ ${usedPrefix}manca *@tag*
ര ׄ 🥯˚ ${usedPrefix}rata *@tag*
ര ׄ 🥯˚ ${usedPrefix}prostituto *@tag*
ര ׄ 🥯˚ ${usedPrefix}prostituta *@tag*
ര ׄ 🥯˚ ${usedPrefix}doxear *@tag*
ര ׄ 🥯˚ ${usedPrefix}jalamela *@tag*
ര ׄ 🥯˚ ${usedPrefix}simi *texto*
ര ׄ 🥯˚ ${usedPrefix}pregunta *texto*
ര ׄ 🥯˚ ${usedPrefix}genio *texto*
ര ׄ 🥯˚ ${usedPrefix}top
ര ׄ 🥯˚ ${usedPrefix}sorteo
ര ׄ 🥯˚ ${usedPrefix}piropo
ര ׄ 🥯˚ ${usedPrefix}chiste
ര ׄ 🥯˚ ${usedPrefix}facto
ര ׄ 🥯˚ ${usedPrefix}verdad
ര ׄ 🥯˚ ${usedPrefix}pareja
ര ׄ 🥯˚ ${usedPrefix}parejas
ര ׄ 🥯˚ ${usedPrefix}love
ര ׄ 🥯˚ ${usedPrefix}personalidad

𓂂𓏸  𐅹੭੭   *\`ȷᥙᥱg᥆s\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 🐚˚ ${usedPrefix}pregunta *texto*
ര ׄ 🐚˚ ${usedPrefix}ttt *texto*
ര ׄ 🐚˚ ${usedPrefix}ptt *opción*
ര ׄ 🐚˚ ${usedPrefix}delttt
ര ׄ 🐚˚ ${usedPrefix}acertijo
ര ׄ 🐚˚ ${usedPrefix}trivia

𓂂𓏸  𐅹੭੭   *\`ᥲᥒіmᥱ\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 🏕️˚ ${usedPrefix}messi

𓂂𓏸  𐅹੭੭   *\`gі𝖿s ᥒs𝖿ա\`*   🔥ᩚ꤬ᰨᰍ
ര ׄ 🔥˚ ${usedPrefix}violar *@tag*
ര ׄ 🔥˚ ${usedPrefix}follar *@tag*
ര ׄ 🔥˚ ${usedPrefix}anal *@tag*
ര ׄ 🔥˚ ${usedPrefix}coger *@tag*
ര ׄ 🔥˚ ${usedPrefix}coger2 *@tag*
ര ׄ 🔥˚ ${usedPrefix}penetrar *@tag*
ര ׄ 🔥˚ ${usedPrefix}sexo *@tag*
ര ׄ 🔥˚ ${usedPrefix}rusa *@tag*
ര ׄ 🔥˚ ${usedPrefix}sixnine *@tag*
ര ׄ 🔥˚ ${usedPrefix}pies *@tag*
ര ׄ 🔥˚ ${usedPrefix}mamada *@tag*
ര ׄ 🔥˚ ${usedPrefix}lickpussy *@tag*
ര ׄ 🔥˚ ${usedPrefix}grabboobs *@tag*
ര ׄ 🔥˚ ${usedPrefix}suckboobs *@tag*
ര ׄ 🔥˚ ${usedPrefix}cum *@tag*
ര ׄ 🔥˚ ${usedPrefix}fap *@tag*
ര ׄ 🔥˚ ${usedPrefix}manosear *@tag*
ര ׄ 🔥˚ ${usedPrefix}lesbianas *@tag*

𓂂𓏸  𐅹੭੭   *\`s𝗍іᥴkᥱrs\`*   🍦ᩚ꤬ᰨᰍ
ര ׄ 🍦˚ ${usedPrefix}sticker *img*
ര ׄ 🍦˚ ${usedPrefix}sticker *vid*
ര ׄ 🍦˚ ${usedPrefix}brat *texto*
ര ׄ 🍦˚ ${usedPrefix}qc *texto*
ര ׄ 🍦˚ ${usedPrefix}dado

𓂂𓏸  𐅹੭੭   *\`r⍴g\`*   💸ᩚ꤬ᰨᰍ
ര ׄ 💸˚ ${usedPrefix}minar
ര ׄ 💸˚ ${usedPrefix}cofre
ര ׄ 💸˚ ${usedPrefix}slut
ര ׄ 💸˚ ${usedPrefix}nivel
ര ׄ 💸˚ ${usedPrefix}ruleta

𓂂𓏸  𐅹੭੭   *\`rᥱgіs𝗍r᥆\`*   🎣ᩚ꤬ᰨᰍ
ര ׄ 🎣˚ ${usedPrefix}perfil
ര ׄ 🎣˚ ${usedPrefix}reg
ര ׄ 🎣˚ ${usedPrefix}unreg

𓂂𓏸  𐅹੭੭   *\`᥆աᥒᥱr\`*   🍀ᩚ꤬ᰨᰍ
ര ׄ 🍀˚ ${usedPrefix}salir
ര ׄ 🍀˚ ${usedPrefix}update
ര ׄ 🍀˚ ${usedPrefix}blocklist
ര ׄ 🍀˚ ${usedPrefix}grouplist
ര ׄ 🍀˚ ${usedPrefix}restart
ര ׄ 🍀˚ ${usedPrefix}join
ര ׄ 🍀˚ ${usedPrefix}chetar
ര ׄ 🍀˚ ${usedPrefix}unbanuser
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nNᴜᴇᴠᴀ Vᴇʀsɪᴏɴ Uʟᴛʀᴀ 💫',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*[ ℹ️ ] Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}

handler.help = ['menuff'];
handler.tags = ['main'];
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}*/