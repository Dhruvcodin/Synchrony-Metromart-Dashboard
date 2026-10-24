// Type definitions and exports for MetroMart x HSIC Dashboard
import analyticsData from './analytics-data.json';

export interface PaymentSoW {
  paymentMethod: string;
  fy2025: number;
  fy2026: number;
  changePp: number;
}

export interface MonthlySoWPoint {
  fiscalYear: string;
  monthName: string;
  date: string;
  totalSpend: number;
  customers: number;
  [key: string]: any;
}

export interface YoYMonthlyComparison {
  month: string;
  fy2025_hsic_sow: number;
  fy2026_hsic_sow: number;
  hsic_change_pp: number;
  fy2025_wallet_sow: number;
  fy2026_wallet_sow: number;
  fy2025_cash_upi_sow: number;
  fy2026_cash_upi_sow: number;
  fy2025_debit_sow: number;
  fy2026_debit_sow: number;
  fy2025_other_card_sow: number;
  fy2026_other_card_sow: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  code: string;
  customerCount: number;
  pctOfDecliners: number;
  avgFY26Spend: number;
  totalFY26Spend: number;
  avgHSICFY26: number;
  nonHsicFY26Spend: number;
  behavior: string;
  targetRationale: string;
  strategyTitle: string;
  intervention: string;
  successMetric: string;
}

export const EXECUTIVE_OVERVIEW_DATA = analyticsData.EXECUTIVE_OVERVIEW_DATA;
export const CATEGORY_LOOKUP = analyticsData.CATEGORY_LOOKUP;
export const PAYMENT_LOOKUP = analyticsData.PAYMENT_LOOKUP;
export const OVERALL_SOW_CHANGE = analyticsData.OVERALL_SOW_CHANGE as PaymentSoW[];
export const DECLINING_COHORT_SOW_CHANGE = analyticsData.DECLINING_COHORT_SOW_CHANGE as PaymentSoW[];
export const FY25_MONTHLY_SOW = analyticsData.FY25_MONTHLY_SOW as MonthlySoWPoint[];
export const FY26_MONTHLY_SOW = analyticsData.FY26_MONTHLY_SOW as MonthlySoWPoint[];
export const YOY_MONTHLY_COMPARISON = analyticsData.YOY_MONTHLY_COMPARISON as YoYMonthlyComparison[];
export const CUSTOMER_SEGMENTS = analyticsData.CUSTOMER_SEGMENTS as CustomerSegment[];
export const OVERLAPPING_SEGMENT_COUNTS = analyticsData.OVERLAPPING_SEGMENT_COUNTS;
export const EDA_CUSTOMER_DEMOGRAPHICS = analyticsData.EDA_CUSTOMER_DEMOGRAPHICS;
export const EDA_TRANSACTIONS = analyticsData.EDA_TRANSACTIONS;
export const DATA_EXPLORER_SAMPLES = analyticsData.DATA_EXPLORER_SAMPLES;
