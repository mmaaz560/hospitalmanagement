import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    invoices: JSON.parse(localStorage.getItem('invoices')) || []
}

const billingSlice = createSlice({
    name: "billing",
    initialState,
    reducers: {
        createInvoice: (state, action) => {
            state.invoices.push(action.payload);
            localStorage.setItem('invoices', JSON.stringify(state.invoices));
        },
        markAsPaid: (state, action) => {
            const index = state.invoices.findIndex(i => i.id === action.payload);
            if (index !== -1) {
                state.invoices[index].status = 'Paid';
                localStorage.setItem('invoices', JSON.stringify(state.invoices));
            }
        }
    }
});

export const { createInvoice, markAsPaid } = billingSlice.actions

export default billingSlice.reducer