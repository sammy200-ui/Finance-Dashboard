import { useState, useMemo } from 'react'
import { Plus, Download } from 'lucide-react'
import { exportToCSV } from '../utils/formatters'
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
  
  const filteredTransactions = useMemo(() => {
    let result = [...transactions]
    
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(t => t.description.toLowerCase().includes(q))
    }
    
    if (filters.category !== 'all') {
      result = result.filter(t => t.category.toLowerCase() === filters.category.toLowerCase())
    }
    
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type)
    }
    
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

  const handleEdit = (txn) => {
    setEditingTxn(txn)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingTxn(null)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 h-full bg-[var(--bg-base)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text)]">Transactions</h2>
          <p className="text-sm text-[var(--muted)] mt-1">Manage and track your activity.</p>
        </div>
        
        {isAdmin && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => exportToCSV(filteredTransactions)}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-lg hover:border-[var(--accent)] transition-colors shadow-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
          </div>
        )}
      </div>
      
      <TransactionFilters filters={filters} updateFilter={setFilter} />
      
      <TransactionTable 
        transactions={filteredTransactions} 
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
        onClearFilters={resetFilters}
      />
      
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
