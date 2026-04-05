import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main area — pushed right on desktop */}
      <div className="flex flex-col lg:pl-60 min-h-screen transition-all duration-300">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-5 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
