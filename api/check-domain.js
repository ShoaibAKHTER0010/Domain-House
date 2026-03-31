/**
 * Vercel serverless: GET /api/check-domain?q=example.com
 */
const { checkDomainQuery } = require('../server/lib/domainAvailability')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const q = req.query.q || req.query.domain || ''
  try {
    const { status, body } = await checkDomainQuery(q)
    res.status(status).json(body)
  } catch (e) {
    res.status(500).json({ error: 'check_failed', message: String(e.message) })
  }
}
