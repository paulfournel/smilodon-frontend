import React from "react";
import "./ActivityNewsFeed.css";
import Card from "react-bootstrap/Card";
import {Image} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import avatar from "../images/avatar.png";
import {formatDuration} from "../utils/timeUtils";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getActivitiesThunk} from "../features/ActivitiesSlice";
import {CommentModal} from "./CommentModal";

export function ActivityNewsFeed({activity}) {
    const dispatch = useDispatch();
    const attachment = activity.attachment ? activity.attachment : []

    const fetchActivities = () => dispatch(getActivitiesThunk())

    return (
        <Card className="strava-card">
            <Card.Body>
                <div className="user-info d-flex">
                    <img
                        src={activity.attributedTo.icon.length > 0 ? activity.attributedTo.icon[0] : avatar}
                        alt="User icon" className="mr-3"/>
                    <Card.Title>{activity.attributedTo.name}</Card.Title>
                </div>
                <hr/>
                <Link to={`/activities/${activity.id}`}>
                    <Card.Title>{activity.summary}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted date">
                        {format(parseISO(activity.startDate), 'MM/dd/yyyy HH:mm')}
                    </Card.Subtitle>
                </Link>
                <br/>
                <div className="activity-info d-flex justify-content-between">
                    <div className="card-info">
                        <div className="card-info-item">
                            <span>{Math.ceil(activity.distance / 10) / 100} km</span>
                            <small>Distance</small>
                        </div>
                        <div className="card-info-item">
                            <span>{activity.totalElevationGain} m</span>
                            <small>Elevation Gain</small>
                        </div>
                        <div className="card-info-item">
                            <span>{formatDuration(activity.movingTime)}</span>
                            <small>Time</small>
                        </div>
                    </div>
                    <div className="map">
                        {attachment.map(img => (
                            <Image src={img.url} fluid={true} alt="Map"/>
                        ))}
                    </div>
                    <div className="comment-icon">
                        <CommentModal message={activity} callback={fetchActivities}/>
                    </div>
                </div>

            </Card.Body>


        </Card>
    );
}
