import React from "react";
import {Button, Container, Form, FormControl, Image, InputGroup, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSearch, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import avatar from "../images/avatar.png";
import "./Navbar.css";

export function NavbarComponent() {
    return (

        <Navbar collapseOnSelect bg="light" expand="md" className="navbar" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#">
                    Smilodon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" className="nav-link">
                            <FontAwesomeIcon icon={faBell} className="d-md-none d-md-block dropdown-icon"/>
                            Dashboard
                        </Nav.Link>
                        <Form className="d-none d-sm-block d-flex">
                            <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search athletes"
                                className="mr-2"
                                aria-label="Search athletes"
                            />
                                <InputGroup.Text id="btnGroupAddon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="#" className="d-none d-sm-block nav-link">
                            <FontAwesomeIcon icon={faBell} className="icon"/>
                        </Nav.Link>
                        <NavDropdown className="d-none d-sm-block"
                                     title={<Image src={avatar} roundedCircle className="avatar"/>} id="dropdown-menu">
                            <NavDropdown.Item href="#">
                                <FontAwesomeIcon icon={faUser} className="dropdown-icon"/>
                                My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#">
                                <FontAwesomeIcon icon={faCog} className="dropdown-icon"/>
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/logout">
                                <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon"/>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" className="d-md-none d-md-block nav-link">
                            <FontAwesomeIcon icon={faUser} className="dropdown-icon"/>
                            My Profile
                        </Nav.Link>
                        <Nav.Link href="#" className="d-md-none d-md-block nav-link">
                            <FontAwesomeIcon icon={faCog} className="dropdown-icon"/>
                            Settings
                        </Nav.Link>
                        <Nav.Link href="/logout" className="d-md-none d-md-block nav-link">
                            <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon"/>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
