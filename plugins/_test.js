import fs from 'fs'
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

        let menu = `
︵᷼     ⿻ *Morchi* ࣪   ࣭  ࣪ *WA* ࣭  🐈  ࣪   ࣭ 
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
`.trim()

        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/rh2b7r.jpg" }, // Imagen fija
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
            }
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
}