import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

export default function IncomeVsExpenseChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm text-[var(--muted)] fade-in shadow-sm">
        No trend data available
      </div>
    )
  }

  return (
    <div className="h-80 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 fade-in shadow-sm">
      <h3 className="text-base font-semibold text-[var(--text)]">Income vs Expense Trends</h3>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--red)" stopOpacity={0}/>
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
                color: 'var(--text)'
              }}
              itemStyle={{ textTransform: 'capitalize' }}
              formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: 'var(--text)', right: 0, paddingTop: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              name="Income"
              stroke="var(--green)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              name="Expense"
              stroke="var(--red)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
