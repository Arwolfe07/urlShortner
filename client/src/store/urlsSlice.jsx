import { createSlice } from "@reduxjs/toolkit";

const urlsSlice = createSlice({
    name: 'urls',
    initialState: [],
    reducers: {
        getUrls: (state,action)=>{
            return action.payload;
        },
        addUrls: (state,action)=>{
            return [...state, action.payload];
        }
    }
});

export const { getUrls, addUrls} = urlsSlice.actions;

export default urlsSlice.reducer;