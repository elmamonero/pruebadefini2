export default {
    name: "botones",
    description: "prueba de botones xd",
    async execute(m, { conn, usedPrefix }) {
      if (!m.text || !m.text.toLowerCase().startsWith(`${usedPrefix}queonda`)) return;
  
      const texto = `👋 Que Onda Puto Que Necesitas?\nDimelo aca:`;
  
      const buttons = [
        {
          buttonId: `${usedPrefix}info`,
          buttonText: { displayText: 'crearemos el mejor bot de whatsapp' },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}Quienes somos?`,
          buttonText: { displayText: '📜 La meraa vergaaaa' },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}contacto`,
          buttonText: { displayText: '📞 +52 656 704 4256' },
          type: 1,
        },
      ];
  
      const buttonMessage = {
        text: texto,
        footer: 'Botones 157',
        buttons: buttons,
        headerType: 1,
      };
  
      await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
    },
  };
  
