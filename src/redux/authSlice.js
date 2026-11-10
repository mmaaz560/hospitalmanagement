import { createSlice } from '@reduxjs/toolkit';

// LocalStorage se user uthao (agar pehle se login hai)
const savedUser = localStorage.getItem('hms_user') ?
    JSON.parse(localStorage.getItem('hms_user')) :
    null;

const initialState = {
    user: savedUser, // User ki details (role, name, etc.)
    loading: false, // Login process chal raha hai ya nahi
    error: null, // Agar login fail ho
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 🔴 Login Action (Direct reducer, no backend needed)
        loginUser: (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload; // { role: 'Admin', name: 'Test User' }

            // LocalStorage mein save karo
            localStorage.setItem('hms_user', JSON.stringify(action.payload));
        },

        // 🔴 Logout Action
        logoutUser: (state) => {
            state.user = null;
            state.error = null;

            // LocalStorage se hatao
            localStorage.removeItem('hms_user');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;