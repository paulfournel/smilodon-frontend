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

export const getActivity = async (activityId) => {
    return (await request(`${SERVER()}/api/messages/${activityId}`, {method: 'GET'})).data
}

export const addComment = async (activityId, message) => {
    return await request(
        `${SERVER()}/api/comments`,
        {method: 'POST', body: JSON.stringify({parentMessageUrl: activityId, message: message})}
    );
}

export const patchUser = async (userData) => {
    return request(
        `${SERVER()}/api/users/me`,
        {method: 'PATCH', body: JSON.stringify(userData)}
    );
}

export const deleteStrava = async () => {
    return request(
        `${SERVER()}/api/users/me/apps/strava`,
        {method: 'DELETE'}
    );
}
