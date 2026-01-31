import { useAuth } from '../providers/AuthProvider'
import { api } from '../lib/api'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { Dumbbell, MessageCircle } from 'lucide-react'

export default function Landing() {
  const { login, isAuthenticated } = useAuth()

  const handleButtonClick = async (target: 'physique' | 'chat') => {
    const url = target === 'physique' 
      ? 'https://physique.lunai.monster' 
      : 'https://chat.lunai.monster'

    if (isAuthenticated) {
      try {
        const { token } = await api.getAuthToken()
        window.location.href = `${url}?auth_token=${token}`
      } catch (error) {
        console.error('Failed to get auth token:', error)
        window.location.href = url
      }
    } else {
      localStorage.setItem('intended_redirect', target)
      login()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black">
      <motion.div 
        className="text-center max-w-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src="/logo.svg" alt="Lunai" className="w-48 h-48" />
        </motion.div>
        <motion.p 
          className="text-lg mb-12 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your AI-powered platform for fitness and wellness. Get personalized workouts, nutrition plans, and connect with our chat assistant.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onPress={() => handleButtonClick('physique')}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex flex-row items-center gap-2"
              size="lg"
            >
              <Dumbbell className="w-5 h-5" />
              Physique
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onPress={() => handleButtonClick('chat')}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex flex-row items-center gap-2"
              size="lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}