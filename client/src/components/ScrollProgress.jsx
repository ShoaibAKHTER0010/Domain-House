import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Top-of-viewport scroll progress bar.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const height = doc.scrollHeight - doc.clientHeight
      setProgress(height > 0 ? scrollTop / height : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-100 h-0.5 bg-white/5"
      aria-hidden
    >
      <motion.div
        className="h-full bg-linear-to-r from-orange-500 to-amber-400 shadow-glow"
        initial={false}
        animate={{ width: `${progress * 100}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 28 }}
      />
    </div>
  )
}
