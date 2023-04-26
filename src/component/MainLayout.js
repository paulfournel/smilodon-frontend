import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ProfileCard} from "./ProfileCard";
import avatar from "../images/avatar.png";
import ActivitySummaryCard from "./ActivitySummaryCard";
import {ActivityNewsFeed} from "./ActivityNewsFeed";
import {useDispatch, useSelector} from "react-redux";
import {getActivitiesThunk} from "../features/ActivitiesSlice";

export function MainLayout() {
    const dispatch = useDispatch();

    const activities = useSelector((state) => {
        return state.activities.activities
    });

    const user = useSelector((state) => {
        return state.user.domain
    });

    useEffect(() => {
        dispatch(getActivitiesThunk())
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
                <Col md={4} lg={3} xl={3} className="sidebar flex-nowrap">
                    <ProfileCard profile={user}/>
                    <ActivitySummaryCard/>
                </Col>
                <Col md={8} lg={9} xl={5} className="main-content">
                    {
                        activities.map(act => (<ActivityNewsFeed activity={act}/>))
                    }
                </Col>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap"/>
            </Row>
        </Container>
    );
}
