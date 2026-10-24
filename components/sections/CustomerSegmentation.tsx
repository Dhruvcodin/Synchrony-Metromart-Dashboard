"use client";

import React, { useState } from "react";
import {
  Users,
  Wallet,
  Smartphone,
  CreditCard,
  Crown,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  SIX_CUSTOMER_SEGMENTS,
  FIXED_COHORT_SUMMARY,
  CUSTOMER_SEGMENTS,
} from "@/lib/data/dataset";
import { formatNumber, formatUnits } from "@/lib/utils";

const SIX_COLORS: Record<string, string> = {
  A: "#8B5CF6", // Violet (Wallet)
  B: "#06B6D4", // Cyan (UPI)
  C: "#3B82F6", // Blue (Competing Cards)
  D: "#F59E0B", // Gold (High-Value)
  E: "#94A3B8", // Slate (Persistently Low)
  Improvers: "#10B981", // Emerald (Improvers / Stable)
};

interface CustomerSegmentationProps {
  onNavigate: (sectionId: string) => void;
}

export default function CustomerSegmentation({ onNavigate }: CustomerSegmentationProps) {
  const [activeView, setActiveView] = useState<"six-cohort" | "four-decliners">("six-cohort");

  const sixSegments = SIX_CUSTOMER_SEGMENTS;
  const fourSegments = CUSTOMER_SEGMENTS;

  const chartData = sixSegments.map((s) => ({
    name: s.code,
    id: s.id,
    count: s.customerCount,
    share: s.shareOfCohort,
    spend: s.meanSpendFY26,
    color: SIX_COLORS[s.id] || "#64748B",
  }));

  return (
    <div className="space-y-6">
      {/* Header and View Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>Customer Segmentation Architecture</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Partitioning the fixed active cohort into mutually exclusive behavioural segments
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveView("six-cohort")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeView === "six-cohort"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Revised Strategy Cohort (20,779 Customers)
          </button>
          <button
            onClick={() => setActiveView("four-decliners")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeView === "four-decliners"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Historical Colab Decliners (10,498 Customers)
          </button>
        </div>
      </div>

      {/* VIEW 1: REVISED STRATEGY COHORT (20,779 CUSTOMERS) */}
      {activeView === "six-cohort" && (
        <div className="space-y-6">
          {/* Cohort Allocation Overview Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  20,779 Fixed Active Cohort: 100% Mutually Exclusive Reconciliation
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40">
                Sum: 20,779 • Zero Unassigned
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              The fixed active cohort consists of all <strong>20,779 cardholders</strong> who generated positive net spend at MetroMart in both FY2025 and FY2026 with active card eligibility. We separate acute decliners (A–D: 8,758) from persistently low cardholders (E: 4,830) and healthy organic spenders (7,191 Improvers).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-violet-400/30">
                <span className="text-violet-300 font-bold block">Seg A: Wallet</span>
                <span className="text-lg font-black text-white">2,654</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">12.8% of cohort</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-cyan-400/30">
                <span className="text-cyan-300 font-bold block">Seg B: Cash/UPI</span>
                <span className="text-lg font-black text-white">2,097</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">10.1% of cohort</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-blue-400/30">
                <span className="text-blue-300 font-bold block">Seg C: Cards</span>
                <span className="text-lg font-black text-white">2,285</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">11.0% of cohort</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-amber-400/30">
                <span className="text-amber-300 font-bold block">Seg D: High-Value</span>
                <span className="text-lg font-black text-white">1,722</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">8.3% of cohort</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-slate-500/30">
                <span className="text-slate-300 font-bold block">Seg E: Low SoW</span>
                <span className="text-lg font-black text-white">4,830</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">23.2% of cohort</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-emerald-300 font-bold block">Improvers</span>
                <span className="text-lg font-black text-white">7,191</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">34.6% (No offer)</span>
              </div>
            </div>
          </div>

          {/* Six-Row Master Segment Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Six-Segment Master Analytical Ledger</h3>
                <p className="text-xs text-slate-500">Mutually exclusive allocation covering 100% of the 20,779 fixed cohort</p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                A–D Decliners: 8,758 Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Segment Name</th>
                    <th className="px-3 py-3 text-right">Customer Count</th>
                    <th className="px-3 py-3 text-right">Share (%)</th>
                    <th className="px-3 py-3 text-right">FY25 SoW</th>
                    <th className="px-3 py-3 text-right">FY26 SoW</th>
                    <th className="px-3 py-3 text-right">SoW Shift</th>
                    <th className="px-3 py-3 text-right">Mean FY26 Spend</th>
                    <th className="px-4 py-3">Planned Intervention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sixSegments.map((seg) => {
                    const color = SIX_COLORS[seg.id] || "#64748B";
                    const isDecliner = seg.category.includes("Decliner");
                    const isImprover = seg.id === "Improvers";
                    return (
                      <tr key={seg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                            <div>
                              <div className="font-bold text-slate-900">{seg.name}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{seg.strategyName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-extrabold text-slate-900">
                          {formatNumber(seg.customerCount)}
                        </td>
                        <td className="px-3 py-3 text-right text-slate-600 font-medium">
                          {seg.shareOfCohort.toFixed(1)}%
                        </td>
                        <td className="px-3 py-3 text-right text-slate-600">
                          {seg.sowFY25.toFixed(1)}%
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-slate-900">
                          {seg.sowFY26.toFixed(1)}%
                        </td>
                        <td
                          className={`px-3 py-3 text-right font-bold ${
                            seg.declinePp < 0 ? "text-rose-600" : seg.declinePp > 0 ? "text-emerald-600" : "text-slate-600"
                          }`}
                        >
                          {seg.declinePp > 0 ? `+${seg.declinePp.toFixed(1)}` : seg.declinePp.toFixed(1)} pp
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-slate-900">
                          {formatUnits(seg.meanSpendFY26)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                              isDecliner
                                ? "bg-amber-50 text-amber-900 border border-amber-200"
                                : isImprover
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {seg.intervention || seg.strategyName}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Totals Row */}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-300 text-slate-900">
                    <td className="px-4 py-3 font-black">Cohort Total</td>
                    <td className="px-3 py-3 text-right font-black">{formatNumber(FIXED_COHORT_SUMMARY.totalCohort)}</td>
                    <td className="px-3 py-3 text-right">100.0%</td>
                    <td className="px-3 py-3 text-right" colSpan={3}>
                      Weighted SoW Tracked Across 2 Fiscal Years
                    </td>
                    <td className="px-3 py-3 text-right font-black">20,779 Verified</td>
                    <td className="px-4 py-3 text-emerald-700 font-bold">100% Reconciled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Horizontal Bar Chart of Customer Counts */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Customer Population by Segment</h3>
            <p className="text-xs text-slate-500 mb-4">A–D Decliners represent 8,758 customers (42.2% of cohort); Improvers represent 34.6%</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={160} />
                  <Tooltip
                    formatter={(val: any) => [`${formatNumber(val)} customers`, "Population"]}
                    contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistical Caveat: Regression to the Mean */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-sm flex items-start space-x-3 text-xs">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block font-semibold mb-0.5">
                Statistical Warning: Regression to the Mean &amp; Need for Randomized Control
              </strong>
              Selecting customers on the basis of an extreme historical decline (such as the 8,758 decliners in A–D) creates an inherent risk of <em>regression to the mean</em>—some customers would organically rebound without any intervention. Therefore, a simple pre/post before-and-after comparison is statistically flawed. True incremental effect can <strong>only</strong> be established by measuring the uplift of the treated group against a contemporaneous, uncontacted randomized control group.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: HISTORICAL COLAB DECLINERS (10,498 BASELINE) */}
      {activeView === "four-decliners" && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900 block mb-1">Colab Notebook Initial Baseline (10,498 Customers):</strong>
            In the initial Colab notebook run, all customers with any positive decline (&gt;0 pp) were segmented using priority <code>D &gt; A &gt; B &gt; C</code>. This produced the initial 10,498 declining cohort (A: 4,931; B: 2,721; C: 1,145; D: 1,701). The revised strategy refines this by setting a 10 pp decline threshold (filtering for material decliners, yielding 8,758 A–D decliners) and adding Segment E and Improvers. Both views are preserved for analytical auditability.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fourSegments.map((seg) => (
              <div key={seg.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm">Segment {seg.id}: {seg.name}</div>
                  <span className="font-extrabold text-slate-900 text-sm">{formatNumber(seg.customerCount)} cust</span>
                </div>
                <div className="text-xs text-slate-600">{seg.behavior}</div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex justify-between">
                  <span>Avg FY26 Spend: {formatUnits(seg.avgFY26Spend)}</span>
                  <span>Share: {seg.pctOfDecliners}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
