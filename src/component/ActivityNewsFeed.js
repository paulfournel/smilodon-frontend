import React, {useState} from "react";
import "./ActivityNewsFeed.css";
import Card from "react-bootstrap/Card";
import {Image} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import avatar from "../images/avatar.png";
import {formatDuration} from "../utils/timeUtils";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addComment} from "../features/API";

export function ActivityNewsFeed(props) {

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        console.log(`Comment submitted: ${commentText}`);
        addComment(props.activity.stravaActivity.id, commentText);
        setShowCommentBox(false);
        setCommentText("");
    };

    const handleCommentIconClick = () => {
        setShowCommentBox(!showCommentBox);
    };

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
                    <div className="map">
                        <Image src={`/api/img/${props.activity.stravaActivity.id}.png`} fluid={true} alt="Map"/>
                    </div>
                    <div className="comment-icon" onClick={handleCommentIconClick}>
                        <FontAwesomeIcon icon={faCommentDots} className="dropdown-icon"/>
                    </div>
                </div>
                {showCommentBox && (
                    <form onSubmit={handleCommentSubmit}>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                placeholder="Add a comment"
                                value={commentText}
                                onChange={handleCommentInputChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                )}
                <div className="comments">
                    {props.activity.stravaActivity.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.fromUser}:</strong> {comment.message}
                        </div>
                    ))}
                </div>

            </Card.Body>
        </Card>
    );
}
