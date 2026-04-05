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
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 bg-[var(--bg-card)] border-r border-[var(--border)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold bg-[var(--accent)]">
              F
            </div>
            <span className="font-semibold text-lg text-[var(--text)]">
              FinTrack
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-[var(--muted)]">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-3 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]'
                }`
              }
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
