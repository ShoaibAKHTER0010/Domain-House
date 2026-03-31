import { motion } from 'framer-motion'
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../config/contact'

const defaultWa = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello, I have a question about DomainHouse.',
  )}`

const defaultMail = () => `mailto:${CONTACT_EMAIL}`

/**
 * Premium animated WhatsApp + Email CTAs (footer, modal, or inline).
 */
export function ContactActionButtons({
  waUrl,
  mailUrl,
  variant = 'footer',
  className = '',
}) {
  const wa = waUrl || defaultWa()
  const mail = mailUrl || defaultMail()
  const isModal = variant === 'modal'

  return (
    <div
      className={`${
        isModal
          ? 'flex flex-col gap-3'
          : 'flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5'
      } ${className}`}
    >
      <motion.a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg sm:min-w-[220px]"
        whileHover={{ scale: 1.04, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <span
          className="absolute inset-0 bg-linear-to-br from-[#2fe06d] via-[#25D366] to-[#128C7E]"
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.35), transparent 55%)',
          }}
          aria-hidden
        />
        <motion.span
          className="absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent"
          animate={{ left: ['-60%', '160%'] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 2.4,
            ease: 'easeInOut',
          }}
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(37,211,102,0)',
              '0 0 28px 0 rgba(37,211,102,0.45)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          aria-hidden
        />
        <WhatsAppIcon className="relative z-10 h-6 w-6 shrink-0 drop-shadow-md" />
        <span className="relative z-10 tracking-wide">WhatsApp</span>
      </motion.a>

      <motion.a
        href={mail}
        className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-2xl border border-orange-400/35 bg-white/7 px-6 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:border-orange-500/55 hover:bg-white/12 sm:min-w-[220px]"
        whileHover={{ scale: 1.04, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <motion.span
          className="absolute inset-0 bg-linear-to-r from-orange-500/0 via-orange-500/15 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: '0 0 0 0 rgba(255, 122, 0, 0.35)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 122, 0, 0)',
              '0 0 32px 0 rgba(255, 122, 0, 0.35)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
          aria-hidden
        />
        <MailIcon className="relative z-10 h-6 w-6 shrink-0 text-orange-400 drop-shadow" />
        <span className="relative z-10 tracking-wide">Email</span>
      </motion.a>
    </div>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
