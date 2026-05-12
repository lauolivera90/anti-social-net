import { useState } from 'react';
import { deletePost } from '@/entities/post';

export const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeletePost = async (postId, onSuccess) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deletePost(postId);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al eliminar el post:", err);
      setError(err.message || 'No se pudo eliminar el post.');
      alert('Hubo un error al intentar eliminar la publicación. Por favor, intenta de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDeletePost, isDeleting, error };
};