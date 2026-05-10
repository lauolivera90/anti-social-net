import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '@/app/providers';
import { PublicLayout } from '@/widget/layout';
import { Input, Button } from '@/widget/ui';
import { loginUser } from '@/entities/user'; // Importamos la función de la API
import { validators, validateForm } from '@/shared/hook';

// 1. Definimos el esquema de validación para el login
const loginSchema = {
  nickname: [validators.required],
  password: [validators.required],
};

export default function Login() {
  const [formData, setFormData] = useState({ nickname: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiamos el error del campo al empezar a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // 2. Validamos el formulario completo antes de enviarlo
    const validationErrors = validateForm(formData, loginSchema);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      // La validación ahora se hace de forma segura en el backend
      const authenticatedUser = await loginUser(formData);
      login(authenticatedUser);
      navigate('/home');
    } catch (error) {
      setError(error.message || "No se pudo iniciar sesión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <h1 className="fw-bold text-white display-5 mb-4 text-center">Inicia sesión</h1>

      <Form onSubmit={handleLogin} className="w-100">
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
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </Form>

      <div className="d-flex flex-row gap-2 mt-5 justify-content-center">
        <p className="m-0 text-secondary">¿No tienes una cuenta?</p>
        <Button variant="ghost" className="p-0 m-0 text-primary" onClick={() => navigate('/register')}>
          Registrarse
        </Button>
      </div>
    </PublicLayout>
  );
}
