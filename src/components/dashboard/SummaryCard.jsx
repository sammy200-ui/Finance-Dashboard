import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function SummaryCard({ label, amount, trend }) {
  const isUp = trend === 'up'
  
  return (
    <div className="p-6 rounded-xl flex flex-col gap-3 bg-[var(--bg-card)] border border-[var(--border)] fade-in shadow-sm">
      <div className="text-sm font-medium text-[var(--muted)]">{label}</div>
      <div className="text-2xl font-bold text-[var(--text)] tracking-tight">{amount}</div>
      
      <div className="flex items-center gap-1.5">
        <div 
          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold"
          style={{
            background: isUp ? 'var(--green-light)' : 'var(--red-light)',
            color: isUp ? 'var(--green)' : 'var(--red)',
          }}
        >
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {isUp ? '+4.2%' : '-1.5%'}
        </div>
      </div>
    </div>
  )
}
