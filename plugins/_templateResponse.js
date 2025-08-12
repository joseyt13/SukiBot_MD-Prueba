/**
 * @type {import('@whiskeysockets/baileys')}
 */
const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = (await import('@whiskeysockets/baileys')).default;

export async function all(m, chatUpdate) {
  if (m.isBaileys ||!m.message) return;

  // Detectar tipo de mensaje interactivo
  const interactiveMsg =
    m.message.buttonsResponseMessage ||
    m.message.templateButtonReplyMessage ||
    m.message.listResponseMessage ||
    m.message.interactiveResponseMessage;

  if (!interactiveMsg) return;

  let id = null;

  try {
    const { buttonsResponseMessage, templateButtonReplyMessage, listResponseMessage, interactiveResponseMessage} = m.message;

    if (buttonsResponseMessage) {
      id = buttonsResponseMessage.selectedButtonId;
} else if (templateButtonReplyMessage) {
      id = templateButtonReplyMessage.selectedId;
} else if (listResponseMessage) {
      id = listResponseMessage.singleSelectReply?.selectedRowId;
} else if (interactiveResponseMessage) {
      const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson || '{}';
      const params = JSON.parse(paramsJson);
      id = params.id || params.cmd || params.command || null;
}
} catch {
    return;
}

  if (!id) return;

  // Obtener texto visible del botón
  const text =
    m.message.buttonsResponseMessage?.selectedDisplayText ||
    m.message.templateButtonReplyMessage?.selectedDisplayText ||
    m.message.listResponseMessage?.title ||
    '';

  let isIdMessage = false;

  for (const name in global.plugins) {
    const plugin = global.plugins[name];
    if (!plugin || plugin.disabled) continue;
    if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;
    if (typeof plugin!== 'function' ||!plugin.command) continue;

    const escapeRegex = (str) =>
      typeof str === 'string'? str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'): '';

    const customPrefix = plugin.customPrefix || this.prefix || global.prefix || '.';
    const prefixes = Array.isArray(customPrefix)? customPrefix: [customPrefix];

    for (const p of prefixes) {
      const prefixRegex = p instanceof RegExp? p: new RegExp(`^${escapeRegex(p)}`);
      if (!prefixRegex.test(id)) continue;

      const noPrefix = id.replace(prefixRegex, '').trim();
      const [command] = noPrefix.split(/\s+/);
      const cmd = (command || '').toLowerCase();

      const matchCommand = (pluginCommand) => {
        if (pluginCommand instanceof RegExp) return pluginCommand.test(cmd);
        if (Array.isArray(pluginCommand)) return pluginCommand.some(c => c instanceof RegExp? c.test(cmd): c === cmd);
        return pluginCommand === cmd;
};

      if (matchCommand(plugin.command)) {
        isIdMessage = true;
        break;
}
}

    if (isIdMessage) break;
}

  if (!isIdMessage) return;

  // Generar mensaje simulado
  const messages = await generateWAMessage(
    m.chat,
    { text: id, mentions: m.mentionedJid},
    {
      userJid: this.user.id,
      quoted: m.quoted?.fakeObj
}
);

  messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
  messages.key.id = m.key.id;
  messages.pushName = m.name;

  if (m.isGroup) {
    messages.key.participant = messages.participant = m.sender;
}

  const msg = {
...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)].map(v => ((v.conn = this), v)),
    type: 'append'
};

  this.ev.emit('messages.upsert', msg);
}
