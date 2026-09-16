# CONTEXT — karya-konsep

**Jarum jam proyek ini.** Papan portofolio lintas-proyek: `~/Projects/CONTEXT.md` §4.
**Last Updated:** 2026-09-17

---

## Active Checkpoint
- **Status:** Hub A/B/C **LIVE di GitHub Pages** (`https://mikax99.github.io/karya-konsep/`, commit `73555de`, 2026-09-17). Actions build & deploy sukses. Hub statis A/B/C, Konsep B Forest (`/b-forest/`), dan C Haven (`/c-haven/`) aktif.
- **Fokus aktif:** (1) Mika review perbandingan A vs B vs C di HP & desktop; (2) ganti foto placeholder B Forest bila diperlukan; (3) Mika pilih konsep pemenang.
- **Menunggu keputusan Mika:**
  1. "Klien sejak 2020–2023" di v1 bertentangan dengan tahun berdiri 2024 → sementara tidak ditampilkan.
  2. Konten "Mengapa Memilih" & angka klaim (dari penilaian v1 6,5/10) — masih memakai 3 pilar v1 tanpa angka.
- **Pending (urut prioritas):** lihat fokus aktif. Setelah pemenang dipilih Mika: EN + porting ke proyek produksi.
- **Riwayat singkat:**
  - 2026-09-17 [SELESAI] Rapikan logo Forest & Haven: hapus duplikasi tag img di HTML, gunakan single img dengan dynamic src contrast switcher, setel ukuran proporsional ideal 34px (desktop) & 28px (mobile) agar terbaca jelas namun tidak bulky.
  - 2026-09-17 [SELESAI] Fix hero Haven (`9acc9a1`): hilangkan blocker IntersectionObserver & delay birth kelamaan yang bikin canvas sempat kosong hitam; graf saraf 3D Obsidian langsung tampil mekar (spring bloom) 110 nodes + debu bintang + pulsa sinapsis aktif sejak frame 0.
  - 2026-09-17 [SELESAI] Update visual Haven (`59117c5`): Tim IT & Engineer dengan logo resmi Karya Sistem presisi HANYA di dada kiri seragam kerja.
  - 2026-09-17 [SELESAI] Ganti foto placeholder Haven Concept C dengan kurasi enterprise HD (Data Center Tier-3, Switch Optical, Network Engineer, Tim IT).
  - 2026-09-17 [SELESAI] Optimasi perf Konsep B Forest (`e5e73df`): matikan canvas & parallax di touch/mobile, hapus shadowBlur boros GPU, throttle scroll navbar, hapus @import font CSS.
  - 2026-09-17 [SELESAI] GitHub Pages LIVE di `https://mikax99.github.io/karya-konsep/` via GitHub Actions (`73555de`).
  - 2026-09-17 [SELESAI] Push repo ke GitHub `MikaX99/karya-konsep` (branch `main`).
  - 2026-09-17 [SELESAI] `2368bbf` hub + B + C: content.json (4 layanan, 17 produk, 14 klien, 53 brand), build.py, reveal.js, hub, workflow. Perbaikan: reveal.js cek ulang viewport (hero mobile tersembunyi), hero Haven mobile kata ditumpuk atas/bawah kartu. Foto dikompres 5,6 MB → 1,1 MB. Preview: `launch.json` "karya-konsep" (port 3941).
  - 2026-09-17 Keputusan Mika: hub A/B/C (A = v1 live, B = Forest, C = Haven); semua konten merujuk v1; berdiri 2024; ganti foto Haven; scroll imersif harus hidup. Temuan: varian sentracomp-redesign tidak punya reveal-on-scroll sama sekali (bukan rusak, belum dibangun); Haven & karya-sistem-editorial identik.

<!-- Aturan: yang [SELESAI] cukup satu baris + tanggal; detail panjang pindah ke CHANGELOG.md proyek. -->
