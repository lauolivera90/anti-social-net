import { useRef, useState, lazy, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { DropDown } from '@/widget/ui'; // Importamos nuestro widget reutilizable
import { useSmartDrop } from '@/shared/hook/useSmartDrop';

// Cargamos la librería pesada de forma asíncrona solo cuando sea necesario
const EmojiPicker = lazy(() => import('emoji-picker-react'));

export const Emoji = ({ setInputText }) => {
  const triggerRef = useRef(null);
  const smartDrop = useSmartDrop(triggerRef, 400); // Usamos 400px considerando los márgenes y altura del EmojiPicker
  const [hasLoaded, setHasLoaded] = useState(false);

  const onEmojiClick = (emojiData) => {
    setInputText(prev => prev + emojiData.emoji);
  };

  // Definimos un objeto de estilo para personalizar los colores del picker
  const customPickerStyles = {
    '--epr-bg-color': '#212529', // Fondo gris muy oscuro, casi negroexto casi blanco, // Gris más oscuro para el input de búsqueda
    '--epr-category-label-bg-color': '#212529', // Mismo fondo que el principal
    '--epr-hover-bg-color': 'rgba(var(--bs-secondary-rgb),  .2)', // Reutilizamos el hover del design system
    '--epr-focus-bg-color': 'rgba(var(--bs-primary-rgb), 0.2)', // Un toque del color primario para el foco
    '--epr-border-color': '#6c757d', // Borde sutil
    '--epr-picker-border-radius': '1rem', // 16px, igual que rounded-4
    '--epr-search-input-border-radius': '0.5rem', // 8px
    width: '350px',
    margin: "-1rem", // Ancho estándar para el picker
    border: '1px solid var(--epr-border-color)' // Añadimos el borde que quitamos del DropDown
  };

  return (
    <DropDown
      drop={smartDrop}
      variant="slate"
      onToggle={(isOpen) => {
        // Solo iniciamos la carga cuando el usuario abre el menú por primera vez
        if (isOpen && !hasLoaded) setHasLoaded(true);
      }}
      // Quitamos el padding y borde del menú para que el picker se ajuste perfectamente
      menuClassName="p-3 mt-1 border-0 bg-transparent" // Hacemos el menú transparente
      trigger={
        <div ref={triggerRef} className="interactive-item rounded-pill p-2 d-flex">
          <i 
            className="bi bi-emoji-kiss-fill fs-5 icon-grow py-1 px-2" 
            style={{ cursor: 'pointer' }} 
            aria-label="Toggle emoji picker"
            role="button"
          ></i>
        </div>
      }
    >
      {hasLoaded && (
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center bg-dark" style={{ width: '350px', height: '400px', margin: '-1rem', borderRadius: '1rem', border: '1px solid #6c757d' }}>
            <Spinner animation="border" variant="secondary" />
          </div>
        }>
          <EmojiPicker 
            onEmojiClick={onEmojiClick} 
            emojiStyle="twitter"
            lazyLoadEmojis={true} // Optimización: carga las imágenes dinámicamente con el scroll
            style={customPickerStyles} 
          />
        </Suspense>
      )}
    </DropDown>
  );
}
