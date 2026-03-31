import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../config/contact'
import { ContactActionButtons } from './ContactActionButtons'

/**
 * Purchase modal: WhatsApp + mailto with selected domain injected.
 */
export function ContactModal({ domain, onClose }) {
  const open = Boolean(domain)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {domain && (
        <motion.div
          key={domain.id}
          className="fixed inset-0 z-200 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0a1628]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <ModalContent domain={domain} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalContent({ domain, onClose }) {
  const name = domain.name
  const waText = `Hello, I want to buy the domain ${name}`
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`
  const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Domain Purchase - ${name}`)}`

  return (
    <>
      <h2
        id="modal-title"
        className="font-[Poppins] text-xl font-semibold text-white"
      >
        Complete your purchase
      </h2>
      <p className="mt-2 text-sm text-white/65">
        You selected{' '}
        <span className="font-semibold text-orange-400">{name}</span>. Reach us
        instantly — we typically reply within minutes.
      </p>
      <div className="mt-6">
        <ContactActionButtons
          variant="modal"
          waUrl={waUrl}
          mailUrl={mailUrl}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
      >
        Close
      </button>
    </>
  )
}
