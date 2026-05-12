const BASE_URL = "https://antisocialnet-backend.onrender.com/tag";

/**
 * Obtiene todas las etiquetas.
 * @returns {Promise<Array<object>>} Un array de etiquetas.
 */
export const getTags = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error de red al cargar las etiquetas");
  }
  return await response.json();
};