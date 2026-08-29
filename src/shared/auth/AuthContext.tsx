import { createContext, useContext, useState, type ReactNode } from 'react'
import { getStoredAuth, setStoredAuth } from '../api/client'
import * as authApi from '../api/auth.service'
import type { AuthResponseDto } from '../api/types'

interface AuthContextValue {
  user: AuthResponseDto | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponseDto | null>(getStoredAuth)

  async function login(email: string, password: string) {
    const auth = await authApi.login({ email, password })
    setStoredAuth(auth)
    setUser(auth)
  }

  async function register(email: string, password: string) {
    const auth = await authApi.register({ email, password })
    setStoredAuth(auth)
    setUser(auth)
  }

  function logout() {
    authApi.logout().catch(() => {})
    setStoredAuth(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
