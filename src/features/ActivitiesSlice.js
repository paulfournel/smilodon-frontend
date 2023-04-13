import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getActivities, getDomainUser} from "./API";

export const getActivitiesThunk = createAsyncThunk(
    'activities/getActivities',
    async (_) => {
        return getActivities()
    }
)

const ActivitiesSlice = createSlice({
    name: 'activities',
    initialState: {activities: [], loading: 'idle'},
    reducers: {},
    extraReducers: {
        [getActivitiesThunk.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getActivitiesThunk.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        // Add reducers for additional action types here, and handle loading state as needed
        [getActivitiesThunk.fulfilled]: (state, action) => {
            // Add user to the state array
            state.activities = action.payload
        }
    }
})

export default ActivitiesSlice.reducer

