"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Crown,
  Sparkles,
  Check,
  Calculator,
  ShieldCheck,
  Gift,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function ContractualBenefits() {
  // Reward Calculator state
  const [grocerySpend, setGrocerySpend] = useState<number>(8000);
  const [electronicsSpend, setElectronicsSpend] = useState<number>(5000);
  const [otherSpend, setOtherSpend] = useState<number>(7000);

  // Computations
  const totalMonthlySpend = grocerySpend + electronicsSpend + otherSpend;
  const annualTotalSpend = totalMonthlySpend * 12;

  // Prime Cashback: 5% Grocery, 3% Electronics, 1% Other
  const primeMonthlyCashback =
    grocerySpend * 0.05 + electronicsSpend * 0.03 + otherSpend * 0.01;
  const primeAnnualCashback = primeMonthlyCashback * 12;
  const primeEffectiveRate =
    totalMonthlySpend > 0 ? (primeMonthlyCashback / totalMonthlySpend) * 100 : 0;

  // Non-Prime Cashback: 1% on all
  const nonPrimeMonthlyCashback = totalMonthlySpend * 0.01;
  const nonPrimeAnnualCashback = nonPrimeMonthlyCashback * 12;

  // Generic Competitor Card: ~1.0% generic reward
  const competitorAnnualCashback = annualTotalSpend * 0.01;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-amber-500" />
            <span>Contractual Card Benefits &amp; Rewards Structure</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official Synchrony &amp; MetroMart co-branded credit card baseline terms and value proposition
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            0 Joining Fee • 0 Annual Fee
          </span>
        </div>
      </div>

      {/* Contractual Tiers Comparison: Prime vs Non-Prime */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1: Prime Members */}
        <div className="bg-gradient-to-br from-[#0B1A36] to-slate-900 text-white rounded-2xl p-6 border-2 border-amber-400/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs">
                <Crown className="w-3.5 h-3.5" />
                <span>Prime Members Reward Tier</span>
              </div>
              <span className="text-xs text-amber-300 font-semibold">59.94% Portfolio Penetration</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">
              Up to 5% Uncapped Cashback
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Industry-leading cashback rates on essential everyday and high-ticket spend at MetroMart Inc.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-xs flex items-center justify-center">
                    01
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">Grocery Purchases</div>
                    <div className="text-[11px] text-slate-300">Category Code 1 • Everyday Food &amp; Essentials</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400">5.0%</span>
                  <div className="text-[10px] text-slate-400">Cashback</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 font-extrabold text-xs flex items-center justify-center">
                    02
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">Electronics Purchases</div>
                    <div className="text-[11px] text-slate-300">Category Code 2 • Computers, Audio &amp; Mobiles</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400">3.0%</span>
                  <div className="text-[10px] text-slate-400">Cashback</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-500/20 text-slate-300 font-extrabold text-xs flex items-center justify-center">
                    *
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">All Other Categories</div>
                    <div className="text-[11px] text-slate-300">Apparel, Furniture, Large Appliances, Travel, Toys</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400">1.0%</span>
                  <div className="text-[10px] text-slate-400">Cashback</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span>Statement adjustment in following month billing cycle</span>
            <span className="font-semibold text-amber-300">Zero annual fee</span>
          </div>
        </div>

        {/* Tier 2: Non-Prime Members */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                <span>Non-Prime Members Tier</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">40.06% Portfolio Penetration</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Flat 1.0% Cashback
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Base reward rate across all eligible merchandise categories at MetroMart Inc.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">All Eligible Purchases</div>
                  <div className="text-[11px] text-slate-500">Grocery, Electronics, Apparel, Travel, &amp; All Other</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">1.0%</span>
                  <div className="text-[10px] text-slate-500">Cashback</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>The Prime Upgrade Upsell Opportunity</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Non-Prime cardholders spend an average of 10,450 units/year. Upgrading them to Prime increases their Grocery reward rate fivefold (from 1% to 5%) and Electronics threefold (from 1% to 3%), locking in top-of-wallet loyalty.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No joining fees or recurring annual charges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rewards credited automatically as statement credits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No minimum redemption threshold</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Statement adjustment in following month billing cycle</span>
            <span className="font-semibold text-slate-700">Zero annual fee</span>
          </div>
        </div>
      </div>

      {/* Market Benchmark: The Competitor Unmatched Note */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Case Study Verified Market Standing: Unmatched Category Reward Rates</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The official hackathon specification establishes that <strong>no competing credit or debit card in the market matches HSIC&apos;s 5% Grocery and 3% Electronics reward rates at MetroMart Inc.</strong>
          This creates an analytical paradox: customers are switching to MetroMart Wallet and Cash/UPI despite receiving <em>lower or zero net rewards</em> on those channels. The root driver is not economic reward inferiority, but frictionless stored-value convenience, instant QR scanning, and top-of-wallet inertia.
        </p>
      </div>

      {/* Interactive Rewards Value Calculator */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">Interactive Customer Reward Calculator</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Simulate Annual Cashback Value</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders Input */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Monthly Grocery Spend (Category 1 - 5% Prime)</span>
                <span className="font-bold text-slate-900">{formatINR(grocerySpend)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={grocerySpend}
                onChange={(e) => setGrocerySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Monthly Electronics Spend (Category 2 - 3% Prime)</span>
                <span className="font-bold text-slate-900">{formatINR(electronicsSpend)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40000"
                step="1000"
                value={electronicsSpend}
                onChange={(e) => setElectronicsSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Monthly All Other Categories Spend (1% Prime &amp; Non-Prime)</span>
                <span className="font-bold text-slate-900">{formatINR(otherSpend)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="500"
                value={otherSpend}
                onChange={(e) => setOtherSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="pt-2 text-xs text-slate-500 flex justify-between">
              <span>Total Simulated Monthly Spend: <strong>{formatINR(totalMonthlySpend)}</strong></span>
              <span>Annual MetroMart Spend: <strong>{formatINR(annualTotalSpend)}</strong></span>
            </div>
          </div>

          {/* Value Yield Display */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Annual Cashback Yield</div>
              <div className="mt-3 space-y-3">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/10">
                  <div>
                    <div className="text-xs font-semibold text-white">Prime Cardholder</div>
                    <div className="text-[10px] text-slate-300">Effective rate: {primeEffectiveRate.toFixed(2)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-400">{formatINR(primeAnnualCashback)}/yr</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <div>
                    <div className="text-xs font-semibold text-slate-300">Non-Prime Cardholder</div>
                    <div className="text-[10px] text-slate-400">Flat 1.00% across all</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-white">{formatINR(nonPrimeAnnualCashback)}/yr</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <div>
                    <div className="text-xs font-semibold text-slate-400">Competitor Card</div>
                    <div className="text-[10px] text-slate-500">Standard 1.00% benchmark</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-medium text-slate-400">{formatINR(competitorAnnualCashback)}/yr</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-medium">
              Prime cardholders gain +{formatINR(primeAnnualCashback - competitorAnnualCashback)} more cashback than generic bank cards annually.
            </div>
          </div>
        </div>
      </div>

      {/* Contractual vs Promotional Incentive Distinction Table */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Distinction: Contractual Card Benefits vs. Proposed Promotional Strategies
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-2.5">Dimension</th>
                <th className="px-4 py-2.5">Existing Contractual Benefits (Baseline)</th>
                <th className="px-4 py-2.5">Proposed Promotional Interventions (Campaign)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-2.5 font-semibold text-slate-900">Legal Nature</td>
                <td className="px-4 py-2.5 text-slate-600">Perpetual cardholder contract terms</td>
                <td className="px-4 py-2.5 text-slate-600">Time-bound marketing and reactivation offers (45–90 days)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-slate-900">Funding Mechanism</td>
                <td className="px-4 py-2.5 text-slate-600">Built-in interchange revenue sharing model</td>
                <td className="px-4 py-2.5 text-slate-600">Targeted marketing campaign budget with measurable ROI hurdle</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-slate-900">Fulfillment</td>
                <td className="px-4 py-2.5 text-slate-600">Automatic statement credit in next billing cycle</td>
                <td className="px-4 py-2.5 text-slate-600">Milestone gift vouchers, instant bill waivers, &amp; bonus reload credits</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-slate-900">Target Audience</td>
                <td className="px-4 py-2.5 text-slate-600">All cardholders (Prime vs Non-Prime distinction)</td>
                <td className="px-4 py-2.5 text-slate-600">The 10,498 declining cardholders divided into Segments A, B, C, D</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
