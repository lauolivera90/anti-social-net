import { useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { createComment } from "@/entities/comment/api/commentApi";
import { Input, Button } from "@/widget/ui"; // Tu componente personalizado
import { Emoji } from "@/shared/ui"; // Tu componente personalizado

export const MakeComment = ({ replicatedUser, postId, onCommentAdded }) => {
  const { usuario } = useAuth();
  const [inputText, setInputText] = useState("");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim().length === 0) return;

    try {
      await createComment({
        postId,
        userId: usuario._id,
        text: inputText,
      });
      setInputText("");
      setFocus(false);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="py-2">
      {focus && (
        <Row className="pe-4 ps-4 mb-2">
          <Col>
            <p className="text-start m-0 text-secondary">
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
              onChange={(e) => setInputText(e.target.value)}
              // className -> va al Group (espaciado externo)
              className="mb-0" 
              // classNameControl -> va al textarea (colores y fuentes)
              classNameControl={`bg-black border-0 fs-5 shadow-none text-light
              }`}
              style={{ resize: "none", minHeight: "50px" }}
              rows={focus ? 3 : 1}
            />
          </Form>
        </Col>
      </Row>

      {focus && (
        <Row className="pe-4 ps-4 align-items-center mb-3">
          <Col xs="auto text-white">
            <Emoji setInputText={setInputText} />
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              type="submit"
              form="makePost"
              disabled={inputText.trim().length === 0}
              className="rounded-pill px-4 fw-bold"
            >
              Responder
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};