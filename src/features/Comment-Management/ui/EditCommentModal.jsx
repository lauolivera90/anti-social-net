import { useRef, useState, useEffect } from 'react';
import { ModalCustom, Button, Input } from '@/widget/ui';
import { useConfirmClose } from '@/shared/hook';
import { Emoji, CharCounter } from '@/shared/ui';
import { useUpdateComment } from '../hook/useUpdateComment';

export const EditCommentModal = ({ show, handleClose, comment, onCommentUpdated }) => {
  const textareaRef = useRef(null);
  const [initialData, setInitialData] = useState({
    // Utilizamos fallback por si la api devuelve `text` o `description`
    description: comment?.description || comment?.text || '',
  });

  const {
    inputText, setInputText,
    isLoading,
    canUpdate,
    handleUpdate,
  } = useUpdateComment(comment);

  useEffect(() => {
    if (show) {
      setInitialData({
        description: comment?.description || comment?.text || '',
      });

      // Ajustar la altura del textarea para que muestre el texto completo al abrir
      setTimeout(() => {
        const el = textareaRef.current;
        if (el) {
          el.style.height = 'auto';
          el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
          el.style.overflowY = el.scrollHeight > 300 ? 'scroll' : 'hidden';
        }
      }, 50);
    }
  }, [show, comment]);

  const cleanInputs = () => {
    setInputText(comment?.description || comment?.text || '');
  };

  const close = useConfirmClose(
    { description: inputText },
    initialData,
    handleClose,
    cleanInputs
  );

  const handleTextChange = (e) => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
      el.style.overflowY = el.scrollHeight > 300 ? 'scroll' : 'hidden';
    }
    setInputText(e.target.value);
  };

  const onSave = async () => {
    try {
      await handleUpdate();
      if (onCommentUpdated) onCommentUpdated();
      handleClose();
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
      alert("No se pudo guardar el comentario. Inténtalo de nuevo.");
    }
  };

  return (
    <ModalCustom
      show={show}
      onHide={close}
      variant="slate"
      title="Editar comentario"
      isLoading={isLoading}
      scrollable
      showCloseButton={false}
      footerActions={
        <div className="d-flex align-items-center justify-content-between flex-grow-1 ms-2">
          <div className="d-flex gap-0 align-items-center text-white">
            <Emoji setInputText={setInputText} />
          </div>
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <CharCounter text={inputText} />
            <Button onClick={onSave} disabled={!canUpdate || isLoading} className="px-3 px-sm-4">
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="px-1">
        <Input
          ref={textareaRef}
          as="textarea"
          value={inputText}
          onChange={handleTextChange}
          placeholder="Edita tu respuesta"
          rows={3}
          className="mb-0"
          style={{ resize: 'none' }}
          classNameControl="bg-dark border-0 fs-5 shadow-none text-light custom-placeholder"
        />
      </div>
    </ModalCustom>
  );
};