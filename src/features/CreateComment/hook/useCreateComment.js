import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { createComment } from '@/entities/comment/api/commentApi';

export const useCreateComment = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useAuth();

  const cleanInputs = () => {
    setInputText("");
  };

  const handleCommentSubmit = async ({ postId, onCommentAdded }) => {
    if (inputText.trim().length === 0) return;
    
    setIsLoading(true);
    try {
      await createComment({
        postId,
        userId: usuario._id,
        text: inputText,
      });
      cleanInputs();
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error("Error creating comment:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputText, setInputText,
    isLoading, handleCommentSubmit,
    canComment: inputText.trim().length > 0 && inputText.length <= 240,
  };
};