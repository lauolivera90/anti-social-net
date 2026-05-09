const BASE_URL = "https://antisocialnet-backend.onrender.com/user";

/**
 * Obtiene un usuario específico por su ID.
 * @param {string} userId - El ID del usuario a obtener.
 * @returns {Promise<object>} El objeto del usuario.
 */
export const getUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}/${userId}`);
  if (!response.ok) {
    throw new Error("Error de red al cargar el usuario");
  }
  return await response.json();
};

/**
 * Actualiza la información de un usuario.
 * @param {string} userId - El ID del usuario a actualizar.
 * @param {object} userData - Los datos a actualizar (ej. { nickname, mail }).
 * @returns {Promise<object>} El usuario actualizado.
 */
export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Error al actualizar la información del usuario");
  return await response.json();
};

/**
 * Elimina un usuario específico por su ID.
 * @param {string} userId - El ID del usuario a eliminar.
 * @returns {Promise<object>} La respuesta de la eliminación.
 */
export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el usuario");
  return await response.json();
};