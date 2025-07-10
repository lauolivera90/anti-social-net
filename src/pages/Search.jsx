import {useState } from "react";
import { Container, Form, Row, Col, Nav, Tabs, Tab } from "react-bootstrap"

const Search = () =>{
    const [input, setInput] = useState("")
    const tokens = input.split(/\s+/);
    let author = null 
    let tags = [];
    let content = [];

    const handleSearch = () => {
        setInput(document.getElementById("searchbar").value)
        tokens.forEach(token => {
        if (token.startsWith("From:@")) {
            author = token.slice(6).toLowerCase(); // quitar "From:@"
        } else if (token.startsWith("#")) {
            tags.push(token.slice(1).toLowerCase()); // quitar "#"
        } else {
            content.push(token.toLowerCase());
        }
        });
    }


    return (
        <Container className="text-white">
            <Row>
                <Col>
                    <Form.Control type="text" id="searchbar" placeholder="Buscar" onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Nav.Link id="search-post" style={{ cursor: 'pointer' }}
                    className="border-bottom border-5 rounded-1"
                    >Publicaciones</Nav.Link>
                </Col>
                <Col>
                    <Nav.Link id="search-user" style={{ cursor: 'pointer' }}
                    className="border-bottom border-5 rounded-1"
                    >Usuarios</Nav.Link>
                </Col>
                <Col>
                    <Nav.Link id="search-media" style={{ cursor: 'pointer' }}
                    className="border-bottom border-5 rounded-1"
                    >Fotos</Nav.Link>
                </Col>
            </Row>
            <Row>
                <Col id="show-post">
                </Col>
                <Col id="show-user"></Col>
                <Col id="show-media"></Col>
            </Row>
        </Container>

    )
}

export default Search;