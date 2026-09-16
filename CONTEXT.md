# CONTEXT — karya-konsep

**Jarum jam proyek ini.** Papan portofolio lintas-proyek: `~/Projects/CONTEXT.md` §4.
**Last Updated:** 2026-09-17

---

## Active Checkpoint
- **Status:** Hub A/B/C **jadi & terverifikasi lokal** (`2368bbf`, 2026-09-17): `python3 build.py` → `dist/` 1,4 MB; B Forest & C Haven berisi konten v1 (ID), reveal-on-scroll, mobile OK (0 overflow). Belum ada remote/deploy. Workflow Pages sudah disiapkan (`.github/workflows/deploy.yml`, sumber = Actions).
- **Fokus aktif:** (1) ganti foto placeholder B/C (menunggu izin unduh / foto Mika); (2) deploy hub: Mika buat repo `MikaX99/karya-konsep` → push → Settings › Pages › Source = GitHub Actions; (3) Mika pilih konsep.
- **Menunggu keputusan Mika:**
  1. Izin unduh foto pengganti (Unsplash) untuk Haven (dan Forest bila fotonya juga salinan situs referensi) — atau Mika sediakan foto sendiri.
  2. "Klien sejak 2020–2023" di v1 bertentangan dengan tahun berdiri 2024 → sementara tidak ditampilkan.
  3. Nama repo GitHub untuk deploy hub (usul: `MikaX99/karya-konsep`).
  4. Konten "Mengapa Memilih" & angka klaim (dari penilaian v1 6,5/10) — masih memakai 3 pilar v1 tanpa angka.
- **Pending (urut prioritas):** lihat fokus aktif. Setelah pemenang dipilih Mika: EN + porting ke proyek produksi.
- **Riwayat singkat:**
  - 2026-09-17 [SELESAI] `2368bbf` hub + B + C: content.json (4 layanan, 17 produk, 14 klien, 53 brand), build.py, reveal.js, hub, workflow. Perbaikan: reveal.js cek ulang viewport (hero mobile tersembunyi), hero Haven mobile kata ditumpuk atas/bawah kartu. Foto dikompres 5,6 MB → 1,1 MB. Preview: `launch.json` "karya-konsep" (port 3941).
  - 2026-09-17 Keputusan Mika: hub A/B/C (A = v1 live, B = Forest, C = Haven); semua konten merujuk v1; berdiri 2024; ganti foto Haven; scroll imersif harus hidup. Temuan: varian sentracomp-redesign tidak punya reveal-on-scroll sama sekali (bukan rusak, belum dibangun); Haven & karya-sistem-editorial identik.

<!-- Aturan: yang [SELESAI] cukup satu baris + tanggal; detail panjang pindah ke CHANGELOG.md proyek. -->
