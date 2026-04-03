export function getTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getByCategory(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense')
  
  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
  
  return Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }))
}

export function getMonthlyTotals(transactions) {
  // sort by date ascending so chart X axis looks chronological
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  const monthMap = {}
  
  sorted.forEach(t => {
    const d = new Date(t.date)
    // gives us "Nov", "Dec", etc.
    const month = d.toLocaleString('en-US', { month: 'short' }) 
    
    if (!monthMap[month]) {
      monthMap[month] = { income: 0, expense: 0 }
    }
    
    if (t.type === 'income') {
      monthMap[month].income += t.amount
    } else {
      monthMap[month].expense += t.amount
    }
  })
  
  return Object.keys(monthMap).map(month => ({
    name: month,
    balance: monthMap[month].income - monthMap[month].expense
  }))
}

export function getBiggestExpense(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense')
  if (expenses.length === 0) return null
  
  return expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0])
}

export function getTopCategory(transactions) {
  const byCat = getByCategory(transactions)
  if (byCat.length === 0) return { name: 'None', value: 0 }
  
  return byCat.reduce((max, c) => (c.value > max.value ? c : max), byCat[0])
}
