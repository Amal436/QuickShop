import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
    message: null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,

    reducers: {
        setUpdateRequest: (state, action) => {
            state.loading = true;
        },
        setUpdateSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        setUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setUpdateReset: (state, action) => {
            state.isUpdated = false;
        },
        setDeleteRequest: (state, action) => {
            state.loading = true;
        },
        setDeleteSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        setDeleteReset: (state, action) => {
            state.isDeleted = false;
        },
        clearErrors: (state, action) => {
            state.error = null;
        }
    }
})

export const { setUpdateRequest, setUpdateSuccess, setUpdateFail, setUpdateReset, setDeleteRequest, setDeleteSuccess, setDeleteReset, clearErrors } = profileSlice.actions;

export default profileSlice.reducer;