import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { processActivities, patchUser } from "../features/API";
import {useDispatch, useSelector} from "react-redux";
import {getDomainUserThunk} from "../features/UsersSlice";

export function SettingsLayout() {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    let user = useSelector((state) => state.user.domain);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
    }, [user]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        patchUser({ firstName, lastName, username }).then(() => dispatch(getDomainUserThunk()));
    };

    const handleClick = () => {
        window.location.href = "/api/connect_other_account"
    };

    const handleClickProcessActivities = () => {
        processActivities()
    }

    return (
        <Container fluid>
            <Row>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
                <Col md={12} lg={12} xl={8} className="main-content">

                    <hr/>

                    <Button onClick={handleClick}>Stava</Button>
                    <Button onClick={handleClickProcessActivities}>Process</Button>

                    <hr/>

                    <Form inline onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formFirstName">
                            <Form.Label column sm={2}>First Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formLastName">
                            <Form.Label column sm={2}>Last Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formUsername">
                            <Form.Label column sm={2}>Username</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </Col>
                        </Form.Group>
                        <Button type="submit">Update</Button>
                    </Form>
                    <hr/>
                </Col>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
            </Row>
        </Container>
    );
}
