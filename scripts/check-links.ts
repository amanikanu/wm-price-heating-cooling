/** PRD 16.8: build fails on broken internal links. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { allPublicRoutes, internalApiRoutes, generatedFiles } from '../content/routes';
import { redirects } from '../content/redirects';

const root = process.cwd();
const failures: string[] = [];
const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };
const allowed = new Set([...allPublicRoutes(), ...internalApiRoutes, ...generatedFiles]);
const redirectSources = new Set(redirects.map((r) => r.source));

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|mdx)$/.test(name) && !full.endsWith('content/redirects.ts') && !full.endsWith('content/posts/index.ts') && !full.endsWith('app/sitemap.ts') && !full.endsWith('app/robots.ts')) out.push(full);
  }
  return out;
}

const files = [...walk(resolve(root, 'app')), ...walk(resolve(root, 'components')), ...walk(resolve(root, 'content'))];
const found = new Set<string>();
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const candidates: string[] = [];
  for (const match of text.matchAll(/['"`](\/[^'"`\s]*)['"`]/g)) candidates.push(match[1]);
  for (const match of text.matchAll(/\]\((\/[^)]+)\)/g)) candidates.push(match[1]);
  for (const raw of candidates) {
    if (raw.includes('${') || raw.includes('{') || raw.startsWith('//')) continue;
    if (/^\/(brand|fonts|_next|api)\//.test(raw)) continue;
    if (raw === '/' || raw === '/sitemap.xml' || raw === '/robots.txt') { found.add(raw); continue; }
    const clean = raw.split('?')[0].split('#')[0];
    const normalised = clean.endsWith('/') ? clean : `${clean}/`;
    check(allowed.has(normalised), `Broken internal link ${raw} in ${file.replace(root + '/', '')}`);
    check(!redirectSources.has(normalised), `Link points at a redirect: ${raw} in ${file.replace(root + '/', '')}`);
    found.add(normalised);
  }
}
if (failures.length) {
  console.error(`\nLINK CHECK FAILED (${failures.length}):`);
  failures.slice(0, 40).forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(`✓ link check passed (${found.size} distinct internal links across ${files.length} files)`);
