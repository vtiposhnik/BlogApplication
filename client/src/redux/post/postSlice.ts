import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    author: string | null,
    heading: string | null,
    body: string | null,
    error: string | null,
    loading: boolean
}

const initialState: UserState = {
    author: null,
    heading: null,
    body: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        postCreate: (state, action) => {
            state.author = action.payload.user
            state.heading = action.payload.heading
        }
    }
})

export const {postCreate} = userSlice.actions

export default userSlice.reducer