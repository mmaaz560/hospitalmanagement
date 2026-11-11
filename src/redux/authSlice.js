import { createSlice } from '@reduxjs/toolkit';

// 🔴 1. localStorage se data nikalne ka safe tarika
let savedUser = null;
try {
    const rawData = localStorage.getItem('hms_user');
    if (rawData) {
        savedUser = JSON.parse(rawData);
    }
} catch (error) {
    console.error("LocalStorage parse error:", error);
}

const initialState = {
    user: savedUser, // Ab yeh pakka data load karega
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            // 🔴 2. Save karte waqt exact key 'hms_user' use karo
            localStorage.setItem('hms_user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('hms_user');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;