import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useDomains } from '../hooks/useDomains'
import { DomainCard } from './DomainCard'
import { DomainCardSkeleton } from './DomainCardSkeleton'

/**
 * Domain grid with optional search, scroll reveals, and loading skeletons.
 */
export function DomainList({ onBuy }) {
  const { domains, loading, error } = useDomains()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return domains
    return domains.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        (d.tagline && d.tagline.toLowerCase().includes(q)),
    )
  }, [domains, query])

  return (
    <section
      id="domains"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Domains <span className="text-orange-500">in stock</span>
        </h2>
        <p className="mt-3 text-white/60">
          Browse names curated for startups and creators. Search by keyword or
          TLD.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <label htmlFor="domain-search" className="sr-only">
            Search domains
          </label>
          <input
            id="domain-search"
            type="search"
            placeholder="Search e.g. io, brand, dev..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-orange-500/0 transition focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>
      </motion.div>

      {error && (
        <p className="mt-8 text-center text-sm text-red-400">
          Could not load domains ({error}). Start the API server or check your
          connection.
        </p>
      )}

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <DomainCardSkeleton count={6} />
        ) : (
          filtered.map((domain, index) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              index={index}
              onBuy={onBuy}
            />
          ))
        )}
      </div>

      {!loading && filtered.length === 0 && !error && (
        <p className="mt-10 text-center text-sm text-white/50">
          No domains match your search.
        </p>
      )}
    </section>
  )
}
