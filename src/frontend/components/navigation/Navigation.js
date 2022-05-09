import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navigation.css";

export const Navigation = () => {
    return (
        <Navbar id="navigationBar" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">League-Tracker</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Champions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
