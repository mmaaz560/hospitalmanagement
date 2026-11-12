import { createSlice } from '@reduxjs/toolkit';

const savedInvoices = localStorage.getItem('hms_invoices');

const initialState = {
    // Agar localStorage khaali hai, toh empty array
    invoices: savedInvoices ? JSON.parse(savedInvoices) : []
}

const billingSlice = createSlice({
    name: "billing",
    initialState,
    reducers: {
        // ➕ Naya Invoice banane ke liye
        createInvoice: (state, action) => {
            state.invoices.unshift(action.payload); // Naya bill sabse upar dikhega
            localStorage.setItem('hms_invoices', JSON.stringify(state.invoices));
        },

        // 🔄 Paid / Unpaid Toggle karne ke liye
        toggleInvoiceStatus: (state, action) => {
            const index = state.invoices.findIndex(i => i.id === action.payload);
            if (index !== -1) {
                // Agar Paid hai toh Unpaid, warna Paid kardo
                state.invoices[index].status = state.invoices[index].status === 'Paid' ? 'Unpaid' : 'Paid';
                localStorage.setItem('hms_invoices', JSON.stringify(state.invoices));
            }
        },

        // 🗑️ Invoice Delete karne ke liye
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter(i => i.id !== action.payload);
            localStorage.setItem('hms_invoices', JSON.stringify(state.invoices));
        }
    }
});

export const { createInvoice, toggleInvoiceStatus, deleteInvoice } = billingSlice.actions;
export default billingSlice.reducer;