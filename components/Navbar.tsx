"use client";

import React from "react";
import { CreditCard, TrendingDown, Users, ShieldAlert, Sparkles } from "lucide-react";
import { FIXED_COHORT_SUMMARY } from "@/lib/data/dataset";
import { formatNumber } from "@/lib/utils";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const SECTIONS = [
  { id: "overview", label: "Executive Overview", num: "01" },
  { id: "explorer", label: "Data Explorer", num: "02" },
  { id: "eda", label: "Exploratory Data Analysis", num: "03" },
  { id: "sow", label: "Share of Wallet", num: "04" },
  { id: "benefits", label: "Contractual Card Benefits", num: "05" },
  { id: "segmentation", label: "Customer Segmentation", num: "06" },
  { id: "strategies", label: "Targeted Strategies", num: "07" },
  { id: "financial-models", label: "Financial Models", num: "08" },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0B1528] text-white border-b border-slate-800 shadow-md">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-400/20 text-slate-950 font-bold text-xl">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  MetroMart <span className="text-amber-400 font-light">×</span> HSIC
                </span>
                <span className="bg-amber-400/10 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-400/30 font-medium">
                  Synchrony Analytics
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Reward at the Register • Two-Layer Strategy &amp; Controlled Pilot
              </p>
            </div>
          </div>

          {/* Key KPI Quick Ticker */}
          <div className="hidden lg:flex items-center space-x-5">
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <Users className="w-4 h-4 text-slate-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Fixed Cohort</div>
                <div className="text-xs font-semibold text-white">
                  {formatNumber(FIXED_COHORT_SUMMARY.totalCohort)} Cardholders
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Target Decliners (A–D)</div>
                <div className="text-xs font-semibold text-rose-400">
                  {formatNumber(FIXED_COHORT_SUMMARY.declinersTotal)} (≥10 pp Drop)
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Core Strategy</div>
                <div className="text-xs font-bold text-amber-400">
                  Reward at the Register
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - 8 exact sections in order */}
      <div className="bg-[#0f1d38] border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 py-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onNavigate(sec.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span
                    className={`text-[10px] opacity-70 ${
                      isActive ? "text-slate-900 font-extrabold" : "text-amber-400/80"
                    }`}
                  >
                    {sec.num}
                  </span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
