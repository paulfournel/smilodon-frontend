import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ProfileCard} from "./ProfileCard";
import avatar from "../images/avatar.png";
import ActivitySummaryCard from "./ActivitySummaryCard";
import {ActivityNewsFeed} from "./ActivityNewsFeed";

export function MainLayout() {

    const profile = {
        name: 'John Doe',
        profilePicUrl: avatar,
        following: 100,
        followers: 500,
        activities: 200,
        lastActivity: 'Cycling - 20.5 km',
    };

    const staticActivity = {
        icon: avatar,
        name: "John Doe",
        date: "April 1, 2023",
        location: "San Francisco, CA",
        title: "Morning Run",
        distance: 5.2,
        elevationGain: 200,
        time: "0:42:16",
        map: "https://files.mastodon.social/cache/media_attachments/files/110/125/438/455/631/707/original/bf1e23d9b43d21a2.png"
    }

    return (
        <Container fluid>
            <Row>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap" />
                <Col md={4} lg={3} xl={3} className="sidebar flex-nowrap">
                    <ProfileCard profile={profile}/>
                    <ActivitySummaryCard/>
                </Col>
                <Col md={8} lg={9} xl={5} className="main-content">
                    <ActivityNewsFeed activity={staticActivity}/>
                    <ActivityNewsFeed activity={staticActivity}/>
                    <ActivityNewsFeed activity={staticActivity}/>
                    <ActivityNewsFeed activity={staticActivity}/>
                    <ActivityNewsFeed activity={staticActivity}/>
                </Col>
                <Col md={0} lg={0} xl={2} className="sidebar flex-nowrap" />
            </Row>
        </Container>
    );
}
