import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {Badge, Card, Image, Modal} from "react-bootstrap";
import {getTimeDifference} from "../utils/timeUtils";
import './ActivityLayout.css'
import {addComment} from "../features/API";

export const CommentModal = ({message, showModal, callback}) => {

    const [show, setShow] = useState(showModal);
    const [commentText, setCommentText] = useState("");

    const handleCommentInputChange = (event) => {
        setCommentText(event.target.value);
    };

    useEffect(() => {
        setShow(showModal)
    }, [showModal]);

    const handleClose = () => setShow(false);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(message.id, commentText).then(() => callback())
        setCommentText("");
    };

    return (
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
                <form onSubmit={handleCommentSubmit}>
                    <div className="form-group">
                            <textarea
                                className="form-control"
                                placeholder="Add a comment"
                                value={commentText}
                                onChange={handleCommentInputChange}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </Modal.Body>
        </Modal>)
}
