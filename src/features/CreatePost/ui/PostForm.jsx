import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Input } from '@/widget/ui';
import { ImageGrid, Emoji } from '@/shared/ui';
import { useCreatePost } from '@/features/CreatePost/hook';
import { SelectTagsAction, AddImageAction } from '@/features/CreatePost/ui'; // Nueva feature de selección
import {TagBadge} from '@/entities/tag/ui/TagBadge';
import { CharCounter } from '@/shared/ui';

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

  return (
    <Container fluid className="bg-black border-bottom border-dark text-white">
      <Row>
        <Col className="pt-4 px-5">
          <Input
              ref={textareaRef}
              as="textarea"
              value={inputText}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              placeholder="¿En qué estás pensando?"
              rows={1} // Se expandirá automáticamente con el texto
              className="mb-0" // Estilo para el contenedor (Form.Group)
              style={{ resize: 'none' }}
              // Estilos directos al Form.Control mediante la prop de control
              classNameControl={`bg-black border-0 fs-5 shadow-none text-light custom-placeholder`}
            />

            <div className='px-3'>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {selectedTags.map(tag => (
                  <TagBadge key={tag._id} name={tag.name} className={"fs-5"} />
                ))}
              </div>

              {/* 4. PREVISUALIZACIÓN DE IMÁGENES (Usando la Entidad ImageGrid) */}
              <ImageGrid 
                images={images} 
                onRemove={(url) => setImages(prev => prev.filter(img => img.url !== url))} 
              />
            </div>

          {isFocused && (
            <div className='border-bottom border-dark pt-4 transition-all'></div>
          )}

          <div className='px-3 mt-2'>


            {/* 4. ACCIONES SUPERIORES (Se activan al hacer focus) */}
              <Row className="align-items-center mb-3">
                <Col xs="auto" className="d-flex gap-0 align-items-center">
                  <AddImageAction images={images} setImages={setImages} />
                  <Emoji setInputText={setInputText} />
                  <SelectTagsAction selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </Col>
                
                <Col className="text-end">
                  
                  <CharCounter condition={canPost} text={inputText} />

                  <Button onClick={handlePost} disabled={!canPost || isLoading} className="rounded-pill px-4 fw-bold">
                    {isLoading ? 'Publicando...' : 'Postear'}
                    
                  </Button>
                </Col>
              </Row>
          </div>
            
        </Col>
      </Row>
    </Container>
  );
}