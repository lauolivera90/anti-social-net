import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { ModalCustom, Button, ModalInput } from "@/widget/ui";
import { updateUser } from "@/entities/user";
import { useConfirmClose } from "@/shared/hook";

export const ChangePassword = ({ show, handleClose }) => {
  const { usuario, login } = useAuth();
  const MODAL_VARIANT = "slate"; // Gris oscuro para contraste sutil

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    actualPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const cleanInputs = () => {
    setFormData({ actualPassword: "", newPassword: "", rePassword: "" });
    setFormErrors({});
    setSubmitted(false);
  };

  // Hook centralizado para manejar el cierre accidental
  const close = useConfirmClose(
    formData,
    { actualPassword: "", newPassword: "", rePassword: "" },
    handleClose,
    cleanInputs
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    // Validaciones de negocio
    if (formData.actualPassword !== usuario.password) {
      errors.actualPassword = "La contraseña es incorrecta.";
    }
    if (formData.newPassword.length < 6) {
      errors.newPassword = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formData.newPassword === usuario.password) {
      errors.newPassword = "La contraseña no puede ser la misma que la anterior.";
    }
    if (formData.rePassword !== formData.newPassword) {
      errors.rePassword = "Las contraseñas no coinciden.";
    }

    setFormErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await updateUser(usuario._id, { password: formData.newPassword });
        login({ ...usuario, password: formData.newPassword });
        
        handleClose();
        cleanInputs();
        alert("Contraseña actualizada correctamente.");
      } catch (error) {
        console.error("Error al cambiar contraseña:", error.message);
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
      title="Cambiar contraseña"
      isLoading={isLoading}
      footerActions={
        <Button
          type="submit"
          form="passwordForm"
          disabled={
            !formData.actualPassword ||
            !formData.newPassword ||
            !formData.rePassword ||
            isLoading
          }
        >
          Guardar cambios
        </Button>
      }
    >
      <Form noValidate onSubmit={handleSubmit} id="passwordForm">
        <ModalInput
          variant={MODAL_VARIANT}
          name="actualPassword"
          type="password"
          label="Contraseña actual"
          placeholder="Ingrese su contraseña actual"
          value={formData.actualPassword}
          onChange={handleChange}
          error={submitted && formErrors.actualPassword}
        />
        <ModalInput
          variant={MODAL_VARIANT}
          name="newPassword"
          type="password"
          label="Nueva contraseña"
          placeholder="Mínimo 6 caracteres"
          value={formData.newPassword}
          onChange={handleChange}
          error={submitted && formErrors.newPassword}
        />
        <ModalInput
          variant={MODAL_VARIANT}
          name="rePassword"
          type="password"
          label="Confirmar nueva contraseña"
          placeholder="Repita la nueva contraseña"
          value={formData.rePassword}
          onChange={handleChange}
          error={submitted && formErrors.rePassword}
        />
      </Form>
    </ModalCustom>
  );
};