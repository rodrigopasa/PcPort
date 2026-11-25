'use client'

/**
 * Google Ad Manager (via JoinAds) and Google Analytics.
 *
 * The tags came written for WordPress, and three things in them do not carry
 * over to this site:
 *
 *  - `id_post_wp` was a WordPress post id. Here it is the page path, which is
 *    what identifies a page on this site.
 *  - The JoinAds pageview read the id from `<link rel="shortlink">`, which only
 *    WordPress prints. With none on the page it threw, so the path is sent.
 *  - Pages here change without a reload. Every page change is a new pageview
 *    for JoinAds, a new page path for targeting, and the content slots of the
 *    page that left are destroyed so the next page can define its own.
 *
 * The UTM values are kept for the visit in sessionStorage and go into the
 * targeting of every page after the first. The original rewrote every link on
 * the page to carry them, which here would do nothing: links navigate by their
 * React props, not by the href in the DOM.
 */

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NETWORK = '/23369082083/pcport.org'
const GA_ID = 'G-HBTKX9NFN7'
const JOINADS_ID = '23369082083'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

/** The content units sold by the network. Each may appear once per page. */
export type AdUnit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/* eslint-disable @typescript-eslint/no-explicit-any */
type Gpt = any
declare global {
  interface Window {
    googletag: Gpt
    dataLayer: unknown[]
    dataJoinAds: unknown[]
    kvp?: (id: string) => void
  }
}

function gpt(): Gpt {
  window.googletag = window.googletag || { cmd: [] }
  return window.googletag
}

function utm(): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  try {
    const params = new URLSearchParams(window.location.search)
    for (const k of UTM) {
      const v = params.get(k)
      if (v) sessionStorage.setItem(k, v)
      const kept = v ?? sessionStorage.getItem(k)
      if (kept) out[k] = [kept]
    }
  } catch {
    // Storage blocked: the current URL is still read above.
  }
  return out
}

function pageview(path: string) {
  try {
    const body = new FormData()
    body.append('url', window.location.href)
    body.append('domain', window.location.hostname)
    body.append('id_post', path)
    body.append('referrer', document.referrer)
    navigator.sendBeacon?.('https://pageview.joinads.me/api/pages', body) ||
      fetch('https://pageview.joinads.me/api/pages', { method: 'POST', body, keepalive: true })
  } catch {
    // A lost pageview is not worth an error on the page.
  }
}

/**
 * Loaded once from the layout. Defines the page-level units (interstitial,
 * top anchor, fixed bottom) and keeps targeting and pageviews in step with
 * navigation.
 */
export function AdsRuntime() {
  const path = usePathname()
  const [mobile, setMobile] = useState<boolean | null>(null)

  // Page-level units, once per load.
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    setMobile(isMobile)
    const g = gpt()
    g.cmd.push(() => {
      // Once per load, whatever React does: a second definition of the same
      // div is an error, and React runs effects twice in development.
      if (g.pubads().getSlots().some((s: Gpt) => s.getSlotElementId() === 'Fixed_slot')) return
      g.setConfig({
        lazyLoad: { fetchMarginPercent: 20, renderMarginPercent: 10, mobileScaling: 2.0 },
        collapseDiv: 'ON_NO_FILL',
      })
      const interstitial = g.defineOutOfPageSlot(
        `${NETWORK}/Pcport_WEB_Interstitial_20261125`,
        g.enums.OutOfPageFormat.INTERSTITIAL,
      )
      interstitial?.addService(g.pubads())
      const anchor = g.defineOutOfPageSlot(
        `${NETWORK}/Pcport_WEB_Anchor_20261125`,
        g.enums.OutOfPageFormat.TOP_ANCHOR,
      )
      anchor?.addService(g.pubads())
      const fixed = g.defineSlot(
        isMobile ? `${NETWORK}/Pcport_MOBILE_Fixed_20261125` : `${NETWORK}/Pcport_WEB_Fixed_20261125`,
        isMobile ? [[320, 50]] : [[728, 90]],
        'Fixed_slot',
      )
      fixed?.addService(g.pubads())
      g.enableServices()
      if (interstitial) g.display(interstitial)
      if (anchor) g.display(anchor)
      if (fixed) g.display('Fixed_slot')
    })
  }, [])

  // Every page: its path and the visit's UTM values as targeting, and a pageview.
  useEffect(() => {
    const g = gpt()
    g.cmd.push(() => g.setConfig({ targeting: { id_post_wp: [path], ...utm() } }))
    window.dataJoinAds = window.dataJoinAds || []
    window.dataJoinAds.push(['track', 'PageView'])
    const timer = window.setTimeout(() => pageview(path), 10_000)
    return () => window.clearTimeout(timer)
  }, [path])

  return (
    <>
      <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="afterInteractive" />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script
        src="https://script.joinads.me/kvp.js"
        // Not lazyOnload: it waits for the window load event, which has
        // already fired by the time this component mounts, so it never ran.
        strategy="afterInteractive"
        onLoad={() => window.kvp?.(JOINADS_ID)}
      />

      {/* Fixed bottom unit. The body keeps room for it so it never covers the footer. */}
      {mobile !== null ? (
        <>
          <style>{`body{padding-bottom:${mobile ? 56 : 96}px}`}</style>
          <div
            style={{
              position: 'fixed',
              zIndex: 9995,
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%)',
              textAlign: 'center',
            }}
          >
            <div id="Fixed_slot" />
          </div>
        </>
      ) : null}
    </>
  )
}

/**
 * One content unit. The box keeps its height before the ad arrives: an ad
 * that pushes the text down is the largest single cause of layout shift,
 * and layout shift is a ranking input.
 */
export function Ad({ unit, className = '' }: { unit: AdUnit; className?: string }) {
  const id = `Content${unit}`

  useEffect(() => {
    const g = gpt()
    let slot: Gpt = null
    g.cmd.push(() => {
      // Already on the page (a fast remount): leave the existing one.
      if (g.pubads().getSlots().some((s: Gpt) => s.getSlotElementId() === id)) return
      const mapping = g
        .sizeMapping()
        .addSize([0, 0], ['fluid', [250, 250], [300, 250], [336, 280]])
        .build()
      slot = g.defineSlot(
        `${NETWORK}/Pcport_WEB_Content${unit}_20261125`,
        [
          [250, 250],
          [300, 250],
          [336, 280],
        ],
        id,
      )
      if (!slot) return
      slot.defineSizeMapping(mapping).addService(g.pubads())
      g.enableServices()
      g.display(id)
    })
    return () => {
      g.cmd.push(() => {
        if (slot) g.destroySlots([slot])
      })
    }
  }, [id, unit])

  return (
    <div className={`mx-auto w-full max-w-[336px] ${className}`} aria-label="Publicidade">
      <div className="mb-1 border-b border-hairline pb-px text-center text-[9px] tracking-[0.2em] uppercase text-faint">
        Ads
      </div>
      <div id={id} style={{ minHeight: 280 }} />
    </div>
  )
}
