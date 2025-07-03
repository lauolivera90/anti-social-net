import TimeAgo from "../Home/TimeAgo";
import { Navigate, useNavigate } from "react-router-dom";

const Comment = ({user, text, date}) => {
    const navigate = useNavigate();

    const goToProfile = (e) => {
        e.stopPropagation();
        if (user && user._id) {
            if (window.location.pathname.split('/')[1] != "user") navigate(`/user/${user._id}`);
        } else {
            console.log("User no válido");
            console.log(user)
        }
    };
    return (
        <div className="d-flex flex-row border-0 border-bottom border-dark bg-black pe-4 ps-4 pt-3 pb-1 gap-2 text-white">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" onClick={goToProfile}
            className="img-circle" style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-2">
                    <p className="text-capitalize fw-bold m-0" onClick={goToProfile}>{user.nickname}</p>
                    <p className="text-secondary m-0" onClick={goToProfile}>@{user.nickname}</p>
                    <TimeAgo date={date} />
                </div>
                <p className="text-start">{text}</p>
            </div>
        </div>
    );
};

export default Comment;