import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../store/useStore'

const inputStyle = {
  padding: '10px 12px',
  background: 'var(--bg-base)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  fontSize: '14px',
  color: 'var(--text)',
  outline: 'none',
  width: '100%',
}

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
      addTransaction({ ...payload, id: `txn_${Date.now()}_${Math.floor(Math.random()*1000)}` })
    }
    
    onClose()
  }

  const categories = ['Salary', 'Freelance', 'Investment', 'Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare']

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', padding: '16px' }}
    >
      <div 
        className="w-full fade-in"
        style={{
          maxWidth: '440px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          animationDuration: '0.2s',
        }}
      >
        <div 
          className="flex items-center justify-between"
          style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button 
            onClick={onClose} 
            className="transition-colors"
            style={{ color: 'var(--muted)', padding: '4px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px' }}
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col" style={{ padding: '24px', gap: '16px' }}>
          {error && (
            <div 
              className="text-xs font-medium"
              style={{
                color: 'var(--red)',
                background: 'var(--red-light)',
                padding: '10px 14px',
                borderRadius: '10px',
              }}
            >
              {error}
            </div>
          )}
          
          <div className="flex flex-col" style={{ gap: '6px' }}>
            <label className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Type</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div className="flex flex-col" style={{ gap: '6px' }}>
            <label className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. Swiggy order"
              style={inputStyle}
            />
          </div>
          
          <div className="flex" style={{ gap: '16px' }}>
            <div className="flex flex-col flex-1" style={{ gap: '6px' }}>
              <label className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Amount</label>
              <div className="relative">
                <span className="absolute text-sm" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>₹</span>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  style={{ ...inputStyle, paddingLeft: '28px' }}
                />
              </div>
            </div>
            
            <div className="flex flex-col flex-1" style={{ gap: '6px' }}>
              <label className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                style={{ ...inputStyle, cursor: 'pointer' }}
              />
            </div>
          </div>
          
          <div className="flex flex-col" style={{ gap: '6px', marginBottom: '4px' }}>
            <label className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div 
            className="flex justify-end"
            style={{ gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}
          >
            <button 
              type="button" 
              onClick={onClose}
              className="text-sm font-medium transition-colors"
              style={{
                padding: '10px 18px',
                color: 'var(--text)',
                background: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="text-sm font-semibold text-white transition-colors"
              style={{
                padding: '10px 20px',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
              }}
            >
              {initialData ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
