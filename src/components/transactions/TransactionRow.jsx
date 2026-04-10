import Badge from '../ui/Badge'
import { Edit2, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  const isExpense = txn.type === "expense"
  
  return (
    <tr className="hover:bg-[var(--bg-hover)] transition-colors group">
      <td className="px-6 py-4 text-sm text-[var(--muted)]">
        {formatDate(txn.date)}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-[var(--text)]">
        {txn.description}
      </td>
      <td className="px-6 py-4 text-sm">
        <Badge variant="category">{txn.category}</Badge>
      </td>
      <td className="px-6 py-4 text-sm">
        <Badge variant={txn.type}>{txn.type}</Badge>
      </td>
      <td className={`px-6 py-4 text-sm font-semibold text-right`} style={{ color: isExpense ? 'var(--red)' : 'var(--green)' }}>
        {isExpense ? '-' : '+'}{formatCurrency(txn.amount)}
      </td>
      
      {isAdmin && (
        <td className="px-6 py-4 text-sm text-right w-24">
          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(txn)}
              className="p-2 rounded-lg hover:bg-[var(--accent-light)] text-[var(--accent)] transition-colors"
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={() => onDelete(txn.id)}
              className="p-2 rounded-lg hover:bg-[var(--red-light)] text-[var(--red)] transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}

export default TransactionRow
