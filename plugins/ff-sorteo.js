let toM = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b
  do b = ps.getRandom()
  while (b === a)

  let mensaje = `*${toM(a)} estás de suerte, acabas de ganar 😼💪🏻*\n\n*PANTHEON BOT* 𝙏𝙚 𝙙𝙖 𝙎𝙪𝙚𝙧𝙩𝙚 🤖💫`

  m.reply(mensaje, null, { mentions: [a, b] })
}

handler.help = ['sorteo']
handler.tags = ['fun']
handler.command = ['sorteo', 'sortear']
handler.group = true
export default handler
