/**
 * Vercel serverless: GET /api/domains (same shape as Express in dev).
 * Reads from server/data/domains.json — keep in sync when you edit inventory.
 */
const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const domains = JSON.parse(
  readFileSync(join(__dirname, '../server/data/domains.json'), 'utf8'),
)

module.exports = (req, res) => {
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
  res.status(200).json(domains)
}
