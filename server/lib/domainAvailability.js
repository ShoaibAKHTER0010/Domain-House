/**
 * Domain availability: API Ninjas (when API_NINJAS_KEY is set), else RDAP.
 * API Ninjas checks registry-level availability (same signal registrars use);
 * Hostinger/Wix do not offer public live-search APIs — this is not a call to those sites.
 */

/**
 * Typical first‑year promo‑style reference (USD), in the same ballpark as major
 * registrars (Hostinger / Wix–class pricing). Not a live quote from any seller.
 */
const TLD_REFERENCE_USD = {
  com: 12.99,
  net: 13.99,
  org: 10.99,
  io: 49.99,
  dev: 14.99,
  ai: 99.99,
  co: 29.99,
  app: 16.99,
  me: 19.99,
  xyz: 12.99,
}

const API_NINJAS_DOMAIN_URL = 'https://api.api-ninjas.com/v1/domain'

/** RDAP HTTPS endpoints — 404 from registry usually means unregistered (available to register) */
function rdapUrl(domain, tld) {
  const d = domain.toLowerCase()
  const enc = encodeURIComponent(d)
  switch (tld) {
    case 'com':
      return `https://rdap.verisign.com/com/v1/domain/${enc}`
    case 'net':
      return `https://rdap.verisign.com/net/v1/domain/${enc}`
    case 'org':
      return `https://rdap.publicinterestregistry.org/rdap/domain/${enc}`
    case 'io':
      return `https://rdap.nic.io/domain/${enc}`
    case 'dev':
      return `https://rdap.nic.dev/domain/${enc}`
    case 'ai':
      return `https://rdap.nic.ai/domain/${enc}`
    case 'co':
      return `https://rdap.nic.co/domain/${enc}`
    case 'app':
      return `https://rdap.nic.app/domain/${enc}`
    case 'me':
      return `https://rdap.nic.me/domain/${enc}`
    case 'xyz':
      return `https://rdap.nic.xyz/domain/${enc}`
    default:
      return null
  }
}

function normalizeDomain(input) {
  let s = String(input || '')
    .trim()
    .toLowerCase()
  s = s.replace(/^https?:\/\//, '')
  s = s.split('/')[0]
  s = s.replace(/^www\./, '')
  return s
}

function parseDomain(s) {
  const domain = normalizeDomain(s)
  if (!domain || !domain.includes('.')) return null
  const labels = domain.split('.')
  if (labels.length < 2) return null
  const tld = labels[labels.length - 1]
  if (!/^[a-z]{2,24}$/.test(tld)) return null
  for (let i = 0; i < labels.length - 1; i++) {
    const lab = labels[i]
    if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(lab)) return null
  }
  return { domain, tld }
}

/**
 * @returns {Promise<{ ok: true, data: object } | { ok: false }>}
 */
async function lookupApiNinjas(domain, apiKey) {
  const controller = new AbortController()
  const to = setTimeout(() => controller.abort(), 15000)
  try {
    const url = `${API_NINJAS_DOMAIN_URL}?domain=${encodeURIComponent(domain)}`
    const res = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey,
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    if (!res.ok) {
      return { ok: false }
    }

    const data = await res.json()
    if (typeof data.available !== 'boolean') {
      return { ok: false }
    }

    return {
      ok: true,
      data: {
        available: data.available,
        registrar: data.registrar || null,
        creation_date: data.creation_date ?? null,
      },
    }
  } catch {
    return { ok: false }
  } finally {
    clearTimeout(to)
  }
}

/**
 * @returns {Promise<{ ok: true, data: object } | { ok: false, status: number, error: string }>}
 */
async function lookupRdap(domain, tld) {
  const url = rdapUrl(domain, tld)
  if (!url) {
    return {
      ok: false,
      status: 400,
      error: 'unsupported_tld',
      message: `TLD .${tld} is not supported for live lookup yet.`,
    }
  }

  const controller = new AbortController()
  const to = setTimeout(() => controller.abort(), 12000)

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/rdap+json, application/json' },
      signal: controller.signal,
    })

    if (res.status === 404) {
      return {
        ok: true,
        data: { available: true, registryStatus: 'not_found' },
      }
    }

    if (res.ok) {
      return {
        ok: true,
        data: { available: false, registryStatus: 'registered' },
      }
    }

    return {
      ok: false,
      status: 502,
      error: 'registry_error',
      message: `Registry returned HTTP ${res.status}.`,
    }
  } catch (e) {
    const msg = e.name === 'AbortError' ? 'Lookup timed out.' : e.message
    return {
      ok: false,
      status: 504,
      error: 'lookup_failed',
      message: msg,
    }
  } finally {
    clearTimeout(to)
  }
}

const DISCOUNT = 0.5

function roundMoney(n) {
  return Math.round(n * 100) / 100
}

function bodyTaken(domain, tld, source, extra = {}) {
  return {
    domain,
    tld,
    available: false,
    source,
    disclaimer:
      source === 'api_ninjas'
        ? 'Checked via API Ninjas (registry-style availability). Always confirm before purchase.'
        : 'Availability is inferred from public registry (RDAP) data. Always confirm before purchase.',
    ...extra,
  }
}

function bodyAvailable(domain, tld, referencePriceUsd, source) {
  const offerPriceUsd = roundMoney(referencePriceUsd * DISCOUNT)
  const comparisonNote =
    source === 'api_ninjas'
      ? 'Verified with API Ninjas (registry-level availability — the same kind of “free / taken” signal registrars use). Sellers like Hostinger and Wix rely on the same global registry when you search; we are not calling their checkout APIs. Your price is 50% off our Hostinger/Wix-style reference below (not their live price).'
      : 'We cannot call Hostinger or Wix APIs (they do not offer public stock/price feeds). When the global registry shows this name as free, it is the same kind of “available” you would get at any registrar that sells this TLD — including Hostinger or Wix. Your price is 50% off our Hostinger/Wix-style reference below (not their live checkout).'

  return {
    domain,
    tld,
    available: true,
    referencePriceUsd,
    offerPriceUsd,
    discountPercent: 50,
    source,
    disclaimer:
      source === 'api_ninjas'
        ? 'Availability verified via API Ninjas. Always confirm before purchase.'
        : 'Availability is inferred from public registry (RDAP) data. Always confirm before purchase.',
    comparisonNote,
  }
}

/**
 * GET handler logic — use from Express or Vercel.
 */
async function checkDomainQuery(q) {
  const parsed = parseDomain(q)
  if (!parsed) {
    return {
      status: 400,
      body: {
        error: 'invalid_domain',
        message: 'Enter a valid domain name (e.g. brandname.com).',
      },
    }
  }

  const { domain, tld } = parsed
  let referencePriceUsd = TLD_REFERENCE_USD[tld]
  if (referencePriceUsd == null) {
    const n = Number(process.env.DEFAULT_TLD_REFERENCE_USD)
    referencePriceUsd = Number.isFinite(n) ? n : 14.99
  }

  const apiKey = (process.env.API_NINJAS_KEY || '').trim()
  if (apiKey) {
    const ninja = await lookupApiNinjas(domain, apiKey)
    if (ninja.ok) {
      const { available, registrar, creation_date } = ninja.data
      if (!available) {
        return {
          status: 200,
          body: bodyTaken(domain, tld, 'api_ninjas', {
            registrar: registrar || undefined,
            creationDate: creation_date ?? undefined,
          }),
        }
      }
      return {
        status: 200,
        body: bodyAvailable(domain, tld, referencePriceUsd, 'api_ninjas'),
      }
    }
  }

  const rdap = await lookupRdap(domain, tld)
  if (!rdap.ok) {
    return {
      status: rdap.status,
      body: {
        domain,
        tld,
        error: rdap.error,
        message: rdap.message,
      },
    }
  }

  const { available } = rdap.data

  if (!available) {
    return {
      status: 200,
      body: bodyTaken(domain, tld, 'rdap'),
    }
  }

  return {
    status: 200,
    body: bodyAvailable(domain, tld, referencePriceUsd, 'rdap'),
  }
}

module.exports = {
  checkDomainQuery,
  parseDomain,
  TLD_REFERENCE_USD,
}
