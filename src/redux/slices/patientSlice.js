import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
    name: "patients",

    initialState: {
        list: [],
    },

    reducers: {
        addPatient(state, action) {
            state.list.push(action.payload);
        },
    },
});

export const { addPatient } = patientSlice.actions;

export default patientSlice.reducer;