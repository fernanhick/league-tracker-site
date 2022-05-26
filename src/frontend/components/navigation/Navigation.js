import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";

export const Navigation = () => {
    return (
        <Navbar id="navigationBar" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>League Tracker</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        <Link to="/summoner">Summoner</Link>
                        <Link to="/champions">Champions</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
