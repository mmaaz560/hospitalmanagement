import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';
import authReducer from './authSlice'; // 🔴 Import karo

export const store = configureStore({
    reducer: {
        patients: patientReducer,
        auth: authReducer, // 🔴 Add karo
    },
});