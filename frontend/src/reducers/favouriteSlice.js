import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favouriteItems: localStorage.getItem("favouriteItems") ? JSON.parse(localStorage.getItem("favouriteItems")) : [],
}

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,

    reducers: {
        addToFavourite: (state, action) => {

            const item = action.payload;

            const isItemExist = state.favouriteItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                state.favouriteItems = state.favouriteItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.favouriteItems = [...state.favouriteItems, item];
            }
        },
        removeFromFavourite: (state, action) => {
            state.favouriteItems = state.favouriteItems.filter((i) => i.product !== action.payload)
        },
    }
})

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;