import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaUserMd } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addDoctors, deleteDoctors, updateDoctors } from '../redux/doctorSlice';

const Doctors = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  
  // Redux se doctors ka data uthao
  const { doctors } = useSelector((state) => state.doctors);

  // Modal aur Form ki State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', specialty: '', experience: '', phone: '', email: '', status: 'Available'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Naya Doctor Add karne ke liye
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', specialty: '', experience: '', phone: '', email: '', status: 'Available' });
    setIsModalOpen(true);
  };

  // Purana Doctor Edit karne ke liye
  const openEditModal = (d) => {
    setEditingId(d.id);
    setFormData({ 
      name: d.name, specialty: d.specialty, experience: d.experience, phone: d.phone, email: d.email, status: d.status 
    });
    setIsModalOpen(true);
  };

  // Form Submit (Add / Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update Case
      const updatedDoctor = { ...doctors.find(d => d.id === editingId), ...formData, id: editingId };
      dispatch(updateDoctors(updatedDoctor));
    } else {
      // Add Case
      const newDoctor = {
        id: `D-${Math.floor(Math.random() * 1000) + 100}`, 
        ...formData
      };
      dispatch(addDoctors(newDoctor));
    }
    
    setIsModalOpen(false);
    setSearch(''); // Search reset karo
  };
    // 🔴 Status Toggle Function (Available <-> Busy)
  const toggleStatus = (doctor) => {
    // Agar Available hai toh Busy karo, warna Available
    const newStatus = doctor.status === 'Available' ? 'Busy' : 'Available';
    
    // Updated doctor object banao
    const updatedDoctor = { ...doctor, status: newStatus };
    
    // Redux mein update dispatch karo
    dispatch(updateDoctors(updatedDoctor));
  };

  // Delete Doctor
  const handleDelete = (id) => {
    if (window.confirm('Kya aap sach mein yeh doctor delete karna chahte hain?')) {
            console.log("✅ Confirm kiya, ab Redux action dispatch ho raha hai...");

      dispatch(deleteDoctors(id));
    }
    else{
            console.log("❌ Cancel kar diya gaya.");

    }
  };

  // Search Filter
  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex  bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full relative">
        
        {/* ─── Header ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Doctors Directory</h1>
            <p className="text-slate-500 text-sm mt-1">Manage hospital doctors and staff.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2"
          >
            <FaPlus /> Add Doctor
          </button>
        </div>

        {/* ─── Table Container ─── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex justify-between bg-slate-50/50">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Search doctors by name or specialty..." 
                value={search}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Doctor Name</th>
                  <th className="p-4 font-semibold">Specialization</th>
                  <th className="p-4 font-semibold">Experience</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDoctors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {d.name.charAt(4) || 'D'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{d.name}</p>
                          <p className="text-xs text-slate-500">{d.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-blue-600">{d.specialty}</td>
                    <td className="p-4 text-sm text-slate-600">{d.experience}</td>
                    <td className="p-4 text-sm text-slate-600">{d.phone}</td>
                    <td className="p-4">
                        {/* 🔴 Clickable Status Badge */}
                         <button 
                           onClick={() => toggleStatus(d)}
                           title="Click to toggle status"
                           className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${
                             d.status === 'Available' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                             d.status === 'Busy' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                             'bg-orange-100 text-orange-700 hover:bg-orange-200'
                           }`}
                         >
                           {d.status}
                         </button>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      <button 
                        onClick={() => openEditModal(d)} 
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(d.id)} 
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔴 ADD / EDIT DOCTOR MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  {editingId ? <FaEdit className="text-blue-600" /> : <FaUserMd className="text-blue-600" />} 
                  {editingId ? 'Edit Doctor' : 'Add New Doctor'}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Doctor Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Dr. Sarah Ahmed" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Specialization</label>
                    <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required placeholder="e.g. Cardiologist" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Experience</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 10 Years" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. 0300-1234567" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. sarah@hms.com" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
                    {editingId ? 'Update Doctor' : 'Save Doctor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Doctors;