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

/**
 * Crea un nuevo usuario (registro).
 * @param {object} userData - Datos del nuevo usuario.
 * @param {string} userData.nickname
 * @param {string} userData.mail
 * @param {string} userData.password
 * @returns {Promise<object>} El usuario recién creado.
 */
export const createUser = async (userData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  // El backend debería devolver un error 409 (Conflict) si el usuario ya existe.
  if (!response.ok) throw new Error("Error al registrar el usuario. Es posible que el email o nickname ya estén en uso.");
  return await response.json();
};

/**
 * Autentica a un usuario.
 * @param {object} credentials - Credenciales del usuario.
 * @param {string} credentials.nickname
 * @param {string} credentials.password
 * @returns {Promise<object>} El objeto del usuario autenticado.
 */
export const loginUser = async (credentials) => {
  // Asumimos que el backend tiene un endpoint específico para login
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Usuario o contraseña incorrectos.");
  return await response.json();
};