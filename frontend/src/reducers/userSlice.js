import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthRequest: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        setAuthSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setAuthFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        clearErrors: (state, action) => {
            state.error = null;
        },
        setLogOutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
        }
    }
})

export const { setAuthRequest, setAuthSuccess, setAuthFail, clearErrors, setLogOutSuccess } = userSlice.actions;
export default userSlice.reducer;