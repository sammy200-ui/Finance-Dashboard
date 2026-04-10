import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: '256px',
          background: 'var(--bg-card)',
          borderRight: '1px solid var(--border)',
        }}
      >
        <div 
          className="flex items-center justify-between"
          style={{ padding: '0 24px', height: '64px', borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            <div 
              className="flex items-center justify-center text-white text-sm font-bold"
              style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent)' }}
            >
              F
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text)' }}>
              FinTrack
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden transition-colors"
            style={{ padding: '6px', borderRadius: '8px', color: 'var(--muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col" style={{ padding: '20px 16px', gap: '6px' }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className="flex items-center text-sm font-medium transition-all duration-150"
              style={({ isActive }) => ({
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--muted)',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
