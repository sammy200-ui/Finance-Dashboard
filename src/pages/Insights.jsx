import TopExpenseCard from '../components/insights/TopExpenseCard'

export default function Insights() {

  const mockTopExpense = {
    id: 'mock1',
    description: 'MacBook Pro M3',
    amount: 145000,
    category: 'Shopping',
    type: 'expense',
    date: '2025-02-15'
  }

  return (
    <div className="flex flex-col gap-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">Insights & Analytics</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Deep dive into your financial habits and trends.</p>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="md:col-span-1 lg:col-span-1">
          <TopExpenseCard transaction={mockTopExpense} />
        </div>
        <div className="hidden md:flex lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-sm text-sm text-[var(--muted)] items-center justify-center">
             Additional metric cards coming soon
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
         <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)] shadow-sm">
            Category Breakdown Chart placeholder
         </div>
         <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)] shadow-sm">
            Income vs Expense Chart placeholder
         </div>
      </div>
    </div>
  )
}
