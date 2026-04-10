import { BarChart3, TrendingUp } from 'lucide-react'
import TopExpenseCard from '../components/insights/TopExpenseCard'
import CategoryBreakdownChart from '../components/insights/CategoryBreakdownChart'
import IncomeVsExpenseChart from '../components/insights/IncomeVsExpenseChart'
import { useStore } from '../store/useStore'
import { getBiggestExpense, getByCategory, getMonthlyTotals, getTotalIncome, getTotalExpenses } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'

export default function Insights() {
  const transactions = useStore(state => state.transactions)

  const topExpense = getBiggestExpense(transactions)
  const categoryData = getByCategory(transactions)
  const monthlyData = getMonthlyTotals(transactions)
  const totalIncome = getTotalIncome(transactions)
  const totalExpenses = getTotalExpenses(transactions)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0

  return (
    <div className="flex flex-col fade-in h-full" style={{ gap: '28px' }}>
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Insights & Analytics</h2>
        <p className="text-sm" style={{ color: 'var(--muted)', marginTop: '4px' }}>Deep dive into your financial habits and trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TopExpenseCard transaction={topExpense} />
        
        <div
          className="flex flex-col justify-between rounded-xl fade-in"
          style={{
            padding: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
            <div 
              className="flex items-center justify-center"
              style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--green-light)', color: 'var(--green)' }}
            >
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Savings Rate</span>
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{savingsRate}%</div>
          <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '8px' }}>of total income saved</p>
        </div>

        <div
          className="flex flex-col justify-between rounded-xl fade-in"
          style={{
            padding: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
            <div 
              className="flex items-center justify-center"
              style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              <BarChart3 size={20} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Total Transactions</span>
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{transactions.length}</div>
          <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '8px' }}>across all categories</p>
        </div>
      </div>

      <IncomeVsExpenseChart data={monthlyData} />

      <CategoryBreakdownChart data={categoryData} />
    </div>
  )
}
