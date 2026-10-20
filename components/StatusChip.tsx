import type { Mechanism, Lang } from '@/lib/db/schema'
import { DICT } from '@/lib/i18n'

const TONE: Record<Mechanism, string> = {
  native: 'text-native border-native/35 bg-native/10',
  recompiled: 'text-recompiled border-recompiled/35 bg-recompiled/10',
  'translation-layer': 'text-translation border-translation/35 bg-translation/10',
  'in-progress': 'text-progress border-progress/40 bg-progress/10',
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
    <span
      className={`inline-flex items-center rounded-[2px] border font-medium whitespace-nowrap ${TONE[mechanism]} ${
        size === 'lg'
          ? 'px-2.5 py-1 text-[11px] tracking-[0.14em] uppercase'
          : 'px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase'
      }`}
    >
      {DICT[lang].mechanisms[mechanism]}
    </span>
  )
}
