import { FileSearch } from 'lucide-react'

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--bg-base)] flex items-center justify-center mb-4">
        <FileSearch size={32} className="text-[var(--muted)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text)] mb-1">No transactions found</h3>
      <p className="text-sm text-[var(--muted)] mb-6 max-w-sm">
        We couldn't find any transactions matching your current filters. Try adjusting your search criteria.
      </p>
      
      {onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="px-4 py-2 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-lg hover:border-[var(--accent)] transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
