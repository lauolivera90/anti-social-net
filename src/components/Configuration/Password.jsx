  import { Form, Spinner, FloatingLabel, Modal, Button } from "react-bootstrap"
  import { useAuth } from "../../context/AuthContext";
  import {useState, useEffect } from "react";


  const Password = ({show, handleClose}) =>{
      const { usuario, login } = useAuth();
    let password = usuario.password;
    const [formErrors, setFormErrors] = useState({});
    const [actualPasswordInput, setActualPasswordInput] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const cleanInputs = () => {
      setActualPasswordInput("");
      setNewPassword("");
      setRePassword("");
      setFormErrors({});
      setSubmitted(false)
      }

      const close = () => {
          const isDirty = actualPasswordInput.length > 0 || newPassword.length > 0 || rePassword.length > 0;
          if (isDirty) {
              const confirmExit = window.confirm("Hay cambios sin guardar. ¿Estás seguro que querés salir?");
              if (!confirmExit) return;
          }
          handleClose()
          cleanInputs()
      }

    const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const errors = {};

    if (actualPasswordInput !== password) {
      errors.actualPassword = "La contraseña es incorrecta.";
    }

    if (newPassword.length < 6) {
      errors.newPassword = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (newPassword === password) {
      errors.newPassword = "La contraseña no puede ser la misma que la anterior.";
    }

    if (rePassword !== newPassword && newPassword.length >= 6) {
      errors.rePassword = "Las contraseñas no coinciden";
    }

    setFormErrors(errors);
    setSubmitted(true); 

    if (Object.keys(errors).length === 0) {
      try {
        const updatedUser = { ...usuario, password: newPassword };
        const response = await fetch(`http://localhost:3000/user/${usuario._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: usuario.nickname,
            password: newPassword,
            mail: usuario.mail,
          }),
        });

        if (!response.ok) throw new Error("Error al cambiar la contraseña");
        login(updatedUser)
        cleanInputs()
        handleClose()
        alert("Contraseña actualizada correctamente.");
      } catch (error) {
        console.error("Error al cambiar contraseña:", error.message);
      }
    }};

    useEffect(() => {
        if (usuario) {
            password = usuario.password;
        }
      }, [usuario])

      return (
      <>
        {password ? (
          <Modal show={show} onHide={close}>
              <Modal.Header closeButton>
                  <Modal.Title>Cambiar contraseña</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form noValidate onSubmit={handleSubmit} id="passwordForm">
                      {/* Contraseña actual */}
                      <FloatingLabel controlId="actualPassword" label="Contraseña actual" className="mb-3">
                          <Form.Control
                              type="password"
                              placeholder="Ingrese la contraseña actual"
                              value={actualPasswordInput}
                              onChange={(e) => setActualPasswordInput(e.target.value)}
                              className={`form-control ${
                                          submitted
                                              ? formErrors.actualPassword
                                              ? "is-invalid"
                                              : "is-valid"
                                              : ""
                                          }`}/>
                          <Form.Text className="text-primary" style={{ cursor: "pointer" }}>
                              ¿Olvidaste tu contraseña?
                          </Form.Text>
                          {formErrors.actualPassword && (
                              <div className="invalid-feedback d-block">{formErrors.actualPassword}</div>
                          )}
                      </FloatingLabel>

                      {/* Nueva contraseña */}
                      <FloatingLabel controlId="newPassword" label="Nueva contraseña" className="mb-3">
                          <Form.Control
                              type="password"
                              placeholder="Ingrese la contraseña nueva"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className={`form-control ${
                                          submitted
                                              ? formErrors.newPassword
                                              ? "is-invalid"
                                              : "is-valid"
                                              : ""
                                          }`}/>
                          {formErrors.newPassword && (
                              <div className="invalid-feedback d-block">{formErrors.newPassword}</div>
                          )}
                      </FloatingLabel>

                      <FloatingLabel controlId="rePassword" label="Ingrese de nuevo la contraseña">
                          <Form.Control
                              type="password"
                              placeholder="Reingrese la contraseña nuevamente"
                              value={rePassword}
                              onChange={(e) => setRePassword(e.target.value)}
                              className={`form-control ${
                                  submitted && newPassword.length >= 6 && rePassword.length
                                      ? formErrors.rePassword
                                      ? "is-invalid"
                                      : "is-valid"
                                      : ""
                                  }`}/>
                          {formErrors.rePassword && (
                              <div className="invalid-feedback d-block">{formErrors.rePassword}</div>
                          )}
                      </FloatingLabel>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" form="passwordForm"
            disabled={actualPasswordInput.length === 0 || newPassword.length === 0 || rePassword.length === 0}>
              Cambiar contraseña
            </Button>
          </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={show} onHide={close}>
              <Modal.Body className="d-flex justify-content-center">
                  <Spinner animation="border" />
              </Modal.Body>
          </Modal>
        )}
      </>
    );
  };

  export default Password;