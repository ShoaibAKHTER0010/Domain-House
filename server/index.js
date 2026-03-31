/**
 * Domain House API — Express server with CORS and room to grow (admin routes).
 */
const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

const domainsPath = path.join(__dirname, 'data', 'domains.json')

function readDomains() {
  const raw = fs.readFileSync(domainsPath, 'utf8')
  return JSON.parse(raw)
}

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  }),
)
app.use(express.json())

// Basic request logging (lightweight)
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  }
  next()
})

// --- Public API (same list at /domains and /api/domains) ---
function getDomainsHandler(_req, res) {
  try {
    const domains = readDomains()
    res.json(domains)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load domains' })
  }
}

app.get('/domains', getDomainsHandler)
app.get('/api/domains', getDomainsHandler)

// --- Future admin (stub): add domain — wire to DB / auth later ---
app.post('/api/domains', (_req, res) => {
  res.status(501).json({
    error: 'Not implemented',
    hint: 'Admin add-domain will be enabled with authentication and persistence.',
  })
})

// --- Future admin (stub): delete domain ---
app.delete('/api/domains/:id', (req, res) => {
  res.status(501).json({
    error: 'Not implemented',
    id: req.params.id,
    hint: 'Admin delete will be enabled with authentication and persistence.',
  })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'domain-house-api' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.url })
})

// Avoid Express’s listen + once(error) footgun: on EADDRINUSE the success callback
// can still run while nothing is listening, then Node exits with code 0.
const server = app.listen(PORT)

server.on('listening', () => {
  console.log(`API listening on http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `[server] Port ${PORT} is already in use. Stop the other process (e.g. old node server) or set PORT to another value.`,
    )
  } else {
    console.error('[server] Failed to start:', err)
  }
  process.exit(1)
})
