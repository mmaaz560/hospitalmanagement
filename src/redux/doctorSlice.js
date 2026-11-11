import { createSlice } from '@reduxjs/toolkit'
import { doctorsData } from '../data/doctorsData';

const savedDoctors = localStorage.getItem('doctors');

const initialState = {
    doctors: savedDoctors ? JSON.parse(localStorage.getItem('doctors')) : doctorsData
}

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        addDoctors: (state, action) => {
            state.doctors.push(action.payload)
            localStorage.setItem('doctors', JSON.stringify(state.doctors))
        },
        deleteDoctors: (state, action) => {
            console.log("🗑️ Reducer mein ID aayi:", action.payload);

            state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
            localStorage.setItem('hms_doctors', JSON.stringify(state.doctors));

            console.log("✅ Delete ke baad nayi list:", state.doctors.length);
        },
        updateDoctors: (state, action) => {
            const index = state.doctors.findIndex(doctor => doctor.id === action.payload.id)
            if (index !== -1) {
                state.doctors[index] = action.payload
                localStorage.setItem('doctors', JSON.stringify(state.doctors))
            }
        }
    }
});

export const { addDoctors, deleteDoctors, updateDoctors } = doctorSlice.actions

export default doctorSlice.reducer