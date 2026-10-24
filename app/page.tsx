"use client";

import React, { useState, useEffect } from "react";
import Navbar, { SECTIONS } from "@/components/Navbar";
import ExecutiveOverview from "@/components/sections/ExecutiveOverview";
import DataExplorer from "@/components/sections/DataExplorer";
import ExploratoryDataAnalysis from "@/components/sections/ExploratoryDataAnalysis";
import ShareOfWallet from "@/components/sections/ShareOfWallet";
import ContractualBenefits from "@/components/sections/ContractualBenefits";
import CustomerSegmentation from "@/components/sections/CustomerSegmentation";
import TargetedStrategies from "@/components/sections/TargetedStrategies";
import FinancialModels from "@/components/sections/FinancialModels";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Scroll to top when changing section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <div>
        {/* Sticky Header with 8 exact ordered sections */}
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {activeSection === "overview" && (
            <ExecutiveOverview onNavigate={handleNavigate} />
          )}

          {activeSection === "explorer" && (
            <DataExplorer />
          )}

          {activeSection === "eda" && (
            <ExploratoryDataAnalysis />
          )}

          {activeSection === "sow" && (
            <ShareOfWallet />
          )}

          {activeSection === "benefits" && (
            <ContractualBenefits />
          )}

          {activeSection === "segmentation" && (
            <CustomerSegmentation onNavigate={handleNavigate} />
          )}

          {activeSection === "strategies" && (
            <TargetedStrategies onNavigate={handleNavigate} />
          )}

          {activeSection === "financial-models" && (
            <FinancialModels />
          )}

          {/* Workflow Stepper Pagination (Previous / Next Phase) */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            {prevSection ? (
              <button
                onClick={() => handleNavigate(prevSection.id)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-slate-500" />
                <span>
                  Previous: <span className="text-slate-900 font-bold">{prevSection.label}</span>
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextSection ? (
              <button
                onClick={() => handleNavigate(nextSection.id)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>
                  Next Phase: <span className="text-amber-400">{nextSection.label}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            ) : (
              <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                End of Analytical Journey • Financial Models
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
