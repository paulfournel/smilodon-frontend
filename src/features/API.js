import request from "./requests";

export var SERVER = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000'
    } else {
        return ''
    }
}

export const getDomainUser = async () => {
    return (await request(`${SERVER()}/api/users/me`, {method: 'GET'})).data
}

export const getActivities = async () => {
    return (await request(`${SERVER()}/api/users/me/activities`, {method: 'GET'})).data
}

export const processActivities = async () => {
    return (await request(`${SERVER()}/api/strava/sync`, {method: 'GET'})).data
}

export const addComment = async (activityId, message) => {
    return await request(
        `${SERVER()}/api/activities/${activityId}/comments`,
        { method: 'POST', body: JSON.stringify({ message: message }) }
    );
}
