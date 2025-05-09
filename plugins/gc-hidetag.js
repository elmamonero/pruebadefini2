import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
    
    const mensajeTexto = text && text !== '.n' ? text : '*Hola*';

    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat, 
        { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: mensajeTexto || c } }, 
        { quoted: m, userJid: conn.user.id }
      ), 
      mensajeTexto, 
      conn.user.jid, 
      { mentions: users }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = text && text !== '.n' ? text : '*Hola*';

    if (isMedia) {
      var mediax = await quoted.download?.();

      if (quoted.mtype === 'imageMessage') {
        conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
      } else if (quoted.mtype === 'videoMessage') {
        conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
      } else if (quoted.mtype === 'audioMessage') {
        conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
      } else if (quoted.mtype === 'stickerMessage') {
        conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
      }
    } else {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}\n${htextos}\n`,
          contextInfo: { mentionedJid: users }
        }
      }, {});
    }
  }
};

handler.command = /^(hidetag|notify|notificar|noti|n|hidetah|hidet)$/i;
handler.help = ['hidetag'];
handler.tag = ['grupo'];
handler.group = true;
handler.admin = true;

export default handler;
