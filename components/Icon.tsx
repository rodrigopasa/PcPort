/**
 * The site's icons, drawn rather than typed.
 *
 * Arrows and chevrons used to be text glyphs (→, ›). A glyph takes its shape,
 * weight and baseline from whichever font happens to render it, so the same
 * arrow sat differently beside Archivo than beside the mono figures, and it
 * read as typed rather than built. These share one 16px grid, one 1.5 stroke
 * and round caps, and inherit the text colour, so they follow hover states.
 */

type IconProps = { className?: string; size?: number }

const base = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function ArrowRight({ className = '', size = 14 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={`inline-block shrink-0 ${className}`}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function ChevronRight({ className = '', size = 14 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={`inline-block shrink-0 ${className}`}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  )
}
