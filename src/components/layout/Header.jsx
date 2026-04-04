import { Menu, User } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import RoleToggle from '../ui/RoleToggle'

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

      <div className="flex items-center gap-4">
        <RoleToggle />
        
    
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <User size={16} style={{ color: 'var(--muted)' }} />
        </div>
      </div>
    </header>
  )
}

export default Header
