const fs = require('fs');
const path = require('path');
const { exec} = require('child_process');

const pluginsPath = '/home/container/plugins';
const filePath = path.join(pluginsPath, 'init.txt'); // Archivo que se creará

// Paso 1: Verifica si la carpeta existe
if (!fs.existsSync(pluginsPath)) {
  fs.mkdirSync(pluginsPath);
  console.log('📁 Carpeta "plugins" creada correctamente.');
} else {
  console.log('✅ La carpeta "plugins" ya existe.');
}

// Paso 2: Crea un archivo dentro de /plugins
try {
  fs.writeFileSync(filePath, 'Archivo inicial creado por mkdir.js');
  console.log(`📄 Archivo "${filePath}" creado exitosamente.`);
} catch (err) {
  console.error('❌ Error al crear el archivo:', err);
}

// Paso 3: Ejecuta el index.js para continuar
exec('node index.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`⚠️ Error al ejecutar index.js: ${error.message}`);
    return;
}
  if (stderr) {
    console.error(`🔧 stderr: ${stderr}`);
    return;
}
  console.log(`🚀 index.js ejecutado correctamente:\n${stdout}`);
});
