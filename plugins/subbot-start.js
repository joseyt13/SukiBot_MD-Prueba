import fs from 'fs';

const subbotConfig = async (conn) => {
  try {
    const profilePicUrl = 'https://files.catbox.moe/rkvuzb.jpg';
    const statusText = 'Suki_Bot-MD by Dev_fedexyz.13';

    // 🖼️ Cambiar foto de perfil
    await conn.updateProfilePicture(conn.user.id, { url: profilePicUrl});

    // 📝 Cambiar estado del perfil
    await conn.updateProfileStatus(statusText);

    console.log('[Suki_Bot_MD] Perfil de subbot actualizado con éxito 🌸');
} catch (e) {
    console.warn('[Suki_Bot_MD] No se pudo actualizar el perfil del subbot:', e.message);
}
};

// 🩵 Detectar cuando un subbot inicia sesión
export async function connectionUpdate(update, conn) {
  const { isNewLogin} = update;

  if (isNewLogin && conn.user?.id && conn.isLoggedIn) {
    await subbotConfig(conn);
}
}
