import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getDomainUser} from "./API";

export const getDomainUserThunk = createAsyncThunk(
    'users/getDomain',
    async (_) => {
        return getDomainUser()
    }
)

const UsersSlice = createSlice({
    name: 'users',
    initialState: {current: null, domain: null, loading: 'idle'},
    reducers: {},
    extraReducers: {
        [getDomainUserThunk.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getDomainUserThunk.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        // Add reducers for additional action types here, and handle loading state as needed
        [getDomainUserThunk.fulfilled]: (state, action) => {
            // Add user to the state array
            state.domain = action.payload
        }
    }
})

export default UsersSlice.reducer

