import PostImages from "../PostDetails/Images"
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";

const PostPreview = ({user, description, images, date, postId}) => {
    const navigate = useNavigate();

    const goToPost = (e) => {
        e.stopPropagation(); // para evitar que se propague al clic general del post
        navigate(`/post/${postId}`);
    };

    return (
        <div className="d-flex flex-row border bg-black container p-4 gap-2" onClick={goToPost}>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" 
            className="img-circle" style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
            <div className="text-white d-flex flex-column">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row gap-2">
                        <p className="text-capitalize fw-bold">{user}</p>
                        <p className="text-secondary">@{user}</p>
                        <TimeAgo date={date}/>
                    </div>
                    <p className="text-start">{description}</p>
                </div>
                <PostImages images={images} />
            </div>
        </div>
    )
};

export default PostPreview;