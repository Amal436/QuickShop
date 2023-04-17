import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,

    reducers: {
        newReviewRequest: (state, action) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        newReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        newReviewReset: (state, action) => {
            state.success = false;
        },
        clearErrors: (state, action) => {
            state.error = null;
        }
    }
})

export const { newReviewRequest, newReviewSuccess, newReviewFail, newReviewReset } = reviewSlice.actions;
export default reviewSlice.reducer;