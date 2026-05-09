import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { ModalCustom, Button, ModalInput } from "@/widget/ui";
import { getPostsByUserId, deletePost } from "@/entities/post";
import { getCommentsByUserId, deleteComment } from "@/entities/comment";
import { deleteUser } from "@/entities/user";
import { useConfirmClose } from "@/shared/hook";

export const DesactivateAccount = ({ show, handleClose }) => {
  const { usuario, logout } = useAuth();
  const MODAL_VARIANT = "slate";

  const [formData, setFormData] = useState({ passwordInput: "", nickname: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cleanInputs = () => {
    setFormData({ passwordInput: "", nickname: "" });
    setFormErrors({});
    setSubmitted(false);
    setValidated(false);
  };

  // Hook para evitar cierres accidentales si hay texto escrito
  const close = useConfirmClose(
    formData,
    { passwordInput: "", nickname: "" },
    handleClose,
    cleanInputs
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deleteUserInteraction = async () => {
    const [posts, comments] = await Promise.all([
      getPostsByUserId(usuario._id),
      getCommentsByUserId(usuario._id),
    ]);

    const deletePostPromises = posts.map((post) => deletePost(post._id));
    const deleteCommentPromises = comments.map((comment) => deleteComment(comment._id));

    await Promise.all([...deletePostPromises, ...deleteCommentPromises]);
  };

  const handleSubmitControl = (event) => {
    event.preventDefault();
    const errors = {};

    if (formData.passwordInput !== usuario.password) {
      errors.passwordInput = "La contraseña es incorrecta.";
    }

    setFormErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setValidated(true);
      setSubmitted(false);
      setFormErrors({});
    }
  };

  const handleSubmitDesactivate = async (event) => {
    event.preventDefault();
    const errors = {};

    if (formData.nickname !== usuario.nickname) {
      errors.nickname = "El nombre de usuario es incorrecto.";
    }

    setFormErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await deleteUserInteraction();
        await deleteUser(usuario._id);

        handleClose();
        cleanInputs();
        alert("Su cuenta ha sido eliminada con éxito.");
        logout();
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error.message);
        alert("Hubo un error al eliminar la cuenta. Intente de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ModalCustom
      show={show}
      onHide={close}
      variant={MODAL_VARIANT}
      title="Desactivar cuenta"
      isLoading={isLoading}
      footerActions={
        <Button
          type="submit"
          form={!validated ? "validateForm" : "desactivateForm"}
          variant={validated ? "danger" : "primary"}
          disabled={isLoading || (!validated ? !formData.passwordInput : !formData.nickname)}
        >
          {!validated ? "Siguiente" : "Eliminar cuenta"}
        </Button>
      }
    >
      {!validated ? (
        <Form id="validateForm" noValidate onSubmit={handleSubmitControl}>
          <p className="text-start small text-secondary mb-4">
            Por seguridad, confirma tu contraseña para continuar con la desactivación.
          </p>
          <ModalInput
            variant={MODAL_VARIANT}
            name="passwordInput"
            type="password"
            label="Contraseña actual"
            placeholder="Ingrese su contraseña"
            value={formData.passwordInput}
            onChange={handleChange}
            error={submitted && formErrors.passwordInput}
          />
        </Form>
      ) : (
        <Form id="desactivateForm" noValidate onSubmit={handleSubmitDesactivate}>
          <div className="text-start">
            <h6 className="fw-bold text-white">Esto desactivará tu cuenta</h6>
            <p className="small text-secondary">
              Tu nombre de usuario y perfil público ya no serán visibles.
            </p>
            <p className="border-bottom border-secondary pb-3 text-danger small fw-bold">
              ¡Atención! Se eliminarán todas tus publicaciones y comentarios de forma permanente.
            </p>
          </div>
          <ModalInput
            variant={MODAL_VARIANT}
            className="mt-3"
            name="nickname"
            label="Para confirmar, escribe tu nombre de usuario"
            placeholder={usuario?.nickname}
            value={formData.nickname}
            onChange={handleChange}
            error={submitted && formErrors.nickname}
          />
        </Form>
      )}
    </ModalCustom>
  );
};