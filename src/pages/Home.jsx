import { useEffect, useState } from "react";
import PostPreview from "../components/Home/postPreview";
import TypeOfFeed from "../components/Home/TypeOfFeed";
import MakeAPost from "../components/Home/MakeAPost/MakeAPost";
import AsideNav from "../components/AsideNav/AsideNav";
import { Container, Col, Row, Button } from "react-bootstrap";

function Home() {
  const [posts, setPosts] = useState([]);

  const cargarPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/post");
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
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

    if (bottom) {
      console.log("Llegaste al final");
      }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    cargarPosts();
  }, []);

return (
  <Container fluid>
    <Row> 
      <Col xs={12} md="auto" className="bg-black border-end border-dark">
        <AsideNav/>
      </Col>

      <Col className="ajustContainer">
        <TypeOfFeed />
        <MakeAPost />

        <Container className="ajustContainer">
          {posts.map((post) => (
            <PostPreview
              key={post._id}
              user={post.user || "Desconocido"}
              images={post.image}
              description={post.description}
              date={post.upload_date}
              postId={post._id}
              tags={post.tag || []}
            />
          ))}
        </Container>
      </Col>
    </Row>
  </Container>
);

}

export default Home;
