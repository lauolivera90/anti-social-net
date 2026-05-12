import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { PostDetails, getPostById } from '@/entities/post';
import { Comment } from "@/entities/comment";
import { PostActions } from '@/features/Post-Management/ui';
import { MakeComment } from '@/features/CreateComment/ui';
import { CommentActions } from '@/features/Comment-Management/ui';
import { SectionNav } from '@/widget/layout';

export const PostView = ({ postId }) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getPostById(postId);
        if (isMounted) {
          setPostData(data);
        }
      } catch (error) {
        console.error("Error al cargar el post:", error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (postId) fetchPost();

    return () => { isMounted = false; };
  }, [postId]);

  if (loading) {
    return (
      <>
        <SectionNav title="Post" />
        <Container className="text-center p-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-secondary mt-3">Cargando conversación...</p>
        </Container>
      </>
    );
  }

  if (!postData) {
    return (
      <>
        <SectionNav title="Post" />
        <div className="p-5 text-white text-center">Publicación no encontrada.</div>
      </>
    );
  }

  return (
    <>
      <SectionNav title="Post" />
      <PostDetails
        postId={postData._id}
        description={postData.description}
        user={postData.user}
        date={postData.upload_date}
        image={postData.image}
        tags={postData.tag || []}
        actions={<PostActions post={postData} />}
      />

      <div className="border-bottom border-dark py-3 px-4">
        <MakeComment 
          replicatedUser={postData.user} 
          postId={postData._id} 
          onCommentAdded={() => window.location.reload()}
        />
      </div>

      <div className="pb-5">
        {postData.comments?.length > 0 ? (
          postData.comments.map((comment) => (
            <Comment 
              key={comment._id}
              commentId={comment._id}
              user={comment.user}
              text={comment.description || comment.text}
              date={comment.upload_date}
              actions={<CommentActions comment={comment} />}
            />
          ))
        ) : (
          <div className="p-5 text-center text-secondary small">
            No hay comentarios aún.
          </div>
        )}
      </div>
    </>
  );
};