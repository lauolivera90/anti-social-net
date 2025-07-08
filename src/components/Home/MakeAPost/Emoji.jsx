import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from "react-bootstrap";

const Emoji = ({ setInputText }) => {
  const [showPicker, setShowPicker] = useState(false);
  const popupRef = useRef(null);

  const onEmojiClick = (emojiData) => {
    setInputText(prev => prev + emojiData.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    };
  }, [showPicker]);

  return (
    <Container style={{ position: 'relative' }}>
      <i 
        className="bi bi-emoji-kiss-fill fs-5" 
        style={{ cursor: 'pointer' }} 
        onClick={() => setShowPicker(!showPicker)}
        aria-label="Toggle emoji picker"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowPicker(!showPicker)}
      ></i>
      {showPicker && (
        <Container 
          ref={popupRef} 
          className="position-absolute z-3 mt-2" 
          style={{ top: "100%", left: 0 }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Container>
      )}
    </Container>
  );
}

export default Emoji;
