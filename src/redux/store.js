import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';
import authReducer from './authSlice'; // 🔴 Import karo
import appointmentSlice from './appointmentSlice';
import doctorSlice from './doctorSlice';
import billingSlice from './billingSlice';
export const store = configureStore({
    reducer: {
        appointments: appointmentSlice,
        doctors: doctorSlice,
        patients: patientReducer,
        billing: billingSlice,
        auth: authReducer,
        appointments: appointmentSlice,
    },
});