import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SafetyPage } from './pages/SafetyPage'

function App() {
  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="safety" element={<SafetyPage />} />
        </Route>
      </Routes>
    </motion.div>
  )
}

export default App
