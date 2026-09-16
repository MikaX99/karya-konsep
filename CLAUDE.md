# Aturan Kerja — karya-konsep (Hub Perbandingan Desain Karya Sistem)

Hub statis untuk memilih desain company profile **PT Karya Sistem Teknologi** berikutnya: Konsep **A** (v1 yang LIVE di `apps/karyasistem1.0`, hanya link), **B** Forest, **C** Haven. Konten B/C 100% dari v1 lewat `shared/content.json`. Status: dibangun 2026-09-17, belum deploy. Aturan Trio & zona terlarang global: `~/.claude/CLAUDE.md`.

## Stack (fakta, bukan rencana)
- Runtime: Python 3 (build) + HTML/CSS/JS statis murni. Tanpa framework, tanpa npm, tanpa dependensi pip.
- `shared/content.json` = **satu-satunya sumber konten** (perusahaan, kontak, 4 layanan, 17 produk, 14 klien, 53 brand). Diangkat dari `apps/karyasistem1.0/src/data/*.json` + `LocaleContext.tsx` (ID).
- `src/b-forest/`, `src/c-haven/` = template HTML (kerangka dari `apps/sentracomp-redesign`) dengan marker `<!-- @nama -->`; `src/hub/` = halaman pemilih A/B/C.
- `build.py` → `dist/` (hub di root, `b-forest/`, `c-haven/`, `shared/assets/`). `dist/` tidak di-commit.
- Deploy (rencana): GitHub Pages repo `MikaX99/karya-konsep`, basePath `/karya-konsep/`. Belum ada remote.

## Perintah nyata
```bash
python3 build.py            # render dist/
python3 -m http.server 3941 -d dist   # preview lokal (atau launch.json "karya-konsep")
```

## Peta dokumen
`shared/content.json` · `design.md` (spek Alethia, salinan dari sentracomp-redesign) · `CONTEXT.md`

## Boleh / dilarang
- 🟢 Boleh: layout, CSS, JS, gambar di `src/*`, `build.py`, hub.
- 🔴 Dilarang tanpa izin Mika: mengarang konten/angka/klaim (semua konten harus ada di `content.json` yang berasal dari v1); menambah dependensi; `git push`/deploy; mengunduh gambar tanpa izin.
- 🔴 Klaim yang sengaja TIDAK dibawa dari v1 sampai Mika konfirmasi: 150+ proyek, 99.8% SLA, 87% repeat order, 12+ sektor, 24/7, "klien sejak 20xx" (bertentangan dengan tahun berdiri 2024).

## Jarum jam
`CONTEXT.md` di folder ini.
