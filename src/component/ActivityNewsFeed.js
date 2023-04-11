import React from "react";
import "./ActivityNewsFeed.css";
import Card from "react-bootstrap/Card";
import {Image} from "react-bootstrap";

export function ActivityNewsFeed(props) {
    return (
        <Card className="strava-card">
            <Card.Body>
                <div className="user-info d-flex">
                    <img src={props.activity.icon} alt="User icon" className="mr-3"/>
                    <Card.Title>{props.activity.name}</Card.Title>
                </div>
                <hr />
                <Card.Title>{props.activity.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted date">{props.activity.date} at {props.activity.location}</Card.Subtitle>
                <br />
                <div className="activity-info d-flex justify-content-between">
                    <div className="card-info">
                        <div className="card-info-item">
                            <span>{props.activity.distance} mi</span>
                            <small>Distance</small>
                        </div>
                        <div className="card-info-item">
                            <span>{props.activity.elevationGain} ft</span>
                            <small>Elevation Gain</small>
                        </div>
                        <div className="card-info-item">
                            <span>{props.activity.time}</span>
                            <small>Time</small>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <Image src={props.activity.map} fluid={true} alt="Map" />
                </div>
            </Card.Body>
        </Card>
    );
}
