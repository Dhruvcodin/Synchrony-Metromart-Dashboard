import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetroMart × HSIC Customer Analytics | Share of Wallet & Retention Platform",
  description: "Executive analytics dashboard for MetroMart Inc. and HSIC Bank co-branded credit card customer share of wallet analysis, silent attrition diagnostics, customer segmentation, and financial models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
