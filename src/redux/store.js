import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import patientReducer from "./slices/patientSlice";
import doctorReducer from "./slices/doctorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        patients: patientReducer,
        doctors: doctorReducer,
    },
});