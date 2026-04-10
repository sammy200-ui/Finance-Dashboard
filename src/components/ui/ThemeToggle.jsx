import { Sun, Moon } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ThemeToggle() {
  const theme = useStore(state => state.theme)
  const setTheme = useStore(state => state.setTheme)

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] border border-[var(--border)] transition-all duration-200"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
