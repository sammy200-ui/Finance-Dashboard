import SummaryCard from '../components/dashboard/SummaryCard'
import { formatCurrency } from '../utils/formatters'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">Dashboard</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Here is your financial overview.</p>
      </div>
      
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <SummaryCard 
          label="Total Balance" 
          amount={formatCurrency(84500)} // using hardcoded dummy data for now
          trend="up" 
        />
        <SummaryCard 
          label="Total Income" 
          amount={formatCurrency(120000)} 
          trend="up" 
        />
        <SummaryCard 
          label="Total Expenses" 
          amount={formatCurrency(35500)} 
          trend="down" 
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 h-80 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] text-sm">
          Balance Chart goes here
        </div>
        <div className="h-80 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] text-sm">
          Spending Breakdown goes here
        </div>
      </div>
    </div>
  )
}
