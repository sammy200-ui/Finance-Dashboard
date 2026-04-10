export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: {
      background: 'var(--bg-hover)',
      color: 'var(--muted)',
      borderColor: 'var(--border)',
    },
    income: {
      background: 'var(--green-light)',
      color: 'var(--green)',
      borderColor: 'transparent',
    },
    expense: {
      background: 'var(--red-light)',
      color: 'var(--red)',
      borderColor: 'transparent',
    },
    category: {
      background: 'var(--accent-light)',
      color: 'var(--accent)',
      borderColor: 'transparent',
    },
  }

  const styles = variants[variant] || variants.default

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
      style={styles}
    >
      {children}
    </span>
  )
}
