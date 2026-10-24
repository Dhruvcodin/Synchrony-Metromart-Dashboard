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
  CheckCircle,
  Clock,
  Layers,
  Settings,
} from "lucide-react";
import { CUSTOMER_SEGMENTS } from "@/lib/data/dataset";
import { formatNumber, formatINR } from "@/lib/utils";

interface TargetedStrategiesProps {
  onNavigate: (sectionId: string) => void;
}

export default function TargetedStrategies({ onNavigate }: TargetedStrategiesProps) {
  const [activeStrategy, setActiveStrategy] = useState<string>("all");

  const strategies = [
    {
      id: "A",
      title: "Wallet-to-HSIC Switch Challenge",
      subtitle: "Re-anchor HSIC Card as Primary MetroMart Payment",
      segmentName: "Segment A — MetroMart Wallet Switchers",
      customerCount: 4931,
      targetSpendPool: 58741497,
      nonHsicLeakage: 53887964,
      duration: "60 Days (Two Billing Cycles)",
      eligibility: "Active cardholders in Segment A whose MetroMart Wallet share increased",
      behavior: "Customers migrated 13.03 pp of wallet share into MetroMart Wallet. They view the wallet as frictionless for everyday items, while letting their HSIC card sit idle.",
      problem: "The stored-value MetroMart Wallet produces zero interchange revenue for HSIC and severs top-of-wallet card habituation.",
      intervention: [
        "Phase 1 (The 3-Swipe Challenge): Spend with HSIC card directly on 3 consecutive MetroMart orders > ₹1,000 to unlock a ₹150 statement credit adjustment.",
        "Phase 2 (Auto-Reload Co-Brand Link): Earn an ongoing 1.5% reload bonus when using HSIC card to fund the MetroMart Wallet balance for orders under ₹500.",
        "Phase 3 (In-App Default Placement): In-app UI prompt setting HSIC as the 1-Click checkout payment default on MetroMart web and mobile app.",
      ],
      kpis: [
        "Reactivate 20%+ target cardholders (986+ customers)",
        "Lift HSIC Share of Wallet by +12 percentage points",
        "Generate ₹11.7M+ in incremental HSIC card transaction volume",
      ],
      rationale: "Largest segment by population (47.0% of decliners). Because these shoppers already trust MetroMart, modest checkout nudges can rapidly shift high transaction frequency back to the co-brand card.",
      accent: "from-violet-600 to-indigo-700",
      borderAccent: "border-violet-500",
      badgeColor: "bg-violet-100 text-violet-800",
    },
    {
      id: "B",
      title: "Tap, Pay & Earn: Contactless Drive",
      subtitle: "Compete with Instant UPI & Cash Checkout at Store POS",
      segmentName: "Segment B — Cash/UPI Switchers",
      customerCount: 2721,
      targetSpendPool: 30359142,
      nonHsicLeakage: 27439368,
      duration: "45 Days (Fast-Action Campaign)",
      eligibility: "Active cardholders in Segment B with increased Cash/UPI transaction share",
      behavior: "Cardholders shifted +10.93 pp into Cash/UPI. High preference for QR code scanning at store registers and digital UPI apps.",
      problem: "Perceived friction of physical card swiping vs instant mobile UPI apps leads to silent abandonment of HSIC card at checkout counters.",
      intervention: [
        "Incentive 1 (Instant POS Bill Waiver): Flat ₹50 instant discount applied at POS checkout when tapping contactless HSIC card on orders over ₹500 (up to 3 times per month).",
        "Incentive 2 (RuPay UPI Integration): Enable cardholders to link their HSIC RuPay credit line directly inside Google Pay / PhonePe for 2x reward points on QR scans.",
        "Incentive 3 (Store Associate Cashier Nudge): Point-of-sale terminal prompt reminding cashier to ask: 'Would you like to tap your HSIC card for 5% cashback today?'",
      ],
      kpis: [
        "Convert 18%+ of Cash/UPI transactions to HSIC contactless tap (490+ accounts)",
        "Increase monthly HSIC active card utilization from 1.2 to 3.8 transactions/month",
        "Generate ₹5.4M+ in incremental HSIC transaction volume",
      ],
      rationale: "UPI habituation is convenience-driven rather than reward-driven. Introducing contactless tap speed coupled with instant bill waivers breaks the UPI muscle memory.",
      accent: "from-cyan-600 to-teal-700",
      borderAccent: "border-cyan-500",
      badgeColor: "bg-cyan-100 text-cyan-800",
    },
    {
      id: "C",
      title: "Make HSIC the First Choice",
      subtitle: "Win Back Share from Competing Credit and Debit Cards",
      segmentName: "Segment C — Competing Card Switchers",
      customerCount: 1145,
      targetSpendPool: 9328142,
      nonHsicLeakage: 8139847,
      duration: "90 Days (Quarterly Campaign)",
      eligibility: "Active cardholders in Segment C using rival debit or credit cards at MetroMart",
      behavior: "Customers shifted +4.16 pp to Debit Cards and +5.04 pp to Other Bank Credit Cards (HDFC, ICICI, SBI, Axis). They are multi-cardholders actively utilizing competitor reward schemes.",
      problem: "HSIC is relegated to the second or third slot in physical and digital wallets, losing high-margin spend to competitors despite offering superior contractual cashback.",
      intervention: [
        "Intervention 1 (Top Category Match Booster): Cardholder receives an additional 2% promotional cashback in their individual highest spending category for 90 days (boosting Grocery to 7% or Electronics to 5%).",
        "Intervention 2 (Festive Shopping Milestone): ₹500 MetroMart gift voucher upon reaching ₹15,000 quarterly spend on the HSIC card.",
        "Intervention 3 (Direct Value Comparison Statement): Personalized email/SMS notification showing exact rupees lost by paying with rival bank cards vs HSIC card.",
      ],
      kpis: [
        "Reduce competing card SoW from 23.4% down to under 10%",
        "Win back 25%+ of rival card transaction volume (₹2.3M+ in spending)",
        "Reactivate 280+ displaced cardholders",
      ],
      rationale: "Multi-card holders are highly reward-rational. A category booster and milestone voucher clearly overcomes competitor bank marketing and reclaims wallet dominance.",
      accent: "from-blue-600 to-indigo-800",
      borderAccent: "border-blue-500",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "D",
      title: "High-Value VIP Customer Retention Offer",
      subtitle: "Protect Top-Decile Spenders Experiencing Rapid Attrition",
      segmentName: "Segment D — High-Value Rapid Decliners",
      customerCount: 1701,
      targetSpendPool: 47024605,
      nonHsicLeakage: 41470878,
      duration: "90 Days (Festive Season Q3)",
      eligibility: "Top 25% annual spenders (₹17,998+ annual spend) with ≥20 pp HSIC SoW drop",
      behavior: "Spends an average of ₹27,645/year at MetroMart, but HSIC share collapsed from 45%+ down to 11.8%. They have shifted over ₹41.4M to alternative payment channels.",
      problem: "High-volume, highly lucrative customer relationships are experiencing severe silent attrition. Losing these accounts causes disproportionate financial damage to the portfolio.",
      intervention: [
        "VIP Perk 1 (Tiered Festive Vouchers): ₹1,000 MetroMart gift voucher on ₹25,000 cumulative HSIC spend; ₹2,000 voucher on ₹40,000 spend during the festive quarter.",
        "VIP Perk 2 (Flat 5% Uncapped Everywhere): Promotional uncapped 5% cashback across ALL MetroMart merchandise categories (not just Grocery) for 90 days.",
        "VIP Perk 3 (Executive Concierge & Priority Delivery): Complimentary 1-year MetroMart Express Delivery waiver and priority customer service phone line.",
      ],
      kpis: [
        "Reactivate 25%+ VIP accounts (425+ high-value customers)",
        "Recover ₹15.0M+ in HSIC card transaction volume",
        "Restore average HSIC SoW from 11.8% back to 40%+",
      ],
      rationale: "Highest ROI intervention in the portfolio. Although representing only 16.2% of decliners, Segment D controls ₹47.0M in spending. Winning back 25% of this segment recovers more revenue than segments B and C combined.",
      accent: "from-amber-500 to-amber-700",
      borderAccent: "border-amber-400",
      badgeColor: "bg-amber-100 text-amber-900 font-bold",
    },
  ];

  const displayedStrategies =
    activeStrategy === "all" ? strategies : strategies.filter((s) => s.id === activeStrategy);

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Target className="w-5 h-5 text-amber-500" />
            <span>Targeted Customer Recovery Strategies</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Segment-specific campaign blueprints designed to reverse silent attrition and lift HSIC Share of Wallet
          </p>
        </div>

        {/* Strategy Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveStrategy("all")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeStrategy === "all"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All 4 Strategies
          </button>
          {strategies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStrategy(s.id)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                activeStrategy === s.id
                  ? "bg-white text-slate-900 font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Seg {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedStrategies.map((strat) => (
          <div
            key={strat.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Strategy Header Banner */}
              <div className={`p-6 bg-gradient-to-r ${strat.accent} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    {strat.segmentName}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-semibold bg-black/20 px-2 py-0.5 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{strat.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-white">{strat.title}</h3>
                <p className="text-xs text-white/80 mt-1">{strat.subtitle}</p>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-xs">
                  <div>
                    <span className="text-[10px] text-white/70 block">Target Audience</span>
                    <span className="font-extrabold text-white text-sm">
                      {formatNumber(strat.customerCount)} Accounts
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/70 block">Total Spend Pool</span>
                    <span className="font-extrabold text-white text-sm">
                      {formatINR(strat.targetSpendPool)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/70 block">Non-HSIC Leakage</span>
                    <span className="font-extrabold text-amber-300 text-sm">
                      {formatINR(strat.nonHsicLeakage)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Strategy Body Content */}
              <div className="p-6 space-y-4 text-xs">
                {/* Behavioral & Business Problem Diagnostic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-1">Customer Behavior:</strong>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{strat.behavior}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-1">Core Business Problem:</strong>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{strat.problem}</p>
                  </div>
                </div>

                {/* Proposed Intervention Blueprint */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Proposed Campaign Interventions:</span>
                  </div>
                  <div className="space-y-2">
                    {strat.intervention.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-700 text-[11px] leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Success Metrics */}
                <div className="space-y-1.5 pt-1">
                  <strong className="text-slate-900 block font-semibold text-xs">Success Metrics &amp; KPIs:</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {strat.kpis.map((kpi, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200 text-emerald-900 text-[11px] font-medium"
                      >
                        {kpi}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Modular Strategy Component</span>
              <button
                onClick={() => onNavigate("financial-models")}
                className="font-bold inline-flex items-center space-x-1.5 text-slate-900 hover:text-amber-600 transition-colors"
              >
                <span>Model Financial ROI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Disclaimer & Methodology Callout */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-600 flex items-center justify-between">
        <span>
          <strong>Campaign Governance:</strong> Proposed interventions are subject to business case approval, financial hurdle rates, and pilot testing before full portfolio rollout.
        </span>
        <button
          onClick={() => onNavigate("financial-models")}
          className="font-bold text-amber-600 hover:text-amber-700 whitespace-nowrap ml-4"
        >
          Proceed to Financial Models →
        </button>
      </div>
    </div>
  );
}
