import { NavLink, Link } from 'react-router-dom'
import { Search, Bell, Sun, Moon, LogOut } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'
import { useAuth } from '../auth/AuthContext'
import Avatar from './Avatar'

function initialsFromEmail(email: string) {
  return email.slice(0, 2).toUpperCase()
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Lessons Learned', to: '/lessons' },
  { label: 'Processes', to: '/processes' },
  { label: 'Projects and Libraries', to: '/projects' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <span className="text-lg font-bold tracking-tight text-text-primary">Advansys</span>
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-text-primary after:absolute after:-bottom-[1px] after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent'
                      : 'text-text-muted hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-text-muted transition-colors hover:text-text-primary cursor-pointer"
          >
            <Search size={19} />
          </button>
          <button
            aria-label="Notifications"
            className="relative text-text-muted transition-colors hover:text-text-primary cursor-pointer"
          >
            <Bell size={19} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-bg-page" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="text-text-muted transition-colors hover:text-text-primary cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <Avatar initials={initialsFromEmail(user.email)} color="blue" size="sm" />
              <button
                aria-label="Log out"
                title={`Log out (${user.email})`}
                onClick={logout}
                className="text-text-muted transition-colors hover:text-text-primary cursor-pointer"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
