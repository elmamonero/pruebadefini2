var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = 'https://i.ibb.co/8Kvyy6k/f49d69baf52c38286c16b.jpg';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `*REGLAS LIDERES* ✅`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^(reglaslideres|reglalideres|lideres|reglaslderes|reglasliders|reglaslieres)$/i

handler.admin = true

handler.group = true

export default handler