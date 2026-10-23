'use client'

import { useState } from 'react'

/**
 * A code snippet with a copy button. The text stays selectable, so copying by
 * hand still works where the clipboard API is refused (http, older browsers,
 * some embedded views).
 */
export function CopySnippet({
  label,
  code,
  copy,
  copied,
}: {
  label: string
  code: string
  copy: string
  copied: string
}) {
  const [done, setDone] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      // The text is selectable; the person can still copy it by hand.
    }
  }

  return (
    // min-w-0: a grid item defaults to min-width auto and grows to fit its
    // longest line, so the pre's own overflow never engaged and the snippet
    // pushed the whole page sideways — the copy button ended up off-screen.
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] tracking-[0.14em] uppercase text-faint">{label}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-[12px] text-muted transition-colors hover:text-ink"
          aria-live="polite"
        >
          {done ? copied : copy}
        </button>
      </div>
      <pre className="mt-1.5 overflow-x-auto rounded-[2px] border border-hairline bg-raise px-3 py-2 text-[11.5px] leading-relaxed text-muted select-all">
        <code>{code}</code>
      </pre>
    </div>
  )
}
