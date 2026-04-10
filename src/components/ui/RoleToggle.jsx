import { useStore } from '../../store/useStore'
import { Shield, Eye } from 'lucide-react'

export default function RoleToggle() {
  const role = useStore(state => state.role)
  const setRole = useStore(state => state.setRole)

  const isAdmin = role === 'admin'

  return (
    <button
      onClick={() => setRole(isAdmin ? 'viewer' : 'admin')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 border"
      style={{
        background: isAdmin ? 'var(--accent-light)' : 'var(--bg-hover)',
        color: isAdmin ? 'var(--accent)' : 'var(--muted)',
        borderColor: isAdmin ? 'var(--accent)' : 'var(--border)',
      }}
    >
      {isAdmin ? <Shield size={14} /> : <Eye size={14} />}
      {isAdmin ? 'Admin' : 'Viewer'}
    </button>
  )
}
