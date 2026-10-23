import type { ReactNode } from 'react'
import type { Mechanism, Lang } from '@/lib/db/schema'
import { DICT } from '@/lib/i18n'

/**
 * A tone is one of the status colours. They encode data, so they stay flat:
 * a border at 35% of the tone, a fill at 10%, never a glow.
 */
type Tone = 'native' | 'recompiled' | 'translation' | 'emulator' | 'progress'

const TONE: Record<Tone, string> = {
  native: 'text-native border-native/35 bg-native/10',
  recompiled: 'text-recompiled border-recompiled/35 bg-recompiled/10',
  translation: 'text-translation border-translation/35 bg-translation/10',
  emulator: 'text-emulator border-emulator/35 bg-emulator/10',
  progress: 'text-progress border-progress/40 bg-progress/10',
}

const FOR_MECHANISM: Record<Mechanism, Tone> = {
  native: 'native',
  recompiled: 'recompiled',
  'translation-layer': 'translation',
  emulator: 'emulator',
  'in-progress': 'progress',
}

/**
 * The chip, on its own. The status chip is one use; the contribution form's
 * received and not-sent states are another, so they speak the same visual
 * word as everything else that carries a state on this site, instead of a
 * coloured rule down the side of a box.
 */
export function Chip({
  tone,
  size = 'sm',
  children,
}: {
  tone: Tone
  size?: 'sm' | 'lg'
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[2px] border font-medium whitespace-nowrap ${TONE[tone]} ${
        size === 'lg'
          ? 'px-2.5 py-1 text-[11px] tracking-[0.14em] uppercase'
          : 'px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase'
      }`}
    >
      {children}
    </span>
  )
}

export function StatusChip({
  mechanism,
  lang,
  size = 'sm',
}: {
  mechanism: Mechanism
  lang: Lang
  size?: 'sm' | 'lg'
}) {
  return (
    <Chip tone={FOR_MECHANISM[mechanism]} size={size}>
      {DICT[lang].mechanisms[mechanism]}
    </Chip>
  )
}
