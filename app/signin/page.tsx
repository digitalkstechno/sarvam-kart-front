"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  User,
  Phone,
  KeyRound,
  ShieldCheck,
  Mail,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/slices/authSlice";
import { addToCartAsync, toggleWishlistAsync, fetchWishlistAsync } from "@/store/slices/cartSlice";
import { AppDispatch, RootState } from "@/store/store";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user: currentUser } = useSelector((state: RootState) => state.auth);

  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handlePendingAction = async () => {
    const pendingAction = sessionStorage.getItem("pendingAction");
    if (pendingAction) {
      try {
        const { type, payload, returnUrl } = JSON.parse(pendingAction);
        sessionStorage.removeItem("pendingAction");
        
        if (type === "cart") {
          await dispatch(addToCartAsync(payload));
          toast.success("Item added to bag");
        } else if (type === "wishlist") {
          await dispatch(toggleWishlistAsync(payload));
          dispatch(fetchWishlistAsync());
          toast.success("Item added to wishlist");
        }
        
        if (returnUrl) {
          router.push(returnUrl);
          return;
        }
      } catch (err) {
        console.error("Error processing pending action", err);
      }
    }
    router.push("/profile");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please enter email and password.");
      return;
    }

    const result = await dispatch(loginUser({ email: loginEmail, password: loginPassword, isAdminLogin: false }));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Logged in securely ✓");
      await handlePendingAction();
    } else {
      toast.error(result.payload as string);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone || !regEmail || !regAddress || !regPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const result = await dispatch(registerUser({
      fullName: regName,
      phone: regPhone,
      email: regEmail,
      address: regAddress,
      password: regPassword,
    }));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created securely ✓");
      await handlePendingAction();
    } else {
      toast.error(result.payload as string);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const pendingAction = sessionStorage.getItem("pendingAction");
      if (pendingAction) {
        handlePendingAction();
      } else {
        router.push("/profile");
      }
    }
  }, [currentUser, router]);

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-500">Redirecting to profile...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src="/logo.png" alt="Sarvam Cart Logo" className="h-24 w-auto object-contain drop-shadow-sm" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-slate-500">
              {isLogin
                ? "Enter your email and password to sign in"
                : "Fill in your details to get started"}
            </p>
          </div>

          {/* Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-950 hover:bg-[#00A759] hover:text-slate-950 text-white font-bold py-3.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Authenticating..." : "Login"}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="font-bold text-slate-900 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-slate-200 pr-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="9999999999"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-14 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <textarea
                    placeholder="Enter your complete address"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-800 transition font-medium resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-950 hover:bg-[#00A759] hover:text-slate-950 text-white font-bold py-3.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creating Profile..." : "Create Account"}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="font-bold text-slate-900 hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Security note */}
          
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
