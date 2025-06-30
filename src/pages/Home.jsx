import { useEffect, useState } from "react";
import PostPreview from "../components/Home/postPreview";
import TypeOfFeed from "../components/Home/TypeOfFeed";

function Home() {
  const [posts, setPosts] = useState([]);

  const cargarPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/post"); // ojo: asegúrate del endpoint
      if (!response.ok) {
        throw new Error("Error de red");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error al cargar posts:", error);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, []);

  return (
    <div className="container mt-4">
        <TypeOfFeed />
      <div>
        {posts.map((post) => (
            <PostPreview
                key={post._id}
                user={post.user?.nickname || "Desconocido"}
                images={post.image}
                description={post.description}
                date={post.upload_date}
                postId={post._id}
            />
        ))}
      </div>
    </div>
  );
}

export default Home;
