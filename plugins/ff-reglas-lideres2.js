var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = 'https://i.ibb.co/5YXTYrM/2f2d54f056e716d68d4d9.jpg';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `*REGLAS LIDERES2* ✅`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^(reglaslideres2|reglalideres2|lideres2|reglaslderes2|reglasliders2|reglaslieres2)$/i

handler.admin = true

handler.group = true

export default handler