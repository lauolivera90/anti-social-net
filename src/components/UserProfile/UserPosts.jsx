import {useEffect, useState} from "react";
import PostPreview from "../Home/postPreview";

const UserPosts = ({setPostLength}) => {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        try {
            let userId = window.location.pathname.split('/').pop();
            const response = await fetch(`http://localhost:3000/post?userId=${userId}`);
            if (!response.ok) {
                throw new Error("Error de red al cargar los posts del usuario");
            }
            const data = await response.json();
            setPosts(data);
            setPostLength(data.length); // Actualiza la cantidad de posts
        } catch (error) {
            console.error("Error al cargar los posts:", error);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <>
            {posts && posts.length > 0 ? (
            posts.map((post) => (
                    <PostPreview
                        key={post._id}
                        user={post.user || "Desconocido"}
                        images={post.image}
                        description={post.description}
                        date={post.upload_date}
                        postId={post._id}
                        tags={post.tag || []}
                    />
                    ))
                ) : (
                <div className="bg-black p-5">
                    <span>No hay publicaciones disponibles</span>
                </div>
            )}
        </>
    )
}

export default UserPosts;