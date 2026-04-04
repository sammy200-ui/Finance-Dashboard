import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

// custom color palette matching the dark theme vibes
const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308']

export default function SpendingBreakdown({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)]">
        No expenses yet
      </div>
    )
  }

  // filter out zero values if any
  const chartData = data.filter(item => item.value > 0)

  return (
    <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 fade-in shadow-sm">
      <h3 className="text-base font-semibold text-[var(--text)]">Spending Breakdown</h3>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-base)', 
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text)'
              }}
              formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: 'var(--text)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
