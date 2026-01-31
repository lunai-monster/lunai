import { useAuth } from '../providers/AuthProvider'
import { api } from '../lib/api'
import { Button } from '@heroui/react'
import { Dumbbell, MessageCircle } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const handleRedirect = async (url: string, needsAuth = false) => {
    if (needsAuth) {
      try {
        const { token } = await api.getAuthToken()
        window.location.href = `${url}?auth_token=${token}`
      } catch (error) {
        console.error('Failed to get auth token:', error)
        // Fallback to direct redirect
        window.location.href = url
      }
    } else {
      window.location.href = url
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.nome}!</h1>
            <p className="text-gray-300 mt-2">Choose your destination</p>
          </div>
          <Button
            onPress={logout}
            variant="bordered"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={() => handleRedirect('https://physique.lunai.monster', true)}
            className="cursor-pointer p-6 border border-gray-700 rounded-lg hover:border-white transition-colors"
          >
            <div className="flex items-center mb-4">
              <Dumbbell className="w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold">Physique Panel</h2>
            </div>
            <p className="text-gray-300">
              Access your personalized workouts, nutrition plans, and fitness tracking.
            </p>
          </div>

          <div
            onClick={() => handleRedirect('https://chat.lunai.monster')}
            className="cursor-pointer p-6 border border-gray-700 rounded-lg hover:border-white transition-colors"
          >
            <div className="flex items-center mb-4">
              <MessageCircle className="w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold">AI Chat</h2>
            </div>
            <p className="text-gray-300">
              Chat with our AI assistant for fitness advice, motivation, and support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}