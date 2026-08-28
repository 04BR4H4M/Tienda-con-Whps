const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Valida un archivo antes de subirlo a Storage. El atributo accept="image/*"
 * del <input> es solo una sugerencia del navegador — cualquiera puede
 * saltárselo fácilmente, así que esta validación real ocurre en JS antes de
 * llamar a Supabase (además de las políticas de Storage, que ya restringen
 * quién puede subir algo, pero no qué tipo de archivo es).
 *
 * Devuelve un string con el error, o null si el archivo es válido.
 */
export function validateImageFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Solo se permiten imágenes JPG, PNG, WEBP o GIF.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "La imagen no puede pesar más de 5 MB.";
  }
  return null;
}
