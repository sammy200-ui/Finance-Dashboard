import { useStore } from '../../store/useStore'

export default function RoleToggle() {
  const role = useStore(state => state.role)
  const setRole = useStore(state => state.setRole)

  return (
    <div className="flex items-center">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="text-xs px-2.5 py-1.5 rounded-full font-medium cursor-pointer focus:outline-none transition-colors"
        style={{
          background: 'var(--bg-card)',
          color: role === 'admin' ? 'var(--accent)' : 'var(--muted)',
          border: '1px solid var(--border)'
        }}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}
