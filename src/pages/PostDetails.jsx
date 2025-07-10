import { useEffect, useState } from 'react';
import Comment from "../components/PostDetails/Comment";
import ContentPost from "../components/PostDetails/ContentPost"
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';
import MakeComment from '../components/PostDetails/MakeComment/makeComment';
import AsideNav  from '../components/AsideNav/AsideNav';

const PostDetails = () => {
  const [postData, setPostData] = useState(null);
  const [id, setId] = useState("null");


 useEffect(() => {
    async function getPost() {
      try {
        let postId = window.location.pathname.split('/').pop();
        const response = await fetch(`http://localhost:3000/post/${postId}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor. Ver detalle: ' + response.status);
        }
        const data = await response.json();
        const {
          description,
          user: { nickname, _id},
          upload_date,
          image,
          comments = [],
          tag = []
        } = data;

        setPostData({
          description,
          user: {nickname, _id},
          date: upload_date,
          images: image,
          comments: comments,
          tags: tag,
          id: _id
        });

        setId(data._id)
        
      } catch (error) {
        console.error({ error: error.message });
      }
    }
    getPost();
  }, []);

  if (postData === null) {
    return <p>Cargando publicación...</p>;
  }

  return (
    <Container fluid> 
      <Row>
        <Col xs={12} md="auto" className="bg-black border-end border-dark">
          <AsideNav/>
        </Col>
        <Col>
            {postData ? (
          <Row>
          <ContentPost
            description={postData.description}
            user={postData.user}
            date={postData.date}
            image={postData.images}
            comment={postData.comments}
            tag={postData.tags || []}
          />
          <Container fluid className="border-bottom border-dark p-0 m-0 pt-3">
            <MakeComment replicatedUser={postData.user} postId={id}/>  
          </Container> 
          </Row>
        ) : (
          <Spinner></Spinner>
        )}
          <Container className='ajustContainer'>
            {postData.comments && postData.comments.length > 0 ? (
              postData.comments.map((post, index) => (
                <Comment 
                  key={index}
                  user={post.user || "Desconocido"}
                  text={post.text}
                  date={post.upload_date}
                />
              ))
              ) : (
                <Container fluid className='bg-black ajustContainer p-5'>No hay comentarios disponibles.</Container>
              )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetails