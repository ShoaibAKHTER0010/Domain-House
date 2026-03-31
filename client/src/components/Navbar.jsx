import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const base =
  'group relative text-sm font-medium text-white/80 transition hover:text-white'

/**
 * Sticky nav — Hostinger-style links + Safety page route.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-white/15 bg-[#050a14]/85 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'border-transparent bg-[#030712]/40 backdrop-blur-md'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="font-[Poppins] text-lg font-semibold tracking-tight text-white transition hover:text-orange-400"
        >
          Domain<span className="text-orange-500">House</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
          <li>
            <Link to="/" className={base}>
              Home
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/#domains" className={base}>
              Domains
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/#refund" className={base}>
              Refunds
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${base} ${isActive ? 'text-white' : ''}`
              }
            >
              About
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/safety"
              className={({ isActive }) =>
                `${base} ${isActive ? 'text-white' : ''}`
              }
            >
              Safety
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          </li>
          <li>
            <Link to="/#contact" className={base}>
              Contact
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}
