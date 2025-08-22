const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";

import qrcode from "qrcode";
import nodeCache from "node-cache";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import pino from "pino";
import util from "util";
import * as ws from "ws";
import { makeWASocket} from "../lib/simple.js";

const { child, spawn, exec} = await import("child_process");
const { CONNECTING} = ws;

// 🔐 Verificaciones internas
const checks = {
  key1: "60adedfeb87c6",
  key2: "e8d2cd8ee01fd",
  key3: "S6A2514 in",
  key4: "m-Donar.js",
  key5: "76c3ff3561123379739e9faf06cc538",
  key6: "7 _autoresponder.js59c74f1c6a3",
  key8: "63fbbcc05babcc3de80de info-bot.js"
};

// 📁 Comandos y rutas
const cmds = {
  pluginDir: "cd plugins",
  hashCheck: "; md5sum",
  pluginFiles: ["Sinfo-Donar.js", "_autoresponder.js", "info-bot.js"]
};

// 🖼️ Imágenes
const imgMain = "https://files.catbox.moe/rkvuzb.jpg";
const imgQR = "https://files.catbox.moe/rkvuzb.jpg";

// 📍 Contacto virtual
const fkontak = {
  key: {
    participants: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "Halo"
},
  message: {
    locationMessage: {
      name: "𝖲𝖴𝖪𝖨𝖡𝖮𝖳_𝖬𝖣 𝖮𝖭𝖫𝖨𝖭𝖤 ✅",
      jpegThumbnail: await (await fetch("https://files.catbox.moe/rkvuzb.jpg")).buffer(),
      vcard: `
BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
}
},
  participant: "0@s.whatsapp.net"
};

// 💬 Mensajes con estilo ʙᴏᴛ

const rtx = `*╭───〔 𝚂𝚄𝙺𝙸𝙱𝙾𝚃_𝙼𝙳 𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 〕───⬣*

*¡Bienvenido a 𝚂𝚄𝙺𝙸𝙱𝙾𝚃_𝙼𝙳! 🚀*

Escanea este código QR desde tu dispositivo para iniciar sesión:

\`1\` ▸ Toca los *tres puntos* en la esquina superior derecha.
\`2\` ▸ Selecciona *"Dispositivos vinculados"*.
\`3\` ▸ Escanea el código QR que aparece aquí.

*⚠️ Este código expira en 45 segundos. ¡Actúa rápido!*

*╰───〔 𝚂𝚄𝙺𝙸𝙱𝙾𝚃_𝙼𝙳 𝚂𝚈𝚂𝚃𝙴𝙼 ✅ 〕───⬣*`;

const rtx2 = `*╭══ 🎭 𝚂𝚄𝙺𝙸𝙱𝙾𝚃_𝙼𝙳 ══⬣*

*¡Conexión segura por código activada! 🔐*

Sigue estos pasos para vincular tu cuenta:

\`1\` ▸ Toca los *tres puntos* en la esquina superior derecha.
\`2\` ▸ Selecciona *"Dispositivos vinculados"*.
\`3\` ▸ Elige *"Vincular con número de teléfono"*.
\`4\` ▸ Introduce el código único que te proporcionaremos.

*⚠️ Este código es exclusivo y personal. No lo compartas.*

*╰═══ 𝚂𝚄𝙺𝙸𝙱𝙾𝚃_𝙼𝙳 𝚂𝚈𝚂𝚃𝙴𝙼 ═══⬣*`;

if (global.conns instanceof Array) {
} else {
  global.conns = [];
}

const MAX_SUBBOTS = 9999;

async function loadSubbots() {
  const serbotFolders = fs.readdirSync('./' + global.jadi); // Changed to global.jadi assuming it's defined elsewhere
  let totalC = 0;

  for (const folder of serbotFolders) {
    if (global.conns.length >= MAX_SUBBOTS) {
      console.log(`*Límite de ${MAX_SUBBOTS} subbots alcanzado.*`);
      break;
    }

    const folderPath = `./${global.jadi}/${folder}`; // Changed to global.jadi
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const { state, saveCreds } = await useMultiFileAuthState(folderPath);
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      version,
      keepAliveIntervalMs: 30000,
      printQRInTerminal: false,
      logger: pino({ level: "fatal" }),
      auth: state,
      browser: [`Dylux`, "IOS", "4.1.0"],
    };

    let conn = makeWASocket(connectionOptions);
    conn.isInit = false;
    let isInit = true;
    let recAtts = 0;

    let connected = false;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update;
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

      if (isNewLogin) conn.isInit = true;

      if (connection === "open") {
        conn.isInit = true;
        global.conns.push(conn);
        connected = true;
        totalC++;
        recAtts = 0;
      }

      if ((connection === 'close' || connection === 'error') && !connected) {
        recAtts++;
        const waitTime = Math.min(15000, 1000 * 2 ** recAtts);

        if (recAtts >= 3) {
          console.log(`🛑 Subbot "${folder}" falló tras 3 intentos. Eliminando carpeta.`);
          try {
            fs.rmSync(folderPath, { recursive: true, force: true });
          } catch (err) {
            console.error(`❌ Error al eliminar carpeta de "${folder}":`, err);
          }
          return;
        }

        console.warn(`⚠️ Subbot "${folder}" desconectado (Intento ${recAtts}/3). Reintentando en ${waitTime / 1000}s...`);

        setTimeout(async () => {
          try {
            conn.ws.close();
            conn.ev.removeAllListeners();
            conn = makeWASocket(connectionOptions);
            let handler = await import("../handler.js"); // Import handler here
            conn.handler = handler.handler.bind(conn);
            conn.connectionUpdate = connectionUpdate.bind(conn);
            conn.credsUpdate = saveCreds.bind(conn, true);
            conn.ev.on('messages.upsert', conn.handler);
            conn.ev.on('connection.update', conn.connectionUpdate);
            conn.ev.on('creds.update', conn.credsUpdate);
            await creloadHandler(false);
          } catch (err) {
            console.error(`❌ Error al reintentar conexión con "${folder}":`, err);
          }
        }, waitTime);
      }

      if (code === DisconnectReason.loggedOut) {
        console.log(`📤 Subbot "${folder}" cerró sesión. Eliminando carpeta.`);
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
    }

    let handler = await import("../handler.js");

    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }

      if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("connection.update", conn.connectionUpdate);
        conn.ev.off("creds.update", conn.credsUpdate);
      }

      conn.handler = handler.handler.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);
      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("connection.update", conn.connectionUpdate);
      conn.ev.on("creds.update", conn.credsUpdate);

      isInit = false;
      return true;
    }

    await creloadHandler(false);
  }

  console.log(`\n✅ Subbots conectados correctamente: ${totalC} / ${serbotFolders.length}`);
}
loadSubbots().catch(console.error);

let handler = async (msg, { conn, args, usedPrefix, command, isOwner }) => {
  if (!global.db.data.settings[conn.user.jid].jadibotmd) {
    return conn.reply(msg.chat, "*Este comando esta deshabilitado por mi creador Bajo Bots.*", msg, global.rcanal); // Changed rcanal to global.rcanal
  }

  if (global.conns.length >= MAX_SUBBOTS) {
    return conn.reply(msg.chat, `*Lo siento se ah alcanzado el limite de ${MAX_SUBBOTS} subbots. Por favor, intenta mas tarde.*`, msg, global.rcanal); // Changed rcanal to global.rcanal
  }

  let user = conn;
  const isCode = command === "code" || (args[0] && /(--code|code)/.test(args[0].trim()));
  let code;
  let pairingCode;
  let qrMessage;
  let userData = global.db.data.users[msg.sender];
  let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
  let userName = "" + userJid.split`@`[0];

  if (isCode) {
    args[0] = args[0]?.replace(/^--code$|^code$/, "").trim() || undefined;
    if (args[1]) {
      args[1] = args[1].replace(/^--code$|^code$/, "").trim();
    }
  }

  if (!fs.existsSync("./" + global.jadi + "/" + userName)) { // Changed to global.jadi
    fs.mkdirSync("./" + global.jadi + "/" + userName, { recursive: true }); // Changed to global.jadi
  }

  if (args[0] && args[0] != undefined) {
    fs.writeFileSync("./" + global.jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")); // Changed to global.jadi
  } else {
    "";
  }

  if (fs.existsSync("./" + global.jadi + "/" + userName + "/creds.json")) { // Changed to global.jadi
    let creds = JSON.parse(fs.readFileSync("./" + global.jadi + "/" + userName + "/creds.json")); // Changed to global.jadi
    if (creds) {
      if (creds.registered === false) {
        fs.unlinkSync("./" + global.jadi + "/" + userName + "/creds.json"); // Changed to global.jadi
      }
    }
  }

  const execCommand = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(execCommand.toString("utf-8"), async (error, stdout, stderr) => {
    const secret = Buffer.from(drm1 + drm2, "base64");

    async function initSubBot() {
      let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
      let userName = "" + userJid.split`@`[0];

      if (!fs.existsSync("./" + global.jadi + "/" + userName)) { // Changed to global.jadi
        fs.mkdirSync("./" + global.jadi + "/" + userName, { recursive: true }); // Changed to global.jadi
      }

      if (args[0]) {
        fs.writeFileSync("./" + global.jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")); // Changed to global.jadi
      } else {
        "";
      }

      let { version, isLatest } = await fetchLatestBaileysVersion();
      const msgRetry = msgRetry => {};
      const cache = new nodeCache();
      const { state, saveState, saveCreds } = await useMultiFileAuthState("./" + global.jadi + "/" + userName); // Changed to global.jadi

      const config = {
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        msgRetry: msgRetry,
        msgRetryCache: cache,
        version: [2, 3000, 1023223821],
        syncFullHistory: true,
        browser: isCode ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["${botname} (Sub Bot)", "Chrome", "2.0.0"],
        defaultQueryTimeoutMs: undefined,
        getMessage: async msgId => {
          if (global.store) {} // Changed to global.store
          return {
            conversation: "${botname}Bot-MD"
          };
        }
      };

      let subBot = makeWASocket(config);
      subBot.isInit = false;
      let isConnected = true;

      async function handleConnectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;
        if (isNewLogin) {
          subBot.isInit = false;
        }
        if (qr && !isCode) {
          qrMessage = await user.sendMessage(msg.chat, {
            image: await qrcode.toBuffer(qr, { scale: 8 }),
            caption: rtx,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
          return;
        }
        if (qr && isCode) {
          code = await user.sendMessage(msg.chat, {
            image: { url: imgcode },
            caption: rtx2,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });

          await sleep(3000);
          pairingCode = await subBot.requestPairingCode(msg.sender.split`@`[0]);

          pairingCode = await user.sendMessage(msg.chat, {
            text: `\`\`\`${pairingCode}\`\`\``, // Only the code, no extra text
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        console.log(statusCode);

        const closeConnection = async shouldClose => {
          if (!shouldClose) {
            try {
              subBot.ws.close();
            } catch {}
            subBot.ev.removeAllListeners();
            let index = global.conns.indexOf(subBot);
            if (index < 0) {
              return;
            }
            delete global.conns[index];
            global.conns.splice(index, 1);
          }
        };

        const disconnectCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (connection === "close") {
          console.log(disconnectCode);
          if (disconnectCode == 405) {
            await fs.unlinkSync("./" + global.jadi + "/" + userName + "/creds.json"); // Changed to global.jadi
            return await msg.reply(" Reenvia nuevamente el comando.");
          }
          if (disconnectCode === DisconnectReason.restartRequired) {
            initSubBot();
            return console.log("\n Tiempo de conexion agotado, reconectando...");
          } else if (disconnectCode === DisconnectReason.loggedOut) {
            fs.rmdirSync(`./${global.jadi}/${userName}`, { recursive: true }); // Changed to global.jadi
            return msg.reply(" *Conexion perdida...*");
          } else if (disconnectCode == 428) {
            await closeConnection(false);
            return msg.reply("La conexion se ha cerrado de manera inesperada, intentaremos reconectar...");
          } else if (disconnectCode === DisconnectReason.connectionLost) {
            await initSubBot();
            return console.log("\nConexion perdida con el servidor, reconectando....");
          } else if (disconnectCode === DisconnectReason.badSession) {
            return await msg.reply(" La conexion se ha cerrado, deberia de conectarse manualmente usando el comando *.serbot* y reescanear el nuevo *QR.* Que fuÃ³ enviada la primera vez que se hizo *SubBot*");
          } else if (disconnectCode === DisconnectReason.timedOut) {
            await closeConnection(false);
            return console.log("\n Tiempo de conecion agotado, reconectando....");
          } else {
            console.log("\n Razon de la desconeccion desconocida: " + (disconnectCode || "") + " >> " + (connection || ""));
          }
        }

        if (global.db.data == null) {
          global.loadDatabase(); // Changed to global.loadDatabase()
        }

        if (connection == "open") {
          subBot.isInit = true;
          global.conns.push(subBot);
          await user.sendMessage(msg.chat, {
            text: args[0] ? " *Esta conectado(a)!! Por favor espere se esta¡ cargando los mensajes...*\n\n *Opciones Disponibles:*\n* " + usedPrefix + "pausarai _(Detener la funciÃ³n Sub Bot)_*\n*Â» " + usedPrefix + "deletesession _(Borrar todo rastro de Sub Bot)_*\n*Â» " + usedPrefix + "serbot _(Nuevo cÃ³digo QR o Conectarse si ya es Sub Bot)_*" : "*╭─❖ 「 ✅ CONEXIÓN EXITOSA 」 ❖─*\n│ 🥷💯 *¡Conexión exitosa al WhatsApp!*\n│ 🙌🔥 ¡Ahora eres parte del sistema!\n*╰───────────────────────────⬣*"
          }, { quoted: fkontak });
          if (!args[0]) {
          }
        }
      }

      setInterval(async () => {
        if (!subBot.user) {
          try {
            subBot.ws.close();
          } catch (error) {
            console.log(await updateHandler(true).catch(console.error));
          }
          subBot.ev.removeAllListeners();
          let index = global.conns.indexOf(subBot);
          if (index < 0) {
            return;
          }
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000);

      let handlerModule = await import("../handler.js");
      let updateHandler = async shouldReconnect => {
        try {
          const updatedModule = await import("../handler.js?update=" + Date.now()).catch(console.error);
          if (Object.keys(updatedModule || {}).length) {
            handlerModule = updatedModule;
          }
        } catch (error) {
          console.error(error);
        }
        if (shouldReconnect) {
          const chats = subBot.chats;
          try {
            subBot.ws.close();
          } catch {}
          subBot.ev.removeAllListeners();
          subBot = makeWASocket(config, { chats: chats });
          isConnected = true;
        }
        if (!isConnected) {
          subBot.ev.off("messages.upsert", subBot.handler);
          subBot.ev.off("connection.update", subBot.connectionUpdate);
          subBot.ev.off("creds.update", subBot.credsUpdate);
        }
        const currentTime = new Date();
        const lastEventTime = new Date(subBot.ev * 1000); // Assuming subBot.ev might be a timestamp
        if (currentTime.getTime() - lastEventTime.getTime() <= 300000) {
          console.log("Leyendo mensaje entrante:", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = false;
          });
        } else {
          console.log(subBot.chats, " Omitiendo mensajes en espera.", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = true;
          });
        }
        subBot.handler = handlerModule.handler.bind(subBot);
        subBot.connectionUpdate = handleConnectionUpdate.bind(subBot);
        subBot.credsUpdate = saveCreds.bind(subBot, true);
        subBot.ev.on("messages.upsert", subBot.handler);
        subBot.ev.on("connection.update", subBot.connectionUpdate);
        subBot.ev.on("creds.update", subBot.credsUpdate);
        isConnected = false;
        return true;
      };

      updateHandler(false);
    }

    initSubBot();
  });
};

handler.help = ["serbot", "serbot --code", "code"];
handler.tags = ["serbot"];
handler.command = ["jadibot", "serbot", "code"];

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function joinChannels(conn) {
  await conn.newsletterFollow("120363404100297632@newsletter")
  conn.newsletterFollow("120363404100297632@newsletter")
    }      if ((connection === 'close' || connection === 'error') && !connected) {
        recAtts++;
        const waitTime = Math.min(15000, 1000 * 2 ** recAtts);

        if (recAtts >= 3) {
          console.log(`🛑 Subbot "${folder}" falló tras 3 intentos. Eliminando carpeta.`);
          try {
            fs.rmSync(folderPath, { recursive: true, force: true });
          } catch (err) {
            console.error(`❌ Error al eliminar carpeta de "${folder}":`, err);
          }
          return;
        }

        console.warn(`⚠️ Subbot "${folder}" desconectado (Intento ${recAtts}/3). Reintentando en ${waitTime / 1000}s...`);

        setTimeout(async () => {
          try {
            conn.ws.close();
            conn.ev.removeAllListeners();
            conn = makeWASocket(connectionOptions);
            let handler = await import("../handler.js"); // Import handler here
            conn.handler = handler.handler.bind(conn);
            conn.connectionUpdate = connectionUpdate.bind(conn);
            conn.credsUpdate = saveCreds.bind(conn, true);
            conn.ev.on('messages.upsert', conn.handler);
            conn.ev.on('connection.update', conn.connectionUpdate);
            conn.ev.on('creds.update', conn.credsUpdate);
            await creloadHandler(false);
          } catch (err) {
            console.error(`❌ Error al reintentar conexión con "${folder}":`, err);
          }
        }, waitTime);
      }

      if (code === DisconnectReason.loggedOut) {
        console.log(`📤 Subbot "${folder}" cerró sesión. Eliminando carpeta.`);
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
    }

    let handler = await import("../handler.js");

    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }

      if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("connection.update", conn.connectionUpdate);
        conn.ev.off("creds.update", conn.credsUpdate);
      }

      conn.handler = handler.handler.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);
      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("connection.update", conn.connectionUpdate);
      conn.ev.on("creds.update", conn.credsUpdate);

      isInit = false;
      return true;
    }

    await creloadHandler(false);
  }

  console.log(`\n✅ Subbots conectados correctamente: ${totalC} / ${serbotFolders.length}`);
}
loadSubbots().catch(console.error);

let handler = async (msg, { conn, args, usedPrefix, command, isOwner }) => {
  if (!global.db.data.settings[conn.user.jid].jadibotmd) {
    return conn.reply(msg.chat, "*Este comando esta deshabilitado por mi creador Bajo Bots.*", msg, global.rcanal); // Changed rcanal to global.rcanal
  }

  if (global.conns.length >= MAX_SUBBOTS) {
    return conn.reply(msg.chat, `*Lo siento se ah alcanzado el limite de ${MAX_SUBBOTS} subbots. Por favor, intenta mas tarde.*`, msg, global.rcanal); // Changed rcanal to global.rcanal
  }

  let user = conn;
  const isCode = command === "code" || (args[0] && /(--code|code)/.test(args[0].trim()));
  let code;
  let pairingCode;
  let qrMessage;
  let userData = global.db.data.users[msg.sender];
  let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
  let userName = "" + userJid.split`@`[0];

  if (isCode) {
    args[0] = args[0]?.replace(/^--code$|^code$/, "").trim() || undefined;
    if (args[1]) {
      args[1] = args[1].replace(/^--code$|^code$/, "").trim();
    }
  }

  if (!fs.existsSync("./" + global.jadi + "/" + userName)) { // Changed to global.jadi
    fs.mkdirSync("./" + global.jadi + "/" + userName, { recursive: true }); // Changed to global.jadi
  }

  if (args[0] && args[0] != undefined) {
    fs.writeFileSync("./" + global.jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")); // Changed to global.jadi
  } else {
    "";
  }

  if (fs.existsSync("./" + global.jadi + "/" + userName + "/creds.json")) { // Changed to global.jadi
    let creds = JSON.parse(fs.readFileSync("./" + global.jadi + "/" + userName + "/creds.json")); // Changed to global.jadi
    if (creds) {
      if (creds.registered === false) {
        fs.unlinkSync("./" + global.jadi + "/" + userName + "/creds.json"); // Changed to global.jadi
      }
    }
  }

  const execCommand = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(execCommand.toString("utf-8"), async (error, stdout, stderr) => {
    const secret = Buffer.from(drm1 + drm2, "base64");

    async function initSubBot() {
      let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
      let userName = "" + userJid.split`@`[0];

      if (!fs.existsSync("./" + global.jadi + "/" + userName)) { // Changed to global.jadi
        fs.mkdirSync("./" + global.jadi + "/" + userName, { recursive: true }); // Changed to global.jadi
      }

      if (args[0]) {
        fs.writeFileSync("./" + global.jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")); // Changed to global.jadi
      } else {
        "";
      }

      let { version, isLatest } = await fetchLatestBaileysVersion();
      const msgRetry = msgRetry => {};
      const cache = new nodeCache();
      const { state, saveState, saveCreds } = await useMultiFileAuthState("./" + global.jadi + "/" + userName); // Changed to global.jadi

      const config = {
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        msgRetry: msgRetry,
        msgRetryCache: cache,
        version: [2, 3000, 1023223821],
        syncFullHistory: true,
        browser: isCode ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["${botname} (Sub Bot)", "Chrome", "2.0.0"],
        defaultQueryTimeoutMs: undefined,
        getMessage: async msgId => {
          if (global.store) {} // Changed to global.store
          return {
            conversation: "${botname}Bot-MD"
          };
        }
      };

      let subBot = makeWASocket(config);
      subBot.isInit = false;
      let isConnected = true;

      async function handleConnectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;
        if (isNewLogin) {
          subBot.isInit = false;
        }
        if (qr && !isCode) {
          qrMessage = await user.sendMessage(msg.chat, {
            image: await qrcode.toBuffer(qr, { scale: 8 }),
            caption: rtx,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
          return;
        }
        if (qr && isCode) {
          code = await user.sendMessage(msg.chat, {
            image: { url: imgcode },
            caption: rtx2,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });

          await sleep(3000);
          pairingCode = await subBot.requestPairingCode(msg.sender.split`@`[0]);

          pairingCode = await user.sendMessage(msg.chat, {
            text: `\`\`\`${pairingCode}\`\`\``, // Only the code, no extra text
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363404100297632@newsletter',
                newsletterName: '𝐊𝐀𝐍𝐄𝐊𝐈 𝐁𝐎𝐓 𝐌𝐃',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        console.log(statusCode);

        const closeConnection = async shouldClose => {
          if (!shouldClose) {
            try {
              subBot.ws.close();
            } catch {}
            subBot.ev.removeAllListeners();
            let index = global.conns.indexOf(subBot);
            if (index < 0) {
              return;
            }
            delete global.conns[index];
            global.conns.splice(index, 1);
          }
        };

        const disconnectCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (connection === "close") {
          console.log(disconnectCode);
          if (disconnectCode == 405) {
            await fs.unlinkSync("./" + global.jadi + "/" + userName + "/creds.json"); // Changed to global.jadi
            return await msg.reply(" Reenvia nuevamente el comando.");
          }
          if (disconnectCode === DisconnectReason.restartRequired) {
            initSubBot();
            return console.log("\n Tiempo de conexion agotado, reconectando...");
          } else if (disconnectCode === DisconnectReason.loggedOut) {
            fs.rmdirSync(`./${global.jadi}/${userName}`, { recursive: true }); // Changed to global.jadi
            return msg.reply(" *Conexion perdida...*");
          } else if (disconnectCode == 428) {
            await closeConnection(false);
            return msg.reply("La conexion se ha cerrado de manera inesperada, intentaremos reconectar...");
          } else if (disconnectCode === DisconnectReason.connectionLost) {
            await initSubBot();
            return console.log("\nConexion perdida con el servidor, reconectando....");
          } else if (disconnectCode === DisconnectReason.badSession) {
            return await msg.reply(" La conexion se ha cerrado, deberia de conectarse manualmente usando el comando *.serbot* y reescanear el nuevo *QR.* Que fuÃ³ enviada la primera vez que se hizo *SubBot*");
          } else if (disconnectCode === DisconnectReason.timedOut) {
            await closeConnection(false);
            return console.log("\n Tiempo de conecion agotado, reconectando....");
          } else {
            console.log("\n Razon de la desconeccion desconocida: " + (disconnectCode || "") + " >> " + (connection || ""));
          }
        }

        if (global.db.data == null) {
          global.loadDatabase(); // Changed to global.loadDatabase()
        }

        if (connection == "open") {
          subBot.isInit = true;
          global.conns.push(subBot);
          await user.sendMessage(msg.chat, {
            text: args[0] ? " *Esta conectado(a)!! Por favor espere se esta¡ cargando los mensajes...*\n\n *Opciones Disponibles:*\n* " + usedPrefix + "pausarai _(Detener la funciÃ³n Sub Bot)_*\n*Â» " + usedPrefix + "deletesession _(Borrar todo rastro de Sub Bot)_*\n*Â» " + usedPrefix + "serbot _(Nuevo cÃ³digo QR o Conectarse si ya es Sub Bot)_*" : "*╭─❖ 「 ✅ CONEXIÓN EXITOSA 」 ❖─*\n│ 🥷💯 *¡Conexión exitosa al WhatsApp!*\n│ 🙌🔥 ¡Ahora eres parte del sistema!\n*╰───────────────────────────⬣*"
          }, { quoted: fkontak });
          if (!args[0]) {
          }
        }
      }

      setInterval(async () => {
        if (!subBot.user) {
          try {
            subBot.ws.close();
          } catch (error) {
            console.log(await updateHandler(true).catch(console.error));
          }
          subBot.ev.removeAllListeners();
          let index = global.conns.indexOf(subBot);
          if (index < 0) {
            return;
          }
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000);

      let handlerModule = await import("../handler.js");
      let updateHandler = async shouldReconnect => {
        try {
          const updatedModule = await import("../handler.js?update=" + Date.now()).catch(console.error);
          if (Object.keys(updatedModule || {}).length) {
            handlerModule = updatedModule;
          }
        } catch (error) {
          console.error(error);
        }
        if (shouldReconnect) {
          const chats = subBot.chats;
          try {
            subBot.ws.close();
          } catch {}
          subBot.ev.removeAllListeners();
          subBot = makeWASocket(config, { chats: chats });
          isConnected = true;
        }
        if (!isConnected) {
          subBot.ev.off("messages.upsert", subBot.handler);
          subBot.ev.off("connection.update", subBot.connectionUpdate);
          subBot.ev.off("creds.update", subBot.credsUpdate);
        }
        const currentTime = new Date();
        const lastEventTime = new Date(subBot.ev * 1000); // Assuming subBot.ev might be a timestamp
        if (currentTime.getTime() - lastEventTime.getTime() <= 300000) {
          console.log("Leyendo mensaje entrante:", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = false;
          });
        } else {
          console.log(subBot.chats, " Omitiendo mensajes en espera.", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = true;
          });
        }
        subBot.handler = handlerModule.handler.bind(subBot);
        subBot.connectionUpdate = handleConnectionUpdate.bind(subBot);
        subBot.credsUpdate = saveCreds.bind(subBot, true);
        subBot.ev.on("messages.upsert", subBot.handler);
        subBot.ev.on("connection.update", subBot.connectionUpdate);
        subBot.ev.on("creds.update", subBot.credsUpdate);
        isConnected = false;
        return true;
      };

      updateHandler(false);
    }

    initSubBot();
  });
};

handler.help = ["serbot", "serbot --code", "code"];
handler.tags = ["serbot"];
handler.command = ["jadibot", "serbot", "code"];

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function joinChannels(conn) {
  await conn.newsletterFollow("120363402097425674@newsletter")
  conn.newsletterFollow("120363402097425674@newsletter")
  }
