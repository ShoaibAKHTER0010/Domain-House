import { motion } from 'framer-motion'

/**
 * Shows RDAP-based availability + 50% off reference pricing when the search looks like a domain.
 */
export function DomainSearchInsight({ result, loading, error, onBuy }) {
  if (loading) {
    return (
      <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm text-white/50 backdrop-blur-sm">
        Checking domain availability (API Ninjas when configured, else public registry)…
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100/90">
        {error}
      </div>
    )
  }

  if (!result) {
    return null
  }

  if (result.available === false) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-center backdrop-blur-md"
      >
        <p className="text-sm font-medium text-white/90">{result.domain}</p>
        <p className="mt-1 text-sm text-white/55">
          This name appears <span className="text-white/80">already registered</span>
          {result.registrar ? (
            <>
              {' '}
              <span className="text-white/65">(registrar: {result.registrar})</span>
            </>
          ) : null}
          . Try another name or TLD.
        </p>
      </motion.div>
    )
  }

  if (result.available === true) {
    const domainObj = {
      id: `search-${result.domain}`,
      name: result.domain,
      price: result.offerPriceUsd,
      referencePrice: result.referencePriceUsd,
      tagline: `Appears free in registry (so it’s sellable like on Hostinger/Wix) · 50% off our registrar-style ref. $${result.referencePriceUsd}`,
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-6 max-w-xl overflow-hidden rounded-2xl border border-orange-500/40 bg-linear-to-br from-orange-500/15 to-transparent p-5 shadow-glow backdrop-blur-md"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-orange-300">
          {result.source === 'api_ninjas'
            ? 'API Ninjas: available · 50% off Hostinger/Wix-style ref.'
            : 'Registry: available · 50% off Hostinger/Wix-style ref.'}
        </p>
        <p className="mt-2 text-center font-[Poppins] text-xl font-bold text-white">
          {result.domain}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-white/50 line-through" title="Benchmark similar to typical Hostinger/Wix promo tiers">
            Ref. ${result.referencePriceUsd}
          </span>
          <span className="rounded-lg bg-orange-500/20 px-3 py-1 text-lg font-bold text-orange-300">
            ${result.offerPriceUsd}
          </span>
          <span className="text-white/60">({result.discountPercent}% off ref.)</span>
        </div>
        <p className="mt-3 text-center text-xs leading-relaxed text-white/45">
          {result.comparisonNote}
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBuy(domainObj)}
          className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-[#050a14] transition hover:bg-orange-50"
        >
          Buy at offer price
        </motion.button>
      </motion.div>
    )
  }

  return null
}
