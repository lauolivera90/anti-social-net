import { Form, Spinner, FloatingLabel, Modal, Button } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext";
import {useState } from "react";


const Desactivate = ({show, handleClose}) =>{
    const { usuario, logout } = useAuth();
    const [formErrors, setFormErrors] = useState({});
    const [passwordInput, setPasswordInput] = useState("")
    const [nickname, setNickname] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [validated, setValidated] = useState(false)


    const cleanInputs = () => {
        setNickname("");
        setPasswordInput("")
        setFormErrors({});
        setSubmitted(false)
        }

    const close = () => {
        const isDirty = nickname.length > 0;
        if (isDirty) {
            const confirmExit = window.confirm("Hay cambios sin guardar. ¿Estás seguro que querés salir?");
            if (!confirmExit) return;
        }
        handleClose()
        cleanInputs()
    }

    const userPosts = async () => {
        try {
        const response = await fetch(`http://localhost:3000/post?userId=${usuario._id}`);
        if (!response.ok) {       
            throw new Error("Error de red al cargar los posts del usuario");
        }
        const data = await response.json();
        return data
        } catch (error) {
        console.error("Error al cargar los posts:", error);
        }
    };

    const userComments = async () => {
        try {
        const response = await fetch(`http://localhost:3000/comment`);
        if (!response.ok) {
            throw new Error("Error de red al cargar los comentarios del usuario");
        }
        const data = await response.json();
        const userComments = data.filter(
            (comment) => comment.user && comment.user._id === usuario._id
        );
        return userComments
        } catch (error) {
        console.error("Error al cargar los comentarios:", error);
        }
    };

    const deleteUserInteraction = async () => {
    try {
        const posts = await userPosts();
        const comments = await userComments();

        // Eliminar los posts
        for (const post of posts) {
            const response = await fetch(`http://localhost:3000/post/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`Error al eliminar el post ${post._id}`);
            console.log(`Post ${post._id} eliminado exitosamente`);
        }

        // Eliminar los comentarios
        for (const comment of comments) {
            const response = await fetch(`http://localhost:3000/comment/${comment._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`Error al eliminar el comentario ${comment._id}`);
            console.log(`Comentario ${comment._id} eliminado exitosamente`);
        }

    } catch (error) {
        console.error("Error al eliminar interacciones del usuario:", error.message);
    }
};

    const handleSubmitDesactivate = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        

        const errors = {};

        if (nickname !== usuario.nickname) {
            errors.nickname = "El nombre de usuario es incorrecto";
        }

        setFormErrors(errors);
        setSubmitted(true); 

        if (Object.keys(errors).length === 0) {
            try {
                deleteUserInteraction()
                const response = await fetch(`http://localhost:3000/user/${usuario._id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            });
                if (!response.ok) throw new Error("Error al cambiar la contraseña");
                cleanInputs()
                handleClose()
                alert("Su cuenta ha sido eliminado con exito.");
                logout()
            } catch (error) {
                console.error("Error al cambiar contraseña:", error.message);
            }
        }
    };

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

    return (
     <>
      {usuario ? (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Desactivar cuenta</Modal.Title>
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
                        <Form id="desactivateForm" noValidate onSubmit={handleSubmitDesactivate}>
                            <h6 className="text-start text-bold">Esto desactivara tu cuenta</h6>
                            <p className="text-start">Estás a punto de iniciar el proceso de desactivación de tu cuenta Antisocial. Tu nombre de usuario y perfil público ya no serán visibles.</p>
                            <h6>¿Que deberias saber?</h6>
                            <p className="border-bottom border-light-subtle pb-3 text-danger">Se eliminaran todas tus publicaciones y comentarios.</p>
                            <p className="border-bottom border-light-subtle pb-3 text-danger">No podras revertir esta decisión.</p>
                        <FloatingLabel controlId="nickname" label="Usuario" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el usuario"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className={`form-control ${
                                            submitted
                                                ? formErrors.nickname
                                                ? "is-invalid"
                                                : "is-valid"
                                                : ""
                                            }`}/>
                            {formErrors.nickname && (
                                <div className="invalid-feedback d-block">{formErrors.nickname}</div>
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
                        <Button variant="danger" type="submit" form="desactivateForm" 
                        disabled={nickname.length < 1}
                        >Eliminar</Button>
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
  );
};

export default Desactivate;