import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function AddTransactionModal({ isOpen, onClose, initialData }) {
  const addTransaction = useStore(state => state.addTransaction)
  const editTransaction = useStore(state => state.editTransaction)
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Food',
    type: 'expense',
    amount: ''
  })
  
  const [error, setError] = useState('')

  // If there's initial data, we're in edit mode. Pre-fill the form!
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        amount: initialData.amount.toString() 
      })
    }
  }, [initialData])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const parsedAmount = parseFloat(formData.amount)
    
    // Quick and practical basic validation
    if (!formData.description || !formData.date || isNaN(parsedAmount)) {
      setError('Please properly fill out all fields.')
      return
    }
    
    if (parsedAmount <= 0) {
      setError('Amount must be strictly greater than 0.')
      return
    }

    const payload = {
      ...formData,
      amount: parsedAmount
    }

    if (initialData) {
      editTransaction(initialData.id, payload)
    } else {
      // practical random string logic for new ids
      addTransaction({ ...payload, id: `txn_${Date.now()}_${Math.floor(Math.random()*1000)}` })
    }
    
    onClose()
  }

  // hardcoded list as given, no need to over-engineer 
  const categories = ['Salary', 'Freelance', 'Investment', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare']

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl w-full max-w-md shadow-xl fade-in" style={{ animationDuration: '0.2s' }}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)] relative">
          <h3 className="text-lg font-medium text-[var(--text)]">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1" title="Close">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {error && (
            <div className="text-xs font-medium text-red-500 bg-red-500/10 px-3 py-2.5 rounded border border-red-500/20">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--muted)]">Type</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--muted)]">Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. Swiggy order"
              className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-[var(--muted)]">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm">₹</span>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-7 pr-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-[var(--muted)]">Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 mb-2">
            <label className="text-sm font-medium text-[var(--muted)]">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--bg-base)] border border-[var(--border)] rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/90 transition-colors shadow-sm"
            >
              {initialData ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
