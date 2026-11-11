import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter, FaTimes, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPatients, deletePatients, updatePatients } from '../redux/patientSlice';

const Patients = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patients);

  // Modal aur Form ki State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // 🔴 Track karega ki edit ho raha hai ya add
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', phone: '', bloodGroup: 'O+', email: '', address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Naya Add karne ke liye modal kholna
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', age: '', gender: 'Male', phone: '', bloodGroup: 'O+', email: '', address: '' });
    setIsModalOpen(true);
  };

  //  Edit ke liye modal kholna
  const openEditModal = (e, p) => {
    e.stopPropagation(); // Row click rokne ke liye
    setEditingId(p.id);
    setFormData({
      name: p.name, age: p.age, gender: p.gender, phone: p.phone, bloodGroup: p.bloodGroup, email: p.email, address: p.address
    });
    setIsModalOpen(true);
  };

  // Form Submit (Add ya Edit)
  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update Case
      const updatedPatient = {
        ...patients.find(p => p.id === editingId), // Purana data (jaise medical history) bacha lo
        ...formData,
        id: editingId
      };
      dispatch(updatePatients(updatedPatient));
    } else {
      // Add Case
      const newPatient = {
        id: `P-${Math.floor(Math.random() * 1000) + 100}`, 
        ...formData,
        status: 'Active',
        medicalHistory: { allergies: 'None', conditions: 'None', pastSurgeries: 'None' },
        recentAppointments: []
      };
      dispatch(addPatients(newPatient));
    }
    
    setIsModalOpen(false);
    setSearch(''); // 🔴 Fix Issue 1: Search clear karo
  };

  const handleDelete = (e, id) => {
    e.stopPropagation(); 
    if (window.confirm('Kya aap sach mein yeh patient delete karna chahte hain?')) {
      dispatch(deletePatients(id));
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 w-full relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Patients Directory</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all patient records here.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all text-sm flex items-center gap-2"
          >
            <FaPlus /> Add Patient
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                value={search}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium text-sm hover:bg-slate-50">
              <FaFilter /> Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Patient ID</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Age</th>
                  <th className="p-4 font-semibold">Gender</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((p) => (
                  <tr 
                    key={p.id}
                    onClick={() => navigate(`/patients/${p.id}`)} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="p-4 text-sm font-medium text-slate-800">{p.id}</td>
                    <td className="p-4 text-sm font-bold text-blue-600">{p.name}</td>
                    <td className="p-4 text-sm text-slate-600">{p.age} Yrs</td>
                    <td className="p-4 text-sm text-slate-600">{p.gender}</td>
                    <td className="p-4 text-sm text-slate-600">{p.phone}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        p.status === 'Active' ? 'bg-green-100 text-green-700' :
                        p.status === 'Critical' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      <button 
                        onClick={(e) => openEditModal(e, p)} 
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(e, p.id)} 
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

        {/* ADD / EDIT PATIENT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden">
              
              <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  {editingId ? <FaEdit className="text-blue-600" /> : <FaUserPlus className="text-blue-600" />} 
                  {editingId ? 'Edit Patient' : 'Add New Patient'}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Blood Group</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
                    {editingId ? 'Update Patient' : 'Save Patient'}
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

export default Patients;