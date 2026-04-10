import { ArrowDownCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function TopExpenseCard({ transaction }) {
  if (!transaction) {
    return (
      <div 
        className="flex flex-col items-center justify-center text-sm fade-in"
        style={{
          minHeight: '160px',
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--muted)',
        }}
      >
        No expense data available
      </div>
    )
  }

  return (
    <div 
      className="flex flex-col justify-between fade-in"
      style={{
        height: '100%',
        padding: '24px',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
        <div 
          className="flex items-center justify-center shrink-0"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--red-light)',
            color: 'var(--red)',
          }}
        >
          <ArrowDownCircle size={20} />
        </div>
        <div>
          <h3 className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Highest Expense</h3>
        </div>
      </div>
      
      <div>
        <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
          {formatCurrency(transaction.amount)}
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: '8px' }}>
          <span className="text-sm font-medium truncate" style={{ color: 'var(--text)', marginRight: '8px' }} title={transaction.description}>
            {transaction.description}
          </span>
          <span className="text-xs whitespace-nowrap shrink-0" style={{ color: 'var(--muted)' }}>
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>
    </div>
  )
}
