import PostImages from "../PostDetails/Images";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import Tags from "../PostDetails/Tags";
import { Container, Image } from "react-bootstrap";

const PostPreview = ({ user = {}, description, images, date, postId, tags }) => {
  const navigate = useNavigate();

  const goToPost = (e) => {
    e.stopPropagation();
    navigate(`/post/${postId}`);
  };

  const goToProfile = (e) => {
    e.stopPropagation();
    if (user._id) {
      if (window.location.pathname.split('/')[1] !== "user") {
        navigate(`/user/${user._id}`);
      }
    } else {
      console.log("User no válido");
    }
  };

  return (
    <Container
      className="d-flex flex-row border-0 border-bottom border-dark bg-black p-4 gap-2"
      onClick={goToPost}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToPost(e)}
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt={`${user.nickname || "Usuario"} icon`}
        onClick={goToProfile}
        className="img-circle"
        style={{ width: "48px", height: "48px", objectFit: "cover" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && goToProfile(e)}
      />
      <Container className="text-white d-flex flex-column flex-grow-1">
        <div className="d-flex flex-row gap-2 align-items-center">
          <p
            className="text-capitalize fw-bold m-0"
            onClick={goToProfile}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToProfile(e)}
          >
            {user.nickname || "Desconocido"}
          </p>
          <p
            className="text-secondary m-0"
            onClick={goToProfile}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToProfile(e)}
          >
            @{user.nickname || "desconocido"}
          </p>
          <TimeAgo date={date} />
        </div>
        <p className="text-start m-0">{description}</p>
        <Tags tags={tags} />
        <PostImages images={images} />
      </Container>
    </Container>
  );
};

export default PostPreview;
