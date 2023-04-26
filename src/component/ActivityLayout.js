import React, {useRef, useState} from 'react';
import {CircleMarker, MapContainer, Polyline, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {ElevationProfile} from './ElevationProfile';
import {Badge, Card, Col, Container, Image, ListGroup, Modal, Row, Table} from "react-bootstrap";
import {useContainerDimensions} from "../utils/useContainerDimensions";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatDuration, getTimeDifference} from "../utils/timeUtils";
import './ActivityLayout.css'
import {addComment} from "../features/API";

export const ActivityLayout = ({activity, message, callback}) => {

    const [waypoint, setWaypoint] = useState(null);
    const [show, setShow] = useState(false); // added show state to manage modal visibility
    const [commentText, setCommentText] = useState(""); // added newComment state to track input field value

    const handleClose = () => setShow(false); // added handleClose function to close modal
    const handleShow = () => setShow(true); // added handleShow function to show modal

    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(message.id, commentText).then(() => callback())
        setCommentText("");
    };

    const componentRef = useRef()
    const {width, height} = useContainerDimensions(componentRef)

    const selectedDataHandler = (data) => {
        setWaypoint([data.lat, data.lng]);
    }

    const avgLat = activity.data.reduce((sum, point) => sum + point.lat, 0) / activity.data.length;
    const avgLng = activity.data.reduce((sum, point) => sum + point.lng, 0) / activity.data.length;

    const position = [avgLat, avgLng]

    const latlngs = activity.data.map(d => [d.lat, d.lng]);

    const calculatePace = (distance, time) => {
        const paceInSeconds = time / distance;
        const minutes = Math.floor(paceInSeconds / 60);
        const seconds = Math.round(paceInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    const kmData = activity.data.reduce((result, point) => {
        const km = (point.distance / 1000).toFixed(0);
        if (!result[km] || point.distance > result[km].distance) {
            result[km] = point;
        }
        return result;
    }, {});

    const paceData = Object.values(kmData).reduce((result, point, index, array) => {
        if (index === 0) return result;

        const distance = (point.distance - array[index - 1].distance) / 1000;
        const time = point.time - array[index - 1].time;
        const pace = calculatePace(distance, time);

        return [...result, {km: (point.distance / 1000).toFixed(0), pace}];
    }, []);

    return (<Container fluid>
        <Row>
            <Col lg={0} xl={2}>

            </Col>
            <Col lg={12} xl={8}>
                <Row>
                    <Card.Body>
                        <Row>
                            <Col lg={12} xl={12}>
                                <Card>
                                    <Card.Body>
                                        <Row className="align-items-left">
                                            <Col xs={5} style={{textAlign: 'left'}}>
                                                <div>{activity.user.firstName + ' ' + activity.user.lastName} - {activity.type}</div>
                                            </Col>
                                            <Col xs={6}/>
                                            <Col xs={1} className="text-end">
                                                <FontAwesomeIcon icon={faCommentDots} className="dropdown-icon"
                                                                 onClick={handleShow}/>
                                            </Col>
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <Col xs={1}>
                                                <div className="avatar-container">
                                                    <img
                                                        src={'/open-api/profile_picture?user=' + activity.user.id}
                                                        alt={activity.user.username}
                                                        className="avatar-img"
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={5}>
                                                <div className="activity-header">
                                                    <div className="activity-title">{activity.name}</div>
                                                    <div className="activity-date">{activity.startDate}</div>
                                                </div>
                                                <div className="activity-description">
                                                    {activity.description}
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <Row style={{
                                                    border: '1px solid #dfdfdf',
                                                    borderRadius: '5px',
                                                    marginRight: '2px',
                                                    padding: '5px'
                                                }}>
                                                    <Col xs={4} className="stat">
                                                        <div
                                                            className="stat-value">{(activity.distance / 1000).toFixed(2)} km
                                                        </div>
                                                        <div className="stat-label">Distance</div>
                                                    </Col>
                                                    <Col xs={4} className="stat">
                                                        <div
                                                            className="stat-value">{formatDuration(activity.movingTime)}</div>
                                                        <div className="stat-label">Moving Time</div>
                                                    </Col>
                                                    <Col xs={4} className="stat">
                                                        <div
                                                            className="stat-value">{formatDuration((1000 * activity.movingTime / activity.distance))} /km
                                                        </div>
                                                        <div className="stat-label">Pace</div>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row className="activity-stats-row">
                                                    <ListGroup>
                                                        <ListGroup.Item>Elevation
                                                            Gain: {activity.totalElevationGain} m</ListGroup.Item>
                                                        <ListGroup.Item>Elapsed
                                                            Time: {formatDuration(activity.elapsedTime)}</ListGroup.Item>
                                                    </ListGroup>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Card.Body>
                </Row>
                <Card>
                    <Card.Body>
                        <Row>

                            <Col md={4}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>KM</th>
                                        <th>Pace</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paceData.map(data => (<tr key={data.km}>
                                        <td>{data.km}</td>
                                        <td>{data.pace}</td>
                                    </tr>))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={8}>
                                <MapContainer center={position} zoom={13} scrollWheelZoom={false}
                                              style={{height: '100%'}}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Polyline pathOptions={{color: 'blue'}} positions={latlngs}/>
                                    {waypoint &&
                                        <CircleMarker center={waypoint} radius={3} color="white" fillColor="blue"
                                                      fillOpacity={1}/>}

                                    {activity.data.length > 0 && (<>
                                        <CircleMarker center={[activity.data[0].lat, activity.data[0].lng]}
                                                      radius={3}
                                                      color="white"
                                                      fillColor="red" fillOpacity={1}/>
                                        <CircleMarker
                                            center={[activity.data[activity.data.length - 1].lat, activity.data[activity.data.length - 1].lng]}
                                            radius={3} color="black" fillColor="white" fillOpacity={1}/>
                                    </>)}

                                </MapContainer>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={12} xl={12} style={{overflow: 'hidden', height: '280px'}} ref={componentRef}>
                                <ElevationProfile data={activity.data} selectedData={selectedDataHandler}
                                                  widthIn={width - 60} heightIn={height}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={0} xl={2}>

            </Col>
        </Row>
        <div>
            {/* added modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message.replies
                        .sort((a, b) => new Date(a.published) - new Date(b.published))
                        .map((comment, index) => (
                            <Card key={index} className="my-3">
                                <Card.Body className="d-flex align-items-center">
                                    <Image src={comment.attributedTo.icon[0]} roundedCircle className="mr-3" width={50} height={50} style={{marginRight: '10px'}}/>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <div style={{fontWeight:'bold'}}>{comment.attributedTo.name}</div>
                                            <Badge bg="secondary" className="ml-auto">
                                                {getTimeDifference(comment.published)}
                                            </Badge>
                                        </div>
                                        <div className="comment-text">{comment.summary}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
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
                </Modal.Body>
            </Modal>
        </div>
    </Container>)
}
