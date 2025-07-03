import PostImages from "../PostDetails/Images"
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import Tags from "../PostDetails/Tags";

const PostPreview = ({user, description, images, date, postId, tags,}) => {
    const navigate = useNavigate();

    const goToPost = (e) => {
        e.stopPropagation(); // para evitar que se propague al clic general del post
        navigate(`/post/${postId}`);
    };

    const goToProfile = (e) => {
        e.stopPropagation();
        if (user && user._id) {
            if (window.location.pathname.split('/')[1] != "user") navigate(`/user/${user._id}`);
        } else {
            console.log("User no válido");
        }
    };

    return (
        <div className="d-flex flex-row border-0 border-bottom border-dark bg-black p-4 gap-2" onClick={goToPost}>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon"
            onClick={goToProfile} 
            className="img-circle" style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
            <div className="text-white d-flex flex-column">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row gap-2">
                        <p className="text-capitalize fw-bold m-0" onClick={goToProfile}>{user.nickname}</p>
                        <p className="text-secondary m-0" onClick={goToProfile}>@{user.nickname}</p>
                        <TimeAgo date={date}/>
                    </div>
                    <div className="d-flex flex-column">
                        <p className="text-start m-0">{description}</p>
                        <Tags tags={tags} />
                    </div>
                </div>
                <PostImages images={images} />
            </div>
        </div>
    )
};

export default PostPreview;