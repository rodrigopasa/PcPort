/**
 * The box is reserved before anything loads. An ad that arrives and pushes
 * content down is the largest single source of bad CLS, and CLS is a ranking
 * input — so the slot holds its height empty and the ad fills it.
 */
export function AdSlot({
  className = '',
  height = 250,
}: {
  className?: string
  height?: number
}) {
  return (
    <div
      className={`flex items-center justify-center border border-hairline ${className}`}
      style={{ height, contain: 'layout size' }}
      aria-hidden
      data-ad-slot
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-faint/50">publicidade</span>
    </div>
  )
}
