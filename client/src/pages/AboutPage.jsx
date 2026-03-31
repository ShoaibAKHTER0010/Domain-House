import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const partners = [
  { name: 'Hostinger', role: 'Registrar & hosting' },
  { name: 'GoDaddy', role: 'Domain marketplace' },
  { name: 'Vercel', role: 'Infrastructure & edge' },
  { name: 'Wix', role: 'Domains & presence' },
  { name: 'Other leading providers', role: 'Additional inventory & TLDs' },
]

/**
 * About us — story, partner sourcing, and value proposition.
 */
export function AboutPage() {
  return (
    <main className="pb-20 pt-28 sm:pt-32">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            About us
          </p>
          <h1 className="mt-3 font-[Poppins] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Premium domains, priced for real people
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
            DomainHouse exists to make standout names affordable. We maintain
            commercial relationships with trusted industry leaders so we can
            source inventory reliably and pass the savings on to you.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-md sm:p-10"
        >
          <h2 className="font-[Poppins] text-xl font-semibold text-white sm:text-2xl">
            Who we are
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            We are a focused domain retailer built for founders, creators, and
            small teams who want a premium brand name without premium sticker
            shock. Our team negotiates access to inventory and infrastructure
            through formal agreements with major registrars and platforms, so
            we can offer names you actually want — with clear pricing and fast
            human support when you are ready to buy.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-14"
        >
          <h2 className="text-center font-[Poppins] text-xl font-bold text-white sm:text-2xl">
            Who we work with
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55">
            We maintain contracts and supply agreements with leading registrars
            and platforms — including{' '}
            <strong className="font-medium text-white/75">Hostinger</strong>,{' '}
            <strong className="font-medium text-white/75">GoDaddy</strong>,{' '}
            <strong className="font-medium text-white/75">Vercel</strong>,{' '}
            <strong className="font-medium text-white/75">Wix</strong>, and
            other partners — to acquire domains and power our storefront.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-linear-to-br from-white/8 to-transparent px-5 py-4 text-center backdrop-blur-sm"
              >
                <p className="font-[Poppins] text-lg font-semibold text-white">
                  {p.name}
                </p>
                <p className="mt-1 text-xs text-white/45">{p.role}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-orange-500/25 bg-linear-to-br from-orange-500/10 via-transparent to-cyan-500/5 p-8 backdrop-blur-md sm:p-10"
        >
          <h2 className="font-[Poppins] text-xl font-semibold text-white sm:text-2xl">
            How we price our domains
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            We purchase and source domains through our partner network — the same
            ecosystem used by millions of businesses worldwide. Because we buy
            strategically and keep our operations lean, we are able to list many
            names at roughly{' '}
            <strong className="text-orange-300">50% off</strong> compared to
            typical retail or renewal-style reference pricing — so our clients
            get a fair deal on every transfer.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Exact savings vary by name, TLD, and partner terms. Final price is
            always confirmed at checkout or when you contact us.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/#domains"
              className="inline-flex rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Browse domains
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/#contact"
              className="inline-flex rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
