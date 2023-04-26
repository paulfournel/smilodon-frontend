import React from 'react';
import './ProfileCard.css';
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export function ProfileCard({profile}) {
    return (
        <div className="card">

            <div className="card-body">
                <Image src={'/open-api/profile_picture?user=' + profile.id} roundedCircle className="avatar"/>
                <h5 className="card-title">{profile.firstName} {profile.lastName}</h5>
                <div className="card-info">
                    <div className="card-info-item">
                        <span>{profile.followings.length}</span>
                        <small>Following</small>
                    </div>
                    <div className="card-info-item">
                        <span>{profile.followers.length}</span>
                        <small>Followers</small>
                    </div>
                    <div className="card-info-item">
                        <span>{profile.statistics.numberOfActivities}</span>
                        <small>Activities</small>
                    </div>
                </div>
                {profile.lastActivity ?
                    <p className="card-text">
                        <div><strong>Last Activity</strong></div>
                        <div><Link to={`/activities/${profile.lastActivity.id}`}>{profile.lastActivity.summary} • {new Date(profile.lastActivity.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</Link></div>
                    </p>
                    : null}
            </div>
        </div>
    );
}
