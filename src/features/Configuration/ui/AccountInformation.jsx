import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Form } from "react-bootstrap";
import { Button, ModalCustom, ModalInput } from "@/widget/ui";
import { updateUser } from "@/entities/user";
import { useConfirmClose } from "@/shared/hook";

export const AccountInformation = ({ show, handleClose }) => {
  const { usuario, login } = useAuth();
  const [step, setStep] = useState(1); // 1: Password, 2: Info
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const MODAL_VARIANT = "slate";

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

  const handleNextStep = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (formData.passwordInput !== usuario.password) {
      setFormErrors({ passwordInput: "Contraseña incorrecta." });
      return;
    }
    
    setStep(2);
    setSubmitted(false);
    setFormErrors({});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email inválido.";
    if (formData.nickname.length < 3) errors.nickname = "Usuario demasiado corto.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
    }
  };

  if (!usuario) return null;

  
  return (
    <ModalCustom 
      show={show} 
      onHide={close} 
      variant={MODAL_VARIANT} // Aplicamos gris oscuro al modal
      title="Información de la cuenta"
      footerActions={
        <Button 
          type="submit" 
          form={step === 1 ? "passwordForm" : "infoForm"}
          disabled={step === 1 ? !formData.passwordInput : (formData.nickname === usuario.nickname && formData.email === usuario.mail)}
        >
          {step === 1 ? "Siguiente" : "Guardar"}
        </Button>
      }
    >
      <Form id={step === 1 ? "passwordForm" : "infoForm"} onSubmit={step === 1 ? handleNextStep : handleSave}>
        {step === 1 ? (
          <ModalInput
            variant={MODAL_VARIANT} // Sincronizamos el input con el modal
            name="passwordInput"
            type="password"
            label="Contraseña actual"
            placeholder="Ingrese su contraseña"
            value={formData.passwordInput}
            onChange={handleChange}
            error={submitted && formErrors.passwordInput}
          />
        ) : (
          <>
            <ModalInput
              variant={MODAL_VARIANT} // Sincronizamos
              name="nickname"
              label="Nombre de Usuario"
              value={formData.nickname}
              onChange={handleChange}
              error={submitted && formErrors.nickname}
            />
            <ModalInput
              variant={MODAL_VARIANT} // Sincronizamos
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