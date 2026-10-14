# UK Sew (uksew.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. UK sewing machines, parts, wool and yarn, accessories, servicing/repairs and machine hire, rooted in Leicester's hosiery heritage and **featuring PK Sewing Machines (www.pksm.co.uk)**. Repo: `Shmorai/shmor-uksew` (private until launch). Status: **building**, no referral links yet. Brand name is "UK Sew" (two words, user's choice 2026-10-14); id/subdomain stay `uksew`.

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage, `content/blog/*.json` = posts) |
| Design: top bar, header, logo, footer | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults at the top; **UK Sew theme** block at the bottom) |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/`, `search-index.json`, `blog/feed.xml` |

## Pages (58)
Home · sewing-machines · industrial-sewing-machines · overlockers-and-embroidery-machines · sewing-machine-parts · sewing-machine-repairs · sewing-machine-hire · wool-and-yarn · haberdashery-and-accessories · dressmaking-fabrics · quilting-and-patchwork · knitting-machines · hosiery-and-knitwear · deals · reviews · brands (+ brands/singer, brother, janome, juki) · pk-sewing-machines-leicester · sewing-in-leicester · sewing-machine-repairs-east-midlands · schools-and-businesses · leicester-hosiery · uk-hosiery-news · sewing-glossary · blog (+30 posts, ~360–700 words each, 2–5 inline photos per post).
Second pass (2026-10-14, user asked for "a lot more content and a better design with more images"): 35 → 58 pages, ~7k → ~20k words, ~30 → ~100 unique photos.
Top menu (navOrder): Machines, Repairs, Parts, Wool & yarn, Hire, Deals, Reviews, Journal, plus a red "PKSM Leicester" button hard-coded in the layout.

## Design
"Heritage British hosiery house": cream paper #F7F3EC, navy ink #14234B (+ #1E3366), pillar-box crimson #C8102E (buttons, stitch rules), brass #8A6A36 eyebrows. Fonts: Fraunces (serif display) + Inter. Stitch motif = dashed crimson rules (under hero, under section headings, top of footer); dashed crimson card hover. Navy top bar with "Featuring PK Sewing Machines · Est. 1982 · 0116 273 6552". Logo = navy rounded square with a cream needle and dashed crimson thread + "**UK** Sew" wordmark (UK in crimson). Navy footer. Homepage uses CSS `order` to show departments/PKSM/deals before the journal posts. Mobile checked at 375px (menu collapses under 960px, no horizontal scroll).
Photos: free-licence Unsplash images hotlinked (credits on every page and under every inline figure).
**Site-specific blocks** in `tools/blocks.js` (picked up automatically by the kit's build): `gallery` (photo mosaic or `layout: "strip"`), `catalogue` (shop-style photo cards with kicker, points and CTA), `feature` (split photo + text band; `heading`, `html`, `links`, `reverse`, `dark`), `facts` (big numbers: only real, sourced figures, e.g. PKSM's), `brands` (auto-scrolling brand strip, static with reduced motion). Styles for them are the "UK Sew v2" block at the end of `assets/site.css`.
Articles: inline photos are `<figure class="fig">` (with caption + credit) or `<div class="fig-pair">`, pull quotes `<blockquote class="pull">`, tables in `<div class="table-wrap">`, glossary `<dl class="gloss">`. Posts get a serif drop cap. Homepage: catalogue → PKSM band → facts → gallery → deals → heritage feature → brand reviews → brands strip → wool feature (dark) → repairs feature → steps → journal (first post featured, 6 posts).

## PKSM (featured company)
Facts used come from pksm.co.uk (checked 2026-10-14): PK Sewing Machines, family-run in Leicester since 1982, started by two brothers; 415 St Saviours Road, Leicester LE5 4HH; 0116 273 6552; info@pksm.co.uk; Mon–Fri 9–17; servicing "from £35"; 5,000+ spare parts; East Midlands industrial call-outs; collection/delivery by quote; buy & part exchange; used machines bench-tested, sold as seen; eBay store `https://www.ebay.co.uk/sch/i.html?_ssn=rajsud57`. **PKSM does not list rental**, so the hire page doesn't claim it does.
**Links to PKSM use `http://www.pksm.co.uk/`** because the site is on GitHub Pages without a valid HTTPS certificate for the custom domain (https gives a certificate error). Once "Enforce HTTPS" works on that repo, switch every `http://www.pksm.co.uk/` to https (content/*.json, layout footer) and rebuild.
Every page links pksm.co.uk (footer at least); every blog post links PKSM and `/leicester-hosiery/` in its body.

## Content rules followed
No invented prices, deals, ratings or customer reviews. "Reviews" = editorial brand overviews (no stars). "Deals" = honest routes (PKSM eBay live stock, part exchange, tested used, shows) with prices left to sellers. "UK hosiery news" = curated links to UKFT, DMU, Knitting Industry, Story of Leicester, Knitting Together, EMOHA, museums, Knit + Stitch, with our own summaries (no copied articles). Dated facts used: Leicester Made & Regions 24 Apr 2026 at DMU; Knit + Stitch Ally Pally 8–11 Oct 2026, Harrogate 19–22 Nov 2026 (re-check venue/dates); Sewing Bee series 12 on BBC One from 14 Jul 2026.

## Commands (run here)
```bash
node tools/build.js           # rebuild after ANY change to content/, templates/ or shmor-site.json
node tools/build.js --check   # validate only
node tools/serve.js 4012      # preview http://localhost:4012  (preview config "uksew")
```
After changing `shmor-site.json`, also run `node tools/sync-network.js` in `../../shmor-ai`.

## Referral links
None yet. Candidates: sewing/craft retailers on Awin (e.g. haberdashery, yarn and machine retailers). Add to `shmor-site.json` → `"links"`, list slugs in a page's `"partners"` (or add `"offers"`), rebuild, sync the master, then commit both repos.

## Ideas / next
Referral links · PKSM to enable HTTPS · more brand pages (Bernina, Pfaff, Jack) · more local pages (Loughborough, Nottingham, Coventry) · lengthen the shorter posts towards 800+ words · more posts monthly (sector news re-checked against sources).
