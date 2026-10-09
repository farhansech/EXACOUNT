# Pembukuan Agen BRILink

Aplikasi web sederhana (Python 3 + SQLite, tanpa dependensi) untuk mencatat transaksi agen BRILink.

    python3 app.py          # buka http://127.0.0.1:8000
    python3 test_app.py     # jalankan tes

Isi dulu **Pengaturan** (kas laci awal & saldo BRILink awal).

## Jenis transaksi dan efeknya
| Jenis | Kas laci | Saldo BRILink |
|---|---|---|
| Transfer / Setor / Pembayaran | + nominal + admin | − nominal |
| Tarik tunai | − nominal + admin | + nominal |
| Isi saldo dari kas | − nominal | + nominal |
| Isi saldo dari rekening pribadi | – | + nominal |
| Tambah modal kas | + nominal | – |
| Pengeluaran operasional | − nominal | – |

Komisi bank dari transaksi layanan ditambahkan ke saldo BRILink.
**Laba = admin + komisi − pengeluaran.** Laporan per periode dan ekspor CSV ada di menu Laporan.

Env: `PORT`, `HOST` (default 127.0.0.1), `BRILINK_DB` (lokasi database).
Aplikasi belum memiliki login; jangan dibuka ke jaringan publik.
