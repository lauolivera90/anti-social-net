import { useRef, useState, useEffect } from 'react';
import { ModalCustom, Button, Input } from '@/widget/ui';
import { ImageGrid, Emoji, CharCounter } from '@/shared/ui';
import { SelectTagsAction, AddImageAction } from '@/features/CreatePost/ui';
import { TagBadge } from '@/entities/tag';
import { useUpdatePost } from '@/features/Post-Management/hook';
import { useConfirmClose } from '@/shared/hook';

export const EditPostModal = ({ show, handleClose, post, onPostUpdated }) => {
  const textareaRef = useRef(null);
  const [initialData, setInitialData] = useState({
    description: post?.description || '',
    tags: JSON.stringify((post?.tag || []).map(t => t._id || t).sort()),
    images: JSON.stringify((post?.image || []).map(i => i.url || i).sort()),
  });
  const {
    inputText, setInputText,
    images, setImages,
    selectedTags, setSelectedTags,
    isLoading,
    canUpdate,
    handleUpdate,
  } = useUpdatePost(post);

  // Captura el estado inicial del post solo cuando se abre el modal.
  // Esto crea un "snapshot" estable para la comparación.
  useEffect(() => {
    if (show) {
      setInitialData({
        description: post?.description || '',
        tags: JSON.stringify((post?.tag || []).map(t => t._id || t).sort()),
        images: JSON.stringify((post?.image || []).map(i => i.url || i).sort()),
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
  }, [show, post]);

  const cleanInputs = () => {
    setInputText(post?.description || '');
    setSelectedTags(post?.tag || []);
    setImages(post?.image || []);
  };

  // Hook para confirmar el cierre si hay cambios sin guardar
  const close = useConfirmClose(
    // Datos actuales del formulario
    {
      description: inputText,
      tags: JSON.stringify(selectedTags.map(t => t._id || t).sort()),
      images: JSON.stringify(images.map(i => i.url || i).sort()),
    },
    initialData, // Comparamos contra el "snapshot" del estado inicial
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
      const updatedPost = await handleUpdate();
      if (onPostUpdated) onPostUpdated(updatedPost);
      handleClose();
    } catch (error) {
      console.error("Error al guardar el post:", error);
      alert("No se pudo guardar la publicación. Inténtalo de nuevo.");
    }
  };

  return (
    <ModalCustom
      show={show}
      onHide={close}
      variant="slate"
      title="Editar publicación"
      isLoading={isLoading}
      scrollable
      showCloseButton={false}
      footerActions={
        <div className="d-flex align-items-center justify-content-between flex-grow-1 ms-2">
          <div className="d-flex gap-0 align-items-center text-white">
            <AddImageAction images={images} setImages={setImages} />
            {/* Nota: Aplica la misma refactorización al componente Emoji si también usa tu DropDown */}
            <Emoji setInputText={setInputText} />
            <SelectTagsAction selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
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
          placeholder="¿En qué estás pensando?"
          rows={5}
          className="mb-0"
          style={{ resize: 'none' }}
          classNameControl="bg-dark border-0 fs-5 shadow-none text-light custom-placeholder"
        />
        <div className="d-flex flex-wrap gap-2 my-3">
          {selectedTags.map(tag => <TagBadge key={tag._id} name={tag.name} className="fs-5" />)}
        </div>
        {/* Corrección para que el remove detecte correctamente imágenes que son strings u objetos */}
        <ImageGrid images={images} onRemove={(urlToRemove) => setImages(prev => prev.filter(img => (img.url || img) !== urlToRemove))} />
      </div>
    </ModalCustom>
  );
};
