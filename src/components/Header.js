import React, { Component } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
    return (<>       
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand as={Link} to="/">GREEN MALL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/category/interior">인테리어</Nav.Link>
                <Nav.Link as={Link} to="/category/furniture">가구</Nav.Link>
                <Nav.Link as={Link} to="/category/plant">식물/데코</Nav.Link>
                <Nav.Link as={Link} to="/productMng">상품관리</Nav.Link>
                <Nav.Link as={Link} to="/"><IoCartOutline/></Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </>)
}

export default Header;