#!/usr/bin/env python3
"""Render src/ + shared/content.json → dist/.

Tanpa dependensi. Template mendukung:
  {{ path.to.key }}          nilai dari content.json (di-escape)
  <!-- @nama -->             blok HTML dari fungsi block_<varian>_<nama> di file ini
Aset gambar per varian disalin apa adanya; shared/assets → dist/shared/assets.
"""
import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
CONTENT = json.loads((ROOT / "shared" / "content.json").read_text())

E = html.escape


def get(path):
    cur = CONTENT
    for part in path.split("."):
        cur = cur[int(part)] if isinstance(cur, list) else cur[part]
    return cur


def wa_link(text=None):
    n = CONTENT["whatsapp"]["number"]
    msg = text or CONTENT["whatsapp"]["defaultMessage"]
    return f"https://wa.me/{n}?text={quote(msg)}"


# ---------------------------------------------------------------- blok bersama
def _clients():
    return CONTENT["clients"]["items"]


def _products_by_cat():
    out = {c: [] for c in CONTENT["catalog"]["categories"]}
    for p in CONTENT["catalog"]["products"]:
        out[p["category"]].append(p)
    return out


# ---------------------------------------------------------------- B · FOREST
def block_forest_accordion():
    parts = []
    for i, s in enumerate(CONTENT["services"]["items"]):
        active = " active" if i == 0 else ""
        sym = "&minus;" if i == 0 else "+"
        pts = "".join(
            f'<div class="subservice-bullet-item"><span>● {E(p)}</span></div>' for p in s["points"]
        )
        parts.append(f'''
          <div class="alethia-accordion-item{active}" data-reveal>
            <div class="alethia-accordion-header">
              <div>
                <span class="service-index-num">{s["no"]}.</span>
                <span>{E(s["title"]).upper()}</span>
              </div>
              <span class="accordion-symbol">{sym}</span>
            </div>
            <div class="alethia-accordion-body">
              {E(s["desc"])}
              <div class="subservice-bullet-grid">{pts}</div>
            </div>
          </div>''')
    return "".join(parts)


def block_forest_clients():
    parts = []
    for i, c in enumerate(_clients(), 1):
        sol = " · ".join(c.get("solutions") or [])
        parts.append(f'''
          <div class="architectural-client-cell" data-reveal style="--reveal-delay:{(i % 4) * 70}ms">
            <div class="client-cell-top-meta">
              <span class="client-cell-index">{i:02d}</span>
              <div class="client-cell-logo-glyph client-cell-logo-img">
                <img src="../shared/{E(c["logo"])}" alt="{E(c["name"])}" loading="lazy" width="32" height="32">
              </div>
            </div>
            <div>
              <h3 class="client-cell-name">{E(c["name"])}</h3>
              <span class="client-cell-sector">{E(c["industry"])}</span>
              {f'<span class="client-cell-solutions">{E(sol)}</span>' if sol else ''}
            </div>
          </div>''')
    return "".join(parts)


def block_forest_catalog():
    parts = []
    for cat, items in _products_by_cat().items():
        rows = "".join(
            f'<li><a href="{wa_link(p["waTemplate"])}" target="_blank" rel="noopener noreferrer">'
            f'<strong>{E(p["brand"])}</strong><span>{E(p["title"])}</span>'
            f'<small>{E(" · ".join(p["lines"]))}</small></a></li>'
            for p in items
        )
        parts.append(f'''
        <div class="open-platform-col" data-reveal>
          <span class="col-tag">{E(cat)}</span>
          <ul class="catalog-brand-list">{rows}</ul>
        </div>''')
    return "".join(parts)


def block_forest_partners():
    parts = []
    for grp, names in CONTENT["partners"]["groups"].items():
        tags = "".join(f'<span class="partner-tag">{E(n)}</span>' for n in names)
        parts.append(f'''
        <div class="partner-group" data-reveal>
          <div class="partner-group-label">{E(grp)}</div>
          <div class="partner-tag-row">{tags}</div>
        </div>''')
    return "".join(parts)


def block_forest_service_options():
    return "".join(
        f'<option value="{E(s["title"])}">{E(s["title"])}</option>' for s in CONTENT["services"]["items"]
    ) + "".join(
        f'<option value="Pengadaan {E(c)}">Pengadaan {E(c)}</option>' for c in CONTENT["catalog"]["categories"]
    )


# ---------------------------------------------------------------- C · HAVEN
def block_haven_services():
    parts = []
    for i, s in enumerate(CONTENT["services"]["items"]):
        active = " active" if i == 0 else ""
        pts = "".join(f"<div>&bull; {E(p)}</div>" for p in s["points"])
        parts.append(f'''
            <div class="ks-accordion-item{active}" data-reveal>
              <div class="ks-accordion-header">
                <h3 class="acc-title-text">{s["no"]}. {E(s["title"])}</h3>
                <span class="acc-plus-glyph acc-glyph-symbol">{'&minus;' if i == 0 else '+'}</span>
              </div>
              <div class="ks-accordion-body">
                <div class="acc-body-content-grid">
                  <p class="acc-desc-p">{E(s["desc"])}</p>
                  <div class="acc-points-col">{pts}</div>
                </div>
              </div>
            </div>''')
    return "".join(parts)


def block_haven_clients():
    parts = []
    for i, c in enumerate(_clients(), 1):
        sol = " · ".join(c.get("solutions") or [])
        parts.append(f'''
              <div class="archive-client-entry" data-reveal style="--reveal-delay:{(i % 3) * 80}ms">
                <div class="archive-client-main">
                  <img class="archive-client-logo" src="../shared/{E(c["logo"])}" alt="{E(c["name"])}" loading="lazy" width="44" height="44">
                  <div>
                    <h3 class="archive-client-name">{E(c["name"])}</h3>
                    <p class="archive-client-scope">{E(c["industry"])}</p>
                  </div>
                </div>
                <span class="archive-client-year">{E(sol)}</span>
              </div>''')
    return "".join(parts)


def block_haven_testimonials():
    parts = []
    for c in _clients():
        if c.get("testimonial"):
            parts.append(f'''
          <blockquote class="ks-testimonial" data-reveal>
            <p>“{E(c["testimonial"])}”</p>
            <footer>{E(c["name"])} &middot; {E(c["industry"])}</footer>
          </blockquote>''')
    return "".join(parts)


def block_haven_catalog():
    parts = []
    for cat, items in _products_by_cat().items():
        cards = "".join(f'''
            <a class="brand-ecosystem-card ks-product-card" href="{wa_link(p["waTemplate"])}" target="_blank" rel="noopener noreferrer" data-reveal>
              <div class="brand-card-top-meta">
                <span class="brand-category-badge">{E(cat)}</span>
                <span class="brand-status-dot" title="Garansi resmi"></span>
              </div>
              <div>
                <h3 class="brand-card-name">{E(p["brand"])}</h3>
                <p class="brand-card-role-desc">{E(p["title"])}</p>
                <p class="ks-product-lines">{E(" · ".join(p["lines"]))}</p>
                <span class="ks-product-cta">{E(CONTENT["catalog"]["quoteLabel"])} &rarr;</span>
              </div>
            </a>''' for p in items)
        parts.append(f'''
        <div class="ks-catalog-group">
          <div class="archive-sector-header" data-reveal>
            <span class="archive-sector-title">{E(cat)}</span>
            <span class="archive-sector-count">{len(items)} lini</span>
          </div>
          <div class="collab-brands-mosaic ks-product-grid">{cards}</div>
        </div>''')
    return "".join(parts)


def block_haven_partners():
    parts = []
    for grp, names in CONTENT["partners"]["groups"].items():
        parts.append(f'''
              <div class="collab-list-item ks-partner-row" data-reveal>
                <span class="collab-item-name">{E(grp)}</span>
                <span class="collab-item-role">{len(names)} brand</span>
                <p class="ks-partner-names">{" &middot; ".join(E(n) for n in names)}</p>
              </div>''')
    return "".join(parts)


block_haven_service_options = block_forest_service_options


# ---------------------------------------------------------------- render
def render(text, variant):
    def sub_val(m):
        key = m.group(1).strip()
        if key == "wa":
            return wa_link()
        val = get(key)
        return E(str(val)) if not isinstance(val, (dict, list)) else E(json.dumps(val, ensure_ascii=False))

    def sub_block(m):
        fn = globals().get(f"block_{variant}_{m.group(1)}")
        if fn is None:
            raise SystemExit(f"blok tidak dikenal: @{m.group(1)} (varian {variant})")
        return fn()

    text = re.sub(r"<!--\s*@([a-z_]+)\s*-->", sub_block, text)
    text = re.sub(r"\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}", sub_val, text)
    return text


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    shutil.copytree(ROOT / "shared" / "assets", DIST / "shared" / "assets")

    variants = {"hub": "", "b-forest": "forest", "c-haven": "haven"}
    for folder, variant in variants.items():
        src = SRC / folder
        out = DIST if folder == "hub" else DIST / folder
        out.mkdir(exist_ok=True)
        for f in src.iterdir():
            if f.name.startswith("."):
                continue
            if f.suffix in {".html", ".css", ".js"}:
                (out / f.name).write_text(render(f.read_text(), variant or "hub"))
            else:
                shutil.copy2(f, out / f.name)
        print(f"✓ {folder} → {out.relative_to(ROOT)}")

    (DIST / ".nojekyll").write_text("")
    total = sum(p.stat().st_size for p in DIST.rglob("*") if p.is_file())
    print(f"dist/ = {total / 1024:.0f} KB")


if __name__ == "__main__":
    main()
