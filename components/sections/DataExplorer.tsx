"use client";

import React, { useState, useMemo } from "react";
import {
  Database,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DATA_EXPLORER_SAMPLES,
  CATEGORY_LOOKUP,
  PAYMENT_LOOKUP,
  EDA_CUSTOMER_DEMOGRAPHICS,
  EXECUTIVE_OVERVIEW_DATA,
} from "@/lib/data/dataset";
import { formatNumber, formatINR } from "@/lib/utils";

type DatasetType = "transactions" | "customers" | "segments" | "categories" | "payments";

export default function DataExplorer() {
  const [activeDataset, setActiveDataset] = useState<DatasetType>("transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Dataset metadata definitions
  const datasetMeta = {
    transactions: {
      name: "Transaction Records",
      rows: EXECUTIVE_OVERVIEW_DATA.totalTransactions,
      cols: 8,
      dateRange: "Aug 1, 2024 – Jul 31, 2026 (FY2025 & FY2026)",
      missingInfo: "Number_of_Transactions is null in 44,814 records (10.09% - specifically all Return records, per case study rule: returns count as zero transactions)",
      downloadFile: "/data/Transactions Data.csv",
      columns: [
        { name: "Customer_ID", type: "string", desc: "Customer unique identifier" },
        { name: "Transaction_ID", type: "string", desc: "Unique transaction identifier" },
        { name: "Transaction_Date", type: "datetime", desc: "Date of transaction (YYYY-MM-DD)" },
        { name: "Category_Code", type: "integer", desc: "Lookup key (1-10) for shopping category" },
        { name: "Transaction_Type", type: "string", desc: "Transaction nature ('Sale' or 'Return')" },
        { name: "Transaction_Amount", type: "decimal", desc: "Gross amount in source units" },
        { name: "Payment_Code", type: "integer", desc: "Lookup key (1-5) for payment method" },
        { name: "Number_of_Transactions", type: "integer", desc: "Count of items/transactions (null on returns)" },
      ],
    },
    customers: {
      name: "Customer Demographics & Accounts",
      rows: EXECUTIVE_OVERVIEW_DATA.totalCustomers,
      cols: 8,
      dateRange: "Open dates from 2018 to 2026; Close dates through 2026",
      missingInfo: "Credit_Card_Open_Date, Limit, and APR are missing in 6,836 rows (15.19% unactivated cards). Credit_Card_Closed_Date missing in 37,336 rows (82.97% active open accounts)",
      downloadFile: "/data/Customer Data.csv",
      columns: [
        { name: "Customer_ID", type: "string", desc: "Primary key for customer" },
        { name: "Age", type: "integer", desc: "Customer age in years (18–60)" },
        { name: "Gender", type: "string", desc: "Customer gender (Male / Female)" },
        { name: "Membership_Type", type: "string", desc: "MetroMart loyalty tier ('Prime' / 'Non-Prime')" },
        { name: "Credit_Card_Open_Date", type: "date", desc: "Date HSIC co-branded card was opened" },
        { name: "Credit_Card_Closed_Date", type: "date", desc: "Date HSIC card was closed (null = still active)" },
        { name: "Credit_Card_Limit", type: "decimal", desc: "Assigned credit line (100,000 to 300,000 units)" },
        { name: "Credit_Card_APR", type: "decimal", desc: "Annual percentage rate (28.0% to 35.0%)" },
      ],
    },
    segments: {
      name: "Declining HSIC Customer Segments",
      rows: EXECUTIVE_OVERVIEW_DATA.decliningCustomersCount,
      cols: 24,
      dateRange: "FY2025 vs FY2026 Share of Wallet Comparison",
      missingInfo: "0 missing values across all 10,498 qualifying cardholders. 100% assigned to mutually exclusive segments (A, B, C, D)",
      downloadFile: "/data/customer_level_segments.csv",
      columns: [
        { name: "Customer_ID", type: "string", desc: "Declining cardholder unique ID" },
        { name: "Total_Net_Spend_FY2025", type: "decimal", desc: "Total MetroMart net spend in FY2025" },
        { name: "Total_Net_Spend_FY2026", type: "decimal", desc: "Total MetroMart net spend in FY2026" },
        { name: "HSIC_SoW_FY2025", type: "decimal", desc: "Baseline HSIC Share of Wallet (%)" },
        { name: "HSIC_SoW_FY2026", type: "decimal", desc: "Recent HSIC Share of Wallet (%)" },
        { name: "HSIC_Decline_pp", type: "decimal", desc: "Percentage point drop in HSIC SoW" },
        { name: "Primary_Segment", type: "string", desc: "Mutually exclusive assigned segment (Priority D>A>B>C)" },
        { name: "Eligible_A / B / C / D", type: "boolean", desc: "Overlapping eligibility flags" },
      ],
    },
    categories: {
      name: "Shopping Category Lookups",
      rows: 10,
      cols: 2,
      dateRange: "Static Master Dimension",
      missingInfo: "Complete reference table with 0 missing records",
      downloadFile: "/data/Category Code.csv",
      columns: [
        { name: "Category_Code", type: "integer", desc: "Lookup ID (1-10)" },
        { name: "Category", type: "string", desc: "Department / merchandise category name" },
      ],
    },
    payments: {
      name: "Payment Method Lookups",
      rows: 5,
      cols: 2,
      dateRange: "Static Master Dimension",
      missingInfo: "Complete reference table with 0 missing records",
      downloadFile: "/data/Payment Code.csv",
      columns: [
        { name: "Payment_Code", type: "integer", desc: "Lookup ID (1-5)" },
        { name: "Payment_Method", type: "string", desc: "Payment channel name" },
      ],
    },
  };

  const meta = datasetMeta[activeDataset];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return DATA_EXPLORER_SAMPLES.transactions.filter((tx) => {
      const matchSearch =
        searchTerm === "" ||
        tx.Customer_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.Transaction_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.Category_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.Payment_Method.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === "all" || tx.Category_Code.toString() === selectedCategory;
      const matchPay = selectedPayment === "all" || tx.Payment_Code.toString() === selectedPayment;
      const matchType = selectedType === "all" || tx.Transaction_Type.toLowerCase() === selectedType.toLowerCase();

      return matchSearch && matchCat && matchPay && matchType;
    });
  }, [searchTerm, selectedCategory, selectedPayment, selectedType]);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return DATA_EXPLORER_SAMPLES.customers.filter((c) => {
      return (
        searchTerm === "" ||
        c.Customer_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.Membership_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.Gender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  // Filter segments
  const filteredSegments = useMemo(() => {
    return DATA_EXPLORER_SAMPLES.segments.filter((s) => {
      return (
        searchTerm === "" ||
        s.Customer_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.Primary_Segment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  // Active records based on dataset
  const activeRecords = useMemo(() => {
    if (activeDataset === "transactions") return filteredTransactions;
    if (activeDataset === "customers") return filteredCustomers;
    if (activeDataset === "segments") return filteredSegments;
    if (activeDataset === "categories") {
      return Object.entries(CATEGORY_LOOKUP).map(([code, name]) => ({ Category_Code: code, Category: name }));
    }
    if (activeDataset === "payments") {
      return Object.entries(PAYMENT_LOOKUP).map(([code, name]) => ({ Payment_Code: code, Payment_Method: name }));
    }
    return [];
  }, [activeDataset, filteredTransactions, filteredCustomers, filteredSegments]);

  const totalPages = Math.ceil(activeRecords.length / rowsPerPage) || 1;
  const paginatedRecords = activeRecords.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDatasetChange = (ds: DatasetType) => {
    setActiveDataset(ds);
    setCurrentPage(1);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      {/* Header and Dataset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Database className="w-5 h-5 text-amber-500" />
            <span>Interactive Data Explorer</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Explore schema, data distributions, missing values, sample records, and download datasets
          </p>
        </div>

        {/* Dataset Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          {(Object.keys(datasetMeta) as DatasetType[]).map((key) => {
            const isSelected = activeDataset === key;
            return (
              <button
                key={key}
                onClick={() => handleDatasetChange(key)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  isSelected
                    ? "bg-white text-slate-950 font-bold shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {datasetMeta[key].name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dataset Metadata Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Dataset Records</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatNumber(meta.rows)}</div>
          <div className="text-xs text-slate-500 mt-1">{meta.cols} Total Columns</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
          <div className="text-xs text-slate-500 font-medium flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>Temporal Range & Completeness</span>
          </div>
          <div className="text-sm font-bold text-slate-800 mt-1">{meta.dateRange}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-start space-x-1">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{meta.missingInfo}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="text-xs text-slate-500 font-medium">Dataset Export</div>
          <a
            href={meta.downloadFile}
            download
            className="mt-2 inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download CSV</span>
          </a>
          <span className="text-[10px] text-slate-400 mt-1 text-center">Verified source file</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${meta.name}...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>

          {/* Conditional Filters for Transactions */}
          {activeDataset === "transactions" && (
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORY_LOOKUP).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Payment Filter */}
              <select
                value={selectedPayment}
                onChange={(e) => {
                  setSelectedPayment(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Payment Methods</option>
                {Object.entries(PAYMENT_LOOKUP).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Types</option>
                <option value="sale">Sale</option>
                <option value="return">Return</option>
              </select>
            </div>
          )}
        </div>

        {/* Schema Column Tags */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">Schema Fields:</span>
          {meta.columns.map((c) => (
            <span
              key={c.name}
              title={c.desc}
              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-[9px] text-slate-600 bg-slate-200 px-1 rounded">{c.type}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-200 uppercase tracking-wider text-[11px] font-semibold">
              {activeDataset === "transactions" && (
                <tr>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3 text-right">Amount (units)</th>
                  <th className="px-4 py-3 text-center">Tx Count</th>
                </tr>
              )}
              {activeDataset === "customers" && (
                <tr>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Membership</th>
                  <th className="px-4 py-3">Card Open Date</th>
                  <th className="px-4 py-3">Card Closed Date</th>
                  <th className="px-4 py-3 text-right">Credit Limit (units)</th>
                  <th className="px-4 py-3 text-right">APR (%)</th>
                </tr>
              )}
              {activeDataset === "segments" && (
                <tr>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Primary Segment</th>
                  <th className="px-4 py-3 text-right">FY25 Spend</th>
                  <th className="px-4 py-3 text-right">FY26 Spend</th>
                  <th className="px-4 py-3 text-right">HSIC SoW FY25</th>
                  <th className="px-4 py-3 text-right">HSIC SoW FY26</th>
                  <th className="px-4 py-3 text-right">Decline (pp)</th>
                  <th className="px-4 py-3 text-center">Eligibility</th>
                </tr>
              )}
              {activeDataset === "categories" && (
                <tr>
                  <th className="px-6 py-3">Category Code</th>
                  <th className="px-6 py-3">Category Name</th>
                  <th className="px-6 py-3">Card Benefit Rate</th>
                </tr>
              )}
              {activeDataset === "payments" && (
                <tr>
                  <th className="px-6 py-3">Payment Code</th>
                  <th className="px-6 py-3">Payment Method</th>
                  <th className="px-6 py-3">Portfolio Status</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No matching records found. Try adjusting your search query or filters.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((row: any, idx: number) => {
                  if (activeDataset === "transactions") {
                    const isReturn = row.Transaction_Type?.toLowerCase() === "return";
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-900">{row.Customer_ID}</td>
                        <td className="px-4 py-2.5 text-slate-500 font-mono text-[11px]">{row.Transaction_ID}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.Transaction_Date}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                              isReturn ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {row.Transaction_Type}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-800">{row.Category_Name}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                              row.Payment_Method?.includes("HSIC")
                                ? "bg-amber-100 text-amber-900 font-bold border border-amber-300"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <span>{row.Payment_Method}</span>
                          </span>
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-medium ${
                            isReturn ? "text-rose-600" : "text-slate-900"
                          }`}
                        >
                          {isReturn ? `-${formatINR(row.Transaction_Amount)}` : formatINR(row.Transaction_Amount)}
                        </td>
                        <td className="px-4 py-2.5 text-center text-slate-500">
                          {row.Number_of_Transactions ?? "0 (Return)"}
                        </td>
                      </tr>
                    );
                  }

                  if (activeDataset === "customers") {
                    const isPrime = row.Membership_Type === "Prime";
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-900">{row.Customer_ID}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.Age}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.Gender}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                              isPrime ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {row.Membership_Type}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">
                          {row.Credit_Card_Open_Date || <span className="text-slate-400 italic">Not Opened</span>}
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">
                          {row.Credit_Card_Closed_Date || <span className="text-emerald-600 font-medium">Active (Open)</span>}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-slate-900">
                          {row.Credit_Card_Limit ? formatINR(Number(row.Credit_Card_Limit)) : "—"}
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {row.Credit_Card_APR ? `${Number(row.Credit_Card_APR).toFixed(1)}%` : "—"}
                        </td>
                      </tr>
                    );
                  }

                  if (activeDataset === "segments") {
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-900">{row.Customer_ID}</td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-amber-400">
                            {row.Primary_Segment}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {formatINR(Number(row.Total_Net_Spend_FY2025))}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-slate-900">
                          {formatINR(Number(row.Total_Net_Spend_FY2026))}
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {Number(row.HSIC_SoW_FY2025).toFixed(1)}%
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-rose-600">
                          {Number(row.HSIC_SoW_FY2026).toFixed(1)}%
                        </td>
                        <td className="px-4 py-2.5 text-right font-bold text-rose-700">
                          -{Number(row.HSIC_Decline_pp).toFixed(1)} pp
                        </td>
                        <td className="px-4 py-2.5 text-center text-[10px] text-slate-500 font-mono">
                          {[
                            row.Eligible_A === "True" ? "A" : null,
                            row.Eligible_B === "True" ? "B" : null,
                            row.Eligible_C === "True" ? "C" : null,
                            row.Eligible_D === "True" ? "D" : null,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </td>
                      </tr>
                    );
                  }

                  if (activeDataset === "categories") {
                    const isHighBenefit = row.Category_Code === "1" || row.Category_Code === "2";
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-3 font-mono font-bold text-slate-900">{row.Category_Code}</td>
                        <td className="px-6 py-3 font-semibold text-slate-800">{row.Category}</td>
                        <td className="px-6 py-3">
                          {isHighBenefit ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              {row.Category_Code === "1" ? "5% Cashback (Prime)" : "3% Cashback (Prime)"}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">1% Standard Cashback</span>
                          )}
                        </td>
                      </tr>
                    );
                  }

                  if (activeDataset === "payments") {
                    const isHSIC = row.Payment_Code === "3";
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-3 font-mono font-bold text-slate-900">{row.Payment_Code}</td>
                        <td className="px-6 py-3 font-semibold text-slate-800">{row.Payment_Method}</td>
                        <td className="px-6 py-3">
                          {isHSIC ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              Primary Partner Co-Brand
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">Alternative Channel</span>
                          )}
                        </td>
                      </tr>
                    );
                  }

                  return null;
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold">{Math.min(activeRecords.length, (currentPage - 1) * rowsPerPage + 1)}</span> to{" "}
            <span className="font-semibold">{Math.min(activeRecords.length, currentPage * rowsPerPage)}</span> of{" "}
            <span className="font-semibold">{formatNumber(activeRecords.length)}</span> records (Sample subset loaded in memory)
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
