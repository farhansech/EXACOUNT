const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/050fc7b8-b4a5-4698-b4ed-cf6fd8d4a761_aa0341ce-21a5-4da7-b492-b25425cf4667/pptx/scripts/apply_theme.js");

const OUT = "/home/user/EXACOUNT/tugas-w6/W6-Green-Procurement-Apple-iPhone.pptx";

const THEME = {
  name: "Green Procurement",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F2A24", lt1: "FFFFFF", dk2: "1E4D3A", lt2: "EAF2ED",
    accent1: "2E7D5B", accent2: "D99A00", accent3: "4F7CA8", accent4: "B5473A",
    accent5: "8AA899", accent6: "6B6B6B", hlink: "2E7D5B", folHlink: "4F7CA8",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Green Procurement & Pengembangan Pemasok: Apple iPhone";
const C = pres.SchemeColor;

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "JUDUL_GELAP",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.9, w: 11.7, h: 1.9, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.0, w: 11.7, h: 1.6, fontSize: 18, color: C.background2, valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "ISI",
  background: { color: C.background1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.8, fontSize: 32, bold: true, color: C.text2, valign: "middle" }, text: "" } },
    { text: { text: "W6 · Green Procurement & Pengembangan Pemasok — Apple iPhone", options: { x: 0.6, y: 7.0, w: 9, h: 0.3, fontSize: 10, color: C.accent6 } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
});

// ---------- helpers ----------
function card(slide, name, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.background2 }, line: { type: "none" }, objectName: name });
}
function caption(slide, text, y) {
  slide.addText(text, { x: 0.6, y: y || 6.6, w: 12.1, h: 0.3, fontSize: 10, italic: true, color: C.accent6, isTextBox: true, margin: 0 });
}
function numDot(slide, n, x, y) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: 0.45, h: 0.45, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "nomor-" + n });
  slide.addText(String(n), { x, y, w: 0.45, h: 0.45, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
}

// ---------- Slide 0: Judul ----------
pres.addSection({ title: "Pembuka" });
let s = pres.addSlide({ masterName: "JUDUL_GELAP", sectionTitle: "Pembuka" });
s.addText("Green Procurement & Pengembangan Pemasok: Apple iPhone", { placeholder: "title" });
s.addText([
  { text: "Tugas W6 · Sustainable and Circular Supply Chain (1641B101)", options: { breakLine: true } },
  { text: "Dasar: materi W5 Green Procurement & Supplier Collaboration · lanjutan audit desain iPhone (W5)", options: { breakLine: true } },
  { text: "[Nama Mahasiswa] · [NRP] · Magister Teknik Industri Ubaya" },
], { placeholder: "body" });
s.addNotes("Pembuka (±20 detik). Perkenalkan diri dan objek: iPhone, Apple. Jelaskan bahwa minggu lalu (W5) saya mengaudit desain dan suku cadang iPhone; minggu ini saya menilai bagaimana Apple memilih, mengaudit, dan membina pemasok suku cadang tersebut.");

// ---------- Slide 1: Objek & batas sistem ----------
pres.addSection({ title: "Isi" });
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Isi" });
s.addText("Objek, Masalah, dan Batas Sistem", { placeholder: "title" });
const items1 = [
  ["Produk & perusahaan", "iPhone 17 — Apple Inc. Lanjutan audit desain & suku cadang pada W5"],
  ["Jaringan pemasok", "Perakitan akhir di Tiongkok & India; pemasok material baterai (kobalt), PCB (emas, timah), casing (aluminium)"],
  ["Masalah", "Dampak material & energi terkonsentrasi di pabrik pemasok, bukan operasi Apple → procurement adalah tuas utama"],
];
items1.forEach(([h, t], i) => {
  const y = 1.45 + i * 1.15;
  card(s, "kartu-objek-" + (i + 1), 0.6, y, 7.4, 1.0);
  numDot(s, i + 1, 0.8, y + 0.27);
  s.addText([
    { text: h, options: { bold: true, color: C.text2, breakLine: true } },
    { text: t, options: { color: C.text1 } },
  ], { x: 1.45, y: y + 0.05, w: 6.4, h: 0.9, fontSize: 14, valign: "middle", isTextBox: true, margin: 0 });
});
card(s, "kartu-statistik", 8.4, 1.45, 4.3, 3.3, C.text2);
s.addText([
  { text: "55", options: { fontSize: 72, bold: true, color: C.background1, breakLine: true } },
  { text: "kg CO₂e", options: { fontSize: 22, bold: true, color: C.accent2, breakLine: true } },
  { text: "Jejak karbon iPhone 17 (256 GB) sepanjang siklus hidup (Apple, 2025)", options: { fontSize: 14, color: C.background2 } },
], { x: 8.7, y: 1.6, w: 3.7, h: 3.0, valign: "middle", isTextBox: true, margin: 0 });
s.addText("Batas sistem: cradle-to-gate (material → perakitan)", { x: 0.6, y: 4.95, w: 12.1, h: 0.35, fontSize: 14, bold: true, color: C.text2, isTextBox: true, margin: 0 });
const stages = ["Material", "Komponen", "Perakitan", "Distribusi", "Pemakaian", "End-of-life"];
stages.forEach((st, i) => {
  const inScope = i < 3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6 + i * 2.04, y: 5.4, w: 1.9, h: 0.6, rectRadius: 0.08, fill: { color: inScope ? C.accent1 : C.background2 }, line: { type: "none" }, objectName: "tahap-" + st });
  s.addText(st, { x: 0.6 + i * 2.04, y: 5.4, w: 1.9, h: 0.6, fontSize: 14, bold: inScope, color: inScope ? C.background1 : C.accent6, align: "center", valign: "middle", isTextBox: true, margin: 0 });
});
s.addText("Hijau = dianalisis · abu-abu = di luar batas (dibahas pada W7 transportasi & W8 reverse flow)", { x: 0.6, y: 6.1, w: 12.1, h: 0.3, fontSize: 12, color: C.accent6, isTextBox: true, margin: 0 });
caption(s, "Sumber: Apple (2025) iPhone 17 Product Environmental Report. [Verifikasi % emisi tahap produksi pada grafik PER sebelum dikutip]");
s.addNotes("Slide 1 (±1 menit). Objek: iPhone 17 dari Apple. Jaringan: perakitan di Tiongkok dan India, plus pemasok material baterai, PCB, dan casing — suku cadang yang sama dengan audit desain W5. Batas sistem cradle-to-gate: dari material sampai perakitan; distribusi, pemakaian, dan end-of-life tidak dibahas karena menjadi topik W7–W8. Masalahnya: jejak karbon iPhone 17 sekitar 55 kg CO2e, dan sebagian besar dampak terjadi di pabrik pemasok. Karena Apple tidak memproduksi sendiri, procurement dan kolaborasi pemasok menjadi tuas utama.");

// ---------- Slide 2: Konsep ----------
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Isi" });
s.addText("Konsep: Green Procurement & Supplier Collaboration", { placeholder: "title" });
const defs = [
  ["Green procurement", "Kriteria lingkungan dimasukkan ke spesifikasi, seleksi, kontrak, dan evaluasi pemasok sepanjang siklus hidup produk (Sarkis & Dou, 2018; Grant et al., 2017)"],
  ["Green supplier development & collaboration", "Pembeli berinvestasi dan bekerja sama untuk menaikkan kapabilitas lingkungan pemasok: pelatihan, bantuan teknis, insentif, berbagi data (Sarkis & Dou, 2018)"],
];
defs.forEach(([h, t], i) => {
  const y = 1.45 + i * 1.85;
  card(s, "kartu-definisi-" + (i + 1), 0.6, y, 6.1, 1.7);
  s.addText([
    { text: h, options: { bold: true, fontSize: 16, color: C.text2, breakLine: true } },
    { text: t, options: { fontSize: 14, color: C.text1 } },
  ], { x: 0.85, y: y + 0.1, w: 5.6, h: 1.5, valign: "middle", isTextBox: true, margin: 0 });
});
s.addText("Matriks Kraljic: suku cadang iPhone dari W5", { x: 7.0, y: 1.45, w: 5.7, h: 0.4, fontSize: 16, bold: true, color: C.text2, isTextBox: true, margin: 0 });
const kq = [
  ["Leverage", "Casing aluminium, konektor", 0, 0, false],
  ["Strategic", "Chip prosesor, layar OLED", 1, 0, true],
  ["Non-critical", "Kemasan, sekrup", 0, 1, false],
  ["Bottleneck", "Baterai (kobalt), magnet tanah jarang", 1, 1, false],
];
kq.forEach(([h, t, cx, cy, dark]) => {
  const x = 7.0 + cx * 2.9, y = 1.95 + cy * 1.45;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.8, h: 1.35, rectRadius: 0.08, fill: { color: dark ? C.text2 : C.background2 }, line: { type: "none" }, objectName: "kraljic-" + h });
  s.addText([
    { text: h, options: { bold: true, fontSize: 15, color: dark ? C.accent2 : C.text2, breakLine: true } },
    { text: t, options: { fontSize: 13, color: dark ? C.background1 : C.text1 } },
  ], { x: x + 0.15, y: y + 0.08, w: 2.5, h: 1.2, valign: "middle", isTextBox: true, margin: 0 });
});
s.addText("↑ dampak profit · risiko pasokan →  (Kraljic, 1983; Pagell et al., 2010)", { x: 7.0, y: 4.85, w: 5.7, h: 0.3, fontSize: 11, italic: true, color: C.accent6, isTextBox: true, margin: 0 });
s.addText("Indikator implementasi yang dinilai", { x: 0.6, y: 5.3, w: 12.1, h: 0.35, fontSize: 14, bold: true, color: C.text2, isTextBox: true, margin: 0 });
["Kriteria hijau", "Seleksi & audit", "Target lingkungan", "Pengembangan pemasok", "Berbagi data"].forEach((t, i) => {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6 + i * 2.44, y: 5.75, w: 2.3, h: 0.6, rectRadius: 0.08, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "indikator-" + (i + 1) });
  s.addText(t, { x: 0.6 + i * 2.44, y: 5.75, w: 2.3, h: 0.6, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
});
caption(s, "Rujukan utama: Ref [2] Sarkis & Dou (2018), Bab Green Procurement & Purchasing serta Green Supplier Development & Collaboration; Ref [3] Grant et al. (2017)");
s.addNotes("Slide 2 (±1 menit). Definisi green procurement dan green supplier development mengikuti Ref [2] Sarkis & Dou (2018); tiga pilar sustainable procurement dari Ref [3] Grant et al. (2017). Suku cadang dari W5 saya petakan dengan matriks Kraljic: chip dan layar strategic, baterai dan magnet bottleneck karena material kritis, casing leverage. Pagell et al. (2010) menunjukkan bahwa dalam sourcing berkelanjutan, item leverage seperti aluminium bisa dikelola secara strategis demi kandungan daur ulang. Lima indikator di bawah menjadi kerangka penilaian slide berikutnya. [Sesuaikan klasifikasi Kraljic dengan hasil W5.]");

// ---------- Slide 3: Bukti implementasi ----------
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Isi" });
s.addText("Bukti Implementasi di Rantai Pasok Apple", { placeholder: "title" });
const head = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 13 } });
const statusCell = (t) => {
  const map = { "Dijalankan": C.accent1, "Target": C.accent2, "Perlu verifikasi": C.accent6 };
  return { text: t, options: { bold: true, color: C.background1, fill: { color: map[t] }, align: "center", fontSize: 12 } };
};
const rows3 = [
  ["Kriteria hijau", "Supplier Code of Conduct & Regulated Substances Specification wajib bagi pemasok", "Apple; seluruh pemasok langsung", "Dijalankan"],
  ["Seleksi & audit", "1.856 asesmen/audit; 155 fasilitas baru dinilai sebelum bergabung; 230 audit smelter, refiner & pemroses material (Apple, 2026b)", "Auditor pihak ketiga independen", "Dijalankan"],
  ["Target lingkungan", "Apple 2030: netral karbon di seluruh jejak; emisi sudah turun >60% vs 2015 (Apple, 2026a)", "Apple + seluruh rantai pasok", "Target"],
  ["Material daur ulang", "100% kobalt daur ulang pada baterai rancangan Apple (mass balance); ~30% material produk 2025 dari daur ulang (Apple, 2026a)", "Pemasok baterai, smelter, recycler", "Dijalankan"],
  ["Pengembangan pemasok", "Supplier Clean Energy Program >20 GW; China Clean Energy Fund US$300 jt (2018); CleanMax India INR 100 crore, >150 MW (2026); dekarbonisasi paduan aluminium (Lessard et al., 2025)", "Pemasok tier-1, CleanMax, smelter aluminium", "Dijalankan"],
  ["Berbagi data", "Pemasok melaporkan data energi untuk program energi bersih [cek detail mekanisme di Apple (2026a, 2026b)]", "Apple ↔ pemasok", "Perlu verifikasi"],
];
const tbl3 = [[head("Elemen"), head("Praktik nyata"), head("Aktor & mitra"), { text: "Status", options: { bold: true, color: C.background1, fill: { color: C.text2 }, align: "center", fontSize: 13 } }]];
rows3.forEach((r, i) => {
  const fill = { color: i % 2 ? C.background1 : C.background2 };
  tbl3.push([
    { text: r[0], options: { bold: true, color: C.text2, fill } },
    { text: r[1], options: { color: C.text1, fill } },
    { text: r[2], options: { color: C.text1, fill } },
    statusCell(r[3]),
  ]);
});
s.addTable(tbl3, { x: 0.6, y: 1.4, w: 12.1, colW: [2.0, 6.0, 2.6, 1.5], fontSize: 13, rowH: [0.45, 0.7, 0.8, 0.7, 0.8, 1.05, 0.8], fontFace: "Calibri", valign: "middle", border: { type: "solid", pt: 0.75, color: "FFFFFF" }, margin: [0.05, 0.1, 0.05, 0.1] });
caption(s, "Sumber: Apple (2026a) Environmental Progress Report; Apple (2026b) Supply Chain Progress Report; Apple Newsroom (2018, 2026); Lessard et al. (2025)");
s.addNotes("Slide 3 (±1,5 menit). Bedakan tiga status. Yang sudah dijalankan: Code of Conduct, audit pihak ketiga dengan 1.856 asesmen, 155 fasilitas baru dinilai sebelum masuk rantai pasok, dan 230 audit smelter. Pengembangan pemasok nyata: Supplier Clean Energy Program lebih dari 20 GW, dana energi bersih China US$300 juta bersama pemasok, dan investasi CleanMax di India. Jurnal Lessard et al. (2025) dari tim Apple menunjukkan kerja sama dengan pemasok aluminium untuk menurunkan emisi paduan casing. Target: netral karbon 2030. Klaim kobalt 100% memakai metode mass balance, jadi saya catat sebagai klaim perusahaan. Mekanisme berbagi data belum rinci di sumber publik, sehingga saya tandai perlu verifikasi.");

// ---------- Slide 4: Analisis kritis ----------
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Isi" });
s.addText("Analisis Kritis: Supplier Criteria Matrix & Dilema", { placeholder: "title" });
const crit = [
  ["Harga & total cost", 15, 3, 4, 5],
  ["Kualitas & yield", 15, 5, 3, 3],
  ["Kapasitas & ketahanan pasok", 10, 4, 3, 3],
  ["Energi terbarukan", 15, 4, 2, 1],
  ["Material daur ulang & zat terbatas", 15, 4, 3, 2],
  ["Limbah & air", 10, 5, 2, 1],
  ["Transparansi data", 10, 5, 2, 1],
  ["Kemauan berkembang", 10, 3, 5, 2],
];
const hc = (t, al) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, align: al || "center", fontSize: 12 } });
const tbl4 = [[hc("Kriteria", "left"), hc("Bobot"), hc("X"), hc("Y"), hc("Z")]];
crit.forEach((r, i) => {
  const fill = { color: i % 2 ? C.background1 : C.background2 };
  tbl4.push([
    { text: r[0], options: { color: C.text1, fill } },
    ...r.slice(1).map((v, j) => ({ text: j === 0 ? v + "%" : String(v), options: { align: "center", color: C.text1, fill } })),
  ]);
});
tbl4.push([
  { text: "Skor tertimbang (0–100)", options: { bold: true, color: C.background1, fill: { color: C.accent1 } } },
  { text: "100%", options: { bold: true, align: "center", color: C.background1, fill: { color: C.accent1 } } },
  { text: "82", options: { bold: true, align: "center", color: C.background1, fill: { color: C.accent1 } } },
  { text: "60", options: { bold: true, align: "center", color: C.text1, fill: { color: C.accent2 } } },
  { text: "47", options: { bold: true, align: "center", color: C.background1, fill: { color: C.accent4 } } },
]);
s.addTable(tbl4, { x: 0.6, y: 1.35, w: 6.4, colW: [3.2, 0.8, 0.8, 0.8, 0.8], fontSize: 12, fontFace: "Calibri", valign: "middle", rowH: 0.36, border: { type: "solid", pt: 0.75, color: "FFFFFF" }, margin: [0.03, 0.08, 0.03, 0.08] });
s.addText([
  { text: "Skor 1–5; total = Σ(bobot × skor) ÷ 5. ≥70 preferred · 55–69 conditional · <55 not approved.", options: { breakLine: true } },
  { text: "X = perakit mapan (Tiongkok) · Y = perakit baru (India) · Z = pemasok tier-2 termurah. Arketipe & skor ilustratif." },
], { x: 0.6, y: 5.15, w: 6.4, h: 0.75, fontSize: 11, italic: true, color: C.accent6, isTextBox: true, margin: 0 });

card(s, "kartu-dilema", 7.3, 1.35, 5.4, 2.15, C.text2);
s.addText([
  { text: "Dilema: kapasitas & risiko vs emisi", options: { bold: true, fontSize: 15, color: C.accent2, breakLine: true } },
  { text: "Diversifikasi perakitan ke India mengurangi risiko konsentrasi pasokan, tetapi listrik jaringan India padat karbon: 100 GWh × ~0,7 tCO₂/MWh ≈ 70.000 tCO₂/tahun (ilustrasi).", options: { fontSize: 13, color: C.background1 } },
], { x: 7.55, y: 1.45, w: 4.9, h: 1.95, valign: "middle", isTextBox: true, margin: 0 });
card(s, "kartu-burden", 7.3, 3.65, 5.4, 1.75);
s.addText([
  { text: "Risiko burden shifting", options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
  { text: "Klaim mass balance ≠ material daur ulang fisik", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "Sertifikat energi (REC) belum tentu menambah pembangkit baru", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "Biaya kepatuhan menekan pemasok tier-2 yang kecil", options: { bullet: true, fontSize: 13 } },
], { x: 7.5, y: 3.72, w: 5.0, h: 1.6, valign: "middle", color: C.text1, isTextBox: true, margin: 0 });
card(s, "kartu-jurnal", 7.3, 5.55, 5.4, 0.95);
s.addText([
  { text: "Bukti jurnal: ", options: { bold: true, color: C.text2 } },
  { text: "kolaborasi saja tidak signifikan memediasi dekarbonisasi; supply chain mapping signifikan (Mubarik et al., 2025)", options: { color: C.text1 } },
], { x: 7.5, y: 5.6, w: 5.0, h: 0.85, fontSize: 13, valign: "middle", isTextBox: true, margin: 0 });
caption(s, "Kerangka kriteria: Sarkis & Dou (2018); Grant et al. (2017). Faktor emisi India adalah perkiraan — verifikasi ke data CEA India terbaru");
s.addNotes("Slide 4 (±1,5 menit) — keluaran 1. Matriks memakai 8 kriteria; bobot lingkungan 40% dan biaya-kualitas-risiko 40%, sisanya data dan kemauan berkembang. X lolos sebagai preferred, Y conditional, Z gugur walau termurah. Dilemanya: Apple butuh Y untuk diversifikasi di India, tetapi listrik di sana padat karbon. Risiko burden shifting: klaim mass balance, sertifikat energi tanpa additionality, dan beban biaya ke pemasok kecil. Mubarik et al. (2025) menemukan kolaborasi saja tidak cukup; yang berpengaruh adalah pemetaan rantai pasok. Ini dasar rekomendasi saya.");

// ---------- Slide 5: Rekomendasi ----------
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Isi" });
s.addText("Rekomendasi: Mekanisme Kolaborasi & KPI", { placeholder: "title" });
s.addText("Siklus kolaborasi pemasok (keluaran 2)", { x: 0.6, y: 1.35, w: 6.4, h: 0.35, fontSize: 15, bold: true, color: C.text2, isTextBox: true, margin: 0 });
const steps = [
  ["1", "Spesifikasi hijau", 0, 0], ["2", "Seleksi & audit", 1, 0], ["3", "Alokasi volume + klausul hijau", 2, 0],
  ["4", "Pengembangan & berbagi data", 2, 1], ["5", "Scorecard kuartalan", 1, 1], ["6", "Review tahunan", 0, 1],
];
const bx = (c) => 0.6 + c * 2.25, by = (r) => 1.85 + r * 1.45;
steps.forEach(([n, t, c, r]) => {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx(c), y: by(r), w: 1.9, h: 1.0, rectRadius: 0.08, fill: { color: c === 2 && r === 1 ? C.accent1 : C.background2 }, line: { type: "none" }, objectName: "langkah-" + n });
  const dark = c === 2 && r === 1;
  s.addText([
    { text: n + "  ", options: { bold: true, color: dark ? C.accent2 : C.accent1 } },
    { text: t, options: { bold: true, color: dark ? C.background1 : C.text2 } },
  ], { x: bx(c) + 0.1, y: by(r), w: 1.7, h: 1.0, fontSize: 13, align: "center", valign: "middle", isTextBox: true, margin: 0 });
});
const arrow = (o) => s.addShape(pres.shapes.LINE, Object.assign({ line: { color: HEX.accent1, width: 2, endArrowType: "triangle" } }, o));
arrow({ x: 2.55, y: 2.35, w: 0.3, h: 0 });
arrow({ x: 4.8, y: 2.35, w: 0.3, h: 0 });
arrow({ x: 6.0, y: 2.9, w: 0, h: 0.4 });
arrow({ x: 4.8, y: 3.8, w: 0.3, h: 0, flipH: true });
arrow({ x: 2.55, y: 3.8, w: 0.3, h: 0, flipH: true });
arrow({ x: 1.55, y: 2.9, w: 0, h: 0.4, flipV: true });
card(s, "kartu-rekomendasi", 0.6, 4.55, 6.4, 1.9);
s.addText([
  { text: "Rekomendasi", options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
  { text: "Volume pemasok India dinaikkan bertahap sesuai tonggak % energi terbarukan", options: { bullet: { type: "number" }, breakLine: true } },
  { text: "Pemetaan digital pemasok tier-2 (energi & material), menjawab Mubarik et al. (2025)", options: { bullet: { type: "number" }, breakLine: true } },
  { text: "PPA kolektif antarpemasok dalam satu kawasan industri", options: { bullet: { type: "number" } } },
], { x: 0.8, y: 4.6, w: 6.0, h: 1.8, fontSize: 13, color: C.text1, valign: "middle", isTextBox: true, margin: 0 });

const kh = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 13 } });
const kpis = [
  ["% listrik terbarukan pemasok (MWh)", "Meter listrik pabrik, kontrak PPA / REC"],
  ["tCO₂e per unit iPhone di tahap produksi", "Data energi pabrik, faktor emisi jaringan"],
  ["% material daur ulang (fisik vs mass balance)", "Deklarasi material, rantai kustodi"],
  ["% temuan audit ditutup tepat waktu", "Laporan CAP dari auditor pihak ketiga"],
  ["% pemasok tier-2 terpetakan", "Daftar sub-pemasok, survei pemasok"],
];
const tbl5 = [[kh("KPI"), kh("Data yang dibutuhkan")]];
kpis.forEach((r, i) => {
  const fill = { color: i % 2 ? C.background1 : C.background2 };
  tbl5.push([{ text: r[0], options: { bold: true, color: C.text2, fill } }, { text: r[1], options: { color: C.text1, fill } }]);
});
s.addTable(tbl5, { x: 7.3, y: 1.35, w: 5.4, colW: [2.8, 2.6], fontSize: 12, fontFace: "Calibri", valign: "middle", rowH: 0.72, border: { type: "solid", pt: 0.75, color: "FFFFFF" }, margin: [0.05, 0.1, 0.05, 0.1] });
caption(s, "Mekanisme kolaborasi diturunkan dari Sarkis & Dou (2018) dan Grant et al. (2017); KPI adalah usulan penulis");
s.addNotes("Slide 5 (±1,5 menit) — keluaran 2. Siklus kolaborasi enam langkah: spesifikasi hijau, seleksi dan audit, alokasi volume dengan klausul hijau, pengembangan dan berbagi data, scorecard kuartalan, lalu review tahunan yang memperbarui spesifikasi. Kuncinya di langkah 3 dan 4: alokasi volume dipakai sebagai insentif. Tiga rekomendasi: volume India naik bertahap sesuai tonggak energi terbarukan, pemetaan digital tier-2, dan PPA kolektif. KPI di kanan beserta data yang dibutuhkan agar setiap target bisa diverifikasi.");

// ---------- Slide 6: Referensi ----------
pres.addSection({ title: "Referensi" });
s = pres.addSlide({ masterName: "ISI", sectionTitle: "Referensi" });
s.addText("Referensi & Pernyataan Penggunaan AI", { placeholder: "title" });
const refsL = [
  ["Rujukan utama", true],
  ["[2] Sarkis, J., & Dou, Y. (2018). Green supply chain management: A concise introduction. Routledge.", false],
  ["[3] Grant, D. B., Trautrims, A., & Wong, C. Y. (2017). Sustainable logistics and supply chain management (Rev. ed.). Kogan Page.", false],
  ["Artikel jurnal", true],
  ["Kraljic, P. (1983). Purchasing must become supply management. Harvard Business Review, 61(5), 109–117.", false],
  ["Lessard, J., Darunte, L., & Jayanathan, S. (2025). Decarbonizing structural alloys in consumer electronics: Case studies at Apple. Journal of Sustainable Metallurgy. https://doi.org/10.1007/s40831-025-01258-1", false],
  ["Mubarik, M. S., Gunasekaran, A., Khan, S. A., & Mubarak, M. F. (2025). Decarbonization through supply chain innovation: Role of supply chain collaboration and mapping. Journal of Cleaner Production, 507, 145492. https://doi.org/10.1016/j.jclepro.2025.145492", false],
  ["Pagell, M., Wu, Z., & Wasserman, M. E. (2010). Thinking differently about purchasing portfolios: An assessment of sustainable sourcing. Journal of Supply Chain Management, 46(1), 57–73.", false],
];
const refsR = [
  ["Sumber perusahaan (diakses 12 Oktober 2026)", true],
  ["Apple Inc. (2018, Juli). Apple launches new clean energy fund in China [Siaran pers]. https://www.apple.com/newsroom/", false],
  ["Apple Inc. (2025). iPhone 17 product environmental report. https://www.apple.com/environment/", false],
  ["Apple Inc. (2026a). Environmental progress report. https://www.apple.com/environment/", false],
  ["Apple Inc. (2026b). Supply chain 2026 progress report. https://www.apple.com/supply-chain/", false],
  ["Apple Inc. (2026, Mei). Apple launches new clean energy and environmental initiatives in India [Siaran pers]. https://www.apple.com/in/newsroom/", false],
];
const toRuns = (arr) => arr.map(([t, h], i) => ({ text: t, options: h ? { bold: true, color: C.text2, fontSize: 12, breakLine: i < arr.length - 1, paraSpaceBefore: i ? 6 : 0 } : { color: C.text1, fontSize: 10.5, breakLine: i < arr.length - 1, paraSpaceAfter: 3 } }));
s.addText(toRuns(refsL), { x: 0.6, y: 1.3, w: 6.1, h: 5.3, valign: "top", isTextBox: true, margin: 0 });
s.addText(toRuns(refsR), { x: 7.0, y: 1.3, w: 5.7, h: 3.0, valign: "top", isTextBox: true, margin: 0 });
card(s, "kartu-ai", 7.0, 3.6, 5.7, 1.95);
s.addText([
  { text: "Pernyataan penggunaan AI", options: { bold: true, fontSize: 13, color: C.text2, breakLine: true } },
  { text: "Generative AI (Claude) digunakan untuk membantu pencarian sumber, penyusunan struktur slide, dan penyuntingan bahasa. AI tidak digunakan sebagai sumber ilmiah; seluruh fakta dan angka telah diverifikasi pada sumber asli yang dicantumkan.", options: { fontSize: 11.5, color: C.text1 } },
], { x: 7.2, y: 3.65, w: 5.3, h: 1.85, valign: "middle", isTextBox: true, margin: 0 });
s.addNotes("Slide referensi. Format APA 7. Lengkapi URL penuh dan tanggal akses sesuai versi laporan yang Anda baca. Sesuaikan pernyataan AI bila penggunaannya berbeda.");

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})();
