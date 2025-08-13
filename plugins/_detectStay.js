import { writeFileSync, readFileSync, existsSync} from 'fs';

const BOT_NAME = '𝖲𝗎𝗄𝗂Bot_MD';
const INACTIVITY_LIMIT = 2 * 24 * 60 * 60 * 1000; // 2 días
const activityFile = './groupActivity.json';
const stayFile = './stayGroups.json';

let groupActivity = existsSync(activityFile)
? JSON.parse(readFileSync(activityFile))
: {};

let stayGroups = existsSync(stayFile)
? JSON.parse(readFileSync(stayFile))
: [];

const saveActivity = () => writeFileSync(activityFile, JSON.stringify(groupActivity));
const saveStayGroups = () => writeFileSync(stayFile, JSON.stringify(stayGroups));

const handler = async (m, { conn, command, args}) => {
  const isGroup = m.isGroup;
  const groupId = m.chat;

  if (!isGroup) return;

  // 🕒 Registrar actividad
  groupActivity[groupId] = Date.now();
  saveActivity();

  // 🛡 Comando.stay
  if (command === 'stay') {
    if (!stayGroups.includes(groupId)) {
      stayGroups.push(groupId);
      saveStayGroups();
      return conn.reply(groupId, `✅ Este grupo ha sido marcado como protegido. ${BOT_NAME} no se saldrá automáticamente.`, m);
} else {
      return conn.reply(groupId, `ℹ️ Este grupo ya está protegido.`, m);
}
}

  // ❌ Comando.unstay
  if (command === 'unstay') {
    if (stayGroups.includes(groupId)) {
      stayGroups = stayGroups.filter(id => id!== groupId);
      saveStayGroups();
      return conn.reply(groupId, `🚫 Este grupo ya no está protegido. ${BOT_NAME} podrá salir si detecta otro bot o inactividad.`, m);
} else {
      return conn.reply(groupId, `ℹ️ Este grupo no estaba protegido.`, m);
}
}

  // 📋 Comando.staylist
  if (command === 'staylist') {
    if (stayGroups.length === 0) {
      return conn.reply(m.chat, `📭 No hay grupos protegidos actualmente.`, m);
}

    const list = stayGroups.map((id, i) => `${i + 1}. ${id}`).join('\n');
    return conn.reply(m.chat, `📌 Lista de grupos protegidos:\n\n${list}`, m);
}

  // 🤖 Detectar otros bots
  const participants = Object.values(conn.chats[groupId]?.participants || {});
  const otherBots = participants.filter(p =>
    p.id.endsWith('bot') &&!p.id.includes(conn.user.id)
);

  if (otherBots.length> 0 &&!stayGroups.includes(groupId)) {
    await conn.reply(groupId, `⚠️ Detecté otro bot en este grupo. ${BOT_NAME} se retirará.`, m);
    await conn.groupLeave(groupId);
    return;
}

  // 🕒 Verificar inactividad cada hora
  setInterval(async () => {
    const lastActivity = groupActivity[groupId] || 0;
    const now = Date.now();

    if (now - lastActivity> INACTIVITY_LIMIT &&!stayGroups.includes(groupId)) {
      await conn.reply(groupId, `😴 No se ha usado el bot en más de 2 días. ${BOT_NAME} se retirará.`, m);
      await conn.groupLeave(groupId);
}
}, 50 * 60 * 1000); // Cada hora
};

handler.all = true;
handler.command = ['stay', 'unstay', 'staylist'];
handler.group = true;
handler.rowner = true;

export default handler;
