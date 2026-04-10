import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function SummaryCard({ label, amount, trend, icon: Icon, accentColor }) {
  const isUp = trend === 'up'
  const color = accentColor || (isUp ? 'var(--green)' : 'var(--red)')
  
  return (
    <div 
      className="rounded-xl flex flex-col fade-in transition-all duration-200"
      style={{
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
        <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
        {Icon && (
          <div 
            className="flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: `${color}15`,
              color: color,
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text)', marginBottom: '12px' }}>{amount}</div>
      
      <div className="flex items-center" style={{ gap: '6px' }}>
        <div 
          className="flex items-center text-xs font-semibold"
          style={{
            gap: '3px',
            padding: '4px 10px',
            borderRadius: '8px',
            background: isUp ? 'var(--green-light)' : 'var(--red-light)',
            color: isUp ? 'var(--green)' : 'var(--red)',
          }}
        >
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {isUp ? '+4.2%' : '-1.5%'}
        </div>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>vs last month</span>
      </div>
    </div>
  )
}
