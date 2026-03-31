import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Encryption & data in transit',
    body: 'Connections to DomainHouse use modern TLS. We do not store full payment card numbers on our servers — payments are handled by PCI-DSS–aware providers.',
  },
  {
    title: 'Account & access',
    body: 'Use a strong, unique password for your email and registrar accounts. Enable two-factor authentication wherever your domain is managed after purchase.',
  },
  {
    title: 'Fraud prevention',
    body: 'We monitor unusual purchase patterns and may request additional verification before completing high-risk transactions to protect buyers and our inventory.',
  },
  {
    title: 'Availability & backups',
    body: 'Domain listings and contact workflows are hosted on redundant infrastructure. We maintain backups and recovery procedures appropriate for our service tier.',
  },
]

/**
 * Trust & security page — typical hosting-style disclosures (not legal advice).
 */
export function SafetyPage() {
  return (
    <main className="pb-16 pt-28 sm:pt-32">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Trust center
          </p>
          <h1 className="mt-3 font-[Poppins] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Safety, security & your data
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            We built DomainHouse to feel as dependable as a major registrar —
            clear policies, secure checkout paths, and honest communication.
            This page summarizes how we think about security; it does not replace
            legal advice or your registrar’s terms.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/4 p-6 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <h2 className="font-[Poppins] text-lg font-semibold text-white">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-2xl border border-orange-500/25 bg-linear-to-br from-orange-500/10 via-transparent to-cyan-500/5 p-8 backdrop-blur-md"
        >
          <h2 className="font-[Poppins] text-xl font-semibold text-white">
            Reporting a security issue
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            If you believe you have found a vulnerability, please email us with
            details and steps to reproduce. We appreciate responsible disclosure
            and will respond as quickly as we can.
          </p>
        </motion.section>

        <p className="mt-10 text-center text-xs text-white/40">
          Last updated: {new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </section>
    </main>
  )
}
