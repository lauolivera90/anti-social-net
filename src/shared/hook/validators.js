/**
 * Objeto que contiene funciones de validación individuales y reutilizables.
 */
export const validators = {
  required: (value) => (value ? undefined : "Este campo es requerido."),
  minLength: (min) => (value) =>
    value && value.length < min
      ? `Debe tener al menos ${min} caracteres.`
      : undefined,
  isEmail: (value) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? "Formato de email inválido."
      : undefined,
  // Aquí podríamos añadir validaciones asíncronas en el futuro
};

/**
 * Valida un formulario completo basado en un esquema de reglas.
 * @param {object} values - Los valores actuales del formulario.
 * @param {object} schema - El esquema de validación que define las reglas para cada campo.
 * @returns {object} Un objeto con todos los errores del formulario.
 */
export const validateForm = (values, schema) => {
  return Object.keys(schema).reduce((errors, field) => {
    const fieldErrors = schema[field]
      .map((validator) => validator(values[field]))
      .filter(Boolean); // Filtra los resultados undefined

    if (fieldErrors.length > 0) {
      // Devuelve solo el primer error encontrado para ese campo
      errors[field] = fieldErrors[0];
    }

    return errors;
  }, {});
};