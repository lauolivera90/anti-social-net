import { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

export const Input = forwardRef(({
  label,
  as = "input",
  placeholder = "",
  value,
  onChange,
  error,
  helper,
  className = "",        
  classNameControl = "", 
  ...props
}, ref) => {
  return (
    <Form.Group className={className}>
      {label && <Form.Label className="text-white">{label}</Form.Label>}
      <Form.Control
        {...props}
        ref={ref}
        as={as}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
        // SOLUCIÓN: Concatenamos la clase base con la personalizada
        className={`form-control ${classNameControl}`} 
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
      {helper && !error && (
        <Form.Text className="text-muted">{helper}</Form.Text>
      )}
    </Form.Group>
  );
});