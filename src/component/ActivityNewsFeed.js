import React from "react";
import "./ActivityNewsFeed.css";
import Card from "react-bootstrap/Card";
import {Image} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import avatar from "../images/avatar.png";
import {formatDuration} from "../utils/timeUtils";

export function ActivityNewsFeed(props) {

    return (
        <Card className="strava-card">
            <Card.Body>
                <div className="user-info d-flex">
                    <img src={avatar} alt="User icon" className="mr-3"/>
                    <Card.Title>{props.activity.user.username}</Card.Title>
                </div>
                <hr/>
                <Card.Title>{props.activity.stravaActivity.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted date">
                    {format(parseISO(props.activity.stravaActivity.startDate), 'MM/dd/yyyy HH:mm')}
                </Card.Subtitle>
                <br/>
                <div className="activity-info d-flex justify-content-between">
                    <div className="card-info">
                        <div className="card-info-item">
                            <span>{Math.ceil(props.activity.stravaActivity.distance / 10) / 100} km</span>
                            <small>Distance</small>
                        </div>
                        <div className="card-info-item">
                            <span>{props.activity.stravaActivity.totalElevationGain} m</span>
                            <small>Elevation Gain</small>
                        </div>
                        <div className="card-info-item">
                            <span>{formatDuration(props.activity.stravaActivity.movingTime)}</span>
                            <small>Time</small>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <Image src={`/api/img/${props.activity.stravaActivity.id}.png`} fluid={true} alt="Map"/>
                </div>
            </Card.Body>
        </Card>
    );
}
