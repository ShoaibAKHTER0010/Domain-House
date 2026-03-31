import { useState } from 'react'
import { motion } from 'framer-motion'

/** Abstract tech / “AI infrastructure” loop — Mixkit free license; swap URL anytime. */
const HERO_VIDEO_SRC =
  'https://assets.mixkit.co/videos/preview/mixkit-connected-dots-technology-abstract-background-27402-large.mp4'

const trust = ['Secure checkout', 'Fast transfer help', 'Human support']

/**
 * Hostinger-style hero: full-bleed looping video + strong overlay + trust row.
 */
export function Hero() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] overflow-hidden pt-28 sm:min-h-[90vh] sm:pt-32"
    >
      {/* Video background — “live” tech / hosting feel */}
      <div className="absolute inset-0 z-0">
        {videoOk && (
          <video
            className="video-bg absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
        {/* Fallback + readability layers */}
        <div
          className={`absolute inset-0 bg-linear-to-br from-[#030712] via-[#071525]/95 to-[#050a14] ${videoOk ? 'opacity-55' : 'opacity-95'}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-transparent to-[#030712]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,122,0,0.22),transparent_55%)]" />
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Domains · Hosting-ready brands
          </motion.p>

          <h1 className="font-[Poppins] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The smart way to grab a{' '}
            <span className="bg-linear-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              premium domain
            </span>{' '}
            without overpaying
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Everything you expect from a modern seller — clear pricing, secure
            contact options, and a polished experience inspired by leading hosts.
            Find your name, check out fast, and launch with confidence.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#domains"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:shadow-glow-lg"
            >
              Browse domains
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Contact
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-white/55 sm:gap-10 sm:text-sm"
          >
            {trust.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
