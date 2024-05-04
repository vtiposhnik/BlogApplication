import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    currentUser: string | null,
    error: string | null,
    loading: boolean
}

const initialState: UserState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        logOutSuccess: (state) => {
            state.currentUser = null
            state.error = null
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, logOutSuccess} = userSlice.actions

export default userSlice.reducer