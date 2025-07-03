import { useNavigate } from "react-router-dom";

const Public = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate(`/login`);
    }

    return (
        <div>
            <button onClick={goToLogin}>
                login
            </button>
        </div>
    )
}

export default Public;