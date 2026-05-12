import { useState, useEffect } from 'react';
import { updateComment } from '@/entities/comment'; // Asegúrate de tener esta función en tu API de comment

export const useUpdateComment = (initialComment) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializamos el texto con los datos del comentario proporcionado
  useEffect(() => {
    if (initialComment) {
      setInputText(initialComment.description || initialComment.text || '');
    }
  }, [initialComment]);

  const originalText = initialComment?.description || initialComment?.text || '';
  const canUpdate = inputText.trim().length > 0 && inputText.trim() !== originalText && inputText.trim().length <= 240;

  const handleUpdate = async () => {
    if (!canUpdate || !initialComment?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedComment = await updateComment(initialComment._id, {
        text: inputText, // Usamos text que es el estándar de tus comentarios
        description: inputText, // Lo enviamos también por retrocompatibilidad
      });
      return updatedComment;
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el comentario.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputText, setInputText,
    isLoading, error,
    canUpdate, handleUpdate,
  };
};