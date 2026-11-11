import { createSlice } from '@reduxjs/toolkit';

// Dummy data (Agar localStorage khaali hai toh yeh load hoga)
const defaultAppointments = [
    { id: 'A-101', patient: 'Muhammad Ali', doctor: 'Dr. Sarah Ahmed', date: '12 Nov 2026', time: '10:00 AM', status: 'Confirmed' },
    { id: 'A-102', patient: 'Ayesha Khan', doctor: 'Dr. Ahmed Khan', date: '12 Nov 2026', time: '11:30 AM', status: 'Pending' },
    { id: 'A-103', patient: 'Hassan Raza', doctor: 'Dr. Fatima Zafar', date: '13 Nov 2026', time: '09:00 AM', status: 'Confirmed' },
];

const savedAppointments = localStorage.getItem('appointments'); // 🔴 Key ka naam check kar lena

const initialState = {
    appointments: savedAppointments ? JSON.parse(savedAppointments) : defaultAppointments
}

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        // ➕ Book
        bookAppointment: (state, action) => {
            state.appointments.push(action.payload)
            localStorage.setItem('appointments', JSON.stringify(state.appointments))
        },

        // 🗑️ Delete (Yahan Filter use hota hai, Index nahi)
        deleteAppointment: (state, action) => {
            state.appointments = state.appointments.filter(a => a.id !== action.payload);
            localStorage.setItem('appointments', JSON.stringify(state.appointments))
        },

        // ✏️ Update Status (Approve / Cancel ke liye)
        updateAppointmentStatus: (state, action) => {
            const index = state.appointments.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.appointments[index].status = action.payload.status;
                localStorage.setItem('appointments', JSON.stringify(state.appointments))
            }
        }
    }
});

// 🔴 Export mein teeno ko add karo
export const { bookAppointment, deleteAppointment, updateAppointmentStatus } = appointmentSlice.actions;

export default appointmentSlice.reducer;