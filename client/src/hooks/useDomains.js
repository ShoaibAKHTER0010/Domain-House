import { useEffect, useState } from 'react'
import { API_BASE } from '../config/contact'

/**
 * Fetches domain inventory from GET /api/domains (proxied to Express in dev).
 */
export function useDomains() {
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const url = `${API_BASE}/api/domains`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setDomains(Array.isArray(data) ? data : [])
          setError(null)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to load domains')
          setDomains([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { domains, loading, error }
}
