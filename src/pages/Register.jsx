import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { PublicLayout } from "@/widget/layout";
import { Input, Button } from "@/widget/ui";
import { createUser } from "@/entities/user"; // Importamos la función de la API
import { validators, validateForm } from "@/shared/hook";

// Definimos el esquema de validación para este formulario específico
const registrationSchema = {
  nickname: [validators.required, validators.minLength(3)],
  mail: [validators.required, validators.isEmail],
  password: [validators.required, validators.minLength(6)],
};

export default function Register() {
  const [formData, setFormData] = useState({
    nickname: "",
    mail: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiamos el error de un campo cuando el usuario empieza a corregirlo
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateForm(formData, registrationSchema);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      // La validación de si el usuario ya existe se delega al backend
      await createUser(formData);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      // El backend debería devolver un mensaje de error claro
      setError(error.message || "No se pudo registrar. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <h1 className="fw-bold text-white display-5 mb-4 text-center">Crea tu cuenta</h1>

      <Form onSubmit={handleRegister} className="w-100">
        <Input
          name="nickname"
          type="text"
          placeholder="Nombre de usuario"
          value={formData.nickname}
          onChange={handleChange}
          className="mb-3"
          error={formErrors.nickname}
          classNameControl="py-2"
        />
        <Input
          name="mail"
          type="email"
          placeholder="Correo electrónico"
          value={formData.mail}
          onChange={handleChange}
          className="mb-3"
          error={formErrors.mail}
          classNameControl="py-2"
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="mb-4"
          error={formErrors.password}
          classNameControl="py-2"
        />

        {error && <Alert variant="danger" className="p-2 small">{error}</Alert>}

        <Button variant="primary" type="submit" className="w-100 py-2 fs-5 rounded-pill mt-3" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </Form>

      <div className="d-flex flex-row gap-2 mt-5 justify-content-center">
        <p className="m-0 text-secondary">¿Ya tienes una cuenta?</p>
        <Button variant="ghost" className="p-0 m-0 text-primary" onClick={() => navigate("/login")}>
          Iniciar sesión
        </Button>
      </div>
    </PublicLayout>
  );
}
