/**
 * Pembuat Google Form: Kuesioner Validasi dan Finalisasi KPI Berbasis Adaptasi IPMS
 * CV Putra Pondok Indah
 *
 * Cara pakai:
 * 1. Buka https://script.google.com -> New project.
 * 2. Hapus isi Code.gs, tempel seluruh isi file ini, lalu Save.
 * 3. Pilih fungsi buatFormKPI di toolbar, klik Run, lalu izinkan akses (Authorize).
 * 4. Buka menu Execution log: tautan form (untuk responden), tautan edit,
 *    dan tautan spreadsheet jawaban akan muncul di sana.
 */

var DATA_KPI = [
  {
    "judul": "1. Financial Performance (Kinerja Keuangan)",
    "kpi": [
      {
        "kode": "F1",
        "nama": "Pertumbuhan Penjualan",
        "desk": "Mengukur kemampuan usaha meningkatkan omzet penjualan secara berkala dari bulan ke bulan.",
        "formula": "[(Penjualan Bulan Ini - Penjualan Bulan Lalu)/Penjualan Bulan Lalu] × 100%"
      },
      {
        "kode": "F2",
        "nama": "Profitabilitas",
        "desk": "Mengukur kemampuan finansial perusahaan dalam menghasilkan margin keuntungan bersih dari total penjualan produk songkok.",
        "formula": "(Laba Bersih/ Pendapatan Penjualan) × 100%"
      },
      {
        "kode": "F3",
        "nama": "Efisiensi Biaya Produksi",
        "desk": "Mengukur ketepatan pengendalian realisasi pengeluaran biaya produksi songkok terhadap anggaran biaya standar.",
        "formula": "(Biaya Produksi Standar/ Biaya Produksi Aktual) × 100%"
      }
    ]
  },
  {
    "judul": "2. Customer and Market Performance (Kinerja Pasar & Konsumen)",
    "kpi": [
      {
        "kode": "C1",
        "nama": "Order Fulfillment Rate",
        "desk": "Mengukur kemampuan pemenuhan kuantitas songkok yang diproduksi terhadap total pesanan masuk pelanggan (terutama untuk menguji underproduction/overproduction)",
        "formula": "(Jumlah Kuantitas Produksi Riil / Jumlah Permintaan Pasar) × 100%"
      },
      {
        "kode": "C2",
        "nama": "Customer Lead Time",
        "desk": "Mengukur total waktu tunggu pelanggan sejak menyerahkan detail pesanan songkok hingga pesanan selesai dikirimkan.",
        "formula": "Tanggal Pesanan Selesai - Tanggal Pesanan Diterima (Hari)"
      },
      {
        "kode": "C3",
        "nama": "Tingkat Keluhan Pelanggan",
        "desk": "Mengukur persentase ketidakpuasan mitra atau pembeli songkok terhadap kualitas layanan penjualan.",
        "formula": "(Jumlah Komplain Pelanggan / Total Pesanan) × 100%"
      }
    ]
  },
  {
    "judul": "3. Internal Manufacturing Process (Proses Manufaktur Internal)",
    "kpi": [
      {
        "kode": "P1",
        "nama": "Produktivitas Pengrajin",
        "desk": "Mengukur efisiensi output songkok rata-rata yang mampu diselesaikan oleh pengrajin dalam satuan periode waktu.",
        "formula": "Jumlah Output Produksi / Jumlah Pengrajin (Kodi/Orang)"
      },
      {
        "kode": "P2",
        "nama": "Lead Time Produksi",
        "desk": "Mengukur total waktu pemrosesan internal sejak pemotongan bahan beludru dimulai sampai tahap akhir penyusunan kotak (packaging).",
        "formula": "Tanggal Produksi Selesai - Tanggal Produksi Dimulai (Hari)"
      },
      {
        "kode": "P3",
        "nama": "Fleksibilitas Kapasitas Produksi",
        "desk": "Mengukur kapabilitas sistem manufaktur dalam meningkatkan volume kapasitas kerja normal secara internal.",
        "formula": "[(Kapasitas Maksimum - Kapasitas Normal) / Kapasitas Normal] × 100%"
      },
      {
        "kode": "P4",
        "nama": "Efisiensi Penggunaan Bahan Baku",
        "desk": "Mengukur tingkat optimalisasi penggunaan material beludru dan kain pelapis untuk meminimalisasi sisa kain (waste).",
        "formula": "(Kebutuhan Bahan Baku Standar / Bahan Baku Aktual Terpakai) × 100%"
      }
    ]
  },
  {
    "judul": "4. Quality Performance (Kinerja Kualitas)",
    "kpi": [
      {
        "kode": "Q1",
        "nama": "Defect Rate Produk",
        "desk": "Mengukur persentase produk songkok cacat (cacat jahitan, simetri, beludru tergores) yang teridentifikasi selama masa inspeksi.",
        "formula": "(Jumlah Produk Cacat / Total Hasil Produksi) × 100%"
      },
      {
        "kode": "Q2",
        "nama": "Produk Tidak Sesuai Standar",
        "desk": "Mengukur volume songkok hasil jahit manual pengrajin yang gagal lolos seleksi kelayakan standar dimensi atau ukuran produk.",
        "formula": "(Jumlah Produk Tidak Sesuai Standar / Total Produksi) × 100%"
      },
      {
        "kode": "Q3",
        "nama": "Konsistensi Kualitas Produk",
        "desk": "Mengukur kestabilan variasi defect rate antar-periode produksi songkok untuk menguji ketergantungan pada kestabilan keahlian tangan.",
        "formula": "1 – (Standar Deviasi Defect Rate Antarperiode / Rata-Rata Defect Rate Antarperiode)"
      }
    ]
  },
  {
    "judul": "5. Craft Workforce Capability (Kapasitas SDM Lokal)",
    "kpi": [
      {
        "kode": "H1",
        "nama": "Ketersediaan Pengrajin Terampil",
        "desk": "Mengukur rasio pemenuhan alokasi pengrajin jahit songkok ahli yang tersedia terhadap total kebutuhan aktual operasional.",
        "formula": "(Jumlah Pengrajin Terampil Tersedia / Jumlah Pengrajin Terampil Dibutuhkan) × 100%"
      },
      {
        "kode": "H2",
        "nama": "Rasio Pekerja Multi-Skill",
        "desk": "Mengukur fleksibilitas internal tenaga kerja kerajinan songkok yang memiliki kompetensi gabungan (potong pola, jahit, sekaligus finishing).",
        "formula": "(Jumlah Pekerja Multi-Skill / Total Tenaga Kerja Internal) × 100%"
      },
      {
        "kode": "H3",
        "nama": "Produktivitas Tenaga Kerja",
        "desk": "Mengukur kontribusi total seluruh staf gabungan (staf tetap dan borongan musiman) dalam menghasilkan output produk akhir.",
        "formula": "Jumlah Produksi / Total Tenaga Kerja yang Terlibat"
      },
      {
        "kode": "H4",
        "nama": "Transfer Pengetahuan Pengrajin",
        "desk": "Mengukur tingkat efektivitas pewarisan kecakapan tacit knowledge pembuatan songkok tradisional dari pengrajin senior kepada pekerja junior/borongan.",
        "formula": "(Jumlah Pekerja Junior/Borongan yang Telah Menjalani Pendampingan Pengrajin Senior / Total Pekerja Junior/Borongan) × 100%"
      }
    ]
  },
  {
    "judul": "6. Dynamic Capability and Adaptability (Kapabilitas Dinamis & Adaptabilitas)",
    "kpi": [
      {
        "kode": "A1",
        "nama": "Adaptasi Perubahan Permintaan",
        "desk": "Mengukur kecepatan respons penyesuaian volume output pabrik untuk mengejar ketertinggalan fluktuasi permintaan pasar bulanan.",
        "formula": "(Perubahan Jumlah Produksi / Perubahan Jumlah Permintaan) × 100%"
      },
      {
        "kode": "A2",
        "nama": "Kemampuan Inovasi dan Adaptasi Produk",
        "desk": "Mengukur daya tanggap variasi desain songkok (tinggi songkok, jenis AC/Non-AC, border hiasan) mengikuti tren pasar terbaru.",
        "formula": "Jumlah Varian/Model Produk Baru yang Diluncurkan per Periode"
      },
      {
        "kode": "A3",
        "nama": "Fleksibilitas Kapasitas Saat Musim Puncak",
        "desk": "Mengukur tingkat elastisitas peningkatan kapasitas produksi menggunakan tenaga borongan musiman untuk mengatasi lonjakan permintaan ekstrem menjelang Idulfitri.",
        "formula": "[(Kapasitas Produksi Musim Puncak - Kapasitas Produksi Normal) / Kapasitas Produksi Normal] × 100%"
      }
    ]
  }
];

var SKALA = '1 = Sangat Tidak Sesuai, 2 = Tidak Sesuai, 3 = Cukup Sesuai, 4 = Sesuai, 5 = Sangat Sesuai';

function buatFormKPI() {
  var form = FormApp.create('Kuesioner Validasi dan Finalisasi KPI Berbasis Adaptasi IPMS – CV Putra Pondok Indah');
  form.setDescription(
    'Bapak/Ibu yang terhormat,\n\n' +
    'Kuesioner ini merupakan bagian dari penelitian mengenai pengembangan Model Adaptasi Integrated Performance ' +
    'Measurement System (IPMS) untuk Evaluasi Kinerja Dinamis pada UMKM Songkok Berbasis Craft-Based Manufacturing ' +
    '(Studi Kasus: CV Putra Pondok Indah).\n\n' +
    'Kuesioner ini bertujuan memvalidasi dan memfinalisasi Key Performance Indicator (KPI) berdasarkan penilaian ' +
    'pakar (expert judgement) dari pihak yang memiliki pengalaman, pengetahuan, dan pemahaman terhadap kondisi ' +
    'operasional serta strategi pengembangan perusahaan. Hasil penilaian digunakan untuk menetapkan KPI final yang ' +
    'selanjutnya dibobot menggunakan metode Analytical Hierarchy Process (AHP).\n\n' +
    'Jawaban Bapak/Ibu hanya digunakan untuk keperluan penelitian dan dijaga kerahasiaannya.');
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage('Terima kasih atas partisipasi Bapak/Ibu.');

  // ---------- A. Identitas pakar
  form.addSectionHeaderItem().setTitle('A. IDENTITAS PAKAR (EXPERT)');
  form.addMultipleChoiceItem()
      .setTitle('Kategori pakar')
      .setChoiceValues([
        'Pemilik Usaha (Owner CV Putra Pondok Indah)',
        'Kepala / Pengelola Bagian Produksi',
        'Bagian Gudang dan Logistik Persediaan',
        'Bagian Penjahitan Songkok',
        'Bagian Akhir (Finishing & Packaging)',
        'Pengrajin Senior / Tenaga Kerja Ahli',
        'Pengrajin Junior / Tenaga Kerja'])
      .showOtherOption(true)
      .setRequired(true);
  form.addTextItem().setTitle('Nama responden').setRequired(true);
  form.addMultipleChoiceItem().setTitle('Jenis kelamin')
      .setChoiceValues(['Laki-laki', 'Perempuan']).setRequired(true);
  form.addTextItem().setTitle('Umur (tahun)').setRequired(true)
      .setValidation(FormApp.createTextValidation()
        .setHelpText('Isi dengan angka, misalnya 35.')
        .requireNumberBetween(15, 90).build());
  form.addTextItem().setTitle('Jabatan / peran').setRequired(true);
  form.addTextItem().setTitle('Pengalaman kerja di CV Putra Pondok Indah (tahun)').setRequired(true)
      .setValidation(FormApp.createTextValidation()
        .setHelpText('Isi dengan angka, misalnya 10.')
        .requireNumberBetween(0, 70).build());

  // ---------- B. Petunjuk
  form.addPageBreakItem().setTitle('B. PETUNJUK PENGISIAN').setHelpText(
    'Berikan penilaian terhadap tingkat kesesuaian setiap KPI sebagai indikator pengukuran kinerja ' +
    'CV Putra Pondok Indah berdasarkan kondisi aktual perusahaan.\n\n' +
    'Skala penilaian:\n1 = Sangat Tidak Sesuai\n2 = Tidak Sesuai\n3 = Cukup Sesuai\n4 = Sesuai\n5 = Sangat Sesuai\n\n' +
    'Catatan: formula pada setiap KPI dicantumkan sebagai bahan pertimbangan dalam menilai keterukuran KPI ' +
    'dan ketersediaan datanya di perusahaan. Bapak/Ibu tidak perlu melakukan perhitungan apa pun.');

  // ---------- C. Penilaian KPI per dimensi
  DATA_KPI.forEach(function (sec) {
    form.addPageBreakItem().setTitle(sec.judul).setHelpText('Skala: ' + SKALA);
    sec.kpi.forEach(function (k) {
      form.addScaleItem()
          .setTitle(k.kode + ' – ' + k.nama)
          .setHelpText(k.desk + '\nFormula: ' + k.formula)
          .setBounds(1, 5)
          .setLabels('Sangat Tidak Sesuai', 'Sangat Sesuai')
          .setRequired(true);
    });
    form.addParagraphTextItem()
        .setTitle('Catatan atau saran untuk KPI pada dimensi ini (opsional)')
        .setRequired(false);
  });

  // ---------- Spreadsheet jawaban
  var ss = SpreadsheetApp.create('Jawaban Kuesioner KPI – CV Putra Pondok Indah');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Tautan untuk responden : ' + form.getPublishedUrl());
  Logger.log('Tautan edit form       : ' + form.getEditUrl());
  Logger.log('Spreadsheet jawaban    : ' + ss.getUrl());
}
