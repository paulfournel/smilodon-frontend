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
