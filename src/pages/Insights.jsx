import TopExpenseCard from '../components/insights/TopExpenseCard'
import CategoryBreakdownChart from '../components/insights/CategoryBreakdownChart'
import IncomeVsExpenseChart from '../components/insights/IncomeVsExpenseChart'
import { useStore } from '../store/useStore'
import { getBiggestExpense, getByCategory, getMonthlyTotals } from '../utils/calculations'

export default function Insights() {
  const transactions = useStore(state => state.transactions)

  const topExpense = getBiggestExpense(transactions)
  const categoryData = getByCategory(transactions)
  const monthlyData = getMonthlyTotals(transactions)

  return (
    <div className="flex flex-col gap-6 fade-in h-full">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">Insights & Analytics</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Deep dive into your financial habits and trends over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <TopExpenseCard transaction={topExpense} />
        </div>
        
        <div className="lg:col-span-2">
          <IncomeVsExpenseChart data={monthlyData} />
        </div>
      </div>

      <div className="w-full">
        <CategoryBreakdownChart data={categoryData} />
      </div>
    </div>
  )
}
