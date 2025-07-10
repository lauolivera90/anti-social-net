import TimeAgo from "../Home/TimeAgo";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

const Comment = ({ user, text, date }) => {
  const navigate = useNavigate();

  const goToProfile = (e) => {
    e.stopPropagation();
    if (user && user._id) {
      if (window.location.pathname.split("/")[1] !== "user") {
        navigate(`/user/${user._id}`);
      }
    } else {
      console.log("User no válido");
      console.log(user);
    }
  };

  return (
    <Container
      fluid
      className="border-0 border-bottom border-dark bg-black pe-4 ps-4 pt-3 pb-1 text-white"
    >
      <Row className="align-items-start">
        <Col xs="auto">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user icon"
            onClick={goToProfile}
            roundedCircle
            style={{ width: "48px", height: "48px", objectFit: "cover", cursor: "pointer" }}
          />
        </Col>

        <Col>
          <Row className="align-items-center">
            <Col xs="auto" onClick={goToProfile} style={{ cursor: "pointer" }}>
              <p className="text-capitalize fw-bold m-0">{user.nickname}</p>
            </Col>
            <Col xs="auto" onClick={goToProfile} style={{ cursor: "pointer" }}>
              <p className="text-secondary m-0">@{user.nickname}</p>
            </Col>
            <Col xs="auto">
              <TimeAgo date={date} />
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-start">{text}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
