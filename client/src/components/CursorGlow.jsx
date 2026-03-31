import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Soft spotlight following the cursor (desktop / fine pointer only).
 */
export function CursorGlow() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  )
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 26, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 26, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return undefined

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[min(420px,45vw)] w-[min(420px,45vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl mix-blend-screen"
      style={{
        left: sx,
        top: sy,
        background:
          'radial-gradient(circle, rgba(255,122,0,0.4) 0%, transparent 65%)',
      }}
      aria-hidden
    />
  )
}
