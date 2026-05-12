const BASE_URL = "https://antisocialnet-backend.onrender.com/post";

/**
 * Crea un nuevo post en el servidor.
 * @param {object} postData - Los datos del post a crear.
 * @param {string} postData.user - El ID del usuario.
 * @param {string} postData.description - El texto del post.
 * @param {Array<string>} postData.image - Array de URLs de imágenes.
 * @param {Array<string>} postData.tag - Array de IDs de tags.
 * @returns {Promise<object>} El post recién creado.
 */

export const createPost = async (postData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Error al publicar el post");
  return await response.json();
};

/**
 * Obtiene los posts. Puede ser filtrado por etiqueta.
 * @param {object} [filters] - Opciones de filtrado.
 * @param {string} [filters.tagId] - El ID de la etiqueta para filtrar los posts.
 * @returns {Promise<Array<object>>} Un array de posts.
 */
export const getPosts = async ({ tagId } = {}) => {
  let url = BASE_URL;
  if (tagId) {
    const params = new URLSearchParams({ tagId });
    url = `${url}?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error de red al cargar los posts");
  }
  return await response.json();
};

/**
 * Obtiene un post específico por su ID.
 * @param {string} postId - El ID del post a obtener.
 * @returns {Promise<object>} El objeto del post.
 */
export const getPostById = async (postId) => {
  const response = await fetch(`${BASE_URL}/${postId}`);
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor. Ver detalle: ' + response.status);
  }
  return await response.json();
};

/**
 * Obtiene todos los posts de un usuario específico por su nickname.
 * @param {string} nickname - El nickname del usuario.
 * @returns {Promise<Array<object>>} Un array de posts del usuario.
 */
export const getPostsByNickname = async (nickname) => {
  // Se ajusta para usar el endpoint documentado: GET /post/user/:nickname
  const response = await fetch(`${BASE_URL}/user/${nickname}`);
  if (!response.ok) {
    throw new Error("Error de red al cargar los posts del usuario");
  }
  return await response.json();
};

/**
 * Elimina un post específico por su ID.
 * @param {string} postId - El ID del post a eliminar.
 * @returns {Promise<object>} La respuesta de la eliminación.
 */
export const deletePost = async (postId) => {
  const response = await fetch(`${BASE_URL}/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Error al eliminar el post ${postId}`);
  return await response.json();
};

/**
 * Actualiza un post existente.
 * @param {string} postId - El ID del post a actualizar.
 * @param {object} postData - Los datos a actualizar.
 * @returns {Promise<object>} El post actualizado.
 */
export const updatePost = async (postId, postData) => {
  const response = await fetch(`${BASE_URL}/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Error al actualizar el post");
  return await response.json();
};
