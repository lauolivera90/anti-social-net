import {useEffect, useState } from "react";
import {useAuth } from "../../context/AuthContext";
import { Modal, Form, FloatingLabel, Button, Spinner } from "react-bootstrap";

const AcountInformation = ({show, handleClose}) => {
    const {usuario, login} = useAuth()
    const [submitted, setSubmitted] = useState(false);
    const [passwordInput, setPasswordInput] = useState("")
    const [formErrors, setFormErrors] = useState({});
    const [email, setEmail] = useState(usuario.mail)
    const [nickname, setNickname] = useState(usuario.nickname)
    const [validated, setValidated] = useState(false)

    const cleanInputs = () => {
    setPasswordInput("");
    setFormErrors({});
    setSubmitted(false)
    setNickname(usuario.nickname)
    setEmail(usuario.mail)
    }

    const close = () => {
        const isDirty = nickname !== usuario.nickname || email !== usuario.mail
        if (isDirty) {
            const confirmExit = window.confirm("Hay cambios sin guardar. ¿Estás seguro que querés salir?");
            if (!confirmExit) return;
        }
        cleanInputs()
        handleClose()
    }

    const usedMails = async () => {
        try{
            const response = await fetch("http://localhost:3000/user")
            if (!response.ok) throw new Error("Error de red al cargar los usuarios"); 
            const data = await response.json()
            const mails = data.map(user => user.mail)
            return mails.filter(mail => mail !== usuario.mail)
        }
        catch (error) {
            console.error({error: error.message})
        }
    }

    const usedNicknames = async () => {
        try{
            const response = await fetch("http://localhost:3000/user")
            if (!response.ok) throw new Error("Error de red al cargar los usuarios"); 
            const data = await response.json()
            const nicknames = data.map(user => user.nickname)
            return nicknames.filter(nickname => nickname !== usuario.nickname)
        }
        catch (error) {
            console.error({error: error.message})
        }
    }

    const handleSubmitInfo = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const errors = {};
        const nicknames = await usedNicknames()
        const mails = await usedMails()
        if (nicknames.includes(nickname)){
            errors.nicknameInfo = "El usuario ya esta en uso";
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            errors.mailInfo = "Lo ingresado no es un email.";
        }
        if (mails.includes(email)){
            errors.mailInfo = "El email ya esta en uso";
        }
        setFormErrors(errors)
        setSubmitted(true)
        if (Object.keys(errors).length === 0) {
    try {
        const updatedUser = { ...usuario, nickname, mail: email };
        const response = await fetch(`http://localhost:3000/user/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          mail: email
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
  }
    }

    const handleSubmitControl = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const errors = {};

        if (passwordInput !== usuario.password) {
            errors.PasswordControl = "La contraseña es incorrecta.";
        }
        setFormErrors(errors)
        setSubmitted(true)
        if (Object.keys(errors).length === 0) {
            setValidated(true)
            cleanInputs()
        }
    }

    useEffect(() => {
    if (usuario) {
        setEmail(usuario.mail);
        setNickname(usuario.nickname);
    }
}, [usuario]);  // Se ejecutará cada vez que el usuario se actualice

    return (
        <>
        {usuario ? (
            <Modal show={show} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Informacion de la cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!validated &&  (
                            <Form id="validateForm" noValidate onSubmit={handleSubmitControl}>
                        <FloatingLabel controlId="PasswordControl" label="Contraseña actual" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className={`form-control ${
                                            submitted
                                                ? formErrors.PasswordControl
                                                ? "is-invalid"
                                                : "is-valid"
                                                : ""
                                            }`}/>
                            {formErrors.PasswordControl && (
                                <div className="invalid-feedback d-block">{formErrors.PasswordControl}</div>
                            )}
                        </FloatingLabel>
                    </Form>
                    )}
                    {validated && (
                        <Form id="infoForm" noValidate onSubmit={handleSubmitInfo}>
                        <FloatingLabel controlId="nicknameInfo" label="Usuario" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su nuevo usuario"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className={`form-control ${
                                            submitted
                                                ? formErrors.nicknameInfo
                                                ? "is-invalid"
                                                : "is-valid"
                                                : ""
                                            }`}/>
                            {formErrors.nicknameInfo && (
                                <div className="invalid-feedback d-block">{formErrors.nicknameInfo}</div>
                            )}
                        </FloatingLabel>
                        <FloatingLabel controlId="mailInfo" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Ingrese un nuevo email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`form-control ${
                                            submitted
                                                ? formErrors.mailInfo
                                                ? "is-invalid"
                                                : "is-valid"
                                                : ""
                                            }`}/>
                            {formErrors.mailInfo && (
                                <div className="invalid-feedback d-block">{formErrors.mailInfo}</div>
                            )}
                        </FloatingLabel>
                    </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Cerrar</Button>
                    {!validated && (
                        <Button variant="primary" type="submit" form="validateForm"
                         disabled={passwordInput.length < 1}
                        >Siguiente</Button>
                    )}
                    {validated && (
                        <Button variant="primary" type="submit" form="infoForm" 
                        disabled={(nickname === usuario.nickname && email === usuario.mail) || nickname.length < 1 || email.length < 1}
                        >Guardar</Button>
                    )}

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
    )
}

export default AcountInformation;