"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, KeyRound, ShieldCheck, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/slices/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    const result = await dispatch(loginUser({ email, password, isAdminLogin: true }));
    if (loginUser.fulfilled.match(result)) {
      router.push("/imadmin/orders");
      toast.success("Admin login successful");
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2 relative">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-200">
            <ShieldAlert className="w-6 h-6 text-[#00A759]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Admin Portal
          </h2>
          <p className="text-xs text-slate-500">
            Authorized personnel only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold font-mono text-slate-500 uppercase">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-slate-200 pr-2">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-14 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#00A759] transition font-medium placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold font-mono text-slate-500 uppercase">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <KeyRound className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#00A759] transition font-medium tracking-widest placeholder:tracking-normal placeholder:text-slate-400"
                required
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A759] hover:bg-[#00c56a] text-white font-bold py-3.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Authenticating..." : "Enter Portal"}
          </button>
        </form>

        {/* Security note */}
        
      </motion.div>
    </div>
  );
}
