import Badge from '../ui/Badge'
import { Edit2, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'

function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  const isExpense = txn.type === "expense"
  
  return (
    <tr className="group transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
      <td style={{ padding: '14px 24px', fontSize: '13px', color: 'var(--muted)' }}>
        {formatDate(txn.date)}
      </td>
      <td style={{ padding: '14px 24px', fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
        {txn.description}
      </td>
      <td style={{ padding: '14px 24px', fontSize: '13px' }}>
        <Badge variant="category">{txn.category}</Badge>
      </td>
      <td style={{ padding: '14px 24px', fontSize: '13px' }}>
        <Badge variant={txn.type}>{txn.type}</Badge>
      </td>
      <td style={{ padding: '14px 24px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: isExpense ? 'var(--red)' : 'var(--green)' }}>
        {isExpense ? '-' : '+'}{formatCurrency(txn.amount)}
      </td>
      
      {isAdmin && (
        <td style={{ padding: '14px 24px', fontSize: '13px', textAlign: 'right' }}>
          <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity" style={{ gap: '4px' }}>
            <button 
              onClick={() => onEdit(txn)}
              className="transition-colors"
              style={{ padding: '6px', borderRadius: '8px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={() => onDelete(txn.id)}
              className="transition-colors"
              style={{ padding: '6px', borderRadius: '8px', color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer' }}
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
