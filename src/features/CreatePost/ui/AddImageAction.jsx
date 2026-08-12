import { useState, useRef } from 'react';
import { DropDown, Input, Button } from '@/widget/ui';
import { useSmartDrop } from '@/shared/hook/useSmartDrop';

export const AddImageAction = ({ images, setImages }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [url, setUrl] = useState('');
  const triggerRef = useRef(null);
  const smartDrop = useSmartDrop(triggerRef, 200); // 200px es aprox la altura de este menú

  const handleAdd = () => {
    if (images.length >= 4) return alert("Máximo 4 imágenes");
    if (!url.startsWith('http')) return alert("URL inválida");

    setImages(prev => [...prev, url]);
    setUrl('');
    setShowPopup(false);
  };

  const handleCancel = () => {
    setUrl('');
    setShowPopup(false);
  };

  return (
    <DropDown
      show={showPopup}
      onToggle={(isOpen) => {
        // Solo permitimos abrir el menú si no se ha alcanzado el límite
        if (images.length < 4) setShowPopup(isOpen);
      }}
      drop={smartDrop}
      variant="slate" // Usamos el tema gris oscuro para consistencia
      menuClassName="p-3 mt-1"
      trigger={
        <div ref={triggerRef} className="interactive-item rounded-pill p-2 d-flex">
          <i
            className="bi bi-card-image fs-5 icon-grow py-1 px-2"
            style={{ cursor: images.length < 4 ? 'pointer' : 'not-allowed', opacity: images.length < 4 ? 1 : 0.5 }}
          ></i>
        </div>
      }
    >
      <div style={{ minWidth: '280px' }}>
        <p className='text-white small mb-2'>Pega la URL de una imagen</p>
          <Input
            placeholder="Pega la URL de la imagen..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            classNameControl="bg-dark text-black border-secondary bg-white"
            autoFocus
          />
          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleAdd} disabled={!url}>
              Añadir
            </Button>
          </div>
      </div>
    </DropDown>
  );
};