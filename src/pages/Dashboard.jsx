import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown'
import { useStore } from '../store/useStore'
import { formatCurrency } from '../utils/formatters'
import { 
  getTotalIncome, 
  getTotalExpenses, 
  getMonthlyTotals, 
  getByCategory 
} from '../utils/calculations'

export default function Dashboard() {
  // pulling state from zustand
  const transactions = useStore(state => state.transactions)
  
  // computing aggregated numbers directly here
  const totalIncome = getTotalIncome(transactions)
  const totalExpenses = getTotalExpenses(transactions)
  const totalBalance = totalIncome - totalExpenses
  
  const monthlyData = getMonthlyTotals(transactions)
  const categoryData = getByCategory(transactions)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">Dashboard Overview</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Here is your financial summary and trends.</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <SummaryCard 
          label="Total Balance" 
          amount={formatCurrency(totalBalance)} 
          trend={totalBalance >= 0 ? "up" : "down"} 
        />
        <SummaryCard 
          label="Total Income" 
          amount={formatCurrency(totalIncome)} 
          trend="up" 
        />
        <SummaryCard 
          label="Total Expenses" 
          amount={formatCurrency(totalExpenses)} 
          trend="down" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2">
          <BalanceTrendChart data={monthlyData} />
        </div>
        <div>
          <SpendingBreakdown data={categoryData} />
        </div>
      </div>
    </div>
  )
}
