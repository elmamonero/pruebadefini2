var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = 'https://i.ibb.co/vP7zR5p/MAPA-CUADRILATERO.jpg';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `*MAPA CUADRILÀTERO* ✅`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^(mapacuadrilatero|mapacuadri|mapacuadrilatero|mapacuadrila|mapaciadilatero|mapacuadrilaterso|mapacuadrilátero)$/i

handler.admin = true

handler.group = true

export default handler