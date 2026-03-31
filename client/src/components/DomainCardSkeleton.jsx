/**
 * Loading placeholders matching the domain card grid.
 */
export function DomainCardSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-md"
        >
          <div className="h-7 w-3/4 rounded-lg bg-white/10" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
          </div>
          <div className="mt-6 flex justify-between gap-4">
            <div className="h-10 w-20 rounded-lg bg-white/10" />
            <div className="h-10 w-28 rounded-xl bg-white/15" />
          </div>
        </div>
      ))}
    </>
  )
}
