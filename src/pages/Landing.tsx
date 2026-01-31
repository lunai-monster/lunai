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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black relative overflow-hidden">
      {/* Animated background with bezier curves */}
      <div className="absolute inset-0">
        <motion.svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.path
            d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.path
            d="M0,500 Q400,300 800,500 T1200,500 L1200,800 L0,800 Z"
            fill="gray"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.svg>
      </div>

      <motion.div 
        className="text-center max-w-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          🌙 Lunai
        </motion.h1>
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
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              size="lg"
              startContent={<Dumbbell className="w-5 h-5" />}
            >
              Physique
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onPress={() => handleButtonClick('chat')}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              size="lg"
              startContent={<MessageCircle className="w-5 h-5" />}
            >
              Chat
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}