import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/UsersSlice'
import activitiesReducer from "../features/ActivitiesSlice";

const reducer = {
    user: userReducer,
    activities: activitiesReducer

}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})
