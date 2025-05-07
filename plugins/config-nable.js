let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  // Detecta si la acción es 'activar' o 'desactivar'
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || '').toLowerCase();
  let isAll = false, isUser = false;

  // Función para verificar permisos de grupo y admin/owner
  const checkPermissions = (permType, m, conn) => {
    if (permType === 'group') {
      if (!m.isGroup && !isOwner) {
        global.dfail('group', m, conn);
        throw false;
      }
    }
    if (permType === 'admin') {
      if (!isAdmin && !isOwner) {
        global.dfail('admin', m, conn);
        throw false;
      }
    }
    if (permType === 'rowner') {
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
    }
  };

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      checkPermissions('group', m, conn);
      chat.welcome = isEnable;
      break;

    case 'antiPrivate':
    case 'antiprivado':
    case 'antipriv':
      checkPermissions('rowner', m, conn);
      bot.antiPrivate = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      checkPermissions('rowner', m, conn);
      bot.restrict = isEnable;
      break;

    case 'antibot':
    case 'antibots':
      checkPermissions('admin', m, conn);
      chat.antiBot = isEnable;
      break;

    case 'antisubbots':
    case 'antisub':
    case 'antisubot':
    case 'antibot2':
      checkPermissions('admin', m, conn);
      chat.antiBot2 = isEnable;
      break;

    case 'antifake':
    case 'antifakes':
    case 'antiarabes':
    case 'antiarab':
      checkPermissions('admin', m, conn);
      chat.onlyLatinos = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
      checkPermissions('admin', m, conn);
      chat.modoadmin = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
    case 'leermensajes':
      checkPermissions('rowner', m, conn);
      bot.autoread = isEnable;
      break;

    case 'antiver':
    case 'antiocultar':
    case 'antiviewonce':
      checkPermissions('group', m, conn);
      chat.antiver = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
    case 'emojis':
      checkPermissions('group', m, conn);
      chat.reaction = isEnable;
      break;

    case 'audios':
    case 'audiosbot':
    case 'botaudios':
      checkPermissions('group', m, conn);
      chat.audios = isEnable;
      break;

    case 'antilink2':
      checkPermissions('group', m, conn);
      chat.antiLink2 = isEnable;
      break;

    case 'autolevelup':
    case 'autonivel':
    case 'nivelautomatico':
      checkPermissions('group', m, conn);
      chat.autolevelup = isEnable;
      break;

    case 'antiSpam':
    case 'antispam':
    case 'antispamosos':
      checkPermissions('rowner', m, conn);
      bot.antiSpam = isEnable;
      break;

    case 'antidelete':
    case 'antieliminar':
    case 'delete':
      checkPermissions('group', m, conn);
      chat.delete = isEnable;
      break;

    case 'autobio':
    case 'status':
    case 'bio':
      checkPermissions('rowner', m, conn);
      bot.autobio = isEnable;
      break;

    case 'jadibotmd':
    case 'serbot':
    case 'subbots':
      checkPermissions('rowner', m, conn);
      bot.jadibotmd = isEnable;
      break;

    case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      checkPermissions('group', m, conn);
      checkPermissions('admin', m, conn);
      chat.detect = isEnable;
      break;

    case 'simi':
    case 'autosimi':
    case 'simsimi':
      checkPermissions('group', m, conn);
      checkPermissions('admin', m, conn);
      chat.simi = isEnable;
      break;

    case 'document':
    case 'documento':
      isUser = true;
      user.useDocument = isEnable;
      break;

    case 'antilink':
      checkPermissions('group', m, conn);
      chat.antiLink = isEnable;
      break;

    case 'nsfw':
    case 'nsfwhot':
    case 'nsfwhorny':
      checkPermissions('group', m, conn);
      chat.nsfw = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) {
        return conn.reply(m.chat, `
*[🍨] Funciones Solo Para Owner*

🜲 ${usedPrefix + command} antispam
🜲 ${usedPrefix + command} antiprivado
🜲 ${usedPrefix + command} subbots
🜲 ${usedPrefix + command} status
🜲 ${usedPrefix + command} restrict
🜲 ${usedPrefix + command} autoread

*[🎩] Funciones De Grupos*

➳ ${usedPrefix + command} welcome 
➳ ${usedPrefix + command} autolevelup
➳ ${usedPrefix + command} antibot
➳ ${usedPrefix + command} audios
➳ ${usedPrefix + command} autoread
➳ ${usedPrefix + command} antiver
➳ ${usedPrefix + command} detect 
➳ ${usedPrefix + command} delete
➳ ${usedPrefix + command} antitraba
➳ ${usedPrefix + command} modoadmin 
➳ ${usedPrefix + command} antiarabes
➳ ${usedPrefix + command} autoaceptar
➳ ${usedPrefix + command} antilink
➳ ${usedPrefix + command} antilink2`, m, rcanal);
      return;
  }

  // Se actualizan las propiedades específicas cuando corresponda
  if (type === 'antilink2') {
    // Ya se actualizó en el case, solo confirmamos
    // chat.antiLink2 ya fue actualizado arriba
  }

  // Enviar la respuesta del estado
  await conn.sendMessage(m.chat, { 
    text: `*» 𝗢𝗣𝗖𝗜𝗢𝗡 |* ${type.toUpperCase()}\n` +
          `*» 𝗘𝗦𝗧𝗔𝗗𝗢 |* ${isEnable ? 'ON' : 'OFF'}\n` +
          `*» 𝗣𝗔𝗥𝗔 |* ${isAll ? 'ESTE BOT' : isUser ? '' : 'ESTE CHAT'}`, 
    footer: dev, 
    buttons: [
      { 
        buttonId: isEnable ? `.off ${type}` : `.on ${type}`, 
        buttonText: { displayText: isEnable ? '🔴 Off' : '🟢 On' } 
      },
      { 
        buttonId: ".menu", 
        buttonText: { displayText: 'Menú ☕' } 
      }
    ],
    viewOnce: true,
    headerType: 1
  }, { quoted: fkontak });
}

handler.help = ['enable', 'disable'];
handler.tags = ['owner'];
handler.command = ['enable', 'disable', 'on', 'off', '1', '0'];

export default handler;
