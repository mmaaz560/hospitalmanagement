import { createSlice } from '@reduxjs/toolkit';
import { patientsData } from '../data/patientsData'; // 🔴 Dummy data import karo

const savedPatients = localStorage.getItem('patients');

const initialState = {
    // Agar localStorage khaali hai, toh default 10 patients load karo
    patients: savedPatients ? JSON.parse(savedPatients) : patientsData
}

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        // ➕ Add Patient
        addPatients: (state, action) => {
            state.patients.push(action.payload)
            localStorage.setItem('patients', JSON.stringify(state.patients))
        },

        // 🗑️ Delete Patient (Filter method se)
        deletePatients: (state, action) => {
            // Jis patient ki ID match kar gayi, usko chhod kar baaki sab rakh lo
            state.patients = state.patients.filter(patient => patient.id !== action.payload);
            localStorage.setItem('patients', JSON.stringify(state.patients))
        },

        // ✏️ Update Patient
        updatePatients: (state, action) => {
            const index = state.patients.findIndex(patient => patient.id === action.payload.id)
            if (index !== -1) {
                state.patients[index] = action.payload
                localStorage.setItem('patients', JSON.stringify(state.patients))
            }
        }
    }
});

// 🔴 Names ko singular kar diya (addPatient, deletePatient) taaki Appointments.jsx se match karein
export const { addPatients, deletePatients, updatePatients } = patientSlice.actions

export default patientSlice.reducer;