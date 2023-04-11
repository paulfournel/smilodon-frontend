import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/UsersSlice'

const reducer = {
    user: userReducer
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})
