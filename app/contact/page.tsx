"use client";

import { useState } from "react";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MapPin, Mail, Phone, Contact, Zap, Headphones, Shield, UserCheck } from "lucide-react";

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    value: "Shop No. - 28, Anupum The Business Hub, Puna-Simada Rd, Yogi Chowk Ground, Chikuwadi, Nana Varachha, Surat, Gujarat 395010",
  },
  {
    icon: Phone,
    title: "Phone Support",
    value: "+91 9408558818 +91 9979986363",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "sarvamcart@gmail.com",
  },
  {
    icon: Contact,
    title: "GST Details",
    value: "GSTIN: 24CXWPK0116NIZ4",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    iconBg: "bg-[#10B981]", // Vibrant Green
    title: "Quick Response Support",
    desc: "We reply promptly to all your queries and order-related concerns.",
  },
  {
    icon: <Headphones className="w-5 h-5 text-white" />,
    iconBg: "bg-[#0ea5e9]", // Bright blue/sky,
    title: "Dedicated Customer Assistance",
    desc: "Our team is here to help before and after your purchase.",
  },
  {
    icon: <Shield className="w-5 h-5 text-white" />,
    iconBg: "bg-[#7C3AED]", // Purple
    title: "Safe & Secure Shopping",
    desc: "Your personal information and transactions are always protected.",
  },
  {
    icon: <UserCheck className="w-5 h-5 text-white" />,
    iconBg: "bg-[#f97316]", // Orange
    title: "Customer Satisfaction First",
    desc: "We are committed to providing the best shopping experience.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", comment: "", save: false });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!form.name || !form.email || !form.comment) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", comment: "", save: false });
  }

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* Top Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {INFO_CARDS.map(({ icon: IconComponent, title, value }) => (
              <div
                key={title}
                className="group border border-slate-200/80 rounded-2xl p-6 bg-white flex flex-col items-center text-center shadow-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_#00a85926] hover:border-[#00a859] cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#EAF7F0] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#00A759] group-hover:shadow-[0_0_20px_rgba(0,167,89,0.35)]">
                  <IconComponent className="w-5 h-5 text-[#00A759] transition-all duration-300 group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2 transition-all duration-300 group-hover:text-[#00A759]">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          {/* Get in Touch Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Get in Touch</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-4xl">
              We'd love to hear from you about our entire service. Your comments and suggestions will be highly appreciated. Please complete the form below.
            </p>

            {submitted && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 font-medium flex items-center gap-2">
                ✓ Message sent! We'll get back to you shortly.
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-4 border border-slate-200 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00A759] focus:ring-1 focus:ring-[#00A759] transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-4 border border-slate-200 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00A759] focus:ring-1 focus:ring-[#00A759] transition"
                />
              </div>

              <textarea
                placeholder="Comment"
                rows={6}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full px-6 py-4 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00A759] focus:ring-1 focus:ring-[#00A759] transition resize-none"
              />

              <label className="flex items-center gap-3 cursor-pointer select-none text-left">
                <div
                  onClick={() => setForm({ ...form, save: !form.save })}
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    form.save ? "bg-[#00A759] border-[#00A759]" : "border-slate-300 bg-white"
                  }`}
                >
                  {form.save && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  Save my name, email, and website in this browser for the next time I comment.
                </span>
              </label>

              <div className="flex justify-start pt-2">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3.5 bg-[#00A759] hover:bg-[#008a4d] text-white text-sm font-bold rounded-full transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="border-t border-slate-100 pt-16 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Why Choose Us?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {WHY_CHOOSE_US.map(({ icon, iconBg, title, desc }) => (
                <div
                  key={title}
                  className="group border border-slate-200/80 rounded-2xl p-6 bg-white flex flex-col items-center text-center shadow-xs transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_#1a3a4a] hover:border-[#05cd66] cursor-pointer"
                >
                  <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                    {icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 transition-all duration-300">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}