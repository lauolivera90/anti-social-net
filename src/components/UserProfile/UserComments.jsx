import {useEffect, useState} from "react";
import Comment from "../PostDetails/Comment";

const UserPosts = () => {
    const [comments, setComments] = useState([]);

    const loadComments = async () => {
        try {
            let userId = window.location.pathname.split('/').pop();
            const response = await fetch(`http://localhost:3000/comment`);
            if (!response.ok) {
                throw new Error("Error de red al cargar los posts del usuario");
            }
            const data = await response.json();
            const userComments = data.filter(comment => comment.user && comment.user._id === userId);
            setComments(userComments);
            //setPostLength(comments.length); // Actualiza la cantidad de posts
        } catch (error) {
            console.error("Error al cargar los posts:", error);
        }
    }

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <div>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <Comment 
                        key={index}
                        user={comment.user || "Desconocido"}
                        text={comment.text}
                        date={comment.upload_date}
                    />
                ))
            ) : (
                <div className="p-5 bg-black">
                    <span>No hay comentarios disponibles.</span>
                </div>
            )}
        </div>
    )
}

export default UserPosts;