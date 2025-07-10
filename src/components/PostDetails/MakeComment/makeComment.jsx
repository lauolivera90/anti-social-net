import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "../../../context/AuthContext";
import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";

const MakeComment = ({ replicatedUser, postId }) => {
    const { usuario } = useAuth();
    const [inputText, setInputText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [focus, setFocus] = useState(false)
    const [pickerPosition, setPickerPosition] = useState("bottom"); // default position
    const pickerRef = useRef(null);
    const iconRef = useRef(null);


  
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try{
            const response = await fetch("http://localhost:3000/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post: postId,
                user: usuario._id,
                text: inputText,
            }),
            });
            if (!response.ok) throw new Error("Error al publicar el comentario");
            setInputText("")
            setFocus(false)
        }
        catch (error){
            console.error({error: error.message})
        }
    };

    const handleEmojiClick = (emojiData) => {
        setInputText((prev) => prev + emojiData.emoji);
    };

  useEffect(() => {
    if (showPicker && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - iconRect.bottom;
      const spaceAbove = iconRect.top;

      // Elegí el espacio mayor o mínimo requerido (~300px para el picker)
      if (spaceBelow < 300 && spaceAbove > 300) {
        setPickerPosition("bottom");
      } else {
        setPickerPosition("top");
      }
    }
  }, [showPicker]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
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
    <>
      {focus && (
        <Row className="pe-4 ps-4">
            <p className="text-start"> Respondiendo a{" "}
                <span className="text-primary text-capitalize">
                @{replicatedUser.nickname}
                </span>
            </p>
        </Row>
      )}

      <Row className="pe-3 ps-3 mb-3">
        <Form id="makePost" onSubmit={handleSubmit} onFocus={() => setFocus(true)}>
          <InputGroup>
            <Form.Control
              placeholder="Publica tu respuesta"
              className={`bg-black border-0 fs-5 ${inputText ? "text-light" : "text-muted"}`}
              as="textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </InputGroup>
        </Form>
      </Row>

      {focus && (
        <Row className="pe-4 ps-4 align-items-center mb-3">
            <Col xs="auto" style={{ position: "relative" }}>
                <i
                    ref={iconRef}
                    className="text-white bi bi-emoji-kiss-fill fs-5"  
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPicker(!showPicker)}
                    role="button"
                    tabIndex={0}
                ></i>

                {showPicker && (
                    <div
                    ref={pickerRef}
                    style={{
                        position: "absolute",
                        zIndex: 3,
                        [pickerPosition]: "100%", 
                        left: 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </Col>
            <Col className="text-end">
                <Button disabled={inputText.length < 1} form="makePost" type="submit">
                    Post
                </Button>
            </Col>
        </Row>
      )}
    </>
  );
};

export default MakeComment;
