import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function SummaryCard({ label, amount, trend }) {
  const isUp = trend === 'up'
  
  return (
    <div className="p-5 rounded-xl flex flex-col gap-2 bg-[var(--bg-card)] border border-[var(--border)] fade-in shadow-sm">
      <div className="text-sm font-medium text-[var(--muted)]">{label}</div>
      <div className="text-2xl font-bold text-[var(--text)]">{amount}</div>
      
      <div className="flex items-center gap-1 mt-1">
        {isUp ? (
          <ArrowUpRight size={16} className="text-[var(--green)]" />
        ) : (
          <ArrowDownRight size={16} className="text-[var(--red)]" />
        )}
        <span className={`text-xs font-medium ${isUp ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}>
          {isUp ? '+4.2%' : '-1.5%'} 
        </span>
      </div>
    </div>
  )
}
