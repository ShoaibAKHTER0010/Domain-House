import { useEffect, useState } from 'react'
import { API_BASE } from '../config/contact'

/** Must look like a hostname with TLD before we hit the registry API */
const LOOKS_LIKE_FQDN = /^[a-z0-9]([a-z0-9-]*\.)+[a-z]{2,24}$/i

/**
 * Debounced GET /api/check-domain for the current search string.
 */
export function useDomainAvailability(query) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!LOOKS_LIKE_FQDN.test(q)) {
      setResult(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      setResult(null)
      try {
        const url = `${API_BASE}/api/check-domain?q=${encodeURIComponent(q)}`
        const res = await fetch(url)
        const data = await res.json()
        if (cancelled) return
        if (!res.ok) {
          setError(data.message || data.error || `HTTP ${res.status}`)
          setResult(null)
          return
        }
        setResult(data)
        setError(null)
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Lookup failed')
          setResult(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 550)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  return { result, loading, error }
}
