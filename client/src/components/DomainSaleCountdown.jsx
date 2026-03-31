import { useEffect, useState } from 'react'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function getRemainingMs() {
  const mod = Date.now() % THIRTY_DAYS_MS
  return mod === 0 ? THIRTY_DAYS_MS : THIRTY_DAYS_MS - mod
}

function formatParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

const pad = (n) => String(n).padStart(2, '0')

/**
 * 30-day rolling countdown — remainder of wall-clock time in each 30-day cycle,
 * so it hits zero and immediately shows a fresh 30-day countdown (no localStorage).
 */
export function DomainSaleCountdown() {
  const [remainingMs, setRemainingMs] = useState(getRemainingMs)

  useEffect(() => {
    const tick = () => setRemainingMs(getRemainingMs())
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds } = formatParts(remainingMs)

  return (
    <div
      className="mx-auto mt-6 max-w-xl rounded-2xl border border-orange-500/30 bg-linear-to-br from-orange-500/10 via-white/5 to-transparent px-4 py-4 backdrop-blur-sm sm:px-6"
      role="timer"
      aria-live="polite"
      aria-label="Time remaining in current 30 day pricing cycle"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-orange-400/95">
        Current offer window
      </p>
      <p className="mt-1 text-center text-sm text-white/55">
        Timer resets every 30 days — same great pricing on the next cycle.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {[
          { value: days, label: 'Days' },
          { value: hours, label: 'Hrs' },
          { value: minutes, label: 'Min' },
          { value: seconds, label: 'Sec' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="flex min-w-[4.25rem] flex-col items-center rounded-xl border border-white/10 bg-black/25 px-3 py-2"
          >
            <span className="font-[Poppins] text-2xl font-bold tabular-nums text-white sm:text-3xl">
              {label === 'Days' ? value : pad(value)}
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-white/45">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
