import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {deleteStrava, patchUser, processActivities} from "../features/API";
import {useDispatch, useSelector} from "react-redux";
import {getDomainUserThunk} from "../features/UsersSlice";
import './SettingsLayout.css'

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
        patchUser({firstName, lastName, username}).then(() =>
            dispatch(getDomainUserThunk())
        );
    };

    const handleClick = () => {
        window.location.href = "/api/connect_other_account";
    };

    const revokeStravaAccess = () => {
        deleteStrava().then(() => dispatch(getDomainUserThunk()))
    }

    const handleClickProcessActivities = () => {
        processActivities();
    };

    return (
        <Container fluid>
            <Row>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
                <Col md={12} lg={12} xl={8} className="main-content">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Edit Profile</Card.Title>
                            <Form inline onSubmit={handleSubmit}>
                                <Form.Group as={Row} controlId="formFirstName">
                                    <Form.Label column sm={2}>
                                        First Name
                                    </Form.Label>
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
                                    <Form.Label column sm={2}>
                                        Last Name
                                    </Form.Label>
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
                                    <Form.Label column sm={2}>
                                        Username
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Row style={{marginTop: '20px'}}>
                                    <Col xs={3}/>
                                    <Col xs={6}><Button type="submit" style={{width: '90%'}}>Update</Button></Col>
                                    <Col xs={3}/>

                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>My Apps</Card.Title>

                            {user.strava ? (<>
                                    <div>Strava profile</div>
                                    <div className="card-info">
                                        <div className="card-info-item">
                                            <Image src={user.strava.profileMedium} roundedCircle/>
                                        </div>
                                        <div className="card-info-item">
                                            <span>{user.strava.id}</span>
                                            <small>ID</small>
                                        </div>
                                        <div className="card-info-item">
                                            <span>{user.strava.firstname}</span>
                                            <small>First Name</small>
                                        </div>
                                        <div className="card-info-item">
                                            <span>{user.strava.lastname}</span>
                                            <small>Last Name</small>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col xs={6}>
                                            <Button className="mt-3" onClick={handleClickProcessActivities} style={{width: '90%'}}>
                                                Process Activities
                                            </Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button className="mt-3" variant={"warning"} onClick={revokeStravaAccess} style={{width: '90%'}}>
                                                Revoke Access
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Button className="mr-3" onClick={handleClick}>
                                    Link Strava Profile
                                </Button>
                            )}

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
            </Row>
        </Container>
    );
}
