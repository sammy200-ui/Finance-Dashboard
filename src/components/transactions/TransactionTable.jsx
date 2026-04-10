import TransactionRow from './TransactionRow'
import EmptyState from '../ui/EmptyState'

function TransactionTable({ transactions, isAdmin, onEdit, onDelete, onClearFilters }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm fade-in">
        <EmptyState onClearFilters={onClearFilters} />
      </div>
    )
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg-hover)' }}>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider w-32">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider w-32">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider w-24">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider text-right w-32">Amount</th>
              {isAdmin && (
                <th className="px-6 py-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider text-right w-24">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {transactions.map(txn => (
              <TransactionRow 
                key={txn.id} 
                txn={txn} 
                isAdmin={isAdmin} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
