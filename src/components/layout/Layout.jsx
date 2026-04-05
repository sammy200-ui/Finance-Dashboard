import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useStore } from '../../store/useStore'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const theme = useStore(state => state.theme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main style={{ flex: 1, padding: '1.5rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
