import { useNavigate } from 'react-router-dom'
const UserInformation = ({user, postsCount, commentsCount}) => {
    const navigate = useNavigate()
        
    const goToEdit = () => {
            navigate(`/user/${user._id}/edit`)
        }

    return (
        <div className="d-flex flex-row align-items-center justify-content-center bg-black p-5 gap-5">
            <img alt="user icon" class="img-circle" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
             style={{ width: "150px", height: "150px", objectFit: "cover" }}></img>
            <div className="d-flex flex-column ms-3 gap-3">
                <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row gap-3">
                        <p className="text-white text-capitalize m-0">{user.nickname}</p>
                        <span className="text-secondary text-capitalize text-start">@{user.nickname}</span>
                    </div>
                    <button onClick={goToEdit} className="btn btn-primary">Actualizar perfil</button>
                </div>
                <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row gap-2">
                        <span className="text-white">{postsCount}</span>
                        <span className="text-secondary">Publicaciones</span>
                    </div>
                    <div className="d-flex flex-row gap-2">
                        <span className="text-white">{commentsCount}</span>
                        <span className="text-secondary">Comentarios</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInformation;