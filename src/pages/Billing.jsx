import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { FaPlus, FaPrint, FaTrash, FaTimes, FaFileInvoiceDollar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createInvoice, toggleInvoiceStatus, deleteInvoice } from '../redux/billingSlice';

const Billing = () => {
  const dispatch = useDispatch();
  
  // Redux se invoices aur patients ka data uthao
  const { invoices } = useSelector((state) => state.billing);
  const { patients } = useSelector((state) => state.patients);

  // Modal aur Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('Unpaid');
  const [items, setItems] = useState([{ service: '', amount: '' }]);

  // Naya item (service) add karo
  const handleAddItem = () => {
    setItems([...items, { service: '', amount: '' }]);
  };

  // Item remove karo
  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Item ka data update karo
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Total Amount Calculate karo
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (Number(item.amount) || 0), 0);
  };

  // Invoice Save karo
  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!selectedPatient) return alert('Please select a patient');

    const totalAmount = calculateTotal();
    if (totalAmount === 0) return alert('Please add at least one service with amount');

    const newInvoice = {
      id: `INV-${Math.floor(Math.random() * 1000) + 100}`,
      patient: selectedPatient,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: items.filter(item => item.service && item.amount), 
      amount: totalAmount,
      status: invoiceStatus
    };

    dispatch(createInvoice(newInvoice));
    setIsModalOpen(false);
    
    // Reset Form
    setSelectedPatient('');
    setInvoiceStatus('Unpaid');
    setItems([{ service: '', amount: '' }]);
  };

  // Print Invoice Function
  const handlePrint = (invoice) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8f9fa; }
            .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Hospital Management System</h1>
            <p>Invoice #${invoice.id}</p>
          </div>
          <div class="details">
            <p><strong>Patient Name:</strong> ${invoice.patient}</p>
            <p><strong>Date:</strong> ${invoice.date}</p>
            <p><strong>Status:</strong> ${invoice.status}</p>
          </div>
          <table>
            <thead>
              <tr><th>Service Description</th><th>Amount (Rs.)</th></tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `<tr><td>${item.service}</td><td>${item.amount}</td></tr>`).join('')}
            </tbody>
          </table>
          <div class="total">Total Amount: Rs. ${invoice.amount}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Billing & Invoices</h1>
            <p className="text-slate-500 text-sm mt-1">Manage patient invoices and payments.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2"
          >
            <FaPlus /> Create Invoice
          </button>
        </div>

        {/* Table */}
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
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">No invoices found. Click "Create Invoice" to generate one.</td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 text-sm font-bold text-blue-600">{inv.id}</td>
                      <td className="p-4 text-sm font-medium text-slate-800">{inv.patient}</td>
                      <td className="p-4 text-sm font-bold text-slate-800">Rs. {inv.amount}</td>
                      <td className="p-4 text-sm text-slate-600">{inv.date}</td>
                      <td className="p-4">
                        {/* Clickable Status Toggle */}
                        <button 
                          onClick={() => dispatch(toggleInvoiceStatus(inv.id))}
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max transition-transform hover:scale-105 ${
                            inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {inv.status === 'Paid' ? <FaCheckCircle /> : <FaExclamationCircle />}
                          {inv.status}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handlePrint(inv)} className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition" title="Print"><FaPrint /></button>
                          <button onClick={() => { if(window.confirm('Delete this invoice?')) dispatch(deleteInvoice(inv.id)) }} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔴 CREATE INVOICE MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaFileInvoiceDollar className="text-blue-600" /> Create New Invoice
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="p-5 space-y-5 overflow-y-auto">
                
                {/* Patient Select */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Select Patient</label>
                  <select 
                    value={selectedPatient} 
                    onChange={(e) => setSelectedPatient(e.target.value)} 
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">-- Choose Patient --</option>
                    {patients && patients.map(p => (
                      <option key={p.id} value={p.name}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                {/* Services/Items Section */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-slate-700">Services & Items</h4>
                    <button type="button" onClick={handleAddItem} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <FaPlus /> Add Item
                    </button>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <input 
                        type="text" 
                        placeholder="Service Name (e.g. Consultation)" 
                        value={item.service}
                        onChange={(e) => handleItemChange(index, 'service', e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        required
                      />
                      <input 
                        type="number" 
                        placeholder="Amount (Rs.)" 
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                        className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        required
                      />
                      {items.length > 1 && (
                        <button type="button" onClick={() => handleRemoveItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total Amount & Status */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">Status:</span>
                    <select 
                      value={invoiceStatus} 
                      onChange={(e) => setInvoiceStatus(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:outline-none"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-800">Total:</span>
                    <span className="text-2xl font-extrabold text-blue-700">Rs. {calculateTotal()}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/30 transition">Generate Invoice</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Billing;