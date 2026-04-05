# FinTrack — Finance Dashboard

A personal finance dashboard built as part of an internship evaluation. It lets you track income and expenses, visualize spending trends, and manage transactions — all without a backend.

---


## Tech Stack

| Tool | Why |
|---|---|
| React (JS) | Standard frontend framework, no TypeScript to keep things approachable |
| Vite | Fast dev server and build tool |
| Tailwind CSS | Utility-first CSS, fast to write and responsive-friendly |
| Zustand | Lightweight state management, more modern than Context |
| Recharts | Simple React chart library, easy to drop in and customize |
| React Router v6 | Standard client-side routing |
| date-fns | Clean date formatting without importing all of Moment |
| Lucide React | Consistent icon set |

---

## Features

- **Dashboard** with summary cards (total balance, income, expenses) and charts (balance trend, spending breakdown by category)
- **Transactions page** with search, category filter, type filter, and sort options
- **Add / Edit / Delete transactions** (admin mode only)
- **Export to CSV** — downloads the currently filtered transactions as a `.csv` file
- **Insights page** with income vs expense comparison chart, category breakdown bar chart, and highest single expense card
- **Dark / Light mode toggle** — persists across refreshes via localStorage
- **Role switching** — toggle between Viewer and Admin in the header; admins can mutate data, viewers can only read
- **Persistent state** — Zustand + localStorage so nothing resets on page refresh

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## Folder Structure

```
src/
├── components/
│   ├── dashboard/       # SummaryCard, BalanceTrendChart, SpendingBreakdown
│   ├── insights/        # TopExpenseCard, CategoryBreakdownChart, IncomeVsExpenseChart
│   ├── layout/          # Layout, Sidebar, Header
│   ├── transactions/    # TransactionTable, TransactionRow, TransactionFilters, AddTransactionModal
│   └── ui/              # Badge, EmptyState, RoleToggle, ThemeToggle
├── data/
│   └── mockData.js      # 30 hand-crafted mock transactions
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useStore.js      # Single Zustand store for all app state
└── utils/
    ├── calculations.js  # getTotalIncome, getByCategory, getMonthlyTotals, etc.
    └── formatters.js    # formatCurrency (₹ INR), formatDate, exportToCSV
```

---

## Role Switching

There's a dropdown in the top-right header that switches between **Viewer** and **Admin**.

- **Viewer** — read-only mode. Can browse transactions and view all charts.
- **Admin** — can add new transactions, edit existing ones, delete them, and export to CSV.

This is not real authentication — it's just a Zustand state toggle. Good enough for a demo.

---

## Assumptions

- All data is mocked locally in `mockData.js`. No backend, no API calls.
- The "logged in user" concept doesn't exist — role is just a dropdown toggle.
- Currency is always INR (₹). No multi-currency support.
- Amounts are stored as absolute positive numbers. The `type` field (`income`/`expense`) determines the sign when displayed.
- Date range filtering wasn't implemented — category, type, and sort filters were prioritized instead.

---

## What I'd Improve With More Time

- Actual authentication with a backend (or at least Firebase)
- Date range filter on the transactions page
- Pagination or virtual scrolling for large transaction lists
- Budget goal setting — set a monthly limit per category and track against it
- Better mobile responsiveness on the insights charts
- A proper loading skeleton instead of just rendering data instantly
- Unit tests for the calculation utilities at minimum
