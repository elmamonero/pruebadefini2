import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ Ingresa un enlace de Telegram Stickers.`
  if (!text.includes('t.me')) return m.reply(`❎ El enlace debe ser de Telegram Stickers.`)

  m.react('⏳') // Reacción de espera

  try {
    let stick = await (await fetch(global.API('fgmods', '/api/downloader/telesticker', { url: text }, 'apikey'))).json()
    
    if (!stick.result || stick.result.length === 0) {
      return m.reply(`❎ No se encontraron stickers en el enlace.`)
    }

    let res = stick.result.map(obj => obj.url)

    m.reply(`✅ Enviando Stickers\n\n▢ *Total de stickers:* ${res.length}`)

    for (let i of res) {
      const stiker = await sticker(false, i, global.packname || 'Shadow Bot', global.author || 'Cristian Escobar')
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      m.react('✅') // Reacción de completado
    }
  } catch (error) {
    m.reply(`❎ Error al descargar los stickers. Intenta nuevamente.`)
  }
}

handler.help = ['telestick']
handler.tags = ['sticker']
handler.command = ['tgstick', 'telestick', 'telesticker', 'tgsticker']

export default handler