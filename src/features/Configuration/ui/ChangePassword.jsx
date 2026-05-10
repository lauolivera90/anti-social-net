import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from '@/app/providers';
import { ModalCustom, Button, ModalInput } from "@/widget/ui";
import { updateUser, loginUser } from "@/entities/user";
import { useConfirmClose, validators, validateForm } from "@/shared/hook";

export const ChangePassword = ({ show, handleClose }) => {
  const { usuario } = useAuth();
  const MODAL_VARIANT = "slate"; // Gris oscuro para contraste sutil

  const validationSchema = {
    actualPassword: [validators.required],
    newPassword: [validators.required, validators.minLength(6)],
    rePassword: [validators.required],
  };

  // Estado para controlar el flujo de dos pasos
  const [step, setStep] = useState(1); // 1: Password, 2: Change

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

  const handleNextStep = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormErrors({});
    setIsLoading(true);

    try {
      // Validación segura de la contraseña actual contra el backend
      await loginUser({ nickname: usuario.nickname, password: formData.actualPassword });
      setStep(2);
      setSubmitted(false);
    } catch (error) {
      setFormErrors({ actualPassword: "Contraseña incorrecta." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const saveSchema = {
      newPassword: [validationSchema.newPassword[0], validationSchema.newPassword[1]],
      rePassword: [validationSchema.rePassword[0]],
    };
    const validationErrors = validateForm(formData, saveSchema);

    if (formData.newPassword !== formData.rePassword) {
      validationErrors.rePassword = "Las contraseñas no coinciden.";
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Si llegamos aquí, la contraseña actual ya fue validada.
        await updateUser(usuario._id, { password: formData.newPassword });

        handleClose();
        cleanInputs();
        alert("Contraseña actualizada correctamente.");
      } catch (error) {
        console.error("Error al actualizar contraseña:", error.message);
        setFormErrors({ general: "No se pudo actualizar la contraseña." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!usuario) return null;

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
          form={step === 1 ? "validateForm" : "saveForm"}
          disabled={
            isLoading ||
            (step === 1
              ? !formData.actualPassword
              : !formData.newPassword || !formData.rePassword)
          }
        >
          {step === 1 ? "Siguiente" : "Guardar cambios"}
        </Button>
      }
    >
      <Form noValidate onSubmit={step === 1 ? handleNextStep : handleSave} id={step === 1 ? "validateForm" : "saveForm"}>
        {step === 1 ? (
          <>
            <p className="text-start small text-secondary mb-4">
              Por seguridad, confirma tu contraseña para continuar.
            </p>
            <ModalInput
              variant="light" // Sincronizamos
              name="actualPassword"
              type="password"
              label="Contraseña actual"
              placeholder="Ingrese su contraseña actual"
              value={formData.actualPassword}
              onChange={handleChange}
              error={submitted && formErrors.actualPassword}
            />
          </>
        ) : (
          <>
            <ModalInput
              variant="light" // Sincronizamos
              name="newPassword"
              type="password"
              label="Nueva contraseña"
              placeholder="Mínimo 6 caracteres"
              value={formData.newPassword}
              onChange={handleChange}
              error={submitted && formErrors.newPassword}
            />
            <ModalInput
              variant="light" // Sincronizamos
              name="rePassword"
              type="password"
              label="Confirmar nueva contraseña"
              placeholder="Repita la nueva contraseña"
              value={formData.rePassword}
              onChange={handleChange}
              error={submitted && formErrors.rePassword}
            />
          </>
        )}
      </Form>
    </ModalCustom>
  );
};