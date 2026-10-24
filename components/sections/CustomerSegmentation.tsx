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
  DollarSign,
  PieChart as PieIcon,
  CheckCircle2,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CUSTOMER_SEGMENTS,
  OVERLAPPING_SEGMENT_COUNTS,
  EXECUTIVE_OVERVIEW_DATA,
} from "@/lib/data/dataset";
import { formatNumber, formatINR } from "@/lib/utils";

const SEGMENT_COLORS = {
  A: "#8B5CF6", // Violet for Wallet
  B: "#06B6D4", // Cyan for UPI/Cash
  C: "#3B82F6", // Blue for Cards
  D: "#F59E0B", // Gold for High-Value
};

interface CustomerSegmentationProps {
  onNavigate: (sectionId: string) => void;
}

export default function CustomerSegmentation({ onNavigate }: CustomerSegmentationProps) {
  const [viewMode, setViewMode] = useState<"exclusive" | "overlapping">("exclusive");

  const segments = CUSTOMER_SEGMENTS;
  const overlapping = OVERLAPPING_SEGMENT_COUNTS;

  const pieData = segments.map((s) => ({
    name: s.name,
    value: s.customerCount,
    percentage: s.pctOfDecliners,
    color: SEGMENT_COLORS[s.id as keyof typeof SEGMENT_COLORS],
  }));

  const comparisonData = segments.map((s) => ({
    name: s.id,
    fullName: s.name,
    exclusive: s.customerCount,
    overlapping: overlapping[s.code as keyof typeof overlapping] || s.customerCount,
  }));

  return (
    <div className="space-y-6">
      {/* Header and View Toggle */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>Customer Segmentation &amp; Behavioral Allocation</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Partitioning 10,498 declining cardholders using Colab priority rules (Priority: D &gt; A &gt; B &gt; C)
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode("exclusive")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === "exclusive"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Mutually Exclusive (10,498 Total)
          </button>
          <button
            onClick={() => setViewMode("overlapping")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === "overlapping"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Overlapping Eligibility Pools
          </button>
        </div>
      </div>

      {/* Priority Allocation Hierarchy Explanation */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Hierarchical Priority Allocation Logic: Avoids Double-Counting
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
            Priority Rule: D &gt; A &gt; B &gt; C
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Because customers may exhibit multi-channel behavior (e.g., a cardholder whose HSIC spend fell might have increased both their MetroMart Wallet and their Debit Card usage), assigning customers blindly would cause double counting. The verified Colab hierarchy assigns each customer to exactly <strong>one primary segment</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-2.5 rounded-lg bg-white/5 border border-amber-400/30">
            <div className="font-bold text-amber-400 flex items-center justify-between">
              <span>1st: Segment D</span>
              <span className="text-[10px] text-slate-400">High-Value VIPs</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Top 25% FY26 spenders (₹17,998+) with ≥20 pp HSIC decline. Reserved first to prioritize revenue.
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-violet-400/30">
            <div className="font-bold text-violet-400 flex items-center justify-between">
              <span>2nd: Segment A</span>
              <span className="text-[10px] text-slate-400">Wallet Switchers</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Remaining customers whose MetroMart Wallet share increased (Wallet Change &gt; 0 pp).
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-cyan-400/30">
            <div className="font-bold text-cyan-400 flex items-center justify-between">
              <span>3rd: Segment B</span>
              <span className="text-[10px] text-slate-400">Cash/UPI Switchers</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Remaining customers whose Cash or UPI payment share increased (Cash/UPI Change &gt; 0 pp).
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-blue-400/30">
            <div className="font-bold text-blue-400 flex items-center justify-between">
              <span>4th: Segment C</span>
              <span className="text-[10px] text-slate-400">Competing Cards</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Remaining customers whose Debit or Other Bank Credit Card share increased.
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie Chart of Mutually Exclusive Segments */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Mutually Exclusive Segment Share</h3>
            <p className="text-xs text-slate-500 mb-4">Total 10,498 qualifying declining cardholders (100% Reconciliation)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${formatNumber(val)} cardholders`, "Count"]}
                    contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            {segments.map((s) => (
              <div key={s.id} className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: SEGMENT_COLORS[s.id as keyof typeof SEGMENT_COLORS] }}
                />
                <span className="font-medium text-slate-700 truncate">{s.id}: {s.customerCount.toLocaleString()} ({s.pctOfDecliners}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Bar Chart: Mutually Exclusive vs Overlapping */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {viewMode === "exclusive" ? "Mutually Exclusive Segment Allocation" : "Overlapping Behavioral Eligibility"}
                </h3>
                <p className="text-xs text-slate-500">
                  {viewMode === "exclusive"
                    ? "Single primary segment assignment per cardholder (D > A > B > C)"
                    : "Total customers displaying each behavior before priority filtering"}
                </p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: "bold" }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${formatNumber(val)} customers`, name]}
                    contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="exclusive" fill="#0B1B3D" name="Primary Mutually Exclusive" radius={[4, 4, 0, 0]} />
                  {viewMode === "overlapping" && (
                    <Bar dataKey="overlapping" fill="#F59E0B" name="Overlapping Eligible" radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2 flex justify-between">
            <span>Mutually Exclusive Total: <strong>10,498</strong></span>
            <span>Overlapping Sum: <strong>20,818 flags</strong> (1.98 flags/customer average)</span>
          </div>
        </div>
      </div>

      {/* Four Deep-Dive Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((seg) => {
          const color = SEGMENT_COLORS[seg.id as keyof typeof SEGMENT_COLORS];
          return (
            <div
              key={seg.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: color }}
              />
              <div className="space-y-4">
                {/* Segment Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      {seg.id}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{seg.name}</h3>
                      <div className="text-xs text-slate-500 font-medium">
                        Primary Assignment • Segment {seg.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-slate-900">{formatNumber(seg.customerCount)}</div>
                    <div className="text-xs font-bold" style={{ color }}>
                      {seg.pctOfDecliners}% of decliners
                    </div>
                  </div>
                </div>

                {/* Financial Scope Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-600 font-medium block">Avg FY26 Spend</span>
                    <span className="font-bold text-slate-900">{formatINR(seg.avgFY26Spend)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-medium block">Total FY26 Spend</span>
                    <span className="font-bold text-slate-900">{formatINR(seg.totalFY26Spend)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-medium block">Non-HSIC Leakage</span>
                    <span className="font-bold text-rose-600">{formatINR(seg.nonHsicFY26Spend)}</span>
                  </div>
                </div>

                {/* Behaviour & Targeting Rationale */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Behavioral Pattern:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{seg.behavior}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Targeting Rationale:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{seg.targetRationale}</p>
                  </div>
                </div>

                {/* Proposed Intervention Highlight */}
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1">
                  <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                    <span>Campaign:</span>
                    <span className="text-slate-900">{seg.strategyTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{seg.intervention}</p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[240px]">
                  Goal: {seg.successMetric}
                </span>
                <button
                  onClick={() => onNavigate("strategies")}
                  className="font-bold inline-flex items-center space-x-1 group text-slate-900 hover:text-amber-600 transition-colors"
                >
                  <span>View Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Internal Validation Check Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-700">
            <strong>Reconciliation Verified:</strong> 4,931 (Seg A) + 2,721 (Seg B) + 1,145 (Seg C) + 1,701 (Seg D) = <strong>10,498 Total Decliners</strong> (Unassigned = 0).
          </span>
        </div>
        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          Zero Double Counting
        </span>
      </div>
    </div>
  );
}
