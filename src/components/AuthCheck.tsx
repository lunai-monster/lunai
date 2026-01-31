import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!user) {
      navigate('/')
      return
    }
  }, [user, isLoading, navigate])

  // Loading states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  // Se chegou aqui, está tudo ok
  if (user) {
    return <>{children}</>
  }

  // Ainda carregando ou redirecionando
  return null
}