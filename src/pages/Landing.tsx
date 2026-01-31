import { useAuth } from '../providers/AuthProvider'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'

export default function Landing() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Welcome to Lunai</h1>
        <p className="text-lg mb-8 text-gray-300">
          Your AI-powered platform for fitness and wellness. Get personalized workouts, nutrition plans, and connect with our chat assistant.
        </p>
        <Button
          onPress={login}
          className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg"
          size="lg"
        >
          🚀 Continue with Google
        </Button>
      </div>
    </div>
  )
}