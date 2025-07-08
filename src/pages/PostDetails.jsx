import { useEffect, useState } from 'react';
import Comment from "../components/PostDetails/Comment";
import ContentPost from "../components/PostDetails/ContentPost"
import { Container } from 'react-bootstrap';

const PostDetails = () => {
  const [postData, setPostData] = useState(null);

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
          tags: tag
        });
        
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
    <> 
      {postData ? (
        <ContentPost
          description={postData.description}
          user={postData.user}
          date={postData.date}
          image={postData.images}
          comment={postData.comments}
          tag={postData.tags || []}
        />
      ) : (
        <p>Cargando publicación...</p>
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
              <Container className='bg-black ajustContainer'>No hay comentarios disponibles.</Container>
            )}
        </Container>
    </>
  );
}

export default PostDetails