import { useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Input, Button } from "@/widget/ui"; // Tu componente personalizado
import { Emoji } from "@/shared/ui"; // Tu componente personalizado
import { CharCounter } from "@/shared/ui";
import { useCreateComment } from "../hook"; // Importamos el nuevo hook

export const MakeComment = ({ replicatedUser, postId, onCommentAdded }) => {
  const {
    inputText,
    setInputText,
    isLoading,
    handleCommentSubmit,
    canComment,
  } = useCreateComment();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

  const handleTextChange = (e) => {
    const el = inputRef.current;
    if (el) {
      el.style.height = 'auto'; // Resetea la altura para recalcular
      el.style.height = `${el.scrollHeight}px`; // Ajusta la altura al contenido
    }
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // La lógica de creación y limpieza está ahora en el hook
    await handleCommentSubmit({ postId, onCommentAdded });
    // El estado de 'focus' sigue siendo local a la UI
    if (!isLoading) {
      setFocus(false);
    }
  };

  return (
    <div className="py-2">
      {focus && (
        <Row className="pe-4 ps-4 mb-2">
          <Col>
            <p className="text-start ps-1 m-0 text-secondary">
              Respondiendo a{" "}
              <span className="text-primary text-capitalize">
                @{replicatedUser?.nickname}
              </span>
            </p>
          </Col>
        </Row>
      )}

      <Row className="pe-3 ps-3 mb-3">
        <Col>
          <Form id="makePost" onSubmit={handleSubmit} onFocus={() => setFocus(true)}>
            <Input
              ref={inputRef}
              as="textarea"
              placeholder="Publica tu respuesta"
              value={inputText}
              onChange={handleTextChange}
              // className -> va al Group (espaciado externo)
              className="mb-0" 
              // classNameControl -> va al textarea (colores y fuentes)
              classNameControl={`bg-black border-0 fs-5 shadow-none text-light custom-placeholder
              }`}
              style={{ resize: "none", minHeight: "50px" }}
              rows={1}
            />
          </Form>
        </Col>
      </Row>

      {focus && (
        <Row className="pe-4 ps-2 align-items-center mb-3">
          <Col xs="auto text-white">
            <Emoji setInputText={setInputText} />
          </Col>
          <Col className="text-end">

            <CharCounter condition={canComment} text={inputText} />

            <Button
              variant="primary"
              type="submit"
              form="makePost"
              disabled={!canComment || isLoading}
              className="rounded-pill px-4 fw-bold"
            >
              {isLoading ? "Respondiendo..." : "Responder"}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};