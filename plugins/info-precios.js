const handler = async (m, { conn }) => {
const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

  conn.sendMessage(m.chat, {
text: `🍒 ¡𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐! ${taguser}\n\n¿𝘘𝘶𝘪𝘦𝘳𝘦𝘴 𝘥𝘰𝘮𝘪𝘯𝘢𝘳 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘤𝘰𝘯 𝘦𝘭 𝘣𝘰𝘵 𝘮á𝘴 𝘱𝘰𝘥𝘦𝘳𝘰𝘴𝘰? ¡ᏢᏗᏁᏖᏂᏋᏫᏁ ᏴᏫᏖ está aquí! 🔥\n\n🔹 *ᴘʀᴇᴄɪᴏs ᴅᴇʟ ʙᴏᴛ* 🔹\n\n🌀 ᴘᴇʀᴍᴀɴᴇɴᴛᴇ\n> 🔹 *𝙐𝙉 𝙂𝙍𝙐𝙋𝙊:* 𝟹 🇺🇸\n> 🔹 *𝘿𝙊𝙎 𝙂𝙍𝙐𝙋𝙊𝙎:* 𝟼 🇺🇸\n> 🔹 *𝙏𝙍𝙀𝙎 𝙂𝙍𝙐𝙋𝙊𝙎 + 𝙐𝙉 𝘽𝙊𝙏 𝘿𝙀 𝙍𝙀𝙂𝘼𝙇𝙊:* 𝟾 🇺🇸\n\n🌀 ᴍᴇɴsᴜᴀʟ\n- 𝟸 🇵🇪 / 𝟿𝟶𝟶 🇦🇷\n\n🌀 ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴏ\n- 𝟹𝟻 🇵🇪 / 𝟷𝟶𝟶𝟶𝟶 🇦🇷\n\n🔗 𝙋𝙍𝙐𝙀𝘽𝘼 & 𝘾𝙊𝙈𝙋𝙍𝘼\nhttps://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I\n\n> © 𝙋𝙖𝙣𝙩𝙝𝙚𝙤𝙣 𝘽𝙤𝙩 🔥`,
mentions: [m.sender]
}, { quoted: fkontak });
};
handler.command = ['precios', 'comprar', 'adquirir'];
export default handler;
