import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function BalanceTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)]">
        No data available
      </div>
    )
  }

  return (
    <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 fade-in shadow-sm">
      <h3 className="text-base font-semibold text-[var(--text)]">Balance Trend</h3>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-base)', 
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
              itemStyle={{ color: 'var(--accent)' }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--accent)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
