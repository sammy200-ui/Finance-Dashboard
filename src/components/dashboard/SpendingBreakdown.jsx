import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308']

export default function SpendingBreakdown({ data }) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm"
        style={{
          height: '380px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          color: 'var(--muted)',
        }}
      >
        No expenses yet
      </div>
    )
  }

  const chartData = data.filter(item => item.value > 0)
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div 
      className="flex flex-col fade-in"
      style={{
        height: '380px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Spending Breakdown</h3>
        <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '2px' }}>Expenses by category</p>
      </div>
      
      <div className="flex-1 min-h-0" style={{ marginBottom: '12px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
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
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                color: 'var(--text)',
                padding: '10px 14px',
              }}
              formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap" style={{ gap: '6px 12px' }}>
        {chartData.map((item, i) => (
          <div key={item.name} className="flex items-center" style={{ gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
