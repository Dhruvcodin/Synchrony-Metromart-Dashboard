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
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  Split,
  Eye,
} from "lucide-react";
import { EXECUTIVE_OVERVIEW_DATA, FIXED_COHORT_SUMMARY } from "@/lib/data/dataset";
import { formatNumber, formatUnits } from "@/lib/utils";

interface ExecutiveOverviewProps {
  onNavigate: (sectionId: string) => void;
}

export default function ExecutiveOverview({ onNavigate }: ExecutiveOverviewProps) {
  const workflowStages = [
    { id: "explorer", label: "Original Data", desc: "4 Core CSV Datasets", sub: "45K Customers & 444K Transactions" },
    { id: "eda", label: "Colab EDA", desc: "Demographics & Dynamics", sub: "Active periods & net sales rules" },
    { id: "sow", label: "Share of Wallet", desc: "FY25 vs FY26 Erosion", sub: "-9.46 pp portfolio SoW drop" },
    { id: "segmentation", label: "6 Customer Segments", desc: "20,779 Fixed Cohort", sub: "8,758 Decliners & 4,830 Low-SoW" },
    { id: "strategies", label: "Reward at Register", desc: "Two-Layer Strategy & Pilot", sub: "Layer 1 Visibility + Layer 2 RCT" },
    { id: "financial-models", label: "Financial Models", desc: "Scenario ROI & Break-Even", sub: "1.607% Margin & Prime Warning" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold">
            <span>Synchrony Analytics Hackathon 2026</span>
            <span>•</span>
            <span>MetroMart Inc. × HSIC Bank Co-Brand Study</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            MetroMart × HSIC Customer Analytics
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Understanding Share of Wallet Decline and Evaluating the &ldquo;Reward at the Register&rdquo; Strategy
          </p>
          <div className="pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
            <span className="text-amber-300 font-semibold">The Core Business Problem:</span> MetroMart customers continue
            to shop actively at MetroMart Inc., but the HSIC co-branded card share of their MetroMart spend has declined
            sharply. Alternative payment methods (MetroMart Wallet, Cash/UPI, and competing bank cards) have gained share.
            The data demonstrates <em>where</em> spending migrated, but not necessarily <em>why</em>. Rather than rolling out
            a blanket cash incentive that risks severe deadweight costs, we introduce a disciplined two-layer strategy:
            first making existing contractual rewards visible at the point of sale, offering a capped incentive only to
            eligible non-responders, and proving true incremental uplift via a randomized controlled pilot.
          </div>
        </div>
      </div>

      {/* Analytical Workflow Stepper (Whiteboard Workflow Reference) */}
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

      {/* Verified Baseline KPI Cards */}
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
            <div className="text-[11px] text-slate-600 mt-1">Full Demographic File</div>
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
            <div className="text-xs text-slate-600 font-medium">Fixed 2-Yr Cohort</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {formatNumber(FIXED_COHORT_SUMMARY.totalCohort)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">Positive Spend Both FYs</div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">Portfolio HSIC SoW</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              28.97% ➔ 19.51%
            </div>
            <div className="text-[11px] text-rose-600 font-bold mt-1">-9.46 pp Portfolio Shift</div>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-sm">
            <div className="text-xs text-rose-700 font-medium">Target Decliners (A–D)</div>
            <div className="text-xl font-extrabold text-rose-600 mt-1">
              {formatNumber(FIXED_COHORT_SUMMARY.declinersTotal)}
            </div>
            <div className="text-[11px] text-rose-600 mt-1">Decline ≥10 pp (120M spend)</div>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
            <div className="text-xs text-amber-800 font-medium">Persistently Low (E)</div>
            <div className="text-xl font-extrabold text-amber-700 mt-1">
              {formatNumber(FIXED_COHORT_SUMMARY.persistentlyLowTotal)}
            </div>
            <div className="text-[11px] text-amber-800 mt-1">SoW &lt;10% in Both FYs</div>
          </div>

          {/* Card 7 */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
            <div className="text-xs text-emerald-800 font-medium">Improvers / Stable</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-1">
              {formatNumber(FIXED_COHORT_SUMMARY.improversTotal)}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">SoW 14.3% ➔ 40.5% (No offer)</div>
          </div>
        </div>
      </div>

      {/* The Core Strategy Presentation: "Reward at the Register" */}
      <div className="bg-white rounded-2xl p-6 border-2 border-amber-400/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
              R
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Core Strategy: &ldquo;Reward at the Register&rdquo;
              </h2>
              <p className="text-xs text-slate-500">
                Make existing contractual rewards visible at the moment of payment; offer extra rewards only to eligible non-responders.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
            Provisional Design • Subject to Risk &amp; Finance Approval
          </span>
        </div>

        {/* Two Layer Architecture Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Layer 1 Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                <Eye className="w-3.5 h-3.5" />
                <span>Layer 1: Reward Visibility</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Zero Extra Reward Cost
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Reward Preview &amp; Missed Cashback Meter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Display an estimate of the HSIC rewards a cardholder could earn on their current eligible basket at checkout,
              plus a monthly &ldquo;Missed Cashback Meter&rdquo; estimating rewards that eligible MetroMart purchases paid with
              other methods could have earned under existing contractual rates (5% Prime Grocery, 3% Prime Electronics, 1% Other).
            </p>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 italic">
              &ldquo;Your eligible MetroMart purchases made using other payment methods could have earned approximately 510 units in HSIC rewards. This is an estimate, not a credit.&rdquo;
            </div>
          </div>

          {/* Layer 2 Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Layer 2: Capped Incremental Incentive</span>
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Eligible Non-Responders Only
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Controlled Non-Responder Incentive (RCT)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Offered strictly to cardholders who showed no response to Layer 1 during the initial 8-week test window.
              Provides a tightly capped <strong>0.5% bonus</strong> on positive incremental HSIC spend above an 8-week baseline,
              capped at <strong>25 source units per customer</strong> and a total payout ceiling of <strong>25,000 source units</strong>.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 block">Eligibility Gate:</span>
                <span className="font-semibold text-slate-800">≥1,500 units pre-period non-HSIC spend</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 block">Risk Guardrail:</span>
                <span className="font-semibold text-rose-700">No extra rewards on Prime Grocery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 gap-2">
          <span>Controlled via a 4-Stage Randomized Controlled Trial (RCT) against an uncontacted holdout control group.</span>
          <button
            onClick={() => onNavigate("strategies")}
            className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center space-x-1"
          >
            <span>Explore Pilot Timeline &amp; Protocol</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Six Key Analytical Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Finding 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Portfolio-Wide Share of Wallet Erosion</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              HSIC co-branded card wallet share at MetroMart dropped by <strong className="text-rose-600">9.46 percentage points</strong> (from 28.97% in FY2025 to 19.51% in FY2026). MetroMart Wallet (+1.27 pp) and Cash/UPI (+4.48 pp) gained share, showing payment method substitution across store visits.
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

        {/* Finding 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Separating Decliners from Persistently Low</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              In the 20,779 fixed cohort, we isolate <strong className="text-slate-900">8,758 acute decliners (A–D)</strong> whose SoW fell by ≥10 pp from the <strong className="text-slate-900">4,830 persistently low cardholders (E)</strong> who never habituated card usage (SoW &lt;10% in both years). These groups require fundamentally distinct treatments.
            </p>
          </div>
          <button
            onClick={() => onNavigate("segmentation")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Examine 6-Segment Cohort</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">The Contractual Advantage Paradox</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              HSIC offers unmatched contractual rewards: <strong>5% Grocery</strong> &amp; <strong>3% Electronics</strong> for Prime members with zero annual fees. No competing card matches these rates. Since customers are switching anyway, reward size is not the problem—checkout visibility and payment friction are.
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

        {/* Finding 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <Split className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Hypothesis-Driven Tailored Interventions</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Wallet switchers (A) receive basket split nudges; Cash/UPI switchers (B) receive one-tap reminders; competing card switchers (C) receive card comparison meters; high-value decliners (D) receive personal outreach; while stable improvers receive zero offers to avoid deadweight spend.
            </p>
          </div>
          <button
            onClick={() => onNavigate("strategies")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Review Strategy Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 5 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Rigorous RCT Pilot Protocol</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Selecting customers on historical decline introduces regression to the mean. True incremental uplift must be evaluated against an uncontacted 50/50 randomized control group, with a 20% persistence holdout to verify that habit persists after messaging stops.
            </p>
          </div>
          <button
            onClick={() => onNavigate("strategies")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>View Pilot Protocol</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Finding 6 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Financial Models &amp; Margin Guardrails</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              At an assumed 3.0% gross contribution and 1.393% baseline reward accrual, blended net margin is <strong className="text-slate-900">1.607%</strong>. Full-scale portfolio break-even requires a <strong className="text-slate-900">6.6 pp uplift (~903 units/customer)</strong>. Crucially, Prime Grocery has a negative margin (-2.0%) under standard terms, requiring strict funding verification.
            </p>
          </div>
          <button
            onClick={() => onNavigate("financial-models")}
            className="mt-4 inline-flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700 group"
          >
            <span>Run Financial Models</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
