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
import {Link, useNavigate} from "react-router-dom";

export function ActivityNewsFeed(props) {
    const navigate = useNavigate();

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");
    console.log(props.activity)
    const attachment = props.activity.attachment ? props.activity.attachment : []
    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(props.activity.id, commentText);
        setShowCommentBox(false);
        setCommentText("");
    };

    const handleCommentIconClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const handleActivityClick = (activityId) => {
        navigate('/activities/' + activityId)
    }

    return (
        <Card className="strava-card">
            <Card.Body>
                <div className="user-info d-flex">
                    <img
                        src={props.activity.attributedTo.icon.length > 0 ? props.activity.attributedTo.icon[0] : avatar}
                        alt="User icon" className="mr-3"/>
                    <Card.Title>{props.activity.attributedTo.name}</Card.Title>
                </div>
                <hr/>
                <Link to={`/activities/${props.activity.id}`}>
                    <Card.Title>{props.activity.summary}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted date">
                        {format(parseISO(props.activity.startDate), 'MM/dd/yyyy HH:mm')}
                    </Card.Subtitle>
                </Link>
                <br/>
                <div className="activity-info d-flex justify-content-between">
                    <div className="card-info">
                        <div className="card-info-item">
                            <span>{Math.ceil(props.activity.distance / 10) / 100} km</span>
                            <small>Distance</small>
                        </div>
                        <div className="card-info-item">
                            <span>{props.activity.totalElevationGain} m</span>
                            <small>Elevation Gain</small>
                        </div>
                        <div className="card-info-item">
                            <span>{formatDuration(props.activity.movingTime)}</span>
                            <small>Time</small>
                        </div>
                    </div>
                    <div className="map">
                        {attachment.map(img => (
                            <Image src={img.url} fluid={true} alt="Map"/>
                        ))}
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
                    {props.activity.replies.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.attributedTo.name}:</strong> {comment.summary}
                        </div>
                    ))}
                </div>

            </Card.Body>
        </Card>
    );
}
