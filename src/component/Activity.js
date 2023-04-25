import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import {NavbarComponent} from "./NavbarComponent";
import {ActivityLayout} from "./ActivityLayout";
import {useParams} from "react-router-dom";
import {getActivity} from "../features/API";

export function Activity() {
    const {activityId} = useParams();
    const [activity, setActivity] = useState(null);
    console.log(activity)
    useEffect(() => {
        async function fetchActivity() {
            const activityData = await getActivity(activityId);
            setActivity(activityData);
        }

        fetchActivity();
    }, [activityId])
    return (
        <div>
            <NavbarComponent/>
            {activity ? <ActivityLayout activity={activity.activity} message={activity.message}/> : <p>Loading...</p>}
        </div>
    );
}
