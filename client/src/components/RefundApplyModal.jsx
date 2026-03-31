import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT_EMAIL } from '../config/contact'

const initial = {
  fullName: '',
  email: '',
  domainName: '',
  orderId: '',
  reason: '',
}

/**
 * Refund application: collects details and opens a structured mailto.
 */
export function RefundApplyModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && <RefundFormShell onClose={onClose} />}
    </AnimatePresence>
  )
}

/** Mounts only while open so form state resets each time without effects. */
function RefundFormShell({ onClose }) {
  return (
    <motion.div
      key="refund-modal"
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-title"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#0a1628]/98 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <RefundFormContent onClose={onClose} />
      </motion.div>
    </motion.div>
  )
}

function RefundFormContent({ onClose }) {
  const [form, setForm] = useState(initial)

  const mailtoHref = () => {
    const body = [
      `Refund request — DomainHouse`,
      ``,
      `Full name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Domain: ${form.domainName}`,
      `Order / reference (if any): ${form.orderId || 'N/A'}`,
      ``,
      `Reason / details:`,
      form.reason,
    ].join('\n')
    const q = new URLSearchParams({
      subject: `Refund request — ${form.domainName || 'domain'}`,
      body,
    })
    return `mailto:${CONTACT_EMAIL}?${q.toString()}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = mailtoHref()
    onClose()
  }

  return (
    <>
      <h2
        id="refund-title"
        className="font-[Poppins] text-xl font-semibold text-white"
      >
        Apply for refund
      </h2>
      <p className="mt-2 text-sm text-white/60">
        We’ll open an email draft to{' '}
        <span className="text-orange-400">{CONTACT_EMAIL}</span> with your
        answers. Send it when you’re ready.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="rf-name"
            className="block text-xs font-medium text-white/70"
          >
            Full name
          </label>
          <input
            id="rf-name"
            required
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-orange-500/0 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/25"
          />
        </div>
        <div>
          <label
            htmlFor="rf-email"
            className="block text-xs font-medium text-white/70"
          >
            Email
          </label>
          <input
            id="rf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/25"
          />
        </div>
        <div>
          <label
            htmlFor="rf-domain"
            className="block text-xs font-medium text-white/70"
          >
            Domain name
          </label>
          <input
            id="rf-domain"
            required
            placeholder="example.com"
            value={form.domainName}
            onChange={(e) =>
              setForm((f) => ({ ...f, domainName: e.target.value }))
            }
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/25"
          />
        </div>
        <div>
          <label
            htmlFor="rf-order"
            className="block text-xs font-medium text-white/70"
          >
            Order / invoice ID (optional)
          </label>
          <input
            id="rf-order"
            value={form.orderId}
            onChange={(e) =>
              setForm((f) => ({ ...f, orderId: e.target.value }))
            }
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/25"
          />
        </div>
        <div>
          <label
            htmlFor="rf-reason"
            className="block text-xs font-medium text-white/70"
          >
            Reason
          </label>
          <textarea
            id="rf-reason"
            required
            rows={4}
            value={form.reason}
            onChange={(e) =>
              setForm((f) => ({ ...f, reason: e.target.value }))
            }
            className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/25"
          />
        </div>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/75 hover:bg-white/5"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Open email draft
          </motion.button>
        </div>
      </form>
    </>
  )
}
