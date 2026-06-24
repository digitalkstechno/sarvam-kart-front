"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      {/* Hero */}
      <div className=" py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-black mb-2">Shipping Policy</h1>
        <p className="text-sm text-slate-400">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          {" / "}
          <span className="text-black">Shipping Policy</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pt-4 pb-14 space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">SarvamCart</span>{" "}
            provides doorstep delivery across India and worldwide. This page
            outlines our shipping, returns, and refund policies so you know
            exactly what to expect when you shop with us.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black shrink-0">
              1
            </span>
            <h2 className="text-lg font-bold text-slate-900">Shipping Policy</h2>
          </div>
          <ul className="space-y-2">
            {[
              "SarvamCart provides doorstep delivery across India and worldwide.",
              "Shipping charges are calculated based on the product weight, package dimensions, destination, and courier service availability.",
              "Delivery timelines may vary depending on the shipping location and customs clearance requirements for international orders.",
              "Customers will receive tracking details once the order is dispatched.",
              "Any delays caused by courier companies, customs authorities, natural disasters, strikes, or unforeseen circumstances are beyond our control.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black shrink-0">
              2
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Returns &amp; Refunds Policy
            </h2>
          </div>
          <ul className="space-y-2">
            {[
              "We do not accept returns, exchanges, or cancellations after an order has been shipped or delivered.",
              "Returns are considered only if the product is received damaged during transit.",
              "A complete unboxing video is mandatory for any damaged product claim.",
              "The unboxing video must clearly show the sealed package, shipping label, opening process, and damaged product without any cuts or edits.",
              "Return requests must be submitted within 24 hours of delivery.",
              "Claims submitted without proper proof or after the specified time period may be rejected.",
              "After verification and approval, SarvamCart may offer a replacement, store credit, or refund at its sole discretion.",
              "Products damaged due to misuse, improper handling, normal wear and tear, or customer negligence are not eligible for replacement or refund.",
              "SarvamCart reserves the right to reject fraudulent, incomplete, or unverifiable claims.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black shrink-0">
              3
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              How to Submit a Return Request
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            All return requests must be sent only to our official support
            email address along with:
          </p>
          <ul className="space-y-2">
            {[
              "Complete unboxing video",
              "Clear photos of the damaged product",
              "Order number and invoice details",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-sm text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4 - Important Notice */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black shrink-0">
              4
            </span>
            <h2 className="text-lg font-bold text-slate-900">Important Notice</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            By placing an order on{" "}
            <span className="font-semibold text-slate-800">SarvamCart</span>,
            customers acknowledge and agree to our Shipping, Return, and
            Refund Policies. As we source products directly from
            manufacturers and importers at the lowest possible prices, all
            sales are considered final except for verified transit damage
            claims supported by valid unboxing proof.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}