import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from '@/app/providers';
import { ModalCustom, Button, ModalInput } from "@/widget/ui";
import { getPostsByNickname, deletePost } from "@/entities/post";
import { getComments, deleteComment } from "@/entities/comment";
import { deleteUser, loginUser } from "@/entities/user";
import { useConfirmClose } from "@/shared/hook";

export const DesactivateAccount = ({ show, handleClose }) => {
  const { usuario, logout } = useAuth();
  const MODAL_VARIANT = "slate";

  // Estado para controlar el flujo de dos pasos
  const [step, setStep] = useState(1); // 1: Password, 2: Confirmation
  const [formData, setFormData] = useState({ passwordInput: "", nickname: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cleanInputs = () => {
    setFormData({ passwordInput: "", nickname: "" });
    setFormErrors({});
    setSubmitted(false);
    setStep(1);
  };

  // Sincronizar y limpiar estado cuando el modal se abre/cierra
  useEffect(() => {
    if (show) {
      cleanInputs();
    }
  }, [show]);

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
      getPostsByNickname(usuario.nickname),
      getComments({ userId: usuario._id }),
    ]);

    const deletePostPromises = posts.map((post) => deletePost(post._id));
    const deleteCommentPromises = comments.map((comment) => deleteComment(comment._id));

    await Promise.all([...deletePostPromises, ...deleteCommentPromises]);
  };

  const handleNextStep = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormErrors({});
    setIsLoading(true);

    try {
      // Validación segura de la contraseña actual contra el backend
      await loginUser({ nickname: usuario.nickname, password: formData.passwordInput });
      setStep(2);
      setSubmitted(false);
    } catch (error) {
      setFormErrors({ passwordInput: "Contraseña incorrecta." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (formData.nickname !== usuario.nickname) {
      setFormErrors({ nickname: "El nombre de usuario es incorrecto." });
      return;
    }

    setFormErrors({});
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
  };

  if (!usuario) return null;

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
          form={step === 1 ? "validateForm" : "desactivateForm"}
          variant={step === 2 ? "danger" : "primary"}
          disabled={isLoading || (step === 1 ? !formData.passwordInput : !formData.nickname)}
        >
          {step === 1 ? "Siguiente" : "Eliminar cuenta"}
        </Button>
      }
    >
      {step === 1 ? (
        <Form id="validateForm" noValidate onSubmit={handleNextStep}>
          <p className="text-start small text-secondary mb-4">
            Por seguridad, confirma tu contraseña para continuar con la desactivación.
          </p>
          <ModalInput
              variant="light" // Sincronizamos
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
        <Form id="desactivateForm" noValidate onSubmit={handleDeactivate}>
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
              variant="light" // Sincronizamos
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