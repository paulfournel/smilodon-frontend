import React from 'react';
import './ProfileCard.css';
import avatar from "../images/avatar.png";
import {Image} from "react-bootstrap";

export function ProfileCard(props) {
    return (
        <div className="card">

            <div className="card-body">
                <Image src={avatar} roundedCircle className="avatar"/>
                <h5 className="card-title">{props.profile.name}</h5>
                <div className="card-info">
                    <div className="card-info-item">
                        <span>{props.profile.following}</span>
                        <small>Following</small>
                    </div>
                    <div className="card-info-item">
                        <span>{props.profile.followers}</span>
                        <small>Followers</small>
                    </div>
                    <div className="card-info-item">
                        <span>{props.profile.activities}</span>
                        <small>Activities</small>
                    </div>
                </div>
                <p className="card-text">Last Activity: {props.profile.lastActivity}</p>
            </div>
        </div>
    );
}
