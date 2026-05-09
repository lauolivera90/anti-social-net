import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Input } from '@/widget/ui';
import { ImageGrid, Emoji } from '@/shared/ui'; // Importamos la nueva entidad   // El botón de cámara refactorizado
import { TagBadge } from '@/entities/tag';
import { useCreatePost } from '@/features/CreatePost/hook';
import { SelectTagsAction, AddImageAction } from '@/features/CreatePost/ui'; // Nueva feature de selección

export function PostForm() {
  const [isFocused, setIsFocused] = useState(false);  
  const textareaRef = useRef(null);
  
  const { 
    inputText, setInputText, 
    images, setImages, 
    selectedTags, setSelectedTags,
    handlePost, isLoading, canPost 
  } = useCreatePost();

  const handleTextChange = (e) => {
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    el.style.overflowY = el.scrollHeight > 200 ? 'scroll' : 'hidden';
    setInputText(e.target.value);
  };

  const charCountColor = inputText.length > 2200 ? 'text-danger' : 'text-white';

  return (
    <Container fluid className="bg-black border-bottom border-dark text-white p-4">
      {/* 1. ACCIONES SUPERIORES (Se activan al hacer focus) */}
      {isFocused && (
        <Row className="align-items-center mb-3">
          <Col xs="auto" className="d-flex gap-3 align-items-center">
            {/* Feature de Imágenes */}
            <AddImageAction images={images} setImages={setImages} />
            
            {/* Feature de Emojis */}
            <Emoji setInputText={setInputText} />
            
            {/* Feature de Tags (Selección) */}
            <SelectTagsAction 
              selectedTags={selectedTags} 
              setSelectedTags={setSelectedTags} 
            />
          </Col>
          
          <Col className="text-end">
            <span className={`me-2 small ${charCountColor}`}>
              {inputText.length > 0 && (inputText.length > 2200 ? `-${inputText.length}` : inputText.length)}
            </span>
            <Button onClick={handlePost} disabled={!canPost || isLoading} className="rounded-pill px-4 fw-bold">
              {isLoading ? 'Publicando...' : 'Postear'}
              
            </Button>
          </Col>
        </Row>
      )}

      <Input
          ref={textareaRef}
          as="textarea"
          value={inputText}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          placeholder="¿En qué estás pensando?"
          rows={isFocused ? 3 : 1} // Dinámico según el foco
          className="mb-3" // Estilo para el contenedor (Form.Group)
          // Estilos directos al Form.Control mediante la prop de control
          classNameControl={`bg-black border-0 fs-5 shadow-none text-light
          }`}
        />

      <div className="d-flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <TagBadge key={tag._id} name={tag.name} />
        ))}
      </div>

      {/* 4. PREVISUALIZACIÓN DE IMÁGENES (Usando la Entidad ImageGrid) */}
      <ImageGrid 
        images={images} 
        onRemove={(url) => setImages(prev => prev.filter(img => img.url !== url))} 
      />
    </Container>
  );
}