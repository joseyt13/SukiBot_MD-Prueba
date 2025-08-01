const codigosBloqueados = [
  '+20',   // Egipto
  '+212',  // Marruecos
  '+213',  // Argelia
  '+216',  // Túnez
  '+218',  // Libia
  '+971',  // Emiratos Árabes Unidos
  '+966',  // Arabia Saudita
  '+965',  // Kuwait
  '+962',  // Jordania
  '+964',  // Irak
  '+973',  // Bahréin
  '+974',  // Catar
  '+968',  // Omán
  '+963',  // Siria
  '+961',  // Líbano
  '+967',  // Yemen
  '+981',  // Irán (aunque no es árabe, puede incluirse si lo deseas)
];

export async function before(m) {
  const sender = m.sender;

  // Verifica si el número tiene un prefijo bloqueado
  const bloqueado = codigosBloqueados.some(prefijo => sender.startsWith(prefijo));

  if (bloqueado) {
    await m.reply(`🚫 *Lo siento, no tienes permiso para usar comandos de SukiBot_MD.*\n🌐 Tu región está restringida para este servicio.`);
    return true; // Detiene el comando
}

  return false; // Permite continuar
}
