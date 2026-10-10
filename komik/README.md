# Petualangan Kiko dan Teman Baik

Komik edukasi anak usia 2–6 tahun: sampul + 15 halaman, A4 portrait, full color.
Tema: persahabatan, berbagi, empati, saling membantu, mengenali perasaan teman.

- `Petualangan-Kiko-dan-Teman-Baik.pdf` – buku digital/cetak (16 halaman A4, vektor)
- `halaman/*.png` – tiap halaman sebagai gambar (1588×2246 px)
- `index.html` – sumber halaman (bisa dibuka di browser)
- `src/lib.js` (karakter & properti), `src/build.js` (layout & cerita), `src/render.js` (PDF/PNG)

Bangun ulang: `node src/build.js && node src/render.js` (butuh Playwright + Chromium; `DSF=3.125` untuk PNG ±300 dpi).
Font: Fredoka (SIL OFL). Belum ada bleed/crop mark; tambahkan 3 mm bleed bila dicetak offset.
