const BASE_URL = "https://antisocialnet-backend.onrender.com";

export const createComment = async ({ postId, userId, text }) => {
  const response = await fetch(`${BASE_URL}/comment`, {
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
  const response = await fetch(`${BASE_URL}/comment/${commentId}`, {
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
  const response = await fetch(`${BASE_URL}/comment`);
  if (!response.ok) {
    throw new Error("Error de red al cargar los comentarios del usuario");
  }
  const data = await response.json();
  return data.filter(
    (comment) => comment.user && comment.user._id === userId
  );
};