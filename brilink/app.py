"""Pembukuan Agen BRILink - aplikasi web sederhana tanpa dependensi (stdlib saja).

Jalankan:  python3 app.py   lalu buka http://127.0.0.1:8000
"""
import csv
import io
import os
import sqlite3
from datetime import date
from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

DB_PATH = os.environ.get("BRILINK_DB", os.path.join(os.path.dirname(__file__), "brilink.db"))

# jenis -> (label, fungsi efek (nominal, admin) -> (delta_kas, delta_saldo))
JENIS = {
    "transfer": ("Transfer", lambda n, a: (n + a, -n)),
    "setor": ("Setor Tunai", lambda n, a: (n + a, -n)),
    "bayar": ("Pembayaran (listrik/PDAM/dll)", lambda n, a: (n + a, -n)),
    "tarik": ("Tarik Tunai", lambda n, a: (-n + a, n)),
    "topup_kas": ("Isi Saldo BRILink dari Kas", lambda n, a: (-n, n)),
    "topup_bank": ("Isi Saldo BRILink dari Rekening Pribadi", lambda n, a: (0, n)),
    "modal": ("Tambah Modal Kas", lambda n, a: (n, 0)),
    "pengeluaran": ("Pengeluaran Operasional", lambda n, a: (-n, 0)),
}
# Jenis yang menghasilkan pendapatan (admin/komisi) dan pengeluaran (beban)
LAYANAN = {"transfer", "setor", "bayar", "tarik"}


def db():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    con.execute(
        """CREATE TABLE IF NOT EXISTS transaksi(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tanggal TEXT NOT NULL, jenis TEXT NOT NULL,
            nominal INTEGER NOT NULL CHECK(nominal >= 0),
            admin INTEGER NOT NULL DEFAULT 0, komisi INTEGER NOT NULL DEFAULT 0,
            keterangan TEXT NOT NULL DEFAULT '')"""
    )
    con.execute("CREATE TABLE IF NOT EXISTS setting(k TEXT PRIMARY KEY, v INTEGER NOT NULL)")
    return con


def get_setting(con, k):
    r = con.execute("SELECT v FROM setting WHERE k=?", (k,)).fetchone()
    return r["v"] if r else 0


def efek(row):
    """Perubahan (kas, saldo) dari satu transaksi. Komisi bank masuk ke saldo."""
    dk, ds = JENIS[row["jenis"]][1](row["nominal"], row["admin"])
    if row["jenis"] in LAYANAN:
        ds += row["komisi"]
    return dk, ds


def ringkas(rows):
    r = {"kas": 0, "saldo": 0, "admin": 0, "komisi": 0, "beban": 0, "jumlah": 0}
    for t in rows:
        dk, ds = efek(t)
        r["kas"] += dk
        r["saldo"] += ds
        if t["jenis"] in LAYANAN:
            r["admin"] += t["admin"]
            r["komisi"] += t["komisi"]
            r["jumlah"] += 1
        elif t["jenis"] == "pengeluaran":
            r["beban"] += t["nominal"]
    r["laba"] = r["admin"] + r["komisi"] - r["beban"]
    return r


def rp(n):
    return ("-" if n < 0 else "") + "Rp " + f"{abs(n):,}".replace(",", ".")


def parse_int(s):
    s = (s or "0").replace(".", "").replace(",", "").strip()
    if not s.lstrip("-").isdigit():
        raise ValueError("Angka tidak valid")
    return int(s)


CSS = """body{font-family:system-ui,sans-serif;margin:0;background:#f4f6f8;color:#1b2733}
header{background:#00529c;color:#fff;padding:12px 20px}header a{color:#fff;margin-right:16px;text-decoration:none;font-weight:600}
main{max-width:1000px;margin:16px auto;padding:0 12px}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
.card{background:#fff;border-radius:8px;padding:12px;box-shadow:0 1px 3px #0002}.card b{display:block;font-size:1.25em;margin-top:4px}
form.box,table{background:#fff;border-radius:8px;box-shadow:0 1px 3px #0002;margin:14px 0;width:100%}form.box{padding:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:end}
label{font-size:.8em;display:flex;flex-direction:column;gap:2px}input,select,button{padding:7px;font-size:1em;border:1px solid #bbb;border-radius:5px}
button{background:#00529c;color:#fff;border:0;cursor:pointer}button.del{background:#c0392b;padding:3px 8px}
table{border-collapse:collapse}th,td{padding:7px 9px;text-align:left;border-bottom:1px solid #eee;font-size:.92em}td.n,th.n{text-align:right}
.err{background:#fdecea;color:#a12;padding:8px;border-radius:5px}.pos{color:#117a3e}.neg{color:#b02a1c}"""


def page(title, body):
    return f"""<!doctype html><html lang=id><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>{escape(title)}</title><style>{CSS}</style><header><a href="/">Beranda</a><a href="/laporan">Laporan</a><a href="/pengaturan">Pengaturan</a></header><main>{body}</main></html>"""


def cards(items):
    return '<div class=cards>' + "".join(
        f'<div class=card>{escape(l)}<b class="{"neg" if v < 0 else ""}">{rp(v) if money else v}</b></div>'
        for l, v, money in items
    ) + "</div>"


def tabel_transaksi(rows, hapus=True):
    out = ["<table><tr><th>Tanggal<th>Jenis<th class=n>Nominal<th class=n>Admin<th class=n>Komisi<th>Keterangan<th></tr>"]
    for t in rows:
        btn = (f'<form method=post action="/hapus" onsubmit="return confirm(\'Hapus transaksi ini?\')">'
               f'<input type=hidden name=id value={t["id"]}><button class=del>Hapus</button></form>') if hapus else ""
        out.append(
            f'<tr><td>{t["tanggal"]}<td>{escape(JENIS[t["jenis"]][0])}<td class=n>{rp(t["nominal"])}'
            f'<td class=n>{rp(t["admin"])}<td class=n>{rp(t["komisi"])}<td>{escape(t["keterangan"])}<td>{btn}</tr>'
        )
    if not rows:
        out.append("<tr><td colspan=7>Belum ada transaksi.</tr>")
    return "".join(out) + "</table>"


def halaman_beranda(con, err=""):
    hari = date.today().isoformat()
    semua = con.execute("SELECT * FROM transaksi").fetchall()
    tot = ringkas(semua)
    kas = get_setting(con, "kas_awal") + tot["kas"]
    saldo = get_setting(con, "saldo_awal") + tot["saldo"]
    rows = con.execute("SELECT * FROM transaksi WHERE tanggal=? ORDER BY id DESC", (hari,)).fetchall()
    h = ringkas(rows)
    opsi = "".join(f'<option value={k}>{escape(v[0])}</option>' for k, v in JENIS.items())
    body = (
        (f'<p class=err>{escape(err)}</p>' if err else "")
        + cards([("Kas laci", kas, True), ("Saldo BRILink", saldo, True), ("Total aset", kas + saldo, True)])
        + f"<h3>Hari ini ({hari})</h3>"
        + cards([("Transaksi layanan", h["jumlah"], False), ("Admin", h["admin"], True), ("Komisi bank", h["komisi"], True),
                 ("Pengeluaran", h["beban"], True), ("Laba hari ini", h["laba"], True)])
        + f"""<form class=box method=post action="/tambah">
<label>Tanggal<input type=date name=tanggal value="{hari}" required></label>
<label>Jenis<select name=jenis>{opsi}</select></label>
<label>Nominal<input name=nominal inputmode=numeric required></label>
<label>Biaya admin (dari nasabah)<input name=admin inputmode=numeric value=0></label>
<label>Komisi bank<input name=komisi inputmode=numeric value=0></label>
<label>Keterangan<input name=keterangan></label><button>Simpan</button></form>"""
        + tabel_transaksi(rows)
    )
    return page("Pembukuan BRILink", body)


def halaman_laporan(con, q):
    dari = q.get("dari", [date.today().replace(day=1).isoformat()])[0]
    sampai = q.get("sampai", [date.today().isoformat()])[0]
    rows = con.execute("SELECT * FROM transaksi WHERE tanggal BETWEEN ? AND ? ORDER BY tanggal, id", (dari, sampai)).fetchall()
    per_hari = {}
    for t in rows:
        per_hari.setdefault(t["tanggal"], []).append(t)
    tr = ["<table><tr><th>Tanggal<th class=n>Transaksi<th class=n>Admin<th class=n>Komisi<th class=n>Pengeluaran<th class=n>Laba</tr>"]
    for d, ts in per_hari.items():
        r = ringkas(ts)
        tr.append(f'<tr><td>{d}<td class=n>{r["jumlah"]}<td class=n>{rp(r["admin"])}<td class=n>{rp(r["komisi"])}'
                  f'<td class=n>{rp(r["beban"])}<td class=n>{rp(r["laba"])}</tr>')
    t = ringkas(rows)
    tr.append(f'<tr><th>Total<th class=n>{t["jumlah"]}<th class=n>{rp(t["admin"])}<th class=n>{rp(t["komisi"])}'
              f'<th class=n>{rp(t["beban"])}<th class=n>{rp(t["laba"])}</tr></table>')
    body = (f'<form class=box method=get><label>Dari<input type=date name=dari value="{escape(dari)}"></label>'
            f'<label>Sampai<input type=date name=sampai value="{escape(sampai)}"></label><button>Tampilkan</button>'
            f'<a href="/export.csv?dari={escape(dari)}&sampai={escape(sampai)}">Unduh CSV</a></form>'
            + cards([("Laba bersih periode", t["laba"], True)]) + "".join(tr) + "<h3>Rincian</h3>" + tabel_transaksi(rows, hapus=False))
    return page("Laporan", body)


def halaman_pengaturan(con):
    body = f"""<h3>Saldo awal</h3><form class=box method=post action="/pengaturan">
<label>Kas laci awal<input name=kas_awal inputmode=numeric value={get_setting(con, "kas_awal")}></label>
<label>Saldo BRILink awal<input name=saldo_awal inputmode=numeric value={get_setting(con, "saldo_awal")}></label>
<button>Simpan</button></form>"""
    return page("Pengaturan", body)


def export_csv(con, q):
    dari = q.get("dari", ["0000-01-01"])[0]
    sampai = q.get("sampai", ["9999-12-31"])[0]
    out = io.StringIO()
    w = csv.writer(out)
    w.writerow(["tanggal", "jenis", "nominal", "admin", "komisi", "keterangan"])
    for t in con.execute("SELECT * FROM transaksi WHERE tanggal BETWEEN ? AND ? ORDER BY tanggal, id", (dari, sampai)):
        w.writerow([t["tanggal"], JENIS[t["jenis"]][0], t["nominal"], t["admin"], t["komisi"], t["keterangan"]])
    return out.getvalue()


class Handler(BaseHTTPRequestHandler):
    def send(self, body, ctype="text/html; charset=utf-8", status=200, headers=None):
        data = body.encode()
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        for k, v in (headers or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def redirect(self):
        self.send_response(303)
        self.send_header("Location", "/")
        self.end_headers()

    def do_GET(self):
        u = urlparse(self.path)
        q = parse_qs(u.query)
        con = db()
        try:
            if u.path == "/":
                self.send(halaman_beranda(con))
            elif u.path == "/laporan":
                self.send(halaman_laporan(con, q))
            elif u.path == "/pengaturan":
                self.send(halaman_pengaturan(con))
            elif u.path == "/export.csv":
                self.send(export_csv(con, q), "text/csv; charset=utf-8",
                          headers={"Content-Disposition": "attachment; filename=pembukuan-brilink.csv"})
            else:
                self.send("Tidak ditemukan", "text/plain", 404)
        finally:
            con.close()

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        f = {k: v[0] for k, v in parse_qs(self.rfile.read(n).decode()).items()}
        u = urlparse(self.path).path
        con = db()
        try:
            if u == "/tambah":
                try:
                    jenis = f["jenis"]
                    if jenis not in JENIS:
                        raise ValueError("Jenis tidak dikenal")
                    date.fromisoformat(f["tanggal"])
                    nominal, admin, komisi = parse_int(f.get("nominal")), parse_int(f.get("admin")), parse_int(f.get("komisi"))
                    if min(nominal, admin, komisi) < 0 or nominal == 0:
                        raise ValueError("Nominal harus lebih dari 0 dan tidak boleh negatif")
                except (ValueError, KeyError) as e:
                    return self.send(halaman_beranda(con, str(e)), status=400)
                con.execute("INSERT INTO transaksi(tanggal,jenis,nominal,admin,komisi,keterangan) VALUES(?,?,?,?,?,?)",
                            (f["tanggal"], jenis, nominal, admin, komisi, f.get("keterangan", "")[:200]))
                con.commit()
            elif u == "/hapus":
                con.execute("DELETE FROM transaksi WHERE id=?", (int(f.get("id", 0)),))
                con.commit()
            elif u == "/pengaturan":
                for k in ("kas_awal", "saldo_awal"):
                    con.execute("INSERT OR REPLACE INTO setting VALUES(?,?)", (k, parse_int(f.get(k))))
                con.commit()
            self.redirect()
        finally:
            con.close()

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    host, port = os.environ.get("HOST", "127.0.0.1"), int(os.environ.get("PORT", 8000))
    print(f"Pembukuan BRILink berjalan di http://{host}:{port}")
    ThreadingHTTPServer((host, port), Handler).serve_forever()
