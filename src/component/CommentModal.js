import React, {useState} from 'react';
import "leaflet/dist/leaflet.css";
import {Badge, Button, Card, Image, InputGroup, Modal} from "react-bootstrap";
import {getTimeDifference} from "../utils/timeUtils";
import './ActivityLayout.css'
import {addComment} from "../features/API";
import Form from 'react-bootstrap/Form';
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const CommentModal = ({message, callback}) => {

    const [show, setShow] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(message.id, commentText).then(() => callback())
        setCommentText("");
    };

    return (<>
            <Button variant="outline-secondary" onClick={handleShow}>
                <FontAwesomeIcon icon={faCommentDots} className="dropdown-icon"/>
                <Badge bg="secondary">{message.replies.length}</Badge>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message.replies.slice()
                        .sort((a, b) => new Date(a.published) - new Date(b.published))
                        .map((comment, index) => (
                            <Card key={index} className="my-3">
                                <Card.Body className="d-flex align-items-center">
                                    <Image src={comment.attributedTo.icon[0]} roundedCircle className="mr-3" width={50}
                                           height={50} style={{marginRight: '10px'}}/>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <div style={{fontWeight: 'bold'}}>{comment.attributedTo.name}</div>
                                            <Badge bg="secondary" className="ml-auto">
                                                {getTimeDifference(comment.published)}
                                            </Badge>
                                        </div>
                                        <div className="comment-text">{comment.summary}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    <Form onSubmit={handleCommentSubmit}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Add a comment"
                                aria-label="Add a comment"
                                aria-describedby="basic-addon2"
                                value={commentText}
                                onChange={handleCommentInputChange}
                            />
                            <Button type={"submit"} variant="outline-secondary" id="button-addon2">
                                Send
                            </Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
