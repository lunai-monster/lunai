import { Routes, Route } from 'react-router-dom'
import { AuthCheck } from './components/AuthCheck'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <AuthCheck>
            <Dashboard />
          </AuthCheck>
        } />
      </Routes>
    </div>
  )
}

export default App
