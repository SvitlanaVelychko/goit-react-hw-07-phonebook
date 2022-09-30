import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: '',
    },
    reducers: {
        changeFilter(state, action) {
            state.filter = action.payload.toLowerCase();
        },
    },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

//SELECTORS

export const selectFilter = state => state.filter.filter;