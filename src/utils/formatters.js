import { format } from 'date-fns'

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatDate(dateString) {
  if (!dateString) return ''
  return format(new Date(dateString), 'dd MMM yyyy')
}

export function exportToCSV(transactions) {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount']
  
  const rows = transactions.map(t => {
    const safeDesc = `"${t.description.replace(/"/g, '""')}"`
    return [t.id, t.date, safeDesc, t.category, t.type, t.amount].join(',')
  })
  
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `fintrack_export_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
