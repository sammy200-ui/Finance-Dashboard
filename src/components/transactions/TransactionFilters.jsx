import { Search } from 'lucide-react'

function TransactionFilters({ filters = {}, updateFilter }) {
  const categories = ['All', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Salary', 'Freelance', 'Investment']

  const inputStyle = {
    background: 'var(--bg-base)',
    borderColor: 'var(--border)',
    color: 'var(--text)',
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-5 rounded-xl shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="relative flex-1">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--muted)' }} />
        <input 
          type="text"
          placeholder="Search transactions..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full rounded-xl text-sm"
          style={{ ...inputStyle, padding: '10px 16px 10px 40px', border: '1px solid var(--border)' }}
        />
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0">
        <select 
          value={filters.category || 'all'}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="rounded-xl text-sm cursor-pointer"
          style={{ ...inputStyle, padding: '10px 32px 10px 14px', border: '1px solid var(--border)', minWidth: '120px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
        
        <select 
          value={filters.type || 'all'}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="rounded-xl text-sm cursor-pointer"
          style={{ ...inputStyle, padding: '10px 32px 10px 14px', border: '1px solid var(--border)' }}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        
        <select 
          value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-')
            updateFilter('sortBy', sortBy)
            updateFilter('sortOrder', sortOrder)
          }}
          className="rounded-xl text-sm cursor-pointer"
          style={{ ...inputStyle, padding: '10px 32px 10px 14px', border: '1px solid var(--border)' }}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>
    </div>
  )
}

export default TransactionFilters
