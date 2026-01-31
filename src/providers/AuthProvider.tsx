import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { User } from '../lib/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  checkAuth: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const userData = await api.getCurrentUser()
      setUser(userData)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = () => {
    // Redirect to Google OAuth
    window.location.href = api.getGoogleAuthURL()
  }

  const logout = () => {
    // Limpar session do localStorage
    localStorage.removeItem('session_id')
    // Clear user state and redirect to home
    setUser(null)
    window.location.href = '/'
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const refreshUser = async () => {
    await checkAuth()
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      checkAuth,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}