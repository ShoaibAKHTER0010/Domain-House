import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/contact'
import { ContactActionButtons } from './ContactActionButtons'

/**
 * Footer with legal / trust links (Hostinger-style).
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/10 bg-black/30 py-14 backdrop-blur-md"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-[Poppins] text-lg font-semibold text-white">
              Domain<span className="text-orange-500">House</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/55">
              Premium domains with the clarity and polish you expect from modern
              hosting brands.
            </p>
          </div>
          <nav
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
            aria-label="Footer"
          >
            <Link
              to="/about"
              className="text-white/60 transition hover:text-orange-400"
            >
              About us
            </Link>
            <Link
              to="/safety"
              className="text-white/60 transition hover:text-orange-400"
            >
              Safety &amp; security
            </Link>
            <Link
              to="/#refund"
              className="text-white/60 transition hover:text-orange-400"
            >
              Refunds
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white/60 transition hover:text-orange-400"
            >
              {CONTACT_EMAIL}
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-orange-400/95">
            Contact
          </p>
          <h3 className="mt-2 text-center font-[Poppins] text-xl font-bold text-white sm:text-2xl">
            Get in touch
          </h3>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/50">
            WhatsApp or email — we reply fast.
          </p>
          <ContactActionButtons className="mt-8" />
        </div>

        <p className="mt-10 text-center text-xs text-white/35 md:text-left">
          © {new Date().getFullYear()} DomainHouse. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
