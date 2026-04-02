import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border)' }}
      >
        {/* logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'var(--accent)' }}
            >
              F
            </div>
            <span className="font-semibold text-base" style={{ color: 'var(--text)' }}>
              FinTrack
            </span>
          </div>
          {/* close btn — mobile only */}
          <button onClick={onClose} className="lg:hidden" style={{ color: 'var(--muted)' }}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 mt-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--accent)' : undefined,
                color: isActive ? '#fff' : 'var(--muted)',
              })}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 text-xs" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          v1.0 · FinTrack
        </div>
      </aside>
    </>
  )
}

export default Sidebar
