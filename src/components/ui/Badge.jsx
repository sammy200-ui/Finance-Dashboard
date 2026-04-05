export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-[var(--bg-base)] text-[var(--muted)] border-[var(--border)]',
    income: 'bg-green-500/10 text-green-500 border-green-500/20',
    expense: 'bg-red-500/10 text-red-500 border-red-500/20',
    category: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30',
  }

  const className = variants[variant] || variants.default

  return (
    <span className={`px-2.5 py-1 rounded text-xs font-medium border capitalize ${className}`}>
      {children}
    </span>
  )
}
