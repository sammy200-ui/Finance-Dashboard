import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function BalanceTrendChart({ data }) {
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
        No data available
      </div>
    )
  }

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
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Balance Trend</h3>
          <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '2px' }}>Monthly balance over time</p>
        </div>
        <div 
          className="text-xs font-medium"
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'var(--bg-hover)',
            color: 'var(--muted)',
          }}
        >
          Last 4 months
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
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
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                color: 'var(--text)',
                padding: '12px 16px',
              }}
              itemStyle={{ color: 'var(--accent)' }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--accent)" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
