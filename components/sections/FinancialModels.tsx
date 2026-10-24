"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  Percent,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  Layers,
  ArrowRight,
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
} from "recharts";
import { FINANCIAL_MODELS_V2, FIXED_COHORT_SUMMARY } from "@/lib/data/dataset";
import { formatNumber, formatUnits } from "@/lib/utils";

export default function FinancialModels() {
  const fin = FINANCIAL_MODELS_V2;

  // Interactive Custom Scenario Sliders
  const [customSowLiftPp, setCustomSowLiftPp] = useState<number>(6.6); // Default to break-even 6.6 pp
  const [customGrossMarginPct, setCustomGrossMarginPct] = useState<number>(3.0); // 3.0%
  const [customRewardAccrualPct, setCustomRewardAccrualPct] = useState<number>(1.393); // 1.393%
  const [customFixedCost, setCustomFixedCost] = useState<number>(75000); // 75k units
  const [customMsgCostPerCust, setCustomMsgCostPerCust] = useState<number>(3); // 3 units
  const [customDOutreachCost, setCustomDOutreachCost] = useState<number>(30); // 30 units

  // Custom calculations
  const customNetMarginPct = Math.max(0, customGrossMarginPct - customRewardAccrualPct);
  const customIncrementalSpend = (fin.totalSpendFY26AD * customSowLiftPp) / 100;
  const customGrossContribution = (customIncrementalSpend * customGrossMarginPct) / 100;
  const customRewardExpense = (customIncrementalSpend * customRewardAccrualPct) / 100;
  const customCampaignCosts =
    customFixedCost +
    fin.cohortSizeAD * customMsgCostPerCust +
    fin.dOutreachCount * customDOutreachCost;

  const customNetContribution =
    customGrossContribution - (customRewardExpense + customCampaignCosts);

  const customRoiPct =
    customCampaignCosts > 0 ? (customNetContribution / customCampaignCosts) * 100 : 0;

  const customBreakEvenSpend =
    customNetMarginPct > 0 ? (customCampaignCosts / (customNetMarginPct / 100)) : 0;
  const customBreakEvenPp =
    fin.totalSpendFY26AD > 0 ? (customBreakEvenSpend / fin.totalSpendFY26AD) * 100 : 0;
  const customBreakEvenPerCustomer =
    fin.cohortSizeAD > 0 ? customBreakEvenSpend / fin.cohortSizeAD : 0;

  // Chart data for scenarios
  const chartData = fin.scenarioTableAD.map((sc: any) => ({
    name: sc.scenario.split(" (")[0],
    lift: sc.sowLiftPp,
    grossContribution: Math.round(sc.grossContribution),
    campaignCost: Math.round(sc.campaignCost),
    netBenefit: Math.round(sc.netBenefit),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Final Dashboard Section • Analytical Journey Concluded
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mt-0.5">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <span>Financial Models &amp; Economic Feasibility</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluating incremental spend, baseline reward accruals, campaign expenses, break-even hurdles, and margin risks
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Units: Source Units (No currency established)
          </span>
        </div>
      </div>

      {/* CORE FINANCIAL ASSUMPTIONS BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
              Target Cohort Financial Parameters (A–D Decliners)
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300">
            8,758 Cardholders • 120.06M FY26 Spend
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Target A–D Decliners</span>
            <span className="text-xl font-black text-white mt-1 block">
              {formatNumber(fin.cohortSizeAD)}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">≥10 pp SoW drop</span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">A–D FY26 Net Spend</span>
            <span className="text-xl font-black text-white mt-1 block">
              120.06M
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">13,708 mean/customer</span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Gross Contribution</span>
            <span className="text-xl font-black text-amber-400 mt-1 block">
              3.00%
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Interchange + merchant margin</span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Est. Reward Accrual</span>
            <span className="text-xl font-black text-rose-300 mt-1 block">
              1.393%
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Baseline accrual on current HSIC</span>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/40">
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">Blended Net Margin</span>
            <span className="text-xl font-black text-emerald-400 mt-1 block">
              1.607%
            </span>
            <span className="text-[10px] text-emerald-300 mt-0.5 block">3.0% gross − 1.393% reward</span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Full-Scale Cost</span>
            <span className="text-xl font-black text-white mt-1 block">
              127,104
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">75k fixed + 26k msg + 26k outreach</span>
          </div>
        </div>
      </div>

      {/* PROVISIONAL SCENARIO TABLE (+3 pp, +5 pp, +6.6 pp, +8 pp) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Provisional Scenario Table (A–D Decliners at 1.607% Blended Net Margin)
            </h3>
            <p className="text-xs text-slate-500">
              Clear distinction between observed baseline data, incremental spend, campaign costs, and net economic contribution
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
            Portfolio Break-Even: +6.6 pp (~903 units/customer)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Uplift Scenario</th>
                <th className="px-3 py-3 text-right">SoW Lift</th>
                <th className="px-3 py-3 text-right">Incr. HSIC Spend</th>
                <th className="px-3 py-3 text-right">Gross Margin (1.607%)</th>
                <th className="px-3 py-3 text-right">Full Campaign Cost</th>
                <th className="px-3 py-3 text-right">Net Economic Benefit</th>
                <th className="px-3 py-3 text-right">ROI (%)</th>
                <th className="px-4 py-3">Feasibility Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fin.scenarioTableAD.map((row: any, idx: number) => {
                const isPositive = row.netBenefit >= 0;
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {row.scenario}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-slate-800">
                      +{row.sowLiftPp.toFixed(1)} pp
                    </td>
                    <td className="px-3 py-3 text-right font-medium text-slate-900">
                      {formatUnits(row.incrementalSpend)}
                    </td>
                    <td className="px-3 py-3 text-right text-slate-700 font-medium">
                      {formatNumber(row.grossContribution)} units
                    </td>
                    <td className="px-3 py-3 text-right text-rose-600 font-medium">
                      {formatNumber(row.campaignCost)} units
                    </td>
                    <td
                      className={`px-3 py-3 text-right font-extrabold ${
                        isPositive ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {row.netBenefit > 0 ? `+${formatNumber(row.netBenefit)}` : formatNumber(row.netBenefit)} units
                    </td>
                    <td
                      className={`px-3 py-3 text-right font-bold ${
                        isPositive ? "text-emerald-700" : "text-rose-600"
                      }`}
                    >
                      {row.roiPct.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                          isPositive
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-900 border border-amber-200"
                        }`}
                      >
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEGMENT-SPECIFIC BREAK-EVEN ANALYSIS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="font-bold text-slate-900">Segment A (Wallet)</div>
          <div className="text-xl font-black text-amber-600 mt-1">+6.6 pp</div>
          <p className="text-[11px] text-slate-500 mt-1">Break-even uplift hurdle based on 2,654 customers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="font-bold text-slate-900">Segment B (Cash/UPI)</div>
          <div className="text-xl font-black text-cyan-600 mt-1">+6.9 pp</div>
          <p className="text-[11px] text-slate-500 mt-1">Break-even hurdle across 2,097 customers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="font-bold text-slate-900">Segment C (Cards)</div>
          <div className="text-xl font-black text-blue-600 mt-1">+7.6 pp</div>
          <p className="text-[11px] text-slate-500 mt-1">Break-even hurdle across 2,285 customers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="font-bold text-slate-900">Segment D (High-Value)</div>
          <div className="text-xl font-black text-amber-600 mt-1">+6.0 pp</div>
          <p className="text-[11px] text-slate-500 mt-1">Includes 30 units/contact outreach for 861 customers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="font-bold text-slate-900">Segment E (Low SoW)</div>
          <div className="text-xl font-black text-emerald-600 mt-1">+1.7 pp</div>
          <p className="text-[11px] text-slate-500 mt-1">Messaging-only test: 14,490 cost / 52.72M spend</p>
        </div>
      </div>

      {/* PRIME CATEGORY MARGIN WARNING (CRITICAL FINTECH CAVEAT) */}
      <div className="bg-white rounded-2xl p-6 border-2 border-rose-300 shadow-sm space-y-4">
        <div className="flex items-center space-x-2.5 text-rose-700">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            Critical Margin Warning: Prime Category Reward Economics
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The blended 1.607% net contribution margin assumes a constant expenditure distribution. However, if the 3.0% gross contribution assumption applies uniformly across all categories, contractual reward rates create divergent category economics:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {fin.primeCategoryMarginWarning.map((item: any, idx: number) => {
            const isNegative = item.netMarginAfterReward.startsWith("-");
            const isZero = item.netMarginAfterReward === "0.0%";
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${
                  isNegative
                    ? "bg-rose-50/70 border-rose-300 text-rose-950"
                    : isZero
                    ? "bg-amber-50/70 border-amber-300 text-amber-950"
                    : "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                }`}
              >
                <div className="font-bold text-xs">{item.category}</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Contractual Reward: <strong>{item.contractualReward}</strong>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/60">
                  <span className="text-[11px]">Net Margin:</span>
                  <span className={`font-black text-sm ${isNegative ? "text-rose-700" : isZero ? "text-amber-800" : "text-emerald-700"}`}>
                    {item.netMarginAfterReward}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 italic">{item.status}</div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
          <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>Action Required Before Launch:</strong> Because Prime Grocery yields a -2.0% net margin at a flat 3% contribution rate, offering extra Layer 2 promotional rewards on Grocery would deepen portfolio losses. Finance must confirm category-level interchange and merchant co-funding before extending promotional incentives on Prime Grocery.
          </p>
        </div>
      </div>

      {/* INTERACTIVE SCENARIO CALCULATOR */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">
              Interactive Scenario Calculator (Live Simulation)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Adjust assumptions below</span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>SoW Uplift (pp):</span>
              <span className="font-bold text-slate-900">+{customSowLiftPp.toFixed(1)} pp</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.1"
              value={customSowLiftPp}
              onChange={(e) => setCustomSowLiftPp(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Gross Margin (%):</span>
              <span className="font-bold text-slate-900">{customGrossMarginPct.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.1"
              value={customGrossMarginPct}
              onChange={(e) => setCustomGrossMarginPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Reward Accrual (%):</span>
              <span className="font-bold text-slate-900">{customRewardAccrualPct.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={customRewardAccrualPct}
              onChange={(e) => setCustomRewardAccrualPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Fixed Costs:</span>
              <span className="font-bold text-slate-900">{formatNumber(customFixedCost)}</span>
            </div>
            <input
              type="range"
              min="25000"
              max="150000"
              step="5000"
              value={customFixedCost}
              onChange={(e) => setCustomFixedCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Msg Cost / Cust:</span>
              <span className="font-bold text-slate-900">{customMsgCostPerCust} units</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={customMsgCostPerCust}
              onChange={(e) => setCustomMsgCostPerCust(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>D Outreach Cost:</span>
              <span className="font-bold text-slate-900">{customDOutreachCost} units</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={customDOutreachCost}
              onChange={(e) => setCustomDOutreachCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Live Calculation Output Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase">Simulated Incr. Spend</span>
            <span className="text-lg font-black text-slate-900">{formatUnits(customIncrementalSpend)}</span>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase">Total Campaign Cost</span>
            <span className="text-lg font-black text-rose-600">{formatNumber(Math.round(customCampaignCosts))} units</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-800 block uppercase font-bold">Simulated Net Benefit</span>
            <span className={`text-lg font-black ${customNetContribution >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
              {customNetContribution >= 0 ? `+${formatNumber(Math.round(customNetContribution))}` : formatNumber(Math.round(customNetContribution))} units
            </span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-[10px] text-amber-800 block uppercase font-bold">Simulated Break-Even</span>
            <span className="text-lg font-black text-amber-800">
              +{customBreakEvenPp.toFixed(1)} pp ({formatUnits(customBreakEvenPerCustomer)}/cust)
            </span>
          </div>
        </div>
      </div>

      {/* FINAL EXECUTIVE BUSINESS IMPLICATIONS */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0B1528] text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-amber-400">
          <CheckCircle2 className="w-5 h-5" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Executive Implications &amp; Decision Pathway
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-300">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">1. Explaining the Decline Without Guesswork</strong>
            The data demonstrates that cardholders shifted spending heavily into MetroMart Wallet (+13.0 pp in decliners) and Cash/UPI (+10.9 pp). Rather than assuming we know why, we treat behavioural explanations as hypotheses and use Layer 1 visibility to test whether reminder nudges alone can win back volume.
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">2. Disciplined Two-Layer Design</strong>
            Layer 1 carries zero promotional reward expense. Layer 2 is strictly capped at 25 units/customer (25,000 units total) and withheld from organic responders, protecting marketing capital and preventing wasteful subsidies.
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-bold text-sm mb-1.5">3. Controlled Scaling Criteria</strong>
            Because prior decliners are subject to regression to the mean, we do not scale based on simple before-and-after metrics. The pilot scales only if ITT uplift against the randomized control group exceeds the 6.6 pp break-even threshold with positive net contribution.
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <span>MetroMart Inc. × HSIC Bank Co-Branded Card Analytics Platform</span>
          <span className="text-amber-400 font-semibold mt-1 sm:mt-0">End of Analytical Journey</span>
        </div>
      </div>
    </div>
  );
}
