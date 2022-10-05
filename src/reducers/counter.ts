import { createSlice } from "@reduxjs/toolkit";

export const counterReducer = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => { 
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementBy: (state, action) => {
            state.value += action.payload
        },
        reset: (state) => {
            state.value = 0
        }
    }
});