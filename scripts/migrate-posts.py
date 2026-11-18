#!/usr/bin/env python3
"""One-off migration of the legacy WordPress blog into MDX.

- Reads every <loc> from the current site's sitemaps (the URL inventory).
- Migrates each post in post-sitemap.xml into /content/posts/<slug>.mdx.
- Fixes the unfilled template variables described in PRD 16.4 #5.
- Rewrites internal links to local paths and removes remote images / scripts.
- Emits /content/legacy-urls.json (used by the redirect test) and the post registry.

This is a migration tool, not a content generator: it only copies text that is
already published on priceheating.com. Nothing is invented here.
"""
from __future__ import annotations

import json
import re
import subprocess
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify as to_markdown

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.priceheating.com"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
SITEMAPS = [
    "post-sitemap.xml",
    "page-sitemap.xml",
    "testimonial-sitemap.xml",
    "hvac-product-sitemap1.xml",
    "hvac-product-sitemap2.xml",
    "category-sitemap.xml",
    "city-sitemap.xml",
    "video-sitemap.xml",
]

# Slugs containing the leaked "company-state" template variable are replaced
# with clean slugs; the legacy URL 301-redirects to the new one (PRD 16.4 #5).
SLUG_FIXES = {
    "is-your-heating-system-ready-for-company-state-long-winter": "is-your-heating-system-ready-for-ohio-winter",
    "how-long-will-a-furnace-heat-pump-or-boiler-last-in-company-state-long": "how-long-will-a-furnace-heat-pump-or-boiler-last",
}

BUILT_LINK_PREFIXES = (
    "/residential/", "/city/", "/assurance-and-security-plans/", "/products/",
    "/specials/", "/contact/", "/reviews/", "/review/", "/request-service/",
    "/service-area/", "/financing/", "/faq/", "/company/", "/news/",
    "/emergency-service/", "/referral/", "/careers/", "/site-map/",
    "/privacy-policy/", "/accessibility-statement/", "/replace-your-system/",
)


def fetch(url: str) -> str:
    out = subprocess.run(
        ["curl", "-sL", "-A", UA, "--max-time", "30", url],
        capture_output=True, text=True,
    ).stdout
    return out or ""


def locs(xml: str) -> list[str]:
    return re.findall(r"<loc>(.*?)</loc>", xml)


def clean_slug(path: str) -> str:
    return path.strip("/").split("/")[-1]


def local_href(href: str) -> str | None:
    """Return a local path for an internal link, or None for an external link."""
    if not href:
        return None
    href = href.strip()
    if href.startswith("tel:") or href.startswith("mailto:"):
        return "/contact/"
    if href.startswith("#"):
        return None
    parsed = urllib.parse.urlparse(href)
    if parsed.netloc and parsed.netloc not in ("www.priceheating.com", "priceheating.com"):
        return None
    path = parsed.path or "/"
    if not path.endswith("/"):
        path += "/"
    if path == "/":
        return "/"
    if path.startswith("/category/") or path.startswith("/testimonial/"):
        return "/news/"
    if path == "/city/other/":
        return "/service-area/"
    if path.startswith("/products/carrier/"):
        if any(k in path for k in ("thermostat", "coil", "air-handler", "packaged", "fan-coil")):
            return "/products/accessories/"
        return "/products/carrier/"
    if path.startswith(BUILT_LINK_PREFIXES):
        return path
    # Legacy post URLs that are being migrated stay valid.
    if path.count("/") == 1 and path not in ("/request-estimate/",):
        return path
    return "/site-map/"


def fix_placeholders(text: str) -> str:
    """Repair unfilled template variables with facts from the PRD (Mahoning Valley / Ohio)."""
    subs = [
        (r"\bWinters? here in\s+can\b", "Winters here in Ohio can"),
        (r"\bWinter in\s*,\s*is\b", "Winter in Ohio is"),
        (r"\bin\s*,\s*is\b", "in Ohio is"),
        (r"\bin\s+your\s*,\s*home\b", "in your Ohio home"),
        (r"\byour\s*,\s*home\b", "your Ohio home"),
        (r"\baround\s*,\s*the\b", "around the Mahoning Valley, the"),
        (r"\bin\s*,\s*", "in the Mahoning Valley, "),
        (r"\bat\s+often\s+ask\b", "at Wm. Price Heating & Cooling often ask"),
        (r"company-state", "Ohio"),
        (r"\s+,", ","),
        (r",\s*,", ","),
    ]
    for pattern, replacement in subs:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text


def mdx_safe(text: str) -> str:
    """Escape characters that MDX would otherwise parse as JSX/JS expressions."""
    text = text.replace("{", r"\{").replace("}", r"\}")
    text = re.sub(r"<(?=[ =\d])", "&lt;", text)
    return text


def extract_article(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    h1 = soup.find("h1")
    title = h1.get_text(" ", strip=True) if h1 else clean_slug(urllib.parse.urlparse(url).path).replace("-", " ").title()

    # Date: prefer <time datetime>, then the visible date in the post header.
    date = ""
    time_el = soup.find("time")
    if time_el and time_el.get("datetime"):
        date = time_el["datetime"][:10]
    if not date:
        meta = soup.find("meta", attrs={"property": "article:published_time"})
        if meta and meta.get("content"):
            date = meta["content"][:10]
    if not date:
        m = re.search(r"(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+20\d{2}", soup.get_text(" ", strip=True))
        if m:
            try:
                date = datetime.strptime(m.group(0), "%B %d, %Y").strftime("%Y-%m-%d")
            except ValueError:
                date = ""

    body = soup.select_one(".fl-module-fl-post-content") or soup.select_one(".fl-post-content") or soup.select_one(".entry-content")
    if body is None:
        return {"title": title, "date": date, "body": ""}

    for tag in body.find_all(["script", "style", "noscript", "picture", "img", "iframe", "svg", "form", "button", "input", "select", "textarea", "video", "source"]):
        tag.decompose()
    for tag in body.find_all(["span", "div", "font"]):
        tag.unwrap()
    for a in body.find_all("a"):
        href = a.get("href", "")
        local = local_href(href)
        if local is None:
            a.unwrap()
        else:
            a["href"] = local

    text = to_markdown(str(body), heading_style="ATX", bullets="-")
    text = text.replace("\r\n", "\n")
    # Remove the repeated page-builder CTA / related-articles tail.
    for marker in ("## Need HVAC Service?", "### Need HVAC Service?", "Read More of Our Articles", "### Read More of Our Articles"):
        idx = text.find(marker)
        if idx != -1:
            text = text[:idx]
    text = fix_placeholders(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    text = mdx_safe(text)

    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip() and not p.startswith("#")]
    description = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", paragraphs[0] if paragraphs else title)
    description = re.sub(r"[*_`\\]", "", description)[:155].strip()

    return {"title": title, "date": date, "body": text, "description": description}


def main() -> None:
    all_paths: set[str] = set()
    post_urls: list[str] = []
    for name in SITEMAPS:
        xml = fetch(f"{BASE}/{name}")
        paths = [urllib.parse.urlparse(u).path or "/" for u in locs(xml)]
        all_paths.update(paths)
        if name == "post-sitemap.xml":
            post_urls = [BASE + p for p in paths]
        print(f"{name}: {len(paths)} URLs")

    (ROOT / "content").mkdir(exist_ok=True)
    (ROOT / "content" / "posts").mkdir(exist_ok=True)
    (ROOT / "content" / "legacy-urls.json").write_text(
        json.dumps(sorted(all_paths), indent=2) + "\n", encoding="utf-8"
    )

    with ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(lambda u: (u, extract_article(fetch(u), u)), post_urls))

    registry: list[dict] = []
    empty: list[str] = []
    for url, article in results:
        legacy_slug = clean_slug(urllib.parse.urlparse(url).path)
        slug = SLUG_FIXES.get(legacy_slug, legacy_slug)
        if len(article["body"]) < 120:
            empty.append(legacy_slug)
            continue
        # The old "company-state" slugs live only in the redirect map, never in
        # published content, so the CI placeholder scan has zero matches.
        meta = {
            "title": article["title"],
            "date": article["date"] or "2026-01-01",
            "description": article["description"] or f"{article['title']} — Wm. Price Heating & Cooling.",
            "slug": slug,
        }
        (ROOT / "content" / "posts" / f"{slug}.mdx").write_text(
            "export const meta = " + json.dumps(meta, ensure_ascii=False) + ";\n\n" + article["body"] + "\n",
            encoding="utf-8",
        )
        registry.append(meta)

    registry.sort(key=lambda m: m["date"], reverse=True)
    lines = [
        "// GENERATED by scripts/migrate-posts.py — do not edit by hand.",
        "// MDX modules are loaded lazily so the news index stays cheap.",
        "import type { ComponentType } from 'react';",
        "import type { PostMeta } from '../types';",
        "",
        "export type PostModule = { default: ComponentType; meta: PostMeta };",
        "",
        "export const postMeta: PostMeta[] = " + json.dumps(registry, ensure_ascii=False, indent=2) + ";",
        "",
        "export const postModules: Record<string, () => Promise<PostModule>> = {",
    ]
    for meta in registry:
        lines.append(f"  {json.dumps(meta['slug'])}: () => import('./{meta['slug']}.mdx'),")
    lines += ["};", "", "export const postSlugs = Object.keys(postModules);", ""]
    (ROOT / "content" / "posts" / "index.ts").write_text("\n".join(lines), encoding="utf-8")

    print(f"migrated {len(registry)} posts; skipped (empty body): {empty}")
    print(f"legacy URL inventory: {len(all_paths)} paths")


if __name__ == "__main__":
    main()
