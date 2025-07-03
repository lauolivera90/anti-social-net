import { useNavigate } from "react-router-dom";

const Public = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate(`/login`);
    }

    const goToRegister = () => {
        navigate(`/register`);
    }

    return (
         <div className="d-flex vh-100">
      <div className="w-100 h-100">
        <img
          src="https://i.pinimg.com/736x/79/0e/44/790e44391a38a9589e32c846947a01bb.jpg"
          alt="backGround"
          className="w-100 h-100 object-fit-cover"
          style={{ display: "block" }}
        />
      </div>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-3 p-5">
        <h1 className="fw-bold text-black">Interacción en todo momento</h1>
        <h3 className="fw-normal text-black">Unete a Antisocial.</h3>
        <button className="btn btn-primary w-75 mt-5" onClick={goToLogin}>
          Iniciar sesión
        </button>
        <button className="btn btn-outline-secondary text-black w-75" onClick={goToRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Public;