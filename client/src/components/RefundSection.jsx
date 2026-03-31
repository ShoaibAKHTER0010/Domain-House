import { motion } from 'framer-motion'

/**
 * Hostinger-style trust block: refund eligibility + apply CTA.
 */
export function RefundSection({ onApply }) {
  return (
    <section
      id="refund"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/8 to-white/2 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 md:p-12"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Buyer protection
            </p>
            <h2 className="mt-2 font-[Poppins] text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Refund requests for qualifying purchases
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Like leading hosts, we publish clear rules: if your purchase meets
              our eligibility window and the domain has not been transferred out,
              you can apply for a refund. We review each request fairly and
              respond by email within a few business days.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                Request within the stated period from the invoice date.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                Domain must not be moved to another registrar yet.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                Abuse, fraud, or marketplace policy violations void eligibility.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6 sm:p-8">
            <p className="text-sm font-medium text-white/90">
              Ready to submit a refund application?
            </p>
            <p className="mt-2 text-sm text-white/55">
              You’ll confirm your details and we’ll open a ticket via email — the
              same flow many hosting brands use for buyer confidence.
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onApply}
              className="mt-6 w-full rounded-xl bg-linear-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:shadow-glow-lg"
            >
              Apply for refund
            </motion.button>
            <p className="mt-4 text-xs leading-relaxed text-white/40">
              This is a simplified summary. Final eligibility follows our
              confirmation email and any registrar-specific rules that apply after
              transfer.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
