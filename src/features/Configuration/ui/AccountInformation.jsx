import { useEffect, useState } from "react";
import { useAuth } from '@/app/providers';
import { Form } from "react-bootstrap";
import { Button, ModalCustom, ModalInput } from "@/widget/ui";
import { updateUser, loginUser } from "@/entities/user";
import { useConfirmClose, validators, validateForm } from "@/shared/hook";

export const AccountInformation = ({ show, handleClose }) => {
  const { usuario, login } = useAuth();
  const [step, setStep] = useState(1); // 1: Password, 2: Info
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const MODAL_VARIANT = "slate";

  const infoSchema = {
    email: [validators.required, validators.isEmail],
    nickname: [validators.required, validators.minLength(3)],
  };

  const [formData, setFormData] = useState({
    passwordInput: "",
    email: usuario?.mail || "",
    nickname: usuario?.nickname || ""
  });

  // Sincronizar datos cuando el usuario cambia o se abre el modal
  useEffect(() => {
    if (show && usuario) {
      setFormData({
        passwordInput: "",
        email: usuario.mail,
        nickname: usuario.nickname
      });
      setFormErrors({});
      setSubmitted(false);
      setStep(1);
      setIsLoading(false);
    }
  }, [show, usuario]);

  // Hook para manejar el cierre con cambios pendientes
  const close = useConfirmClose(
    { email: formData.email, nickname: formData.nickname }, // Valores actuales
    { email: usuario?.mail, nickname: usuario?.nickname }, // Valores iniciales
    handleClose,
    () => setStep(1) // Limpieza extra al cerrar
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormErrors({});
    setIsLoading(true);

    try {
      // Para validar la contraseña, intentamos hacer login con ella.
      // Es una forma segura de verificarla sin tener la contraseña en el frontend.
        await loginUser({ nickname: usuario.nickname, password: formData.passwordInput });
        setStep(2);
        setSubmitted(false);
    } catch (error) {
        setFormErrors({ passwordInput: "Contraseña incorrecta." });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validateForm(formData, infoSchema);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await updateUser(usuario._id, {
        nickname: formData.nickname,
        mail: formData.email,
      });

      login({ ...usuario, nickname: formData.nickname, mail: formData.email });
      handleClose();
      alert("Información actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar:", error.message);
      // El backend podría devolver un 409 si el nickname/email ya está en uso
      setFormErrors({ general: error.message || "No se pudo actualizar la información." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!usuario) return null;

  
  return (
    <ModalCustom 
      show={show} 
      onHide={close} 
      variant={MODAL_VARIANT} // Aplicamos gris oscuro al modal
      isLoading={isLoading}
      title="Información de la cuenta"
      footerActions={
        <Button 
          type="submit" 
          form={step === 1 ? "passwordForm" : "infoForm"}
          disabled={isLoading || (step === 1 ? !formData.passwordInput : (formData.nickname === usuario.nickname && formData.email === usuario.mail))}
        >
          {step === 1 ? "Siguiente" : "Guardar"}
        </Button>
      }
    >
      <Form id={step === 1 ? "passwordForm" : "infoForm"} onSubmit={step === 1 ? handleNextStep : handleSave}>
        {step === 1 ? (
          <>
            <p className="text-start small text-secondary mb-4">
              Por seguridad, confirma tu contraseña para poder editar tu información.
            </p>
          <ModalInput
            variant="light" // Sincronizamos el input con el modal
            name="passwordInput"
            type="password"
            label="Contraseña actual"
            placeholder="Ingrese su contraseña"
            value={formData.passwordInput}
            onChange={handleChange}
            error={submitted && formErrors.passwordInput}
          />
          </>
        ) : (
          <>
            <ModalInput
              variant="light" // Sincronizamos
              name="nickname"
              label="Nombre de Usuario"
              value={formData.nickname}
              onChange={handleChange}
              error={submitted && formErrors.nickname}
            />
            <ModalInput
              variant="light" // Sincronizamos
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={submitted && formErrors.email}
            />
          </>
        )}
      </Form>
    </ModalCustom>
  );
};