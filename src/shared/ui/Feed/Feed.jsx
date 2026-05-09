import { useEffect, useState } from "react";
import { PostPreview, getAllPosts } from "@/entities/post";
import { Container, Spinner } from "react-bootstrap";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    
    // Lógica de scroll (podrías luego moverla a un hook propio useInfiniteScroll)
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (bottom) {
        console.log("Cargar más posts..."); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <div className="text-center p-5"><Spinner variant="primary" /></div>;

  return (
    <Container className="p-0">
      {posts.map((post) => (
        <PostPreview
          key={post._id}
          user={post.user}
          images={post.image}
          description={post.description}
          date={post.upload_date}
          postId={post._id}
          tags={post.tag}
        />
      ))}
    </Container>
  );
};