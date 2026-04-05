import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#3b82f6', '#14b8a6']

export default function CategoryBreakdownChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)] fade-in shadow-sm">
        No category data available
      </div>
    )
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 8)

  return (
    <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 fade-in shadow-sm">
      <h3 className="text-base font-semibold text-[var(--text)]">Highest Spends by Category</h3>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text)', fontSize: 13, fontWeight: 500 }}
              width={90}
            />
            <Tooltip 
              cursor={{ fill: 'var(--muted)', opacity: 0.05 }}
              contentStyle={{ 
                backgroundColor: 'var(--bg-base)', 
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text)'
              }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
