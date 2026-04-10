import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import RoleToggle from '../ui/RoleToggle'
import ThemeToggle from '../ui/ThemeToggle'

const pageTitles = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
}

function Header({ onMenuOpen }) {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'FinTrack'

  return (
    <header
      className="flex items-center justify-between sticky top-0 z-10"
      style={{
        height: '64px',
        padding: '0 24px',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center" style={{ gap: '16px' }}>
        <button
          onClick={onMenuOpen}
          className="lg:hidden transition-colors"
          style={{ padding: '8px', borderRadius: '8px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center" style={{ gap: '8px' }}>
        <ThemeToggle />
        <RoleToggle />
      </div>
    </header>
  )
}

export default Header
