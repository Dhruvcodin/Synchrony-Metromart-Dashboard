# MetroMart × HSIC Customer Analytics Dashboard

### Synchrony Analytics Hackathon 2026 — Share of Wallet Decline & Customer Recovery Platform

An executive-ready, interactive analytics and financial modeling application built with Next.js, React, TypeScript, Tailwind CSS, Recharts, and Lucide Icons. Designed for hackathon presentation and Vercel deployment.

---

## 1. Executive Summary & Analytical Journey

This platform translates the complete analytical flow developed in Google Colab into a high-performance web dashboard:

```
Original Data ➔ Exploratory Data Analysis ➔ Share of Wallet Analysis ➔ Declining-HSIC Cohort ➔ Four Customer Segments ➔ Targeted Strategies ➔ Financial Models
```

### Key Business Diagnostics:
- **Total Cardholders Analyzed:** 45,000 customers.
- **Total Transaction Records:** 444,118 records (399,304 sales @ ₹1.23B, 44,814 returns @ ₹139.3M, net sales denominator: ₹1.09B).
- **Portfolio HSIC Share of Wallet Shift:** HSIC card share fell by **-9.46 percentage points** from **28.97%** in FY2025 to **19.51%** in FY2026.
- **Alternative Payment Substitution:** Shift absorbed by MetroMart Wallet (+1.27 pp to 35.83%), Cash/UPI (+4.48 pp to 23.36%), Debit Card (+1.88 pp to 10.53%), and Other Bank Credit Cards (+1.83 pp to 10.76%).
- **The 10,498 Declining Cohort:** Among cardholders whose individual HSIC SoW fell, HSIC card share plunged from **43.15% to 9.98% (-33.17 pp)**. Customers did not stop shopping at MetroMart; they shifted spending directly into MetroMart Wallet (+13.03 pp) and Cash/UPI (+10.93 pp).
- **Four Mutually Exclusive Segments:** Assigned with priority `D > A > B > C` to guarantee zero double-counting:
  - **Segment A (MetroMart Wallet Switchers):** 4,931 customers (46.97%) | ₹58.74M FY26 spend
  - **Segment B (Cash/UPI Switchers):** 2,721 customers (25.92%) | ₹30.36M FY26 spend
  - **Segment C (Competing Card Switchers):** 1,145 customers (10.91%) | ₹9.33M FY26 spend
  - **Segment D (High-Value Rapid Decliners):** 1,701 customers (16.20%) | ₹47.02M FY26 spend
  - **Total:** 10,498 customers (100.0% reconciled; unassigned: 0).
- **Quantified Opportunity:** The 10,498 decliners generated ₹145.45 Million in annual MetroMart spend, with **₹128.9 Million** slipping to non-HSIC methods.
- **Financial Models:** Interactive base, upside, and dynamic scenario modeling simulating incremental spend, campaign costs (promotional cashback, milestone festive vouchers, communications), net contribution, and break-even feasibility.

---

## 2. Information Architecture (8 Ordered Sections)

1. **Executive Overview:** Title, subtitle, verified KPI cards, whiteboard journey map, and core findings.
2. **Data Explorer:** Schema explorer, missing value diagnostics, interactive search & multi-filters, sample records, and CSV downloads.
3. **Exploratory Data Analysis:** Demographics (age, gender, membership, credit limit, APR, active dates) and transaction dynamics (sales vs returns, categories, monthly volume).
4. **Share of Wallet:** Overall portfolio comparison, monthly trends ordered August through July, declining cohort shift, and calculation methodology.
5. **Contractual Card Benefits:** Prime (5% Grocery, 3% Electronics, 1% Other) vs Non-Prime (1% Flat) matrix, market comparison, and interactive rewards calculator.
6. **Customer Segmentation:** Mutually exclusive allocation vs overlapping behavioral groups, segment profiles, and size comparison.
7. **Targeted Strategies:** Dedicated campaign blueprints (Wallet-to-HSIC Switch Challenge, Tap Pay & Earn, Make HSIC First Choice, High-Value VIP Retention Offer).
8. **Financial Models (Final Section):** Comprehensive ledger, scenario toggles (Base vs Upside vs Custom sliders), break-even rates, CAC, and executive business recommendations.

---

## 3. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Fintech palette: Deep Navy `#0B1B3D`, Synchrony Gold `#FFC70C`, Emerald `#10B981`, Rose `#EF4444`)
- **Visualizations:** [Recharts](https://recharts.org/) (Bar, Line, Pie, Area)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Engine:** Pre-compiled analytical indices with CSV dataset exports in `/public/data/`

---

## 4. Local Development & Setup

### Prerequisites:
- Node.js 18.18+ or 20+
- npm 9+

### Installation & Run:
```bash
# Clone the repository
git clone https://github.com/your-username/synchrony-metromart-dashboard.git
cd synchrony-metromart-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build:
```bash
# Compile and optimize for production
npm run build

# Start production server
npm run start
```

---

## 5. Vercel Deployment Instructions

The application is fully self-contained, pre-optimized, and verified for one-click deployment on [Vercel](https://vercel.com):

1. **Push to GitHub / GitLab:**
   ```bash
   git add .
   git commit -m "Complete MetroMart x HSIC Synchrony Analytics Dashboard"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Log in to your [Vercel Dashboard](https://vercel.com).
   - Click **Add New Project** and import the repository.
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or project root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Click **Deploy**.

---

## 6. Verification & Case Study Compliance

- [x] **8 Exact Navigation Sections** in strict specified order.
- [x] **Financial Models is the Final Section** (no methodology or validation page follows it).
- [x] **No Hackathon Deadline Displays** anywhere in the visible application.
- [x] **No Bottom White Footer Bar** or repeated metadata.
- [x] **No Presentation/PDF Slide-Export Buttons** (ordinary CSV downloads preserved).
- [x] **No Visible Internal CSV Filename Labels** (business-friendly titles throughout).
- [x] **Fiscal Months Ordered August through July** (Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar, Apr, May, Jun, Jul).
- [x] **Zero Double Counting** across customer segments (reconciled to exactly 10,498 customers).
