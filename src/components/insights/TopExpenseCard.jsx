import { ArrowDownCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function TopExpenseCard({ transaction }) {

  if (!transaction) {
    return (
      <div className="h-full min-h-[160px] p-5 rounded-xl flex flex-col items-center justify-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--muted)] text-sm shadow-sm fade-in">
        No expense data available
      </div>
    )
  }

  return (
    <div className="h-full p-6 rounded-xl flex flex-col justify-between bg-gradient-to-br from-[var(--bg-card)] to-red-500/10 border border-[var(--border)] shadow-sm fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
          <ArrowDownCircle size={20} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-[var(--text)]">Highest Single Expense</h3>
          <p className="text-xs text-[var(--muted)] mt-0.5">{transaction.category}</p>
        </div>
      </div>
      
      <div className="mt-5">
        <div className="text-3xl font-bold text-[var(--text)]">
          {formatCurrency(transaction.amount)}
        </div>
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="font-medium text-[var(--text)] truncate mr-2" title={transaction.description}>
            {transaction.description}
          </span>
          <span className="text-[var(--muted)] text-xs whitespace-nowrap shrink-0">
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>
    </div>
  )
}
