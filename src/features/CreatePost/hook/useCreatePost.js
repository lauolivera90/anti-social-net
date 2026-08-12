import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { createPost } from '@/entities/post';

export const useCreatePost = () => {
  const [inputText, setInputText] = useState("");
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useAuth();

  const cleanInputs = () => {
    setInputText("");
    setImages([]);
    setSelectedTags([]);
  };

  const handlePost = async () => {
    setIsLoading(true);
    try {
      await createPost({
        user: usuario._id,
        description: inputText,
        image: images.map(img => (typeof img === 'string' ? { url: img } : img)),
        tag: selectedTags,
      });
      cleanInputs();
    } catch (error) {
      console.error("Failed to create post:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputText, setInputText,
    images, setImages,
    selectedTags, setSelectedTags,
    handlePost, isLoading,
    canPost: inputText.trim().length > 0 && inputText.length <= 240
  };
};