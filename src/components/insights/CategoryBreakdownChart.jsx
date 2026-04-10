import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#3b82f6', '#14b8a6']

export default function CategoryBreakdownChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm fade-in"
        style={{
          height: '380px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          color: 'var(--muted)',
        }}
      >
        No category data available
      </div>
    )
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 8)

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
      <div style={{ marginBottom: '20px' }}>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Spending by Category</h3>
        <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '2px' }}>Ranked by total amount spent</p>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.4} />
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
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                color: 'var(--text)',
                padding: '10px 14px',
              }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={24}>
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
