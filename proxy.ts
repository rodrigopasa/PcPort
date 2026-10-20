import { NextResponse, type NextRequest } from 'next/server'

/**
 * `/` carries no content of its own: it resolves a language and redirects.
 * Both language homes are canonical to themselves, so nothing is indexed twice.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname !== '/') return NextResponse.next()

  const accept = req.headers.get('accept-language') ?? ''
  const lang = /\bpt\b/i.test(accept) ? 'pt' : 'en'

  const url = req.nextUrl.clone()
  url.pathname = `/${lang}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/'],
}
