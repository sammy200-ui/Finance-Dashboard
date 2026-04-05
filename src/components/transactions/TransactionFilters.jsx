import { Search } from 'lucide-react'

// Passing filters object and update function as props for now
function TransactionFilters({ filters = {}, updateFilter }) {
  
  // static list fits well for the mock dataset
  const categories = ['All', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Salary', 'Freelance', 'Investment']

  return (
    <div className="flex flex-col md:flex-row gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] mb-5 shadow-sm">
      
  
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input 
          type="text"
          placeholder="Search transactions..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
      
  
      <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0">
        <select 
          value={filters.category || 'all'}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer min-w-32"
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
        
        <select 
          value={filters.type || 'all'}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
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
          className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
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
