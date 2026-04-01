import { motion } from 'framer-motion'

function formatUsd(n) {
  const x = Number(n)
  if (!Number.isFinite(x)) return '—'
  return Math.abs(x % 1) < 0.001 ? String(Math.round(x)) : x.toFixed(2)
}

/**
 * Glass domain card with hover scale + glow border.
 * `price` = 50% off (what you pay); `referencePrice` optional — else derived as 2× offer.
 */
export function DomainCard({ domain, index, onBuy }) {
  const { name, price, tagline, referencePrice: refFromData } = domain
  const offer = Number(price)
  const reference =
    refFromData != null && Number.isFinite(Number(refFromData))
      ? Number(refFromData)
      : Math.round(offer * 2 * 100) / 100

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
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              Pricing
            </p>
            <p className="mt-1 text-sm text-white/50">
              <span className="text-white/45">Ref. </span>
              <span
                className="text-white/55 line-through decoration-white/30"
                title="Registrar-style benchmark (before 50% off)"
              >
                ${formatUsd(reference)}
              </span>
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="font-[Poppins] text-2xl font-bold text-orange-400">
                ${formatUsd(offer)}
              </span>
              <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-300/95">
                50% off
              </span>
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
