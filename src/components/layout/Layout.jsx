import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main area — offset by sidebar width on desktop */}
      <div className="main-content">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main style={{ flex: 1, padding: '1.25rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
