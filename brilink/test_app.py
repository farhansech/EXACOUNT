import os, tempfile, unittest
os.environ["BRILINK_DB"] = os.path.join(tempfile.mkdtemp(), "t.db")
import app


def T(jenis, n, a=0, k=0):
    return {"jenis": jenis, "nominal": n, "admin": a, "komisi": k}


class Tes(unittest.TestCase):
    def test_transfer(self):  # nasabah bayar 1.000.000 + admin 5.000 tunai
        r = app.ringkas([T("transfer", 1_000_000, 5_000, 2_000)])
        self.assertEqual((r["kas"], r["saldo"], r["laba"]), (1_005_000, -998_000, 7_000))

    def test_tarik(self):
        r = app.ringkas([T("tarik", 500_000, 3_000)])
        self.assertEqual((r["kas"], r["saldo"], r["laba"]), (-497_000, 500_000, 3_000))

    def test_topup_dan_beban(self):
        r = app.ringkas([T("topup_kas", 2_000_000), T("topup_bank", 1_000_000), T("pengeluaran", 10_000), T("transfer", 100_000, 5_000)])
        self.assertEqual((r["kas"], r["saldo"], r["laba"]), (-2_000_000 - 10_000 + 105_000, 3_000_000 - 100_000, -5_000))

    def test_rp_dan_parse(self):
        self.assertEqual(app.rp(1234567), "Rp 1.234.567")
        self.assertEqual(app.parse_int("1.500.000"), 1500000)
        with self.assertRaises(ValueError):
            app.parse_int("abc")


if __name__ == "__main__":
    unittest.main()
