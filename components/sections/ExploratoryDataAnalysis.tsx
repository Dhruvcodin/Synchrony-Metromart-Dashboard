"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  CreditCard,
  Calendar,
  AlertCircle,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileText,
} from "lucide-react";
import {
  EDA_CUSTOMER_DEMOGRAPHICS,
  EDA_TRANSACTIONS,
  EXECUTIVE_OVERVIEW_DATA,
} from "@/lib/data/dataset";
import { formatNumber, formatINR } from "@/lib/utils";

const COLORS = ["#0B1B3D", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#6366F1", "#F97316", "#64748B"];

export default function ExploratoryDataAnalysis() {
  const [activeTab, setActiveTab] = useState<"customers" | "transactions">("customers");

  const demographics = EDA_CUSTOMER_DEMOGRAPHICS;
  const txData = EDA_TRANSACTIONS;

  return (
    <div className="space-y-6">
      {/* Header and Section Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <span>Exploratory Data Analysis</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Empirical findings from Google Colab on portfolio demographics, transaction patterns, and data integrity
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "customers"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Customer Demographics ({formatNumber(demographics.dateCompleteness.totalCustomers)})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "transactions"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Transaction Dynamics ({formatNumber(EXECUTIVE_OVERVIEW_DATA.totalTransactions)})
          </button>
        </div>
      </div>

      {/* TAB 1: CUSTOMER ANALYSIS */}
      {activeTab === "customers" && (
        <div className="space-y-6">
          {/* Key Customer Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Prime Membership Share</div>
              <div className="text-2xl font-extrabold text-amber-500 mt-1">59.94%</div>
              <div className="text-xs text-slate-500 mt-1">
                26,971 Prime • 18,029 Non-Prime
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Active Card Accounts</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">82.97%</div>
              <div className="text-xs text-slate-500 mt-1">
                37,336 cards active with no close date
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Mean Credit Limit</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">₹1,99,995</div>
              <div className="text-xs text-slate-500 mt-1">Min ₹100k • Max ₹300k</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Mean Card APR</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">31.51%</div>
              <div className="text-xs text-slate-500 mt-1">Span: 28.0% to 35.0%</div>
            </div>
          </div>

          {/* Demographic Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution Chart */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Customer Age Distribution</h3>
                  <p className="text-xs text-slate-500">Core concentration in prime spending ages (26–45)</p>
                </div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  Mean Age: 38.65 yrs
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demographics.ageBins}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      formatter={(val: any) => [`${formatNumber(val)} customers`, "Count"]}
                      contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 12 }}
                    />
                    <Bar dataKey="count" fill="#0B1B3D" radius={[4, 4, 0, 0]} name="Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-600 mt-3 border-t border-slate-100 pt-2 leading-relaxed">
                Over <strong>57.2%</strong> of MetroMart customers are between 26 and 45 years old—the core demographic with high digital affinity, mobile wallet usage, and rapid UPI adoption.
              </p>
            </div>

            {/* Membership & Gender Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Loyalty Membership & Gender Ratios</h3>
                  <p className="text-xs text-slate-500">59.9% Prime subscribers; 72.0% Male / 28.0% Female</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-64">
                {/* Membership Pie */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-semibold text-slate-700 mb-1">Membership Tier</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={demographics.membership}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        innerRadius={35}
                        paddingAngle={4}
                      >
                        <Cell fill="#F59E0B" />
                        <Cell fill="#0B1B3D" />
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`${formatNumber(val)} (${((Number(val)/45000)*100).toFixed(1)}%)`, ""]}
                        contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-3 text-[11px] text-slate-600">
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1" /> Prime (60%)
                    </span>
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0B1B3D] mr-1" /> Non-Prime (40%)
                    </span>
                  </div>
                </div>

                {/* Gender Pie */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-semibold text-slate-700 mb-1">Gender Split</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={demographics.gender}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        innerRadius={35}
                        paddingAngle={4}
                      >
                        <Cell fill="#3B82F6" />
                        <Cell fill="#EC4899" />
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`${formatNumber(val)} (${((Number(val)/45000)*100).toFixed(1)}%)`, ""]}
                        contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-3 text-[11px] text-slate-600">
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1" /> Male (72%)
                    </span>
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 mr-1" /> Female (28%)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 border-t border-slate-100 pt-2 leading-relaxed">
                Prime membership penetration is high (almost 60%). Since Prime cardholders are entitled to 5% Grocery and 3% Electronics rewards, their declining SoW indicates an engagement or UX friction bottleneck rather than a rewards gap.
              </p>
            </div>
          </div>

          {/* Account Completeness & Date Integrity */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Card Account Date Completeness &amp; Eligibility Filter Logic</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Missing Open Date (15.19%)</div>
                <div className="text-xl font-extrabold text-amber-600 mt-1">6,836 Customers</div>
                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                  In accordance with the hackathon specification, transactions occurring without a verified card open date are excluded from SoW computation because active cardholder status is not established.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Active Accounts without Close Date</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">37,336 Cards (82.97%)</div>
                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                  Accounts with an open date and no close date remain open and eligible across the entire FY2025–FY2026 analytical window.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Closed Card Window Enforcement</div>
                <div className="text-xl font-extrabold text-slate-700 mt-1">828 Closed Cards</div>
                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                  Transactions occurring after a customer&apos;s Credit_Card_Closed_Date are strictly excluded from SoW denominators, preventing artificial dilution.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTION DYNAMICS */}
      {activeTab === "transactions" && (
        <div className="space-y-6">
          {/* Sales vs Returns KPI strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Total Gross Sales</div>
              <div className="text-xl font-extrabold text-emerald-600 mt-1">₹1,23,32,57,856</div>
              <div className="text-xs text-slate-500 mt-1">399,304 sales records (89.91%)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Total Returns (Subtracted)</div>
              <div className="text-xl font-extrabold text-rose-600 mt-1">-₹13,93,16,934</div>
              <div className="text-xs text-slate-500 mt-1">44,814 return records (10.09% of records)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-medium">Net Sales Spend Denominator</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">₹1,09,39,40,922</div>
              <div className="text-xs text-slate-500 mt-1">Net Sales = Gross Sales - Returns</div>
            </div>
          </div>

          {/* Category Net Spend Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Net Sales Spend by Merchandise Category</h3>
                <p className="text-xs text-slate-500">Electronics, Large Appliances, and Furniture dominate store revenue</p>
              </div>
              <span className="text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded font-medium">
                10 Shopping Categories
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={txData.categories} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(v) => `₹${(v / 10000000).toFixed(0)}Cr`} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip
                    formatter={(val: any) => [formatINR(Number(val)), "Net Spend"]}
                    contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="netSpend" fill="#0B1B3D" radius={[0, 4, 4, 0]} name="Net Spend (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="bg-amber-50 p-2 rounded border border-amber-200">
                <span className="font-bold text-amber-900">Electronics (#1 Category):</span>
                <div className="text-slate-700 font-semibold mt-0.5">₹24.53 Crore (22.4% net share)</div>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold text-slate-800">Large Appliances:</span>
                <div className="text-slate-700 font-semibold mt-0.5">₹19.06 Crore (17.4%)</div>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold text-slate-800">Furniture:</span>
                <div className="text-slate-700 font-semibold mt-0.5">₹16.92 Crore (15.5%)</div>
              </div>
              <div className="bg-amber-50 p-2 rounded border border-amber-200">
                <span className="font-bold text-amber-900">Grocery (5% Prime Tier):</span>
                <div className="text-slate-700 font-semibold mt-0.5">₹3.26 Crore (Frequent visits)</div>
              </div>
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Portfolio Payment Method Distribution (2-Year Aggregation)</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {txData.payments.map((p, idx) => (
                <div key={p.method} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="text-[11px] font-medium text-slate-500">{p.method}</div>
                  <div className="text-base font-extrabold text-slate-900 mt-1">{formatINR(p.netSpend)}</div>
                  <div className="text-xs text-slate-600 mt-0.5 flex justify-between">
                    <span>{formatNumber(p.count)} txs</span>
                    <span className="font-bold text-amber-600">{p.pctOfTotal}%</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-100 leading-relaxed">
              <strong>Critical Insight:</strong> MetroMart Wallet commands the largest share of net spend at MetroMart (₹43.56 Crore / 39.8%), followed by Cash/UPI at ₹26.02 Crore. HSIC Bank Credit Card captures only ₹15.46 Crore (14.1% of portfolio net spend across all shoppers), trailing behind debit and competing cards combined.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
