import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from '../components/NotLogged/NotLogged.module.css'

export default function Contacto() {
    const navigate = useNavigate()
    const goToRoot = () => {
        navigate(`/`);
    }

    return (
        <div className={styles.contenedor}>
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
                    <h1 className="fw-bold text-black">AntiSocial Net</h1>
                    <h3 className="fw-normal text-black">Contáctate con nosotros</h3>

                    <ul className="list-group">
                        <li className="list-group-item"><p style={{ textAlign: 'left' }}><b>Oliviera, Lautaro</b></p> Dirección de correo electrónico: <i>lautioliviera@gmail.com</i><br></br></li>
                        <li className="list-group-item"><p style={{ textAlign: 'left' }}><b>Labriola, Federico</b></p> Dirección de correo electrónico: <i>fede.lean.lab@gmail.com</i><br></br></li>
                        <li className="list-group-item"><p style={{ textAlign: 'left' }}><b>Oliviera, Lautaro</b></p> Dirección de correo electrónico: <i>lautioliviera@gmail.com</i><br></br></li>
                        <li className="list-group-item"><p style={{ textAlign: 'left' }}><b>Labriola, Federico</b></p> Dirección de correo electrónico: <i>fede.lean.lab@gmail.com</i><br></br></li>
                    </ul>
                    <p>No te olvides dejarnos tus datos. Te contestaremos a la brevedad</p>
                    <footer>Saludos de parte de nuestro Staff</footer>
                    <button className="btn btn-primary w-25 mt-5" onClick={goToRoot}>
                        Volver
                    </button>

                </div>
            </div>
        </div>



    );
}