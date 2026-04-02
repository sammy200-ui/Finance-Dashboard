import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

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
      className="h-14 flex items-center justify-between px-5 sticky top-0 z-10"
      style={{
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* hamburger — mobile */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden"
          style={{ color: 'var(--muted)' }}
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold text-base" style={{ color: 'var(--text)' }}>
          {title}
        </h1>
      </div>

      {/* right side — role switcher comes in Phase 3, placeholder for now */}
      <div className="flex items-center gap-3">
        <div
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: 'var(--bg-card)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          Viewer
        </div>
        {/* TODO: wire role dropdown here in phase 3 */}
      </div>
    </header>
  )
}

export default Header
