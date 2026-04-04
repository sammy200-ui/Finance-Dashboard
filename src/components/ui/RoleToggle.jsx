import { useStore } from '../../store/useStore'

export default function RoleToggle() {
  const role = useStore(state => state.role)
  const setRole = useStore(state => state.setRole)

  return (
    <div className="flex items-center">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="text-xs px-2.5 py-1.5 rounded-full font-medium cursor-pointer focus:outline-none transition-colors border border-[var(--border)] bg-[var(--bg-card)]"
        style={{
          color: role === 'admin' ? 'var(--accent)' : 'var(--muted)',
        }}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}
