import { motion } from 'framer-motion'

/**
 * Full-site “live” background: moving mesh gradient, drifting grid, orbs, particles.
 * Hero adds its own video layer; this stays visible site-wide beneath content.
 */
export function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Animated mesh (CSS — always visible motion) */}
      <div className="bg-mesh-live absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-linear-to-b from-[#030712]/80 via-[#050a14]/90 to-brand-dark" />

      {/* Drifting grid (oversized so motion stays seamless) */}
      <div className="bg-grid-drift absolute -left-1/2 -top-1/2 h-[200%] w-[200%] opacity-[0.45]" />
      <div
        className="absolute inset-0 bg-grid-fade bg-size-[56px_56px] opacity-25"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 40%, black 15%, transparent 72%)',
        }}
      />

      {/* Soft orbs (Framer) */}
      <motion.div
        className="absolute -left-1/3 top-0 h-[80vh] w-[80vh] rounded-full bg-orange-500/20 blur-[140px]"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[70vh] w-[70vh] rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -35, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />

      {/* Particles */}
      {[...Array(32)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/35"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 19) % 100}%`,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0.15, 0.65, 0.15],
          }}
          transition={{
            duration: 5 + (i % 7),
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle scan line */}
      <div className="scan-line pointer-events-none absolute inset-0 opacity-30" />
    </div>
  )
}
