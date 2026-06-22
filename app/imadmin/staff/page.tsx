"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Plus, X, User, Trash2, Edit, Eye, EyeOff } from "lucide-react";

interface Staff {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  role: string;
  status: string;
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchStaff = async (currentPage = 1) => {
    setLoadingList(true);
    try {
      const response = await api.get(`/user?role=staff&page=${currentPage}&limit=10`);
      setStaffList(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch staff", error);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchStaff(page);
  }, [page]);

  const openAddModal = () => {
    setEditingId(null);
    setFullName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setMessage({ text: "", type: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (staff: Staff) => {
    setEditingId(staff._id);
    setFullName(staff.fullName || "");
    setPhone(staff.phone || "");
    setEmail(staff.email || "");
    setPassword("");
    setMessage({ text: "", type: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!adding) {
      setIsModalOpen(false);
    }
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || (!editingId && !email) || (!editingId && !password)) {
      setMessage({ text: "Please provide name, phone, email, and password.", type: "error" });
      return;
    }
    
    setAdding(true);
    setMessage({ text: "", type: "" });
    
    try {
      if (editingId) {
        // Edit mode
        await api.put(`/user/${editingId}`, { 
          fullName, 
          phone, 
          email, 
          ...(password ? { password } : {})
        });
        setMessage({ text: "Staff updated successfully!", type: "success" });
      } else {
        // Add mode
        await api.post("/user/add-staff", {
          fullName,
          phone,
          email,
          password,
          role: "staff"
        });
        setMessage({ text: "Staff added successfully!", type: "success" });
      }
      
      setTimeout(() => {
        closeModal();
        fetchStaff(page);
      }, 1500);
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.message || `Failed to ${editingId ? 'update' : 'add'} staff.`,
        type: "error"
      });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this staff member?")) return;
    
    setDeletingId(id);
    try {
      await api.delete(`/user/${id}`);
      fetchStaff(page);
    } catch (error) {
      console.error("Failed to delete staff", error);
      alert("Failed to delete staff member.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Staff Management</h1>
          <p className="text-slate-500 mt-1">Manage all your staff members and their access</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00A759] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#008f4c] shadow-sm shadow-[#00A759]/20 transition-all active:scale-[0.98] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Staff
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loadingList ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-[#00A759] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-slate-500 font-medium">Loading staff members...</div>
          </div>
        ) : staffList.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">No staff found</h3>
            <p className="text-slate-500 max-w-sm">You haven't added any staff members yet. Click the button above to add one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-700">
                <tr>
                  <th className="px-6 py-4 font-semibold rounded-tl-xl">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold rounded-tr-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff._id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00A759]/10 flex items-center justify-center text-[#00A759]">
                        <User className="w-5 h-5" />
                      </div>
                      {staff.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-4">{staff.email || "N/A"}</td>
                    <td className="px-6 py-4">{staff.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        staff.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {staff.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize font-medium">{staff.role}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(staff)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Edit Staff"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        disabled={deletingId === staff._id}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                        title="Remove Staff"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Staff" : "Add New Staff"}</h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                disabled={adding}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveStaff} className="p-6 space-y-4">
              {message.text && (
                <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                  {message.text}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] transition-all disabled:opacity-50"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] transition-all disabled:opacity-50"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] transition-all disabled:opacity-50"
                  placeholder="e.g. rahul@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password {editingId && <span className="text-slate-400 font-normal text-xs">(leave blank to keep unchanged)</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] transition-all disabled:opacity-50 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={adding}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 bg-[#00A759] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#008f4c] shadow-sm shadow-[#00A759]/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {adding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : editingId ? "Update Staff" : "Save Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
