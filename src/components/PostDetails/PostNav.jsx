import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const PostNav = () => {
    const navigate = useNavigate();

    const goBack = () => {    
        navigate(-1); // Navega a la página anterior
    }

    return (
        <div className='d-flex flex-row gap-5 position-sticky top-0 bg-black text-white pt-3 pb-3'>
            <i className="bi bi-arrow-left fs-5 hoover:bg-white" onClick={goBack}></i>
            <h4 className=''>Post</h4>
        </div>
    )
}

export default PostNav;