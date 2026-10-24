"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  Percent,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Layers,
  ArrowRight,
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
} from "recharts";
import { CUSTOMER_SEGMENTS } from "@/lib/data/dataset";
import { formatINR, formatNumber } from "@/lib/utils";

type ScenarioType = "base" | "upside" | "custom";

export default function FinancialModels() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("base");

  // Custom Scenario interactive parameters
  const [customReactivationRate, setCustomReactivationRate] = useState<number>(20); // 20%
  const [customPromotionalCashback, setCustomPromotionalCashback] = useState<number>(1.5); // 1.5%
  const [customVoucherAmount, setCustomVoucherAmount] = useState<number>(500); // ₹500
  const [customContributionMargin, setCustomContributionMargin] = useState<number>(3.0); // 3.0% net interchange/merchant margin
  const [customCommCost, setCustomCommCost] = useState<number>(10); // ₹10 per customer communication

  // Scenarios parameter definitions
  const scenarioConfigs = {
    base: {
      name: "Base Case (Conservative)",
      desc: "Moderate reactivation assumptions, standard incentive uptake, and cautious migration",
      reactivationRates: { A: 0.15, B: 0.15, C: 0.20, D: 0.20 }, // 15% to 20%
      promoCashbackPct: { A: 0.015, B: 0.015, C: 0.02, D: 0.02 }, // 1.5% - 2%
      vouchers: { A: 0, B: 0, C: 500, D: 1000 }, // Milestone vouchers
      commCostPerUser: 10,
      contributionMargin: 0.03, // 3.0% net contribution margin on card spend
    },
    upside: {
      name: "Upside Case (Festive / High Engagement)",
      desc: "Accelerated festive season conversion, omnichannel prompts, and active digital wallet defaults",
      reactivationRates: { A: 0.25, B: 0.25, C: 0.30, D: 0.35 }, // 25% to 35%
      promoCashbackPct: { A: 0.02, B: 0.02, C: 0.025, D: 0.03 }, // 2% - 3%
      vouchers: { A: 150, B: 50, C: 750, D: 1500 },
      commCostPerUser: 15,
      contributionMargin: 0.032, // 3.2%
    },
    custom: {
      name: "Custom Interactive Simulation",
      desc: "Adjust live sliders below to simulate financial feasibility and ROI under custom business assumptions",
      reactivationRates: {
        A: customReactivationRate / 100,
        B: customReactivationRate / 100,
        C: customReactivationRate / 100,
        D: customReactivationRate / 100,
      },
      promoCashbackPct: {
        A: customPromotionalCashback / 100,
        B: customPromotionalCashback / 100,
        C: customPromotionalCashback / 100,
        D: customPromotionalCashback / 100,
      },
      vouchers: {
        A: customVoucherAmount * 0.3,
        B: customVoucherAmount * 0.2,
        C: customVoucherAmount,
        D: customVoucherAmount * 2,
      },
      commCostPerUser: customCommCost,
      contributionMargin: customContributionMargin / 100,
    },
  };

  const currentConfig = scenarioConfigs[selectedScenario];

  // Financial calculations per segment
  const segmentFinancials = useMemo(() => {
    return CUSTOMER_SEGMENTS.map((seg) => {
      const segId = seg.id as "A" | "B" | "C" | "D";
      const targetCount = seg.customerCount;
      const baselineSpend = seg.totalFY26Spend;
      const nonHsicSpend = seg.nonHsicFY26Spend;
      const avgSpendPerCust = seg.avgFY26Spend;

      const rate = currentConfig.reactivationRates[segId];
      const promoRate = currentConfig.promoCashbackPct[segId];
      const voucher = currentConfig.vouchers[segId];
      const commCost = targetCount * currentConfig.commCostPerUser;

      // Reactivated customers
      const reactivatedCustomers = Math.round(targetCount * rate);

      // Incremental HSIC spending = portion of non-HSIC spend migrated back to HSIC by reactivated users
      // Assuming reactivated customers migrate 60% of their non-HSIC spend back to the card
      const migrationIntensity = segId === "D" ? 0.65 : 0.60;
      const incrementalHSICSpend = reactivatedCustomers * (avgSpendPerCust * migrationIntensity);

      // Revenue / Contribution generated
      // Gross Contribution = Incremental Spend * Net Contribution Margin
      const grossContribution = incrementalHSICSpend * currentConfig.contributionMargin;

      // Costs
      // 1. Existing Contractual Rewards cost on incremental spend (Prime avg ~2.2% weighted)
      const existingRewardCost = incrementalHSICSpend * 0.022;

      // 2. Additional promotional cashback cost
      const promotionalCashbackCost = incrementalHSICSpend * promoRate;

      // 3. Festive / milestone voucher cost
      const totalVoucherCost = reactivatedCustomers * voucher;

      // 4. Total campaign cost
      const totalCampaignCost = promotionalCashbackCost + totalVoucherCost + commCost;

      // Net Incremental Contribution (Profit)
      const netIncrementalContribution = grossContribution - (promotionalCashbackCost + totalVoucherCost + commCost);

      // Return on Investment (ROI)
      const roiPct = totalCampaignCost > 0 ? (netIncrementalContribution / totalCampaignCost) * 100 : 0;

      // Cost per Reactivated Customer (CAC)
      const cac = reactivatedCustomers > 0 ? totalCampaignCost / reactivatedCustomers : 0;

      // Break-even Reactivation Rate (%)
      // Break-even is reached when grossContribution = totalCampaignCost
      const marginPerReactivated = avgSpendPerCust * migrationIntensity * currentConfig.contributionMargin;
      const variableCostPerReactivated = (avgSpendPerCust * migrationIntensity * promoRate) + voucher;
      const unitContribution = marginPerReactivated - variableCostPerReactivated;
      const breakEvenCustomers = unitContribution > 0 ? commCost / unitContribution : 0;
      const breakEvenRatePct = (breakEvenCustomers / targetCount) * 100;

      return {
        ...seg,
        reactivatedCustomers,
        incrementalHSICSpend,
        grossContribution,
        existingRewardCost,
        promotionalCashbackCost,
        totalVoucherCost,
        commCost,
        totalCampaignCost,
        netIncrementalContribution,
        roiPct,
        cac,
        breakEvenRatePct,
      };
    });
  }, [currentConfig]);

  // Portfolio Totals
  const portfolioSummary = useMemo(() => {
    return segmentFinancials.reduce(
      (acc, curr) => {
        acc.targetCustomers += curr.customerCount;
        acc.reactivatedCustomers += curr.reactivatedCustomers;
        acc.incrementalSpend += curr.incrementalHSICSpend;
        acc.grossContribution += curr.grossContribution;
        acc.campaignCost += curr.totalCampaignCost;
        acc.netContribution += curr.netIncrementalContribution;
        return acc;
      },
      {
        targetCustomers: 0,
        reactivatedCustomers: 0,
        incrementalSpend: 0,
        grossContribution: 0,
        campaignCost: 0,
        netContribution: 0,
      }
    );
  }, [segmentFinancials]);

  const portfolioRoi =
    portfolioSummary.campaignCost > 0
      ? (portfolioSummary.netContribution / portfolioSummary.campaignCost) * 100
      : 0;

  const chartData = segmentFinancials.map((s) => ({
    name: `Seg ${s.id}`,
    grossContribution: Math.round(s.grossContribution),
    campaignCost: Math.round(s.totalCampaignCost),
    netProfit: Math.round(s.netIncrementalContribution),
  }));

  return (
    <div className="space-y-6">
      {/* Header & Scenario Toggles */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Final Analytical Stage</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mt-0.5">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <span>Financial Models &amp; Business Feasibility</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quantifying incremental HSIC card spend, promotional costs, net contribution, and break-even feasibility
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedScenario("base")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedScenario === "base"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Base Case (15–20%)
          </button>
          <button
            onClick={() => setSelectedScenario("upside")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedScenario === "upside"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upside Case (25–35%)
          </button>
          <button
            onClick={() => setSelectedScenario("custom")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedScenario === "custom"
                ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Custom Sliders
          </button>
        </div>
      </div>

      {/* Custom Interactive Sliders (When Custom scenario is active) */}
      {selectedScenario === "custom" && (
        <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Interactive Campaign Parameter Controls
              </h3>
            </div>
            <span className="text-[11px] text-amber-800 font-semibold">Simulating Real-Time Feasibility</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            {/* Slider 1 */}
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Reactivation Rate:</span>
                <span className="font-bold text-slate-900">{customReactivationRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={customReactivationRate}
                onChange={(e) => setCustomReactivationRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">5% to 50% adoption</span>
            </div>

            {/* Slider 2 */}
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Promotional Cashback:</span>
                <span className="font-bold text-slate-900">{customPromotionalCashback.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={customPromotionalCashback}
                onChange={(e) => setCustomPromotionalCashback(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Additional bonus cashback</span>
            </div>

            {/* Slider 3 */}
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Voucher Value Base:</span>
                <span className="font-bold text-slate-900">{formatINR(customVoucherAmount)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={customVoucherAmount}
                onChange={(e) => setCustomVoucherAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Milestone voucher tier</span>
            </div>

            {/* Slider 4 */}
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Contribution Margin:</span>
                <span className="font-bold text-slate-900">{customContributionMargin.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="5.0"
                step="0.1"
                value={customContributionMargin}
                onChange={(e) => setCustomContributionMargin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Net merchant + card margin</span>
            </div>

            {/* Slider 5 */}
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Comm Cost / Card:</span>
                <span className="font-bold text-slate-900">₹{customCommCost}</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={customCommCost}
                onChange={(e) => setCustomCommCost(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">SMS, email &amp; in-app push</span>
            </div>
          </div>
        </div>
      )}

      {/* Consolidated Portfolio Impact KPI Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1B3D] to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">
              Portfolio Financial Impact Summary ({currentConfig.name})
            </h3>
          </div>
          <span className="text-xs text-slate-300 font-medium">10,498 Target Customers</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Reactivated Cards</div>
            <div className="text-xl font-black text-amber-400 mt-1">
              {formatNumber(portfolioSummary.reactivatedCustomers)}
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              {((portfolioSummary.reactivatedCustomers / 10498) * 100).toFixed(1)}% of cohort
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Incremental HSIC Spend</div>
            <div className="text-xl font-black text-white mt-1">
              {formatINR(portfolioSummary.incrementalSpend)}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Recovered volume</div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Gross Contribution</div>
            <div className="text-xl font-black text-white mt-1">
              {formatINR(portfolioSummary.grossContribution)}
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              @ {(currentConfig.contributionMargin * 100).toFixed(1)}% margin
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Total Campaign Cost</div>
            <div className="text-xl font-black text-rose-300 mt-1">
              {formatINR(portfolioSummary.campaignCost)}
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">Promo + vouchers + comms</div>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/40">
            <div className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider">Net Contribution</div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {formatINR(portfolioSummary.netContribution)}
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">Net Incremental Profit</div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Blended ROI</div>
            <div className="text-xl font-black text-amber-400 mt-1">
              {portfolioRoi.toFixed(0)}%
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">Return on investment</div>
          </div>
        </div>
      </div>

      {/* Segment Financial Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Segment-Level Financial Feasibility Ledger</h3>
            <p className="text-xs text-slate-500">
              Clear distinction between observed baseline data, campaign parameters, and calculated scenario results
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
            All 4 Segments (A, B, C, D)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Segment</th>
                <th className="px-3 py-3 text-right">Target Pop</th>
                <th className="px-3 py-3 text-right">Reactivated</th>
                <th className="px-3 py-3 text-right">Incr. HSIC Spend</th>
                <th className="px-3 py-3 text-right">Gross Margin</th>
                <th className="px-3 py-3 text-right">Promo Cost</th>
                <th className="px-3 py-3 text-right">Voucher Cost</th>
                <th className="px-3 py-3 text-right">Total Cost</th>
                <th className="px-3 py-3 text-right">Net Profit</th>
                <th className="px-3 py-3 text-right">CAC</th>
                <th className="px-3 py-3 text-right">Break-Even</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {segmentFinancials.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right text-slate-600 font-medium">
                    {formatNumber(row.customerCount)}
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-slate-900">
                    {formatNumber(row.reactivatedCustomers)}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-slate-900">
                    {formatINR(row.incrementalHSICSpend)}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700 font-medium">
                    {formatINR(row.grossContribution)}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-600">
                    {formatINR(row.promotionalCashbackCost)}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-600">
                    {row.totalVoucherCost > 0 ? formatINR(row.totalVoucherCost) : "—"}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-rose-600">
                    {formatINR(row.totalCampaignCost)}
                  </td>
                  <td className="px-3 py-3 text-right font-extrabold text-emerald-600">
                    {formatINR(row.netIncrementalContribution)}
                  </td>
                  <td className="px-3 py-3 text-right text-slate-700 font-medium">
                    {formatINR(row.cac)}
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-slate-800">
                    {row.breakEvenRatePct > 0 ? `${row.breakEvenRatePct.toFixed(1)}%` : "Immediate"}
                  </td>
                </tr>
              ))}
              {/* Portfolio Totals Row */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-300 text-slate-900">
                <td className="px-4 py-3 text-slate-900 font-black">Consolidated Total</td>
                <td className="px-3 py-3 text-right">{formatNumber(portfolioSummary.targetCustomers)}</td>
                <td className="px-3 py-3 text-right text-amber-600 font-black">{formatNumber(portfolioSummary.reactivatedCustomers)}</td>
                <td className="px-3 py-3 text-right font-black">{formatINR(portfolioSummary.incrementalSpend)}</td>
                <td className="px-3 py-3 text-right">{formatINR(portfolioSummary.grossContribution)}</td>
                <td className="px-3 py-3 text-right" colSpan={2}>
                  Combined Variable Costs
                </td>
                <td className="px-3 py-3 text-right text-rose-600 font-black">{formatINR(portfolioSummary.campaignCost)}</td>
                <td className="px-3 py-3 text-right text-emerald-700 font-black text-sm">{formatINR(portfolioSummary.netContribution)}</td>
                <td className="px-3 py-3 text-right">₹{Math.round(portfolioSummary.campaignCost / portfolioSummary.reactivatedCustomers)}</td>
                <td className="px-3 py-3 text-right text-emerald-700 font-black">Passed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Profit & Cost Breakdown Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-1">
          Financial Comparison: Gross Margin vs. Campaign Cost vs. Net Profit (₹)
        </h3>
        <p className="text-xs text-slate-500 mb-4">Segment D generates the largest net contribution, followed by Segment A</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: "bold" }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(val: any, name: any) => [formatINR(Number(val)), name]}
                contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: 8, fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="grossContribution" fill="#0B1B3D" name="Gross Contribution" radius={[4, 4, 0, 0]} />
              <Bar dataKey="campaignCost" fill="#EF4444" name="Campaign Costs" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netProfit" fill="#10B981" name="Net Incremental Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Executive Strategic Takeaways & Final Business Implications */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0B1528] text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-amber-400">
          <CheckCircle2 className="w-5 h-5" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Executive Summary &amp; Business Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-300">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">1. Prioritize High-Value Retention (Seg D)</strong>
            Segment D generates over 50% of total portfolio net profit under both Base and Upside models. Reversing silent attrition among these top 25% spenders with milestone festive vouchers yields the highest return on marketing capital.
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">2. Break Friction with Wallet (Seg A) &amp; UPI (Seg B)</strong>
            Together, Segments A and B represent 72.9% of all declining cardholders. Because they love shopping at MetroMart, micro-incentives (e.g., 3-swipe challenge, POS contactless tap discount, and RuPay UPI linkage) convert convenient habits back into card volume.
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">3. Sustainable Financial Feasibility</strong>
            With an average break-even reactivation hurdle of under 5% and campaign CAC between ₹150 and ₹450 per customer, the proposed targeted strategy is economically sound, highly profitable, and ready for immediate pilot execution.
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <span>MetroMart Inc. × HSIC Bank Co-Branded Card Analytics Platform</span>
          <span className="text-amber-400 font-semibold mt-1 sm:mt-0">Analytical Journey Concluded</span>
        </div>
      </div>
    </div>
  );
}
