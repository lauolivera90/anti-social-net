import {useEffect, useState} from "react";
import UserInformation from "../components/UserProfile/UserInformation";
import UserPosts from "../components/UserProfile/userPosts";
import UserComments from "../components/UserProfile/UserComments";
import PostNav from "../components/PostDetails/PostNav";
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';


const Profile = () => {
    const [user, setUser] = useState({});
    const [postLenght, setPostLength] = useState();
    const [commentsLenght, setCommentsLenght] = useState();


    const loadUser = async () => {
        try {
            let userId = window.location.pathname.split('/').pop();
            const response = await fetch(`http://localhost:3000/user/${userId}`);
            if (!response.ok) {
                throw new Error("Error de red al cargar el usuario");
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        }
    }

    

    function handleShowPosts() {
        const postsSection = document.querySelector('#user-posts');
        const postsButton = document.querySelector('#user-postsButton');
        const commentsButton = document.querySelector('#user-commentsButton');
        const commentsSection = document.querySelector('#user-comments');
        //Mostrar los posts y ocultar los comentarios
        postsSection.style.display = 'block';
        commentsSection.style.display = 'none';
        //Cambiar el estilo de los botones
        postsButton.classList.add('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        commentsButton.classList.remove('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        commentsButton.classList.add('text-secondary');

    }

    function handleShowComments() {
        const postsSection = document.querySelector('#user-posts');
        const postsButton = document.querySelector('#user-postsButton');
        const commentsButton = document.querySelector('#user-commentsButton');
        const commentsSection = document.querySelector('#user-comments');
        //Mostrar los comentarios y ocultar los posts
        postsSection.style.display = 'none';
        commentsSection.style.display = 'block';
        //Cambiar el estilo de los botones
        commentsButton.classList.add('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        postsButton.classList.remove('text-white', 'border-0', 'border-bottom', 'border-5', 'rounded-1');
        postsButton.classList.add('text-secondary');
    }



    useEffect(() => {
        loadUser();
    }, []);


    return (
    <Container fluid className="bg-black">
        <PostNav />

        <Container className="bg-black">
        <Row>
            <Col>
            <UserInformation
                user={user}
                postsCount={postLenght}
                commentsCount={commentsLenght}
            />
            </Col>
        </Row>

        <Row className="mt-5 border-bottom border-dark justify-content-evenly">
            <Col xs="auto">
            <Nav.Link
                id="user-postsButton"
                className="text-white text-center pb-2 border-bottom border-5 rounded-1"
                onClick={handleShowPosts}
                style={{ cursor: 'pointer' }}
            >
                Publicaciones
            </Nav.Link>
            </Col>
            <Col xs="auto">
            <Nav.Link
                id="user-commentsButton"
                className="text-white text-center pb-2"
                onClick={handleShowComments}
                style={{ cursor: 'pointer' }}
            >
                Comentarios
            </Nav.Link>
            </Col>
        </Row>
        <Row>
            <Col>
            <Container id="user-posts">
                <UserPosts setPostLength={setPostLength} />
            </Container>
            <Container id="user-comments"  style={{ display: 'none'}}>
                <UserComments setCommentsLenght={setCommentsLenght} />
            </Container>
            </Col>
        </Row>
        </Container>
    </Container>
    );

}

export default Profile;