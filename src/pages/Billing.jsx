import React from 'react';
import Sidebar from '../component/Sidebar';
import { FaPlus, FaPrint, FaEye } from 'react-icons/fa';

const Billing = () => {
  // Dummy Data
  const invoices = [
    { id: 'INV-001', patient: 'Muhammad Ali', amount: '$200.00', date: '12 Nov 2026', status: 'Paid' },
    { id: 'INV-002', patient: 'Ayesha Khan', amount: '$150.00', date: '11 Nov 2026', status: 'Unpaid' },
    { id: 'INV-003', patient: 'Hassan Raza', amount: '$300.00', date: '10 Nov 2026', status: 'Paid' },
    { id: 'INV-004', patient: 'Fatima Noor', amount: '$250.00', date: '09 Nov 2026', status: 'Paid' },
    { id: 'INV-005', patient: 'Usman Tariq', amount: '$180.00', date: '08 Nov 2026', status: 'Unpaid' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Billing & Invoices</h1>
            <p className="text-slate-500 text-sm mt-1">Manage patient invoices and payments.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2">
            <FaPlus /> Create Invoice
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Invoice No</th>
                  <th className="p-4 font-semibold">Patient Name</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-bold text-blue-600">{inv.id}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{inv.patient}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{inv.amount}</td>
                    <td className="p-4 text-sm text-slate-600">{inv.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="View"><FaEye /></button>
                        <button className="p-2 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Print"><FaPrint /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Billing;