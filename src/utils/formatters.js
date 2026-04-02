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
