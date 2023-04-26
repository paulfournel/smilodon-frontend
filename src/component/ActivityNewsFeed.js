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
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getActivitiesThunk} from "../features/ActivitiesSlice";

export function ActivityNewsFeed({activity}) {
    const dispatch = useDispatch();

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");
    const attachment = activity.attachment ? activity.attachment : []
    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(activity.id, commentText).then(() => dispatch(getActivitiesThunk()));
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
                    {activity.replies.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.attributedTo.name}:</strong> {comment.summary}
                        </div>
                    ))}
                </div>

            </Card.Body>
        </Card>
    );
}
