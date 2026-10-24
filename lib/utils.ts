import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUnits(val: number): string {
  if (Math.abs(val) >= 1000000) {
    return `${(val / 1000000).toFixed(2)}M units`;
  }
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(val)} units`;
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat("en-US").format(val);
}

export function formatINR(val: number): string {
  return formatUnits(val);
}
