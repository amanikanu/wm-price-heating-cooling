import { NextResponse, type NextRequest } from 'next/server';
import { redirects } from './content/redirects';

/**
 * PRD F18: exact 301s (not Next's default 308) from every changed legacy URL.
 * The map is generated from the crawled legacy sitemap into /content/redirects.ts.
 */
const destinationBySource = new Map(redirects.map((r) => [r.source, r.destination]));

export function middleware(request: NextRequest) {
  const destination = destinationBySource.get(request.nextUrl.pathname);
  if (!destination) return NextResponse.next();
  const [path, query] = destination.split('?');
  const url = request.nextUrl.clone();
  url.pathname = path.endsWith('/') ? path : `${path}/`;
  url.search = query ? `?${query}` : '';
  url.hash = '';
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/((?!_next|brand|fonts|favicon.ico|sitemap.xml|robots.txt|api).*)'],
};
