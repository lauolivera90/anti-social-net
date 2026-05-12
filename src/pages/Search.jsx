import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from "react-bootstrap"; // O el tuyo de shared/ui
import { PostPreview } from "@/entities/post";
import { getPosts } from '@/entities/post';
import { PostActions } from "@/features/Post-Management/ui/PostActions";

const Search = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      const tagId = searchParams.get('tagId');
      if (!tagId) {
        setBusqueda([]);
        setTag(null);
        return;
      }

      setLoading(true);
      try {
        const posts = await getPosts({ tagId });
        setBusqueda(posts);
        
        // Buscamos el nombre del tag en los resultados
        if (posts.length > 0) {
          const foundTag = posts[0].tag.find(t => t._id === tagId);
          setTag(foundTag);
        }
      } catch (error) {
        console.error("Error en búsqueda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div className="py-3 px-2">
      {/* Cabecera de búsqueda */}
      <header className="mb-4 border-bottom border-dark pb-3">
        <h4 className="fw-bold">
          {tag ? `Resultados para #${tag.name}` : "Explorar contenido"}
        </h4>
      </header>

      {/* Estados de la vista */}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : busqueda.length > 0 ? (
        <div className="posts-container">
          {busqueda.map((post) => (
            <PostPreview
              key={post._id}
              user={post.user}
              images={post.image}
              description={post.description}
              date={post.upload_date}
              postId={post._id}
              tags={post.tag}
              actions={<PostActions post={post} />}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-secondary fs-5">
            {tag 
              ? `No encontramos publicaciones con el tag #${tag.name}` 
              : "Utiliza el buscador o selecciona un tag para ver publicaciones relacionadas."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;