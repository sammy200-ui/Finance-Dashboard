import { useState, useMemo } from 'react'
import { Plus, Download, ArrowUpDown } from 'lucide-react'
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
    <div className="flex flex-col h-full" style={{ gap: '24px' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ gap: '16px' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Transactions</h2>
          <p className="text-sm" style={{ color: 'var(--muted)', marginTop: '4px' }}>
            {filteredTransactions.length} records found
          </p>
        </div>
        
        {isAdmin && (
          <div className="flex items-center" style={{ gap: '10px' }}>
            <button 
              onClick={() => exportToCSV(filteredTransactions)}
              className="flex items-center text-sm font-medium transition-all duration-200"
              style={{
                gap: '8px',
                padding: '10px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button 
              onClick={handleAddNew}
              className="flex items-center text-sm font-semibold text-white transition-all duration-200"
              style={{
                gap: '8px',
                padding: '10px 20px',
                background: 'var(--accent)',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              }}
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
