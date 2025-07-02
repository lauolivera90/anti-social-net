import EmojiPicker from 'emoji-picker-react';
import React, {useEffect, useRef, useState } from 'react';

const Emoji = ({ setInputText}) => {
    const [showPicker, setShowPicker] = useState(false);
    const popupRef = useRef(null);

    const onEmojiClick = (emojiData) => {
        setInputText((prev) => prev + emojiData.emoji);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            //Verifica si el clic fue fuera del popup
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        if (showPicker) {
            //Agrega el evento de clic al documento cuando el componente es visible 
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', handleClickOutside);
        }
        return () => {
            //Elimina el evento cuando el componente se cierra
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleClickOutside);
        };
        }, [showPicker]);

    return (
        <div className="">
            <i className="bi bi-emoji-kiss-fill fs-5" onClick={() => setShowPicker(!showPicker)}></i>
                            {showPicker && (
                                <div ref={popupRef} className="position-absolute z-3 mt-2" style={{ top: "100%", left: 0 }}>
                                    <EmojiPicker onEmojiClick={onEmojiClick}/>
                                </div>
                            )}
        </div>
    );
}

export default Emoji;