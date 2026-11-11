import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    doctors: JSON.parse(localStorage.getItem('doctors')) || []
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
            const index = state.doctors.findIndex(doctor => doctor.id === action.payload);
            localStorage.setItem('doctors', JSON.stringify(state.doctors))
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