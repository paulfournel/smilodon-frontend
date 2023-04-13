import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {processActivities} from "../features/API";

export function SettingsLayout() {

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
                    <Button onClick={handleClick}> Stava </Button>
                    <Button onClick={handleClickProcessActivities}> Process </Button>
                </Col>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
            </Row>
        </Container>
    );
}
