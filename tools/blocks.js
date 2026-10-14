/* UK Sew: site-specific block types for tools/build.js (see "Site-specific block types" in the kit).
   Each export takes (block, page, kit) and returns a <section>.
     gallery    photo mosaic: items [{ image, caption, slug | href }]; block "layout": "mosaic" (default) | "strip"
     catalogue  photo cards like a shop catalogue: items [{ image?, slug | href, kicker, title, text, points: [], cta }]
                (image/title/text default to the linked page's)
     feature    split image + text band: { image, kicker, title, html, links: [{ title, slug | href, primary }], reverse, dark }
     facts      big-number band (real, sourced facts only): items [{ value, label }], block "note"
     brands     scrolling brand strip: items ["Singer", ...] or [{ title, slug }]
*/
const head = (b, kit) => b.title ? `<div class="block-head"><h2>${kit.esc(b.title)}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}${b.more ? `<a class="block-more" href="${kit.esc(b.more.href || kit.pagePath({ slug: b.more.slug }))}">${kit.esc(b.more.title)} →</a>` : ''}</div>` : '';
const linkOf = (it, kit) => it.href || (it.slug !== undefined ? kit.pagePath(kit.bySlug.get(it.slug) || { slug: it.slug }) : '');
const pageOf = (it, kit) => it.slug !== undefined ? kit.bySlug.get(it.slug) : null;
const photo = (i, kit, w, h, sizes, cls = '') => {
  i = kit.imgOf(i); if (!i) return '';
  const set = /images\.unsplash\.com/.test(i.src) ? ` srcset="${[Math.round(w / 2), w, Math.round(w * 1.5)].map(x => `${kit.esc(kit.imgSrc(i, x, h && Math.round(x * h / w)))} ${x}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img class="${cls}" src="${kit.esc(kit.imgSrc(i, w, h))}"${set} width="${w}" height="${h || Math.round(w * .66)}" alt="${kit.esc(i.alt || '')}" loading="lazy" decoding="async">`;
};
const credit = (i, kit) => { i = kit.imgOf(i); return i && i.credit ? `<span class="ph-credit">${kit.esc(i.credit)} / Unsplash</span>` : ''; };
const wrap = (b, inner, kit, extra = '') => `<section class="blocks blocks-${b.type}${b.class ? ' ' + kit.esc(b.class) : ''}${extra}"><div class="wrap">${head(b, kit)}${inner}</div></section>`;

module.exports = {
  gallery(b, p, kit) {
    const items = (b.items || []).map(it => ({ ...it, page: pageOf(it, kit) }));
    const inner = `<div class="gallery gallery-${kit.esc(b.layout || 'mosaic')}">${items.map((it, n) => {
      const href = linkOf(it, kit), image = it.image || it.page?.image;
      const body = `${photo(image, kit, 800, 800, '(max-width: 700px) 50vw, 300px', 'g-img')}<span class="g-shade"></span>${it.caption ? `<span class="g-cap">${kit.esc(it.caption)}</span>` : ''}${credit(image, kit)}`;
      return href ? `<a class="g-item g-${n}" href="${kit.esc(href)}">${body}</a>` : `<figure class="g-item g-${n}">${body}</figure>`;
    }).join('')}</div>`;
    return wrap(b, inner, kit);
  },

  catalogue(b, p, kit) {
    const items = (b.items || []).map(it => ({ ...it, page: pageOf(it, kit) }));
    for (const it of items) if (it.slug !== undefined && !it.page) kit.errors.push(`${p._file}: catalogue item links to missing page "${it.slug}"`);
    const inner = `<div class="cat-grid">${items.map(it => {
      const href = linkOf(it, kit), image = it.image || it.page?.image;
      const title = it.title || it.page?.nav || it.page?.h1 || '', text = it.text ?? it.page?.cardText ?? '';
      return `<a class="cat-card" href="${kit.esc(href)}"><span class="cat-photo">${photo(image, kit, 640, 440, '(max-width: 640px) 100vw, 360px', 'cat-img')}${it.kicker ? `<span class="cat-kicker">${kit.esc(it.kicker)}</span>` : ''}</span><span class="cat-body"><h3>${kit.esc(title)}</h3>${text ? `<p>${kit.esc(text)}</p>` : ''}${(it.points || []).length ? `<ul>${it.points.map(x => `<li>${kit.esc(x)}</li>`).join('')}</ul>` : ''}<span class="cta">${kit.esc(it.cta || 'Explore')} →</span></span></a>`;
    }).join('')}</div>`;
    return wrap(b, inner, kit);
  },

  feature(b, p, kit) {
    const links = (b.links || []).map(l => `<a class="${l.primary ? 'btn-red' : 'btn-line'}" href="${kit.esc(linkOf(l, kit))}"${/^https?:/.test(l.href || '') ? ' rel="noopener" target="_blank"' : ''}>${kit.esc(l.title)}</a>`).join('');
    const inner = `<div class="feat${b.reverse ? ' feat-rev' : ''}"><div class="feat-photo">${photo(b.image, kit, 1000, 760, '(max-width: 860px) 100vw, 560px', 'feat-img')}${credit(b.image, kit)}</div><div class="feat-copy">${b.kicker ? `<p class="feat-k">${kit.esc(b.kicker)}</p>` : ''}<h2>${kit.esc(b.heading || '')}</h2>${b.html || ''}${links ? `<div class="feat-links">${links}</div>` : ''}</div></div>`;
    return `<section class="blocks blocks-feature${b.dark ? ' is-dark' : ''}${b.class ? ' ' + kit.esc(b.class) : ''}"><div class="wrap">${inner}</div></section>`;
  },

  facts(b, p, kit) {
    const inner = `<div class="facts">${(b.items || []).map(it => `<div class="fact"><span class="fact-v">${kit.esc(it.value)}</span><span class="fact-l">${kit.esc(it.label)}</span></div>`).join('')}</div>${b.note ? `<p class="facts-note">${b.note}</p>` : ''}`;
    return wrap(b, inner, kit);
  },

  brands(b, p, kit) {
    const items = (b.items || []).map(it => typeof it === 'string' ? { title: it } : it);
    const row = items.map(it => { const h = linkOf(it, kit); return h ? `<a href="${kit.esc(h)}">${kit.esc(it.title)}</a>` : `<span>${kit.esc(it.title)}</span>`; }).join('<i aria-hidden="true">✂</i>');
    return wrap(b, `<div class="brands-strip"><div class="brands-row">${row}<i aria-hidden="true">✂</i></div><div class="brands-row" aria-hidden="true">${row.replace(/<a /g, '<a tabindex="-1" ')}<i>✂</i></div></div>`, kit);
  },
};
