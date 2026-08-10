import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: "doctors",

    initialState: {
        list: [],
    },

    reducers: {
        addDoctor(state, action) {
            state.list.push(action.payload);
        },
    },
});

export const { addDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;