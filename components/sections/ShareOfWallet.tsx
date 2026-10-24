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
  LineChart,
  Line,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Percent,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  OVERALL_SOW_CHANGE,
  DECLINING_COHORT_SOW_CHANGE,
  YOY_MONTHLY_COMPARISON,
  FY25_MONTHLY_SOW,
  FY26_MONTHLY_SOW,
} from "@/lib/data/dataset";

export default function ShareOfWallet() {
  const [selectedSubTab, setSelectedSubTab] = useState<"portfolio" | "monthly" | "declining">("portfolio");
  const [monthlyMetric, setMonthlyMetric] = useState<"hsic" | "all">("all");

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Percent className="w-5 h-5 text-amber-500" />
            <span>Share of Wallet (SoW) Analysis</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking customer payment choices at MetroMart Inc. across FY2025 and FY2026
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedSubTab("portfolio")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedSubTab === "portfolio"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Overall Portfolio SoW
          </button>
          <button
            onClick={() => setSelectedSubTab("monthly")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedSubTab === "monthly"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Fiscal Trends
          </button>
          <button
            onClick={() => setSelectedSubTab("declining")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedSubTab === "declining"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Declining Cohort (10,498)
          </button>
        </div>
      </div>

      {/* SECTION A: OVERALL PORTFOLIO SOW */}
      {selectedSubTab === "portfolio" && (
        <div className="space-y-6">
          {/* Executive Callout */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Portfolio Share of Wallet Shift:</strong> Across all active HSIC cardholders shopping at MetroMart, HSIC card share declined by <strong className="text-rose-600">-9.46 percentage points</strong> (from 28.97% in FY2025 to 19.51% in FY2026). Cash/UPI gained <strong className="text-emerald-600">+4.48 pp</strong>, MetroMart Wallet gained <strong className="text-emerald-600">+1.27 pp</strong>, and competing cards expanded by <strong className="text-emerald-600">+3.71 pp</strong> combined.
            </div>
          </div>

          {/* Comparison Table and Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Overall Portfolio SoW Comparison Table</h3>
                  <p className="text-xs text-slate-500">Net Sales Share by Payment Method across all active cardholders</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Payment Method</th>
                        <th className="px-4 py-3 text-right">FY2025 SoW</th>
                        <th className="px-4 py-3 text-right">FY2026 SoW</th>
                        <th className="px-4 py-3 text-right">Change (pp)</th>
                        <th className="px-4 py-3 text-center">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {OVERALL_SOW_CHANGE.map((row) => {
                        const isDecline = row.changePp < 0;
                        const isHSIC = row.paymentMethod === "HSIC";
                        return (
                          <tr
                            key={row.paymentMethod}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isHSIC ? "bg-amber-50/30 font-semibold" : ""
                            }`}
                          >
                            <td className="px-4 py-3 font-medium text-slate-900 flex items-center space-x-2">
                              {isHSIC && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                              <span>{row.paymentMethod}</span>
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600">{row.fy2025.toFixed(2)}%</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-900">
                              {row.fy2026.toFixed(2)}%
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-bold ${
                                isDecline ? "text-rose-600" : "text-emerald-600"
                              }`}
                            >
                              {row.changePp > 0 ? `+${row.changePp.toFixed(2)}` : row.changePp.toFixed(2)} pp
                            </td>
                            <td className="px-4 py-3 text-center">
                              {isDecline ? (
                                <span className="inline-flex items-center text-rose-600 font-bold text-[11px]">
                                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Decline
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-emerald-600 font-bold text-[11px]">
                                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Growth
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
                Sum of payment shares equals 100.0% in both fiscal years.
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Portfolio SoW Shift by Payment Method</h3>
                    <p className="text-xs text-slate-500">FY2025 vs FY2026 Net Spend Share (%)</p>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={OVERALL_SOW_CHANGE} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis
                        dataKey="paymentMethod"
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, ""]}
                        contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="fy2025" fill="#64748B" name="FY2025 Share" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="fy2026" fill="#F59E0B" name="FY2026 Share" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2 leading-relaxed">
                <strong>Key Takeaway:</strong> HSIC transitioned from being the second-largest payment channel at MetroMart (28.97%) down to third position (19.51%), being surpassed by Cash/UPI (23.36%) while MetroMart Wallet expanded its commanding lead to 35.83%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION B: MONTHLY SOW TRENDS */}
      {selectedSubTab === "monthly" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Monthly Fiscal Trends (August through July Order)</h3>
                <p className="text-xs text-slate-500">
                  Strictly ordered by fiscal calendar months: Aug → Sep → Oct → Nov → Dec → Jan → Feb → Mar → Apr → May → Jun → Jul
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-medium">Trend View:</span>
                <button
                  onClick={() => setMonthlyMetric("all")}
                  className={`px-2.5 py-1 rounded font-medium ${
                    monthlyMetric === "all" ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  All Payment Methods
                </button>
                <button
                  onClick={() => setMonthlyMetric("hsic")}
                  className={`px-2.5 py-1 rounded font-medium ${
                    monthlyMetric === "hsic" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  HSIC YoY Comparison
                </button>
              </div>
            </div>

            {/* Monthly Trend Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {monthlyMetric === "all" ? (
                  <LineChart data={YOY_MONTHLY_COMPARISON} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: "bold" }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      formatter={(val: any, name: any) => [`${Number(val).toFixed(2)}%`, name]}
                      contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="fy2025_hsic_sow" stroke="#D97706" strokeWidth={2} strokeDasharray="5 5" name="HSIC FY2025" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="fy2026_hsic_sow" stroke="#B45309" strokeWidth={3} name="HSIC FY2026" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="fy2026_wallet_sow" stroke="#8B5CF6" strokeWidth={2} name="Wallet FY2026" dot={false} />
                    <Line type="monotone" dataKey="fy2026_cash_upi_sow" stroke="#06B6D4" strokeWidth={2} name="Cash/UPI FY2026" dot={false} />
                    <Line type="monotone" dataKey="fy2026_debit_sow" stroke="#3B82F6" strokeWidth={1.5} name="Debit FY2026" dot={false} />
                    <Line type="monotone" dataKey="fy2026_other_card_sow" stroke="#EC4899" strokeWidth={1.5} name="Other Card FY2026" dot={false} />
                  </LineChart>
                ) : (
                  <LineChart data={YOY_MONTHLY_COMPARISON} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: "bold" }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      formatter={(val: any, name: any) => [`${Number(val).toFixed(2)}%`, name]}
                      contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="fy2025_hsic_sow" stroke="#64748B" strokeWidth={2.5} name="HSIC FY2025 SoW (%)" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="fy2026_hsic_sow" stroke="#EF4444" strokeWidth={3} name="HSIC FY2026 SoW (%)" dot={{ r: 4 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Monthly YoY Table */}
            <div className="mt-6 overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-3 py-2.5">Fiscal Month</th>
                    <th className="px-3 py-2.5 text-right">FY25 HSIC</th>
                    <th className="px-3 py-2.5 text-right">FY26 HSIC</th>
                    <th className="px-3 py-2.5 text-right">HSIC Change</th>
                    <th className="px-3 py-2.5 text-right">FY26 Wallet</th>
                    <th className="px-3 py-2.5 text-right">FY26 Cash/UPI</th>
                    <th className="px-3 py-2.5 text-right">FY26 Debit</th>
                    <th className="px-3 py-2.5 text-right">FY26 Other Cards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {YOY_MONTHLY_COMPARISON.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-bold text-slate-800">{row.month}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{row.fy2025_hsic_sow.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-right font-medium text-slate-900">{row.fy2026_hsic_sow.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-right font-bold text-rose-600">
                        {row.hsic_change_pp > 0 ? `+${row.hsic_change_pp}` : row.hsic_change_pp} pp
                      </td>
                      <td className="px-3 py-2 text-right text-violet-700">{row.fy2026_wallet_sow.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-right text-cyan-700">{row.fy2026_cash_upi_sow.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-right text-blue-700">{row.fy2026_debit_sow.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-right text-pink-700">{row.fy2026_other_card_sow.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION C: DECLINING-HSIC CUSTOMER COHORT */}
      {selectedSubTab === "declining" && (
        <div className="space-y-6">
          {/* Cohort Headline Card */}
          <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-slate-900 text-white rounded-xl p-5 border border-rose-800 shadow-md">
            <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Critical Silent Attrition Diagnosis</span>
            </div>
            <h3 className="text-xl font-bold mt-1 text-white">
              The 10,498 Declining-HSIC Customer Cohort
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-4xl">
              While the overall portfolio HSIC share declined by 9.46 pp, isolating the <strong className="text-white">10,498 active cardholders</strong> whose individual HSIC SoW declined reveals an acute collapse: HSIC share plunged from <strong className="text-amber-400">43.15%</strong> to <strong className="text-rose-400">9.98%</strong> (a loss of <strong className="text-rose-400">-33.17 pp</strong>).
              Critically, these customers did not abandon MetroMart—they reallocated their spending directly into <strong className="text-white">MetroMart Wallet (+13.03 pp)</strong> and <strong className="text-white">Cash/UPI (+10.93 pp)</strong>.
            </p>
          </div>

          {/* Declining Cohort Table & Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-4 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Declining Cohort SoW Change</h4>
                  <p className="text-xs text-slate-500">Net Sales Share (%) by Payment Method for the 10,498 decliners</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Payment Method</th>
                        <th className="px-4 py-3 text-right">FY2025</th>
                        <th className="px-4 py-3 text-right">FY2026</th>
                        <th className="px-4 py-3 text-right">Change (pp)</th>
                        <th className="px-4 py-3 text-center">Migration Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DECLINING_COHORT_SOW_CHANGE.map((row) => {
                        const isDecline = row.changePp < 0;
                        const isHSIC = row.paymentMethod === "HSIC";
                        return (
                          <tr
                            key={row.paymentMethod}
                            className={`hover:bg-slate-50 ${isHSIC ? "bg-rose-50/40 font-bold" : ""}`}
                          >
                            <td className="px-4 py-3 font-medium text-slate-900 flex items-center space-x-2">
                              {isHSIC ? (
                                <span className="w-2 h-2 rounded-full bg-rose-600" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              )}
                              <span>{row.paymentMethod}</span>
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600">{row.fy2025.toFixed(2)}%</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-900">
                              {row.fy2026.toFixed(2)}%
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-extrabold ${
                                isDecline ? "text-rose-600" : "text-emerald-600"
                              }`}
                            >
                              {row.changePp > 0 ? `+${row.changePp.toFixed(2)}` : row.changePp.toFixed(2)} pp
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-semibold text-slate-700">
                              {isHSIC ? "Source (-33.2 pp)" : `+${((row.changePp / 33.17) * 100).toFixed(0)}% of lost share`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
                10,498 qualifying cardholders with verified active card periods and positive baseline spend.
              </div>
            </div>

            {/* Visual Shift */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Payment Method Migration in Declining Cohort</h4>
                <p className="text-xs text-slate-500 mb-4">Direct migration from HSIC Card to Wallet, UPI, and Competing Cards</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DECLINING_COHORT_SOW_CHANGE} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis
                        dataKey="paymentMethod"
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, ""]}
                        contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="fy2025" fill="#64748B" name="FY2025 Baseline" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="fy2026" fill="#EF4444" name="FY2026 Recent" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-3 p-2.5 bg-slate-50 rounded border border-slate-100 text-xs text-slate-700">
                <strong>Migration Breakdown:</strong> Out of the 33.17 pp HSIC share drop, <strong>39.3% went to MetroMart Wallet</strong>, <strong>33.0% went to Cash/UPI</strong>, and <strong>27.7% went to Debit and Other Bank Credit Cards</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATION ACCURACY & METHODOLOGY INTEGRATION */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Case Study Share of Wallet Rules &amp; Computational Integrity</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <strong className="text-slate-900 block mb-1">Official SoW Formula</strong>
            SoW = (Spend on HSIC card at MetroMart) / (Total spend by HSIC cardholder at MetroMart). Calculated on net sales.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <strong className="text-slate-900 block mb-1">Active Card Window Rule</strong>
            Transactions are only evaluated for the precise interval during which the customer maintained an active, open HSIC account.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <strong className="text-slate-900 block mb-1">Return Treatment</strong>
            Returns subtract from net sales dollar amount, but count as 0 transactions in transaction volume aggregations.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <strong className="text-slate-900 block mb-1">Portfolio vs Individual SoW</strong>
            Portfolio SoW is expenditure-weighted; individual SoW evaluates customer-level decline for behavioral segmentation.
          </div>
        </div>
      </div>
    </div>
  );
}
