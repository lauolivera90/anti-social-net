const BASE_URL = "https://antisocialnet-backend.onrender.com/comment";

export const createComment = async ({ postId, userId, text }) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: postId,
      user: userId,
      text: text,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al publicar el comentario");
  }

  return await response.json();
};

/**
 * Elimina un comentario específico por su ID.
 * @param {string} commentId - El ID del comentario a eliminar.
 * @returns {Promise<object>} La respuesta de la eliminación.
 */
export const deleteComment = async (commentId) => {
  const response = await fetch(`${BASE_URL}/${commentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar el comentario ${commentId}`);
  }
  return await response.json();
};

/**
 * Obtiene todos los comentarios de un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array<object>>} Un array de comentarios del usuario.
 */
export const getCommentsByUserId = async (userId) => {
  // Pedimos al backend que nos de solo los comentarios de este usuario
  const response = await fetch(`${BASE_URL}?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Error de red al cargar los comentarios del usuario");
  }
  return await response.json();
};

/**
 * Obtiene los comentarios. Puede ser filtrado por usuario.
 * @param {object} [filters] - Opciones de filtrado.
 * @param {string} [filters.userId] - El ID del usuario para filtrar los comentarios.
 * @returns {Promise<Array<object>>} Un array de comentarios.
 */
export const getComments = async ({ userId } = {}) => {
  let url = BASE_URL;
  if (userId) {
    const params = new URLSearchParams({ userId });
    url = `${url}?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error de red al cargar los comentarios");
  }
  return await response.json();
};