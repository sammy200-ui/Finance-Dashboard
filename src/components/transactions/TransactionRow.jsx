import Badge from '../ui/Badge'
import { Edit2, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  const isExpense = txn.type === "expense"
  
  return (
    <tr className="border-b border-[var(--border)] hover:bg-white/5 transition-colors group">
      <td className="px-4 py-3 text-sm text-[var(--muted)]">
        {formatDate(txn.date)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-[var(--text)]">
        {txn.description}
      </td>
      <td className="px-4 py-3 text-sm">
        <Badge variant="category">{txn.category}</Badge>
      </td>
      <td className="px-4 py-3 text-sm">
        <Badge variant={txn.type}>{txn.type}</Badge>
      </td>
      <td className={`px-4 py-3 text-sm font-medium text-right ${isExpense ? 'text-[var(--red)]' : 'text-[var(--green)]'}`}>
        {isExpense ? '-' : '+'}{formatCurrency(txn.amount)}
      </td>
      
     
      {isAdmin && (
        <td className="px-4 py-3 text-sm text-right w-24">
          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(txn)}
              className="p-1 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded transition-colors"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(txn.id)}
              className="p-1 hover:bg-[var(--red)]/20 text-[var(--red)] rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}

export default TransactionRow
