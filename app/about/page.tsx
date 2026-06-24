"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  ShieldCheck,
  TruckIcon,
  Tag,
  Headphones,
  Sparkles,
  Boxes,
  Users,
  TrendingUp,
} from "lucide-react";

export default function AboutPage() {
  const categories = [
    "Home & Kitchen",
    "Toys & Games",
    "Baby Products",
    "Cleaning & Household Essentials",
    "Gym & Fitness Accessories",
    "Car Accessories",
    "Bottles & Mugs",
    "Personal Care Products",
    "Beauty & Lifestyle Products",
    "Daily Utility Items",
    "Storage & Organization Products",
    "Seasonal Products",
    "Gift Items",
    "Kitchen Tools & Accessories",
    "And many more categories",
  ];

  const marketplaces = [
    "Amazon",
    "Flipkart",
    "Meesho",
    "Etsy",
    "Google Shopping",
    "JioMart",
    "Blinkit",
    "Shopsy",
    "Myntra",
    "Nykaa",
    "And many other e-commerce platforms",
  ];

  const whyChooseUs = [
    {
      icon: Boxes,
      title: "Wide Product Range",
      desc: "Access thousands of products across multiple categories from a single source.",
    },
    {
      icon: Tag,
      title: "Wholesale Pricing",
      desc: "Get competitive wholesale rates that help maximize your profit margins.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Industry Experience",
      desc: "With over 5 years of experience in the wholesale and e-commerce supply business, we understand marketplace requirements and seller needs.",
    },
    {
      icon: TrendingUp,
      title: "Business Growth Support",
      desc: "We don't just supply products—we help entrepreneurs start and scale their online business journey.",
    },
    {
      icon: TruckIcon,
      title: "Reliable Supply Chain",
      desc: "Consistent product availability and efficient order processing ensure smooth business operations.",
    },
    {
      icon: Users,
      title: "Dedicated Seller Network",
      desc: "We have built a strong community of successful resellers and marketplace sellers across India.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Banner */}
        <div className="w-full rounded-2xl overflow-hidden mb-10">
          <img
            src="/images/hero_sec2.jpeg"
            alt="About Sarvam Cart"
            className="w-full h-[550px] object-cover"
          />
        </div>

        {/* Welcome Section */}
        <div className="flex items-start gap-5 bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-1">
            <Sparkles className="w-6 h-6 text-[#00A759]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">
              Welcome to Sarvam Cart
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sarvam Cart is one of India's trusted importer and wholesale
              suppliers of e-commerce products, helping entrepreneurs,
              resellers, and online sellers build successful businesses
              across leading marketplaces.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              For the last 5+ years, we have been dedicated to supplying
              quality products at competitive wholesale prices and
              supporting thousands of sellers in growing their online
              businesses. Whether you are a beginner starting your first
              online store or an experienced marketplace seller, Sarvam Cart
              provides the products, pricing, and support you need to
              succeed.
            </p>
          </div>
        </div>

        {/* Achievements Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { num: "5+", label: "Years of Industry Experience" },
            { num: "1,500+", label: "Active Resellers" },
            { num: "10,00,000+", label: "Products Sold" },
            { num: "Growing", label: "Every Day" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#00A759]">{num}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Who We Are */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Who We Are</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sarvam Cart is an importer and wholesaler specializing in a vast
            range of products across multiple categories. We source quality
            products and make them available to resellers, retailers,
            dropshippers, and marketplace sellers at wholesale rates.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            Our goal is simple: to empower every entrepreneur with affordable
            products, reliable supply, and complete business support.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            We believe that starting an online business should be easy and
            accessible for everyone. That's why we work closely with our
            reseller network and provide products that help them scale
            faster and earn better profits.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">What We Offer</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            We deal in a wide variety of product categories, including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {categories.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A759] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            With a continuously expanding catalog, we help sellers find
            trending and profitable products for every marketplace.
          </p>
        </div>

        {/* Supporting Online Sellers */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Supporting Online Sellers Across India
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            At Sarvam Cart, we proudly support sellers who want to start or
            grow their business on major online marketplaces, including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {marketplaces.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-slate-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A759] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            We provide products directly at wholesale prices so that our
            partners can focus on selling while we take care of sourcing and
            supply.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            Whether you want to sell a single product or build a large
            online brand, Sarvam Cart is your reliable wholesale partner.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Why Choose Sarvam Cart?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#00A759]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To become India's most trusted wholesale and e-commerce supply
              partner by providing quality products, competitive pricing,
              and complete support to every entrepreneur.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower thousands of individuals, startups, and businesses
              to build successful online ventures by making wholesale
              sourcing simple, profitable, and reliable.
            </p>
          </div>
        </div>

        {/* Partner With Us */}
        <div className="flex items-start gap-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-1">
            <Headphones className="w-6 h-6 text-[#00A759]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Partner With Sarvam Cart
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are a reseller, retailer, dropshipper, marketplace
              seller, or someone looking to start an online business, Sarvam
              Cart is here to support your growth.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              Join our growing network of successful sellers and discover
              quality products, wholesale pricing, and dependable business
              support—all under one roof.
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-3">
              Sarvam Cart – Your Trusted Wholesale Partner for E-commerce
              Success.
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}