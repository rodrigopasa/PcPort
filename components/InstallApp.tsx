'use client'

import { useEffect, useState } from 'react'
import { DICT } from '@/lib/i18n'
import type { Lang } from '@/lib/db/schema'

type InstallEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * Renders only once the browser says the app is actually installable, so the
 * button never promises something the device cannot do. iOS Safari fires no
 * such event, so it gets the manual instruction instead.
 */
export function InstallApp({ lang }: { lang: Lang }) {
  const t = DICT[lang]
  const [deferred, setDeferred] = useState<InstallEvent | null>(null)
  const [iosHint, setIosHint] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as InstallEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    const ua = window.navigator.userAgent
    const isIos = /iphone|ipad|ipod/i.test(ua)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true
    if (isIos && !standalone) setIosHint(true)

    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (iosHint) {
    return (
      <p className="text-[12px] leading-relaxed text-faint">
        {lang === 'pt'
          ? 'No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”.'
          : 'On iPhone: tap Share, then “Add to Home Screen”.'}
      </p>
    )
  }

  if (!deferred) return null

  return (
    <button
      type="button"
      onClick={async () => {
        await deferred.prompt()
        await deferred.userChoice
        setDeferred(null)
      }}
      className="inline-flex h-9 items-center rounded-[2px] border border-hairline-strong px-3 text-[13px] text-ink hover:border-native hover:text-native"
    >
      {t.installApp}
    </button>
  )
}
