import { useState, useEffect } from 'react';
import { updatePost } from '@/entities/post';

export const useUpdatePost = (initialPost) => {
  const [inputText, setInputText] = useState('');
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializa el estado del formulario con los datos del post cuando esté disponible
  useEffect(() => {
    if (initialPost) {
      setInputText(initialPost.description || '');
      setImages((initialPost.image || []).map(img => img?.url || img));
      setSelectedTags(initialPost.tag || []);
    }
  }, [initialPost]);

  const canUpdate = inputText.trim().length > 0 && inputText.trim().length <= 240;

  const handleUpdate = async () => {
    if (!canUpdate || !initialPost?._id) return;

    setIsLoading(true);
    setError(null);

    const postData = {
      description: inputText,
      image: images.map(img => (typeof img === 'string' ? { url: img } : img)),
      tag: selectedTags.map(t => t._id || t), // Enviar solo los IDs de forma segura
    };

    try {
      const updatedPost = await updatePost(initialPost._id, postData);
      return updatedPost; // Devuelve el post actualizado en caso de éxito
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el post.');
      throw err; // Vuelve a lanzar el error para que el componente lo capture
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputText, setInputText,
    images, setImages,
    selectedTags, setSelectedTags,
    isLoading,
    error,
    canUpdate,
    handleUpdate,
  };
};
