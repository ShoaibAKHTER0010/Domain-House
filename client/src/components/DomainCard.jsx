import { motion } from 'framer-motion'

/**
 * Glass domain card with hover scale + glow border.
 */
export function DomainCard({ domain, index, onBuy }) {
  const { name, price, tagline } = domain

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      className="group relative rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition-shadow duration-300 hover:border-orange-500/50 hover:shadow-glow"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <h3 className="font-[Poppins] text-xl font-semibold tracking-tight text-white sm:text-2xl">
          <span className="bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
            {name}
          </span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{tagline}</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              One-time
            </p>
            <p className="font-[Poppins] text-2xl font-bold text-orange-400">
              ${price}
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBuy(domain)}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#050a14] shadow-lg transition hover:bg-orange-50"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
