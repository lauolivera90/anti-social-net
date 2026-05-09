import EmojiPicker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { Container } from "react-bootstrap";
import { useClickOutside } from '@/shared/hook'; // 1. Importamos el hook con el alias

export const Emoji = ({ setInputText }) => {
  const [showPicker, setShowPicker] = useState(false);
  const popupRef = useRef(null);

  // 2. Usamos el hook: "Si hay click fuera de popupRef, ejecuta la función"
  useClickOutside(popupRef, () => {
    if (showPicker) setShowPicker(false);
  });

  const onEmojiClick = (emojiData) => {
    setInputText(prev => prev + emojiData.emoji);
    // Opcional: cerrar el picker después de elegir un emoji
    // setShowPicker(false); 
  };

  return (
    // Usamos inline-block para que el contenedor no ocupe todo el ancho
    <Container style={{ position: 'relative', width: 'auto', display: 'inline-block' }}>
      <i 
        className="bi bi-emoji-kiss-fill fs-5 " 
        style={{ cursor: 'pointer' }} 
        onClick={() => setShowPicker(!showPicker)}
        aria-label="Toggle emoji picker"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowPicker(!showPicker)}
      ></i>

      {showPicker && (
        <div 
          ref={popupRef} 
          className="position-absolute z-3 mt-2" 
          style={{ top: "100%", left: 0 }}
          // Detenemos la propagación para que el click dentro del picker no lo cierre
          onClick={(e) => e.stopPropagation()}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </Container>
  );
}
