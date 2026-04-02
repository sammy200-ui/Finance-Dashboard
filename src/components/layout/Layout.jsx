import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main area — pushed right on desktop */}
      <div className="flex-1 flex flex-col lg:ml-60">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-5 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
