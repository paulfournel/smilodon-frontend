import React from "react";
import {Container, Form, Image, InputGroup, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSearch, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import avatar from "../images/avatar.png";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {SearchBox} from "./SearchBox";
import {useSelector} from "react-redux";

export function NavbarComponent() {

    const user = useSelector((state) => {
        return state.user.domain
    });

    const navigate = useNavigate();

    return (

        <Navbar collapseOnSelect bg="light" expand="md" className="navbar" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#">
                    Smilodon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{marginTop: '15px'}} >
                        <Nav.Link href="#" className="nav-link">
                            Dashboard
                        </Nav.Link>
                        <SearchBox placeholder="Search athletes" />
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="#" className="d-none d-sm-block nav-link">
                            <FontAwesomeIcon icon={faBell} className="icon"/>
                        </Nav.Link>
                        <NavDropdown className="d-none d-sm-block"
                                     title={<Image src={'/open-api/profile_picture?user=' + user.id} roundedCircle className="avatar"/>} id="dropdown-menu">
                            <NavDropdown.Item href="#">
                                <FontAwesomeIcon icon={faUser} className="dropdown-icon"/>
                                My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("/settings")}>
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
                        <Nav.Link onClick={() => navigate("/settings")} className="d-md-none d-md-block nav-link">
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
