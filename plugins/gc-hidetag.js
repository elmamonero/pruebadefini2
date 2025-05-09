import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants }) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Mantener el texto original y evitar reemplazos innecesarios
    const mensajeTexto = text && text.trim() !== '' ? text : '';

    if (isMedia) {
      var mediax = await quoted.download?.();

      if (quoted.mtype === 'imageMessage') {
        conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: mensajeTexto }, { quoted: m });
      } else if (quoted.mtype === 'videoMessage') {
        conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: mensajeTexto }, { quoted: m });
      } else if (quoted.mtype === 'audioMessage') {
        conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
      } else if (quoted.mtype === 'stickerMessage') {
        conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
      }
    } else {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: mensajeTexto,
          contextInfo: { mentionedJid: users }
        }
      }, {});
    }
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

handler.command = /^(hidetag|notify|notificar|noti|n|hidetah|hidet)$/i;
handler.help = ['hidetag'];
handler.tag = ['grupo'];
handler.group = true;
handler.admin = true;

export default handler;
