# UK SEW (uksew.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. UK sewing machines, parts, wool and yarn, accessories, servicing/repairs and machine hire, a **UK-wide** brand (not Leicester-based: user, 2026-10-14) with British textile heritage as a theme and **PK Sewing Machines (www.pksm.co.uk)** embedded as its featured workshop partner. Repo: `Shmorai/shmor-uksew` (private until launch). Status: **building**, no referral links yet. Brand name is **"UK SEW"** (all caps, the user’s choice on 2026-10-14; earlier "UKsew", then "UK Sew"); id/subdomain stay `uksew`.

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage, `content/blog/*.json` = posts) |
| Design: top bar, header, logo, footer | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults at the top; **UK SEW theme v3** below, including the block and article styles) |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/`, `search-index.json`, `blog/feed.xml` |

## Pages (58)
Home · sewing-machines · industrial-sewing-machines · overlockers-and-embroidery-machines · sewing-machine-parts · sewing-machine-repairs · sewing-machine-hire · wool-and-yarn · haberdashery-and-accessories · dressmaking-fabrics · quilting-and-patchwork · knitting-machines · hosiery-and-knitwear · deals · reviews · brands (+ brands/singer, brother, janome, juki) · pk-sewing-machines-leicester · sewing-in-leicester · sewing-machine-repairs-east-midlands · schools-and-businesses · leicester-hosiery · uk-hosiery-news · sewing-glossary · blog (+30 posts, ~360–700 words each, 2–5 inline photos per post).
Second pass (2026-10-14, user asked for "a lot more content and a better design with more images"): 35 → 58 pages, ~7k → ~20k words, ~30 → ~100 unique photos.
Top menu (navOrder): Machines, Repairs, Parts, Wool & yarn, Hire, Deals, Reviews, Journal, plus a round search button hard-coded in the layout.

## Positioning
UK-wide company for England, Scotland, Wales and Northern Ireland. Leicester appears only as **heritage subject matter** (hosiery history pages and posts, Leicester sheep breeds) and as **PKSM's location**, never as where UK SEW is based. No "rooted in Leicester" taglines in the header, footer, hero, manifest or meta descriptions.

## Design
**Current: v5 "smooth, professional, a touch of heritage"** (2026-10-14). The user rejected the tweed and patchwork look of v4 as too busy, and the theme was rewritten cleanly (no tweed, pinked edges, dashed stitching, swing tags or button-shaped step numbers). `assets/site.css` = kit defaults + one "UK SEW theme v5" block.
- **Palette:** cream #F7F3EC, white cards, cream-2 #F1EBE1 bands, navy #14213D (+ #1F3157), muted burgundy #9E2A3A (accent: italic headline words, hover), brass #A0824F / #C9B98F for fine rules and labels.
- **Type:** Libre Caslon Text (display; Caslon is an English typeface with 18th-century roots, which is the heritage touch) + Inter (text). Eyebrows and labels are spaced small caps with a short brass rule.
- **Surfaces:** 12px radii, soft layered shadows (`--shadow-sm` / `--shadow-md`), a centred burgundy underline on nav hover, and brass 2px rules under section headings. The dark band and CTA band use a navy gradient, and the footer is solid navy with a burgundy/brass/navy rule on top.
- **Logo:** a navy heritage seal with a brass inner ring, holding a cream four-hole sewing button with a burgundy cross-stitch (SVG `<symbol id="us-emblem">` in the layout; same art in `assets/favicon.svg` and the shmor.ai card `logo`). The wordmark is "UK SEW" in Libre Caslon Text 700, spaced 0.1em, with the tagline "British Sewing & Knitting" in spaced small caps under a thin brass rule. A needle-and-thread "S" version was rejected because it read like a medical caduceus.
- **Heroes:** inner pages and posts are split (text left on cream-2, photo right; stacked on mobile). The homepage has the headline, search and chips on the left and a 3-photo collage on the right with a "Made for Britain’s makers" card.
- **Footer (compact):** brand and one line, three short columns (Guides, Learn, UK SEW), a legal bar and a one-sentence disclosure. It doesn’t use `{{footer_nav}}`.

**Site-specific blocks** in `tools/blocks.js` (picked up automatically by the kit's build): `gallery` (photo mosaic or `layout: "strip"`), `catalogue` (shop-style photo cards with kicker, points and CTA), `feature` (split photo + text band; `heading`, `html`, `links`, `reverse`, `dark`), `facts` (big numbers: only real, sourced figures, e.g. PKSM's), `brands` (auto-scrolling brand strip, static with reduced motion). Styles for them are in the v5 theme.
Articles: inline photos are `<figure class="fig">` (with caption + credit) or `<div class="fig-pair">`, pull quotes `<blockquote class="pull">`, tables in `<div class="table-wrap">`, glossary `<dl class="gloss">`. Posts get a serif drop cap. Homepage: collage hero → strip → catalogue → **Recommended supplier (PKSM)** → gallery → deals → heritage feature → brand reviews → brands strip → wool feature (dark) → workshop feature (soft) → steps → journal (first post featured, 6 posts).

## PKSM (featured company)
Facts used come from pksm.co.uk (checked 2026-10-14): PK Sewing Machines, family-run in Leicester since 1982, started by two brothers; 415 St Saviours Road, Leicester LE5 4HH; 0116 273 6552; info@pksm.co.uk; Mon–Fri 9–17; servicing "from £35"; 5,000+ spare parts; East Midlands industrial call-outs; collection/delivery by quote; buy & part exchange; used machines bench-tested, sold as seen; eBay store `https://www.ebay.co.uk/sch/i.html?_ssn=rajsud57`. **PKSM does not list rental**, so the hire page doesn't claim it does.
**Links to PKSM use `http://www.pksm.co.uk/`** because the site is on GitHub Pages without a valid HTTPS certificate for the custom domain (https gives a certificate error). Once "Enforce HTTPS" works on that repo, switch every `http://www.pksm.co.uk/` to https (content/*.json, layout footer) and rebuild.
**How PKSM is featured.** The user first asked for it to be "less obvious and more embedded" (2026-10-14), then for "the home page must feature PKSM as a supplier that is recommended" (same day). Current setup:
(1) a clear **"Recommended supplier" section on the homepage**, second after "Shop by department": a photo with a "Recommended supplier" seal, the PKSM name, "Family-run since 1982 · Leicester workshop · UK-wide sales and repair options", 4 ticked points, and buttons to pksm.co.uk, the profile page ("Why we recommend them") and its eBay stock; it is an `html` block with class `rec-supplier` in home.json;
(2) the profile page `/pk-sewing-machines-leicester/` with a "Why we recommend PK Sewing Machines" section and the "in numbers" facts band (the only page with it);
(3) wording across the site is "our recommended supplier" (not "featured partner"), including the footer link "Recommended supplier";
(4) one natural in-context mention per article, with no callout boxes or phone numbers in posts, and PKSM not listed as a "source";
(5) quiet notes on a few guide pages, plus the local pages.
About 85 links to pksm.co.uk across content. Facts must stay as published by PKSM.

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
