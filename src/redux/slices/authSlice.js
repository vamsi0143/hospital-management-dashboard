import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("hospitalUser");

const initialState = {
    isAuthenticated: !!savedUser,
    user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;

            localStorage.setItem(
                "hospitalUser",
                JSON.stringify(action.payload)
            );
        },

        logout(state) {
            state.isAuthenticated = false;
            state.user = null;

            localStorage.removeItem("hospitalUser");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;