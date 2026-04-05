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
      className="h-14 flex items-center justify-between px-6 sticky top-0 z-10 bg-[var(--bg-base)] border-b border-[var(--border)]"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden text-[var(--muted)]"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold text-base text-[var(--text)]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <RoleToggle />
      </div>
    </header>
  )
}

export default Header
