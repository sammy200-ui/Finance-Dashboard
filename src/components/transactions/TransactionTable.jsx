import TransactionRow from './TransactionRow'
import EmptyState from '../ui/EmptyState'

function TransactionTable({ transactions, isAdmin, onEdit, onDelete, onClearFilters }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div 
        className="overflow-hidden fade-in"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <EmptyState onClearFilters={onClearFilters} />
      </div>
    )
  }

  return (
    <div 
      className="overflow-hidden fade-in"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-hover)' }}>
              <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', width: '130px' }}>Date</th>
              <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Description</th>
              <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', width: '130px' }}>Category</th>
              <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', width: '100px' }}>Type</th>
              <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right', width: '130px' }}>Amount</th>
              {isAdmin && (
                <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right', width: '100px' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
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
