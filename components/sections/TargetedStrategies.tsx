"use client";

import React, { useState } from "react";
import {
  Target,
  Wallet,
  Smartphone,
  CreditCard,
  Crown,
  Calendar,
  Gift,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Settings,
  AlertTriangle,
  Info,
  ShieldCheck,
  Split,
  Eye,
  Sliders,
} from "lucide-react";
import {
  SIX_CUSTOMER_SEGMENTS,
  PILOT_DESIGN,
  FIXED_COHORT_SUMMARY,
} from "@/lib/data/dataset";
import { formatNumber, formatUnits } from "@/lib/utils";

const SEGMENT_COLORS: Record<string, string> = {
  A: "#8B5CF6", // Violet
  B: "#06B6D4", // Cyan
  C: "#3B82F6", // Blue
  D: "#F59E0B", // Gold
  E: "#94A3B8", // Slate
  Improvers: "#10B981", // Emerald
};

interface TargetedStrategiesProps {
  onNavigate: (sectionId: string) => void;
}

export default function TargetedStrategies({ onNavigate }: TargetedStrategiesProps) {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("A");
  const [meterPrimeStatus, setMeterPrimeStatus] = useState<"prime" | "non-prime">("prime");

  const segments = SIX_CUSTOMER_SEGMENTS;
  const currentSeg = segments.find((s) => s.id === selectedSegmentId) || segments[0];
  const pilot = PILOT_DESIGN;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Target className="w-5 h-5 text-amber-500" />
            <span>Targeted Strategies: &ldquo;Reward at the Register&rdquo;</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Two-layer behavioral architecture &amp; randomized controlled trial (RCT) protocol
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Intended Target: 8,758 Decliners (A–D) + 4,830 Low-SoW (E)
          </span>
        </div>
      </div>

      {/* TWO-LAYER STRATEGY ARCHITECTURE DIAGRAM */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              Two-Layer Strategy Architecture
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
            Provisional Strategy Framework
          </span>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Step 1 */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-blue-300 font-bold mb-2">
                <span>01. Layer 1 Visibility</span>
                <Eye className="w-4 h-4" />
              </div>
              <strong className="text-white block text-sm mb-1">Make Rewards Visible</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Reward Preview at basket checkout + monthly Missed Cashback Meter. Free to run—zero extra promotional reward cost.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-semibold">
              Applies to Segments A, B, C, D &amp; E
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-amber-300 font-bold mb-2">
                <span>02. Response Filter</span>
                <Clock className="w-4 h-4" />
              </div>
              <strong className="text-white block text-sm mb-1">8-Week Response Gate</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Measure organic uplift in Stage 1. Cardholders who respond naturally continue without costly incentives.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-amber-300 font-semibold">
              Avoids Deadweight Incentive Cost
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-rose-300 font-bold mb-2">
                <span>03. Layer 2 Capped Incentive</span>
                <Gift className="w-4 h-4" />
              </div>
              <strong className="text-white block text-sm mb-1">Eligible Non-Responders</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                0.5% bonus on incremental spend above baseline. Strict caps: 25 units/cust, 25k units total. Non-Prime prioritized.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-rose-300 font-semibold">
              No extra rewards on Prime Grocery
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-emerald-300 font-bold mb-2">
                <span>04. Controlled Evaluation</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <strong className="text-white block text-sm mb-1">50/50 RCT &amp; Holdout</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Measure true incremental uplift against uncontacted control group. 20% persistence holdout verifies habit retention.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-semibold">
              Guards against regression to mean
            </div>
          </div>
        </div>
      </div>

      {/* ILLUSTRATIVE MISSED CASHBACK METER CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">
              Layer 1 Illustrative Feature: The Missed Cashback Meter
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-500">Simulate Member Tier:</span>
            <button
              onClick={() => setMeterPrimeStatus("prime")}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                meterPrimeStatus === "prime" ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-100 text-slate-600"
              }`}
            >
              Prime Member
            </button>
            <button
              onClick={() => setMeterPrimeStatus("non-prime")}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                meterPrimeStatus === "non-prime" ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-600"
              }`}
            >
              Non-Prime Member
            </button>
          </div>
        </div>

        {/* The Card Component */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-5 border border-slate-700 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Monthly Reward Opportunity Summary (Illustrative Concept Only)
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Not a Credit
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Based on your eligible MetroMart purchases paid via other payment methods over the past 30 days:
            </p>

            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block">Eligible Grocery</span>
                <span className="font-bold text-white text-xs">8,000 units</span>
                <span className="text-[10px] text-amber-400 block mt-0.5">
                  {meterPrimeStatus === "prime" ? "5% = 400 units" : "1% = 80 units"}
                </span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block">Eligible Electronics</span>
                <span className="font-bold text-white text-xs">3,000 units</span>
                <span className="text-[10px] text-amber-400 block mt-0.5">
                  {meterPrimeStatus === "prime" ? "3% = 90 units" : "1% = 30 units"}
                </span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block">Other Categories</span>
                <span className="font-bold text-white text-xs">2,000 units</span>
                <span className="text-[10px] text-amber-400 block mt-0.5">1% = 20 units</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-300 block">Total Estimated Unclaimed Rewards:</span>
                <span className="text-xs font-semibold text-white">
                  {meterPrimeStatus === "prime" ? "510 potential reward units" : "130 potential reward units"}
                </span>
              </div>
              <span className="text-xl font-black text-amber-400">
                {meterPrimeStatus === "prime" ? "510 Units" : "130 Units"}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 italic leading-relaxed pt-1">
              &ldquo;Your eligible MetroMart purchases made using other payment methods could have earned approximately {meterPrimeStatus === "prime" ? "510" : "130"} units in HSIC rewards. This is an estimate, not a credit.&rdquo;
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          *Note: Meter production requires appropriate access to category, payment-method, and return data, plus data-sharing, privacy, consent, and compliance sign-off.
        </p>
      </div>

      {/* SEGMENT-SPECIFIC STRATEGY EXPLORER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Segment Intervention Blueprints (6 Standard Dimensions)
            </h3>
            <p className="text-xs text-slate-500">
              Select a segment to examine observation, hypothesis, intervention, metrics, guardrails, and failure protocol
            </p>
          </div>

          {/* Segment Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            {segments.map((seg) => {
              const isSelected = selectedSegmentId === seg.id;
              const color = SEGMENT_COLORS[seg.id] || "#64748B";
              return (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-white text-slate-900 font-bold shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span>{seg.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Segment Strategy Card (6 Dimensions) */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                {currentSeg.code} • {currentSeg.category}
              </span>
              <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Strategy: {currentSeg.strategyName}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium block">Target Population:</span>
              <span className="text-base font-extrabold text-slate-900">
                {formatNumber(currentSeg.customerCount)} Customers ({currentSeg.shareOfCohort}% of cohort)
              </span>
            </div>
          </div>

          {/* 6 Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Dim 1: Observed */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span>1. What We Observed</span>
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{currentSeg.behavior}</p>
              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                SoW: {currentSeg.sowFY25}% ➔ {currentSeg.sowFY26}% ({currentSeg.declinePp} pp)
              </div>
            </div>

            {/* Dim 2: Hypothesis */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-amber-800 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>2. Why It May Happen (Hypothesis)</span>
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{currentSeg.hypothesis}</p>
              <div className="pt-2 text-[10px] text-amber-700 font-semibold italic">
                Treated as hypothesis to test, not proven causality.
              </div>
            </div>

            {/* Dim 3: What We Will Do */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-blue-800 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>3. What We Will Do</span>
              </span>
              <div className="text-slate-700 text-[11px] leading-relaxed pt-1 space-y-1">
                <div><strong>Layer 1:</strong> {currentSeg.layer1Intervention}</div>
                <div><strong>Layer 2:</strong> {currentSeg.layer2Intervention}</div>
              </div>
            </div>

            {/* Dim 4: Measurement */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-800 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>4. How We Measure It</span>
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{currentSeg.successMetric}</p>
              <div className="pt-2 text-[10px] text-emerald-700 font-semibold">
                Provisional break-even uplift: +{currentSeg.breakEvenPp} pp
              </div>
            </div>

            {/* Dim 5: Guardrails */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-rose-800 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>5. Guardrails &amp; Risk</span>
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{currentSeg.guardrail}</p>
            </div>

            {/* Dim 6: What If It Fails */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-purple-800 flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>6. What We Do If It Fails</span>
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{currentSeg.failAction}</p>
              <div className="pt-2 text-[10px] text-slate-500 font-medium">
                Lead Owner: {currentSeg.owner}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RANDOMIZED CONTROLLED PILOT (RCT) DESIGN PANEL */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">
              Controlled Pilot Protocol &amp; Measurement Timeline
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            26-Week Controlled Evaluation
          </span>
        </div>

        {/* 4 Pilot Stages Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {pilot.timelineStages.map((stage: any, idx: number) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>{stage.weeks}</span>
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">{stage.title}</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>

        {/* Pilot Decision Pathway: Scale / Revise / Stop */}
        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
            <span>Pre-Specified Decision Pathway</span>
            <span>Pre-Registration Required</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-white/5 border border-emerald-500/30">
              <strong className="text-emerald-400 block text-xs mb-1">Scale Criteria:</strong>
              {pilot.decisionPathway.scaleCriteria}
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-amber-400/30">
              <strong className="text-amber-400 block text-xs mb-1">Revise Criteria:</strong>
              {pilot.decisionPathway.reviseCriteria}
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-rose-500/30">
              <strong className="text-rose-400 block text-xs mb-1">Stop Criteria:</strong>
              {pilot.decisionPathway.stopCriteria}
            </div>
          </div>
        </div>

        {/* Ownership & Feasibility Responsibilities */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900">Governance &amp; Partner Feasibility Matrix</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-600 text-[11px] leading-relaxed pt-1">
            <div>
              <strong className="text-slate-900 block font-semibold">HSIC Responsibilities:</strong>
              Reward rules/rates, active-card verification, reward calculation engine, issuer/network compliance sign-off, risk exclusions, and approved incentive funding.
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">MetroMart Responsibilities:</strong>
              Basket category/payment data under approved data-sharing arrangement, customer-facing placement, wallet/message UI, random assignment execution, and control-group discipline.
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">Joint / Finance Responsibilities:</strong>
              Validate contribution margins, verify category-level economics (especially Prime Grocery), audit payout budget, and enforce responsible lending rules.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
