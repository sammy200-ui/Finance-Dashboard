import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'

export default function Transactions() {
  const { 
    transactions, 
    role, 
    filters, 
    setFilter, 
    resetFilters,
    deleteTransaction 
  } = useStore()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTxn, setEditingTxn] = useState(null)
  
  const isAdmin = role === 'admin'
  
  // heavily filtering via useMemo so it only fires when reactive states change
  const filteredTransactions = useMemo(() => {
    let result = [...transactions]
    
    // search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(t => t.description.toLowerCase().includes(q))
    }
    
    // category filter
    if (filters.category !== 'all') {
      result = result.filter(t => t.category.toLowerCase() === filters.category.toLowerCase())
    }
    
    // income/expense toggle
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type)
    }
    
    // sophisticated sort options
    result.sort((a, b) => {
      if (filters.sortBy === 'date') {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB
      } else if (filters.sortBy === 'amount') {
        return filters.sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount
      }
      return 0
    })
    
    return result
  }, [transactions, filters])

  // Callbacks passed to our row component elements inside the table
  const handleEdit = (txn) => {
    setEditingTxn(txn)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingTxn(null)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-base)]">
      {/* Header framing wrapper */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text)]">Transactions</h2>
          <p className="text-sm text-[var(--muted)] mt-1">Manage and track your activity.</p>
        </div>
        
        {/* Only admins are authorized to add new events */}
        {isAdmin && (
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}
      </div>
      
      {/* Filter wrapper injecting Zustand states automatically natively */}
      <TransactionFilters filters={filters} updateFilter={setFilter} />
      
      <TransactionTable 
        transactions={filteredTransactions} 
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
        onClearFilters={resetFilters}
      />
      
      {/* Modal element mounted selectively */}
      {isModalOpen && (
        <AddTransactionModal 
          isOpen={isModalOpen}
          initialData={editingTxn}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTxn(null)
          }}
        />
      )}
    </div>
  )
}
