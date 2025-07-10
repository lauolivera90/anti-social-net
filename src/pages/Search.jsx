
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import TypeOfFeed from '../components/Home/TypeOfFeed';
import { useState, useEffect } from 'react';
import PostPreview from '../components/Home/PostPreview';
import { Container, Col, Row, Button } from "react-bootstrap";

const Searched = () => {
    const [busqueda, setBusqueda] = useState([])
    const [tag,setTag]=useState("")

    const getPostsByTag = async () => {
        try {
            const value = window.location.pathname.split("/").pop();
            setTag(value)
            const response = await fetch("http://localhost:3000/post");
            if (!response.ok) {
                throw new Error("No se pudo obtener los post");
            }
            //No me fijo si es valido el tag por ahora
            const data = await response.json();
            const postConTags = data.filter(post => (post.tag).includes(value) || (post.tag).includes(value.toLocaleUpperCase()))
            setBusqueda(postConTags)

        } catch (error) {
            console.log("Se produjo el siguienter error ", error)
        }
    }
    useEffect(() => getPostsByTag(), [])
    return(
    <>
        <Container fluid className="ajustContainer">
            <Row>
                <Col xs={12} md={9} lg={10} xxl={11} className="ajustContainer">
                    <TypeOfFeed />
                    <h3>Los resultados de su búsqueda</h3>

                    {busqueda.lenght > 0 ? (

                        <Container className="ajustContainer">
                            {busqueda.map((post) => (
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
                        </Container>)
                        : (
                            <p>Lo sentimos, no tenemos post con tag: {tag}</p>
                        )

                    }
                </Col>
            </Row>
        </Container>

    </>)

}

export default Searched;