import fs from 'fs';
import path from 'path';
import pino from 'pino';
import NodeCache from 'node-cache';
import qrcode from 'qrcode';
import chalk from 'chalk';
import { exec} from 'child_process';
import { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers} from '@whiskeysockets/baileys';
import * as ws from 'ws';
const { CONNECTING} = ws;

const crm1 = "Y2QgcGx1Z2lucy";
const crm2 = "A7IG1kNXN1b";
const crm3 = "SBpbmZvLWRvbmFyLmpz";
const crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";

const rtx2 = `Vinculación generada.\nMantente conectado con SukiBot_MD.\nCanal oficial: siempre activo.`;

const jadi = 'sub-bots';
global.activeCodes = global.activeCodes || {};

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes} m y ${seconds} s`;
}

export let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!global.db.data.settings[conn.user.jid]?.jadibotmd)
    return conn.reply(m.chat, `El comando *${command}* está desactivado temporalmente.`, m);

  const wait = global.db.data.users[m.sender].Subs + 120000;
  if (new Date - global.db.data.users[m.sender].Subs < 120000)
    return conn.reply(m.chat, `Debes esperar ${msToTime(wait - new Date())} para volver a vincular un Sub-Bot.`, m);

  const subBots = global.conns.filter(c => c.user && c.ws?.socket?.readyState!== ws.CLOSED);
  if (subBots.length>= 20)
    return conn.reply(m.chat, `No hay espacios disponibles para Sub-Bots.`, m);

  const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
  const id = `${who.split('@')[0]}`;
  const pathYukiJadiBot = path.join(`./${jadi}/`, id);
  if (!fs.existsSync(pathYukiJadiBot)) fs.mkdirSync(pathYukiJadiBot, { recursive: true});

  global.db.data.users[m.sender].Subs = +new Date;
  global.activeCodes[m.sender] = 'SUKI-FEDE';

  await yukiJadiBot({
    pathYukiJadiBot,
    m,
    conn,
    args,
    usedPrefix,
    command,
    fromCommand: true
});
};

handler.command = ['codesuki', 'suki'];
handler.help = ['code2', 'suki'];
handler.tags = ['serbot'];
export default handler;

export async function yukiJadiBot(options) {
  const { pathYukiJadiBot, m, conn, args, usedPrefix, command} = options;

  const mcode = args.some(arg => /(--code2|code2)/.test(arg?.trim()));
  const pathCreds = path.join(pathYukiJadiBot, "creds.json");

  if (!fs.existsSync(pathYukiJadiBot)) fs.mkdirSync(pathYukiJadiBot, { recursive: true});

  try {
    if (args[0]) {
      const decoded = Buffer.from(args[0], "base64").toString("utf-8");
      fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(decoded), null, '\t'));
}
} catch {
    conn.reply(m.chat, `Usa correctamente el comando: ${usedPrefix + command} code2`, m);
    return;
}

  const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(comb.toString("utf-8"), async () => {
    const { version} = await fetchLatestBaileysVersion();
    const { state, saveCreds} = await useMultiFileAuthState(pathYukiJadiBot);

    const sock = makeWASocket({
      logger: pino({ level: "fatal"}),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent'}))
},
      msgRetry: () => {},
      msgRetryCache: new NodeCache(),
      browser: Browsers.macOS("Chrome"),
      version,
      generateHighQualityLinkPreview: true
});

    sock.ev.on('connection.update', async (update) => {
      const { connection, qr} = update;

      if (qr && mcode) {
        const secret = global.activeCodes[m.sender];
        if (!secret) { return conn.reply(m.chat, `Este código no está asociado a tu número.`, m);
}

        const txtCode = await conn.sendMessage(m.chat, { text: rtx2}, { quoted: m});
        const codeBot = await m.reply(secret);

        if (txtCode?.key) setTimeout(() => conn.sendMessage(m.sender, { delete: txtCode.key}), 30000);
        if (codeBot?.key) setTimeout(() => conn.sendMessage(m.sender, { delete: codeBot.key}), 30000);

        delete global.activeCodes[m.sender]; // elimina el código después de usarlo
        return;
}

      if (connection === 'open') {
        global.conns.push(sock);
        const userMention = `@${m.sender.split('@')[0]}`;
        await conn.sendMessage(m.chat, {
          text: `${userMention}, ya estás conectado como Sub-Bot.`,
          mentions: [m.sender]
}, { quoted: m});
}
});

    sock.ev.on('creds.update', saveCreds);
});
  }
