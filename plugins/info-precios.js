const handler = async (m, { conn }) => {
const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

  conn.sendMessage(m.chat, {
text: `🍒 ¡𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐! ${taguser}\n\n¿𝘘𝘶𝘪𝘦𝘳𝘦𝘴 𝘥𝘰𝘮𝘪𝘯𝘢𝘳 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘤𝘰𝘯 𝘦𝘭 𝘣𝘰𝘵 𝘮á𝘴 𝘱𝘰𝘥𝘦𝘳𝘰𝘴𝘰? ¡ᏢᏗᏁᏖᏂᏋᏫᏁ ᏴᏫᏖ está aquí! 🔥\n\n🔹 *ᴘʀᴇᴄɪᴏs ᴅᴇʟ ʙᴏᴛ* 🔹\n\n🌀 ᴘᴇʀᴍᴀɴᴇɴᴛᴇ\n> 🔹 *𝙐𝙉𝙊 𝙂𝙍𝙐𝙋𝙊:* 𝟹 🇺🇸\n> 🔹 *𝘿𝙊𝙎 𝙂𝙍𝙐𝙋𝙊𝙎:* 𝟼 🇺🇸\n> 🔹 *𝙏𝙍𝙀𝙎 𝙂𝙍𝙐𝙋𝙊𝙎 + 𝙐𝙉𝙊 𝘽𝙊𝙏 𝘿𝙀 𝙍𝙀𝙂𝘼𝙇𝙊:* 𝟾 🇺🇸\n\n🌀 ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴏ\n> 🔹 *𝙋𝘼𝙂𝙊 𝙄𝙉𝙄𝘾𝙄𝘼𝙇:* 𝟷𝟻 🇺🇸\n> 🔹 *𝙋𝘼𝙂𝙊 𝙈𝙀𝙉𝙎𝙐𝘼𝙇:* 𝟻 🇺🇸\n\n💰 𝘾𝙊𝙉𝙑𝙀𝙍𝙎𝙄𝙊𝙉 𝘼 𝙊𝙏𝙍𝘼𝙎 𝙈𝙊𝙉𝙀𝘿𝘼𝙎:\n> 🇨🇱 *CHILE:* Pago inicial 15000 CLP | Pago mensual 5000 CLP\n> 🇵🇪 *PERÚ:* Pago inicial 60 PEN | Pago mensual 20 PEN\n> 🇦🇷 *ARGENTINA:* Pago inicial 6000 ARS | Pago mensual 2000 ARS\n> 🇲🇽 *MÉXICO:* Pago inicial 300 MXN | Pago mensual 100 MXN\n\n🔗 𝙋𝙍𝙐𝙀𝘽𝘼 & 𝘾𝙊𝙈𝙋𝙍𝘼\nhttps://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I\n\n> © 𝙋𝙖𝙣𝙩𝙝𝙚𝙤𝙣 𝘽𝙤𝙩 🔥`,
mentions: [m.sender]
}, { quoted: fkontak });
};
handler.command = ['precios', 'comprar', 'adquirir'];
export default handler;
