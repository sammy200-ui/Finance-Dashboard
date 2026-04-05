import { Sun, Moon } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ThemeToggle() {
  const theme = useStore(state => state.theme)
  const setTheme = useStore(state => state.setTheme)

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border)] transition-colors shadow-sm"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
