"use client";

import React from "react";
import {
  Users,
  CreditCard,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Wallet,
  Smartphone,
  Layers,
  Target,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { EXECUTIVE_OVERVIEW_DATA } from "@/lib/data/dataset";
import { formatINR, formatNumber } from "@/lib/utils";

interface ExecutiveOverviewProps {
  onNavigate: (sectionId: string) => void;
}

export default function ExecutiveOverview({ onNavigate }: ExecutiveOverviewProps) {
  const workflowStages = [
    { id: "explorer", label: "Original Data", desc: "4 Core CSV datasets", sub: "45K Customers & 444K Transactions" },
    { id: "eda", label: "Colab EDA", desc: "Customer Demographics & Patterns", sub: "Sales, returns, active periods" },
    { id: "sow", label: "Share of Wallet", desc: "FY25 vs FY26 Shift", sub: "HSIC decline of -9.46 pp" },
    { id: "segmentation", label: "Declining Cohort & Segments", desc: "10,498 Customers (Priority D>A>B>C)", sub: "Mutually exclusive groups" },
    { id: "strategies", label: "Targeted Strategies", desc: "4 Tailored Interventions", sub: "Wallet, UPI, Card & VIP" },
    { id: "financial-models", label: "Financial Models", desc: "Scenario ROI & Break-Even", sub: "Net Contribution Impact" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold">
            <span>Synchrony Analytics Portfolio Diagnostic</span>
            <span>•</span>
            <span>FY2025 – FY2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            MetroMart × HSIC Customer Analytics
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Understanding Share of Wallet Decline and Identifying Customer Recovery Opportunities
          </p>
          <div className="pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
            <span className="text-amber-300 font-semibold">Core Business Problem:</span> Many customers holding the
            MetroMart–HSIC co-branded credit card continue to actively shop at MetroMart Inc., yet they are shifting
            substantial spending away from the HSIC card toward alternative payment methods—predominantly the MetroMart
            stored-value wallet, instant Cash/UPI, and competing bank cards. This &ldquo;silent attrition&rdquo; erodes high-margin
            interchange and co-brand relationship value without visible store-level churn.
          </div>
        </div>
      </div>

      {/* Analytical Journey Stepper (Whiteboard Workflow Reference) */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Analytical Workflow Architecture</h2>
          </div>
          <span className="text-xs text-slate-700 font-medium bg-slate-100 px-2 py-1 rounded">
            Interactive Analytical Journey
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {workflowStages.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => onNavigate(stage.id)}
              className="group text-left p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span className="font-bold text-amber-600">Phase 0{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-600 transition-opacity" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-amber-800">
                  {stage.label}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">{stage.desc}</div>
              </div>
              <div className="mt-2 text-[10px] text-slate-600 font-medium border-t border-slate-100 pt-1">
                {stage.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Verified KPI Cards */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
          Verified Portfolio Baseline Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">Total Customers</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatNumber(EXECUTIVE_OVERVIEW_DATA.totalCustomers)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">Unique Account Records</div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">Transaction Records</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatNumber(EXECUTIVE_OVERVIEW_DATA.totalTransactions)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">399K Sales • 45K Returns</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">FY2025 HSIC SoW</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {EXECUTIVE_OVERVIEW_DATA.fy2025HsicSow}%
            </div>
            <div className="text-[11px] text-slate-600 mt-1">Baseline Portfolio Share</div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">FY2026 HSIC SoW</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {EXECUTIVE_OVERVIEW_DATA.fy2026HsicSow}%
            </div>
            <div className="text-[11px] text-slate-600 mt-1">Post-Shift Portfolio Share</div>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-sm">
            <div className="text-xs text-rose-700 font-medium">Portfolio HSIC Change</div>
            <div className="text-xl font-extrabold text-rose-600 mt-1">
              {EXECUTIVE_OVERVIEW_DATA.hsicSowChange} pp
            </div>
            <div className="text-[11px] text-rose-600 mt-1">Net Share Loss</div>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
            <div className="text-xs text-amber-800 font-medium">Declining Customers</div>
            <div className="text-xl font-extrabold text-amber-700 mt-1">
              {formatNumber(EXECUTIVE_OVERVIEW_DATA.decliningCustomersCount)}
            </div>
            <div className="text-[11px] text-amber-800 mt-1">Individual SoW Decliners</div>
          </div>

          {/* Card 7 */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
            <div className="text-xs text-emerald-800 font-medium">Segmented Customers</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-1">
              {formatNumber(EXECUTIVE_OVERVIEW_DATA.segmentCustomersCount)}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">100% Mutually Exclusive</div>
          </div>
        </div>
      </div>

      {/* Key Analytical Findings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Finding 1: Portfolio HSIC Decline */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Overall Portfolio HSIC SoW Trend</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              HSIC co-branded card wallet share at MetroMart plummeted by <strong className="text-rose-600">9.46 percentage points</strong> (from 28.97% in FY2025 to 19.51% in FY2026). This reflects a systemic silent attrition where active cardholders keep patronizing MetroMart but substitute away from HSIC at checkout.
            </p>
          </div>
          <button
            onClick={() => onNavigate("sow")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Review Full SoW Analysis</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 2: Payment Methods Gaining Share */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Alternative Payment Methods Gaining Share</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The 9.46 pp HSIC loss was absorbed across all alternative payment methods:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {EXECUTIVE_OVERVIEW_DATA.alternativePaymentGains.map((item) => (
                <div key={item.method} className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-600">{item.method}</div>
                  <div className="text-xs font-bold text-emerald-600">{item.changePp} ({item.fy26Share})</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigate("sow")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Examine Monthly SoW Shifts</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 3: The Declining HSIC Cohort */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">The 10,498 Declining-HSIC Cohort</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Among customers whose individual HSIC SoW declined, the collapse is severe: HSIC share fell from <strong className="text-slate-900">43.15%</strong> in FY2025 down to just <strong className="text-rose-600">9.98%</strong> in FY2026—a plunge of <strong className="text-rose-600">33.17 pp</strong>.
              In this group, MetroMart Wallet surged by <strong className="text-emerald-600">+13.03 pp</strong> and Cash/UPI by <strong className="text-emerald-600">+10.93 pp</strong>.
            </p>
          </div>
          <button
            onClick={() => onNavigate("sow")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>View Cohort Waterfall</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 4: Four Customer Segments */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Four Mutually Exclusive Segments</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Applying hierarchical priority (<strong className="text-slate-900">D &gt; A &gt; B &gt; C</strong>) to eliminate double-counting partitions the 10,498 decliners into four actionable groups:
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700">
              <li className="flex justify-between">
                <span><strong>Seg A:</strong> Wallet Switchers</span>
                <span className="font-bold">4,931 (46.97%)</span>
              </li>
              <li className="flex justify-between">
                <span><strong>Seg B:</strong> Cash/UPI Switchers</span>
                <span className="font-bold">2,721 (25.92%)</span>
              </li>
              <li className="flex justify-between">
                <span><strong>Seg C:</strong> Competing Card Switchers</span>
                <span className="font-bold">1,145 (10.91%)</span>
              </li>
              <li className="flex justify-between">
                <span><strong>Seg D:</strong> High-Value Rapid Decliners</span>
                <span className="font-bold">1,701 (16.20%)</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate("segmentation")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Explore Customer Segments</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 5: The Contractual vs Behavioural Paradox */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Contractual Card Benefits Paradox</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              HSIC offers unmatched benefits: <strong>5% Grocery</strong> & <strong>3% Electronics</strong> for Prime members, and 1% across all categories with zero annual fees. No competitor card matches these rates. The decline is not driven by product uncompetitiveness, but by frictionless wallet defaults and awareness gaps.
            </p>
          </div>
          <button
            onClick={() => onNavigate("benefits")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Review Contractual Matrix</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 6: Quantified Opportunity & Financial Models */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Quantified Recovery Opportunity</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The 10,498 declining cardholders generated <strong className="text-slate-900">{formatINR(EXECUTIVE_OVERVIEW_DATA.decliningCohortSpendFY26)}</strong> in FY2026 MetroMart spend. However, <strong className="text-emerald-700">{formatINR(EXECUTIVE_OVERVIEW_DATA.nonHsicSpendInDecliningCohortFY26)}</strong> was paid via non-HSIC methods. Targeted campaigns can win back 20%–35% of this volume profitably.
            </p>
          </div>
          <button
            onClick={() => onNavigate("financial-models")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Simulate Financial Models</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
