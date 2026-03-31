/**
 * Replace via .env (VITE_*) or edit defaults for production.
 * VITE_WHATSAPP_NUMBER — digits only, country code included (e.g. 14155552671)
 * VITE_CONTACT_EMAIL — support / sales inbox
 */
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890'
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'your@email.com'

export const API_BASE = import.meta.env.VITE_API_URL || ''
