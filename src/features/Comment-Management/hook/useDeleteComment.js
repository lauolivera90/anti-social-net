import { useState } from 'react';
import { deleteComment } from '@/entities/comment';

export const useDeleteComment = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteComment = async (commentId, onSuccess) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteComment(commentId);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al eliminar el comentario:", err);
      setError(err.message || 'No se pudo eliminar el comentario.');
      alert('Hubo un error al intentar eliminar el comentario. Por favor, intenta de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDeleteComment, isDeleting, error };
};