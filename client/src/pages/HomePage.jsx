import { useState, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { DomainList } from '../components/DomainList'
import { RefundSection } from '../components/RefundSection'
import { ContactModal } from '../components/ContactModal'
import { RefundApplyModal } from '../components/RefundApplyModal'

export function HomePage() {
  const location = useLocation()
  const [selectedDomain, setSelectedDomain] = useState(null)
  const [refundOpen, setRefundOpen] = useState(false)

  useLayoutEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [location])

  return (
    <>
      <main>
        <Hero />
        <DomainList onBuy={setSelectedDomain} />
        <RefundSection onApply={() => setRefundOpen(true)} />
      </main>
      <ContactModal
        domain={selectedDomain}
        onClose={() => setSelectedDomain(null)}
      />
      <RefundApplyModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
      />
    </>
  )
}
