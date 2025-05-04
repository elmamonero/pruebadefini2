var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `*𝑇𝑅𝐸𝐼𝑁𝑂* 

𝐶𝑅𝐸𝐴𝐶𝐼𝑂́𝑁 𝐷𝐸 𝑆𝐴𝐿𝐴: 

- 𝑀𝑎𝑝𝑎𝑠: 𝐵-𝐾-𝑃
- 𝑀𝑜𝑑𝑜 𝑒𝑠𝑐𝑢𝑎𝑑𝑟𝑎 (4)
- 𝑃𝑟𝑜𝑝𝑖𝑒𝑑𝑎𝑑 𝑑𝑒 𝑎𝑟𝑚𝑎: 𝑁𝑜
- 𝐵𝑙𝑜𝑞𝑢𝑒𝑎𝑟 𝑒𝑚𝑢𝑙𝑎𝑑𝑜𝑟: 𝑁𝑜
- 𝑅𝑒𝑠𝑢𝑟𝑟𝑒𝑐𝑐𝑖𝑜́𝑛: 𝑆𝑖
- 𝐴𝑠𝑝𝑒𝑐𝑡𝑜 𝐺𝑒𝑛𝑒́𝑟𝑖𝑐𝑜: 𝑆𝑖

𝐴𝐶𝐿𝐴𝑅𝐴𝐶𝐼𝑂𝑁𝐸𝑆

- 𝑆𝑒 𝑒𝑚𝑝𝑖𝑒𝑧𝑎𝑛 𝑎 𝑚𝑎𝑡𝑎𝑟 𝑐𝑒𝑟𝑟𝑎𝑑𝑎 𝑙𝑎 𝑝𝑟𝑖𝑚𝑒𝑟𝑎 𝑧𝑜𝑛𝑎 (𝑛𝑜 𝑎𝑛𝑡𝑒𝑠)
- 𝑅𝑒𝑠𝑝𝑒𝑡𝑎𝑟 𝑐𝑎𝑠𝑖𝑙𝑙𝑎𝑠
- 𝐶𝑙𝑎𝑛 𝑡𝑜𝑑𝑜𝑠 𝑒𝑛 𝑒𝑙 𝑚𝑖𝑠𝑚𝑜
- 𝐿𝑖𝑏𝑟𝑒 𝑑𝑒 𝑡𝑎𝑔
- 𝑁𝑖𝑛𝑔𝑢́𝑛 𝑒𝑠𝑝𝑒𝑐𝑡𝑎𝑑𝑜𝑟 (𝑆𝑜𝑙𝑜 𝑚𝑜𝑑 𝑜 𝑐𝑎𝑠𝑡𝑒𝑟) 
- 𝐶𝑢𝑒𝑛𝑡𝑎 +40

𝑃𝑅𝑂𝐻𝐼𝐵𝐼𝐷𝑂: 
- 𝐷𝑜𝑏𝑙𝑒 𝐹𝑟𝑎𝑛𝑐𝑜 (𝑃𝐶 𝑦 𝑀𝑂𝑉𝐼𝐿) 
- 𝑃𝑒𝑝𝑖𝑡𝑎
- 𝑅𝑖𝑓𝑙𝑒 𝑎𝑛𝑡𝑖𝑚𝑎𝑡𝑒𝑟𝑖𝑎
- 𝐵𝑎𝑙𝑙𝑒𝑠𝑡𝑎 
- 𝑚79`.trim();

    conn.sendMessage(m.chat, { text: texto, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m });
}

handler.help = ['clk']

handler.tags = ['ffvs']

handler.command = /^(reglastreino|reglastrein|trein|reglatreino)$/i

handler.admin = true

handler.group = true

export default handler




