# Raw data for the expanded (page 2 and page 3) sections of every point.
# Citations are written from the published literature; DOIs are included only where known with confidence.

NOTE = ('Catatan interpretasi: angka dan temuan di atas berasal dari populasi dan konteks penelitian tertentu '
        '(misalnya Amerika Serikat, Eropa, atau sampel mahasiswa/karyawan). Gunakan sebagai gambaran arah, '
        'bukan jaminan hasil yang sama untuk setiap orang.')

POINTS = {}

POINTS['01'] = dict(
    photo=('Foto: profesional muda belajar skill baru di laptop dengan catatan dan kursus online',),
    sci_title='Tinjauan Ilmiah: Mengapa Skill Dihitung sebagai Investasi',
    sci=[
        'Dalam ekonomi tenaga kerja, kemampuan yang melekat pada seseorang disebut <i>human capital</i> (modal manusia). Tinjauan global atas puluhan tahun data menemukan bahwa tambahan pendidikan dan pelatihan secara konsisten berkaitan dengan pendapatan yang lebih tinggi; rata-rata imbal hasil privat sekitar 9% per tambahan tahun sekolah di berbagai negara [1]. Artinya, logika "return dari skill" yang dipakai pada simulasi di halaman sebelumnya sejalan dengan temuan riset berskala besar.',
        'Pasar kerja juga bergeser. Autor, Levy dan Murnane menunjukkan bahwa komputerisasi menggantikan tugas rutin dan meningkatkan permintaan terhadap tugas yang bersifat analitis dan interaktif [2]. Deming menemukan bahwa sejak 1980 pekerjaan yang menuntut keterampilan sosial tumbuh lebih cepat dan upahnya naik lebih tinggi, terutama pada pekerjaan yang memadukan kemampuan sosial dengan kemampuan analitis [3]. Contoh pada halaman sebelumnya, yaitu Storytelling & Brand Communication serta sertifikasi Financial Planning, termasuk kategori ini.',
        'Heckman dan Kautz menegaskan bahwa kemampuan non-kognitif seperti ketekunan, disiplin, dan kemampuan bekerja sama ikut menentukan hasil di pasar kerja dan dapat dilatih [4]. Karena itu, investasi skill tidak harus selalu berupa keahlian teknis; kemampuan komunikasi, manajemen proyek, dan kepemimpinan juga memiliki nilai ekonomi.',
    ],
    findings=[
        ['Psacharopoulos & Patrinos (2018) [1]', 'Rata-rata imbal hasil privat pendidikan sekitar 9% per tahun sekolah lintas negara.', 'Skill dan pendidikan menaikkan penghasilan jangka panjang.'],
        ['Autor, Levy & Murnane (2003) [2]', 'Teknologi menggeser permintaan dari tugas rutin ke tugas analitis dan interaktif.', 'Pilih skill yang sulit diotomatisasi.'],
        ['Deming (2017) [3]', 'Pekerjaan padat keterampilan sosial tumbuh dan upahnya naik lebih cepat sejak 1980.', 'Komunikasi dan kolaborasi adalah aset.'],
        ['Heckman & Kautz (2012) [4]', 'Soft skills memprediksi hasil pendidikan dan pekerjaan, dan dapat dikembangkan.', 'Latih kebiasaan, bukan hanya sertifikat.'],
    ],
    steps_title='Panduan Penerapan: Dari Niat ke Skill yang Menghasilkan',
    steps=[
        '<b>Audit hambatan karir.</b> Tulis tiga tugas atau kemampuan yang paling sering menahan kenaikan gaji atau jenjangmu. Skill terbaik biasanya menjawab hambatan yang paling nyata.',
        '<b>Uji permintaan pasar.</b> Buka sekitar 20 lowongan untuk posisi yang kamu tuju dan catat skill yang paling sering muncul. Pilih satu, bukan lima.',
        '<b>Anggarkan secara tetap.</b> Sisihkan porsi tetap dari uang lebihmu untuk belajar (sebagai saran awal, 5–10% dari penghasilan), setelah dana darurat 6 bulan terpenuhi.',
        '<b>Belajar berbasis proyek.</b> Targetkan satu hasil nyata dalam 30 hari (laporan, portofolio, atau proyek kecil). Pengetahuan yang tidak dipakai cepat memudar.',
        '<b>Terapkan dan ukur.</b> Catat dampaknya: tugas baru, klien baru, atau tambahan penghasilan. Komunikasikan pencapaian ke atasan atau pasar.',
    ],
    mistakes=['Mengoleksi kursus tanpa menyelesaikan proyek.', 'Mengejar sertifikat yang tidak dicari pasar.', 'Mempelajari terlalu banyak skill sekaligus.', 'Tidak mengomunikasikan skill baru kepada atasan atau calon klien.'],
    plan=[['Minggu 1', 'Audit hambatan, riset 20 lowongan, pilih satu skill.'], ['Minggu 2', 'Pelajari fondasi inti (2–3 sesi terjadwal).'], ['Minggu 3', 'Kerjakan proyek nyata atau studi kasus.'], ['Minggu 4', 'Publikasikan hasil, minta umpan balik, rencanakan langkah berikutnya.']],
    reflect=['Skill apa yang jika kamu kuasai akan paling mengurangi pekerjaan yang membuatmu terhambat?', 'Berapa jam per minggu yang realistis kamu sediakan?'],
    refs=[
        'Psacharopoulos G, Patrinos HA. Returns to investment in education: a decennial review of the global literature. <i>Education Economics</i>. 2018;26(5):445–458.',
        'Autor DH, Levy F, Murnane RJ. The skill content of recent technological change: an empirical exploration. <i>Quarterly Journal of Economics</i>. 2003;118(4):1279–1333.',
        'Deming DJ. The growing importance of social skills in the labor market. <i>Quarterly Journal of Economics</i>. 2017;132(4):1593–1640.',
        'Heckman JJ, Kautz T. Hard evidence on soft skills. <i>Labour Economics</i>. 2012;19(4):451–464.',
    ])

POINTS['02'] = dict(
    photo=('Foto: pekerja remote di meja ergonomis dengan kursi yang tepat dan monitor eksternal',),
    sci_title='Tinjauan Ilmiah: Lingkungan Kerja, Duduk, dan Tidur',
    sci=[
        'Bloom dan rekan-rekannya menjalankan eksperimen acak di perusahaan perjalanan Ctrip (Tiongkok): karyawan call center yang bekerja dari rumah dengan pengaturan yang terstruktur menunjukkan peningkatan kinerja sekitar 13% dan tingkat berhenti kerja yang lebih rendah. Peneliti juga mencatat sebagian karyawan merasa terisolasi [1]. Pesan praktisnya: bekerja dari rumah dapat produktif, tetapi lingkungan dan struktur kerja menentukan hasilnya.',
        'Terlalu lama duduk adalah faktor risiko tersendiri. Meta-analisis Biswas dan rekan menemukan bahwa waktu sedentari yang tinggi berkaitan dengan risiko lebih besar untuk kematian dari semua sebab, penyakit kardiovaskular, diabetes tipe 2, dan beberapa kanker, bahkan setelah memperhitungkan aktivitas fisik [2]. Pada uji acak berkelompok, Neuhaus dan rekan menunjukkan bahwa meja yang tinggi-nya dapat diatur mengurangi waktu duduk di tempat kerja [3]. Tujuannya bukan berdiri terus-menerus, melainkan sering berganti posisi dan bergerak.',
        'Alasan memisahkan tempat kerja dari kasur berakar pada terapi perilaku untuk insomnia. Bootzin memperkenalkan <i>stimulus control</i>, yaitu melatih otak mengaitkan kasur hanya dengan tidur [4]. Tinjauan Morin dan rekan menempatkan stimulus control sebagai salah satu terapi perilaku yang didukung bukti untuk insomnia kronis [5].',
    ],
    findings=[
        ['Bloom et al. (2015) [1]', 'Eksperimen acak WFH: kinerja naik sekitar 13%, pengunduran diri turun; sebagian merasa terisolasi.', 'Struktur dan ruang kerja khusus penting.'],
        ['Biswas et al. (2015) [2]', 'Waktu sedentari tinggi dikaitkan dengan risiko penyakit dan kematian yang lebih tinggi.', 'Kurangi duduk panjang tanpa jeda.'],
        ['Neuhaus et al. (2014) [3]', 'Meja dengan tinggi dapat diatur mengurangi waktu duduk di kantor.', 'Standing desk membantu variasi posisi.'],
        ['Morin et al. (2006) [5]', 'Stimulus control termasuk terapi perilaku yang efektif untuk insomnia kronis.', 'Kasur hanya untuk tidur.'],
    ],
    steps_title='Panduan Penerapan: Menyusun Zona Kerja yang Ergonomis',
    steps=[
        '<b>Pisahkan zona.</b> Tentukan satu meja atau sudut khusus kerja. Walau di kamar kecil, usahakan membelakangi atau memisahkannya dari kasur.',
        '<b>Atur postur dasar.</b> Sebagai panduan umum: layar setinggi mata, siku sekitar 90 derajat, telapak kaki rata di lantai, punggung bersandar.',
        '<b>Urutkan prioritas anggaran.</b> Mulai dari kursi dan meja yang layak, lalu monitor eksternal, lalu standing desk bila anggaran ada.',
        '<b>Jadwalkan jeda gerak.</b> Sebagai aturan praktis, berdiri atau berjalan singkat setiap 30–60 menit; alarm lebih andal daripada niat.',
        '<b>Buat ritual mulai dan selesai.</b> Misalnya merapikan meja dan menutup laptop agar otak tahu kapan jam kerja berakhir.',
    ],
    mistakes=['Bekerja di kasur "sebentar saja" setiap hari.', 'Membeli kursi mahal tetapi tidak menyetel tinggi dan sandarannya.', 'Memakai laptop saja dengan layar terlalu rendah.', 'Berdiri sepanjang hari tanpa variasi sebagai pengganti duduk sepanjang hari.'],
    plan=[['Minggu 1', 'Tetapkan zona kerja dan hentikan bekerja dari kasur/sofa.'], ['Minggu 2', 'Setel postur dan tinggi layar; pasang alarm jeda gerak.'], ['Minggu 3', 'Upgrade satu alat (kursi/meja/monitor) sesuai anggaran.'], ['Minggu 4', 'Evaluasi pegal, fokus, dan kualitas tidur; sesuaikan.']],
    reflect=['Bagian tubuh mana yang paling pegal di akhir hari kerja?', 'Apa satu ritual penutup kerja yang bisa kamu lakukan setiap hari?'],
    refs=[
        'Bloom N, Liang J, Roberts J, Ying ZJ. Does working from home work? Evidence from a Chinese experiment. <i>Quarterly Journal of Economics</i>. 2015;130(1):165–218.',
        'Biswas A, Oh PI, Faulkner GE, et al. Sedentary time and its association with risk for disease incidence, mortality, and hospitalization in adults: a systematic review and meta-analysis. <i>Annals of Internal Medicine</i>. 2015;162(2):123–132.',
        'Neuhaus M, Healy GN, Dunstan DW, Owen N, Eakin EG. Workplace sitting and height-adjustable workstations: a randomized controlled trial. <i>American Journal of Preventive Medicine</i>. 2014;46(1):30–40.',
        'Bootzin RR. Stimulus control treatment for insomnia. <i>Proceedings of the American Psychological Association</i>. 1972;7:395–396.',
        'Morin CM, Bootzin RR, Buysse DJ, et al. Psychological and behavioral treatment of insomnia: update of the recent evidence (1998–2004). <i>Sleep</i>. 2006;29(11):1398–1414.',
    ])

POINTS['03'] = dict(
    photo=('Foto: orang dewasa bermain piano dan bermain tenis di akhir pekan',),
    sci_title='Tinjauan Ilmiah: Hobi, Pemulihan, dan Performa Kerja',
    sci=[
        'Eschleman dan rekan menemukan bahwa aktivitas kreatif di luar pekerjaan berkaitan dengan pengalaman pemulihan seperti relaksasi, rasa menguasai (<i>mastery</i>), dan rasa kendali, serta dengan hasil terkait kinerja seperti kreativitas dan perilaku membantu rekan kerja [1]. Temuan ini mendukung pernyataan di halaman sebelumnya bahwa hobi kreatif mempercepat pemulihan dari stres kerja.',
        'Sonnentag, melalui studi harian, menemukan bahwa pemulihan yang baik pada waktu luang berkaitan dengan keterlibatan kerja dan perilaku proaktif pada hari berikutnya [2]. Dengan kata lain, malam yang diisi aktivitas yang benar-benar memulihkan dapat meningkatkan kualitas esok hari.',
        'Tinjauan Organisasi Kesehatan Dunia (WHO) atas lebih dari 3.000 studi menyimpulkan bahwa keterlibatan dalam seni dan aktivitas kreatif berkaitan dengan manfaat bagi kesehatan mental dan fisik [3]. Untuk hobi fisik, studi kohort pada lebih dari 80.000 orang dewasa di Inggris menemukan bahwa olahraga raket, termasuk tenis, berkaitan dengan risiko kematian yang lebih rendah [4].',
        'Mengapa hobi tidak sama dengan "belanja"? Van Boven dan Gilovich menemukan bahwa pembelian berupa pengalaman cenderung memberi kepuasan yang lebih besar dan bertahan lebih lama dibanding pembelian barang [5]. Les piano atau kelas tenis adalah pembelian pengalaman.',
    ],
    findings=[
        ['Eschleman et al. (2014) [1]', 'Aktivitas kreatif di luar kerja berkaitan dengan pemulihan dan performa kerja.', 'Hobi kreatif menopang kinerja.'],
        ['Sonnentag (2003) [2]', 'Pemulihan saat waktu luang memprediksi keterlibatan dan inisiatif kerja esok hari.', 'Waktu luang berkualitas = modal besok.'],
        ['Fancourt & Finn (2019) [3]', 'Tinjauan WHO: keterlibatan seni berkaitan dengan manfaat kesehatan.', 'Hobi seni layak dianggarkan.'],
        ['Oja et al. (2017) [4]', 'Olahraga raket berkaitan dengan risiko kematian lebih rendah pada kohort besar.', 'Tenis baik untuk jangka panjang.'],
        ['Van Boven & Gilovich (2003) [5]', 'Pembelian pengalaman lebih memuaskan daripada pembelian barang.', 'Utamakan pengalaman.'],
    ],
    steps_title='Panduan Penerapan: Memulai Hobi Tanpa Menunda',
    steps=[
        '<b>Pilih hobi yang prosesnya kamu nikmati,</b> bukan yang hasilnya paling impresif. Tanyakan: apa yang dulu ingin kamu coba?',
        '<b>Mulai kecil dan murah dulu.</b> Satu kelas percobaan atau alat dasar sudah cukup sebelum membeli perlengkapan mahal.',
        '<b>Kunci jadwalnya.</b> Tetapkan hari dan jam tetap setiap minggu seperti rapat penting yang tidak dibatalkan.',
        '<b>Cari komunitas atau guru.</b> Kelas rutin berbayar memberi akuntabilitas, sama seperti prinsip pada Upgrade 06.',
        '<b>Tinjau tiap 8 minggu.</b> Lanjutkan jika memulihkan energi; ganti hobi jika terasa seperti beban baru.',
    ],
    mistakes=['Membeli perlengkapan mahal sebelum yakin menyukainya.', 'Mengukur hobi dengan target prestasi sehingga berubah menjadi tekanan.', 'Mengganti hobi dengan scrolling layar yang pasif.', 'Membatalkan sesi hobi ketika pekerjaan sedang padat.'],
    plan=[['Minggu 1', 'Daftar tiga hobi kandidat dan pilih satu untuk dicoba.'], ['Minggu 2', 'Ikuti kelas percobaan atau sesi pertama.'], ['Minggu 3', 'Kunci jadwal mingguan dan siapkan perlengkapan dasar.'], ['Minggu 4', 'Evaluasi: apakah energi dan suasana hati membaik setelah sesi?']],
    reflect=['Aktivitas apa yang membuatmu lupa waktu saat kecil atau remaja?', 'Hari apa dalam seminggu paling realistis untuk dikunci?'],
    refs=[
        'Eschleman KJ, Madsen J, Alarcon G, Barelka A. Benefiting from creative activity: the positive relationships between creative activity, recovery experiences, and performance-related outcomes. <i>Journal of Occupational and Organizational Psychology</i>. 2014;87(3):579–598.',
        'Sonnentag S. Recovery, work engagement, and proactive behavior: a new look at the interface between nonwork and work. <i>Journal of Applied Psychology</i>. 2003;88(3):518–528.',
        'Fancourt D, Finn S. <i>What is the evidence on the role of the arts in improving health and well-being? A scoping review.</i> WHO Regional Office for Europe, Health Evidence Network synthesis report 67; 2019.',
        'Oja P, Kelly P, Pedisic Z, et al. Associations of specific types of sports and exercise with all-cause and cardiovascular-disease mortality: a cohort study of 80 306 British adults. <i>British Journal of Sports Medicine</i>. 2017;51(10):812–817.',
        'Van Boven L, Gilovich T. To do or to have? That is the question. <i>Journal of Personality and Social Psychology</i>. 2003;85(6):1193–1202.',
    ])

POINTS['04'] = dict(
    photo=('Foto: seseorang tidur nyenyak di kamar yang tenang dengan kasur dan bantal nyaman',),
    sci_title='Tinjauan Ilmiah: Konsistensi Sirkadian, Durasi, dan Kasur',
    sci=[
        'Studi Harvard yang dirujuk pada halaman sebelumnya dilakukan oleh Phillips dan rekan pada 61 mahasiswa selama sekitar 30 hari. Mahasiswa dengan pola tidur-bangun yang tidak teratur memiliki fase sirkadian yang tertunda dan performa akademik yang lebih rendah; pergeseran jam biologisnya sebanding dengan <i>jetlag</i> sosial [1]. Temuan ini menegaskan bahwa regularitas jam tidur sama pentingnya dengan durasi.',
        'Soal durasi, panduan National Sleep Foundation merekomendasikan 7–9 jam per malam untuk orang dewasa [2], dan pernyataan konsensus American Academy of Sleep Medicine dan Sleep Research Society menyatakan bahwa orang dewasa sebaiknya tidur setidaknya 7 jam per malam secara teratur untuk menjaga kesehatan optimal [3].',
        'Mengenai kasur, uji acak oleh Kovacs dan rekan pada pasien nyeri punggung bawah kronis di Spanyol menemukan bahwa kasur berkekerasan sedang memberi hasil nyeri yang lebih baik daripada kasur keras [4]. Kenyamanan bersifat individual, sehingga uji coba langsung dan garansi pengembalian adalah bagian dari investasi yang cerdas.',
        'Tinjauan Irish dan rekan atas bukti empiris tentang kebersihan tidur (<i>sleep hygiene</i>) mengaitkan hal-hal seperti jadwal teratur, membatasi kafein dan alkohol menjelang tidur, serta lingkungan kamar yang kondusif dengan tidur yang lebih baik [5].',
    ],
    findings=[
        ['Phillips et al. (2017) [1]', 'Jam tidur tidak teratur: fase sirkadian tertunda dan performa akademik lebih rendah.', 'Jaga jam tidur dan bangun, termasuk akhir pekan.'],
        ['Hirshkowitz et al. (2015) [2]', 'Rekomendasi tidur dewasa 7–9 jam per malam.', 'Targetkan durasi dan konsistensi.'],
        ['Watson et al. (2015) [3]', 'Konsensus: dewasa sebaiknya tidur minimal 7 jam per malam secara teratur.', 'Tidur kurang dari 7 jam rutin berisiko.'],
        ['Kovacs et al. (2003) [4]', 'Kasur berkekerasan sedang lebih baik daripada kasur keras untuk nyeri punggung kronis.', 'Uji kasur sebelum membeli.'],
    ],
    steps_title='Panduan Penerapan: Rutinitas Tidur 14 Hari',
    steps=[
        '<b>Tetapkan jam bangun dahulu,</b> lalu hitung mundur 7–9 jam untuk jam tidur. Jam bangun adalah jangkar ritme sirkadian.',
        '<b>Terapkan hari kerja dan akhir pekan sama,</b> dengan selisih sebisa mungkin tidak lebih dari sekitar satu jam.',
        '<b>Buat ritual 30–60 menit sebelum tidur:</b> redupkan lampu, jauhkan pekerjaan dan layar yang menegangkan, dan tetapkan batas kafein pada siang hari.',
        '<b>Optimalkan kamar:</b> gelap, tenang, suhu nyaman, serta kasur dan bantal yang sesuai posturmu.',
        '<b>Catat hasilnya</b> selama 14 hari (energi pagi, fokus, suasana hati) sebagai bukti bahwa investasi ini bekerja.',
    ],
    mistakes=['Membayar tidur di akhir pekan sehingga jam biologis bergeser.', 'Membeli kasur mahal tanpa mencoba kekerasannya.', 'Membawa pekerjaan ke tempat tidur.', 'Minum kafein terlalu sore.'],
    plan=[['Minggu 1', 'Tetapkan jam tidur dan jam bangun; mulai catat.'], ['Minggu 2', 'Selesaikan tantangan 14 hari tanpa pengecualian.'], ['Minggu 3', 'Perbaiki lingkungan kamar; evaluasi kasur dan bantal.'], ['Minggu 4', 'Pertahankan rutinitas dan bandingkan energi harian dengan minggu 1.']],
    reflect=['Pada jam berapa kamu benar-benar mengantuk jika tidak memegang ponsel?', 'Apa satu kebiasaan malam yang paling sering menggeser jam tidurmu?'],
    refs=[
        'Phillips AJK, Clerx WM, O\'Brien CS, et al. Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing. <i>Scientific Reports</i>. 2017;7:3216.',
        'Hirshkowitz M, Whiton K, Albert SM, et al. National Sleep Foundation\'s sleep time duration recommendations: methodology and results summary. <i>Sleep Health</i>. 2015;1(1):40–43.',
        'Watson NF, Badr MS, Belenky G, et al. Recommended amount of sleep for a healthy adult: a joint consensus statement of the American Academy of Sleep Medicine and Sleep Research Society. <i>Sleep</i>. 2015;38(6):843–844.',
        'Kovacs FM, Abraira V, Peña A, et al. Effect of firmness of a mattress on chronic non-specific low-back pain: randomised, double-blind, controlled, multicentre trial. <i>The Lancet</i>. 2003;362(9396):1599–1604.',
        'Irish LA, Kline CE, Gunn HE, Buysse DJ, Hall MH. The role of sleep hygiene in promoting public health: a review of empirical evidence. <i>Sleep Medicine Reviews</i>. 2015;22:23–36.',
    ])

POINTS['05'] = dict(
    photo=('Foto: seseorang menyiapkan sarapan telur rebus, buah segar, dan Greek yogurt di dapur',),
    sci_title='Tinjauan Ilmiah: Batas Asupan, Perilaku Makan, dan Protein',
    sci=[
        'Panduan G4G1L5 berasal dari Peraturan Menteri Kesehatan RI Nomor 30 Tahun 2013 tentang pencantuman informasi gula, garam, dan lemak. Batas konsumsi harian yang dianjurkan adalah gula 50 gram (sekitar 4 sendok makan), natrium 2.000 mg (setara garam sekitar 5 gram atau 1 sendok teh), dan lemak 67 gram (sekitar 5 sendok makan) [1]. Pedoman WHO menyarankan asupan gula bebas kurang dari 10% energi total, dan manfaat tambahan bila di bawah 5% [2].',
        'Alasan batas itu penting: meta-analisis Malik dan rekan menemukan bahwa konsumsi minuman manis 1–2 porsi per hari berkaitan dengan risiko sindrom metabolik dan diabetes tipe 2 yang lebih tinggi [3]. Strazzullo dan rekan, dalam meta-analisis studi prospektif, menemukan bahwa asupan garam yang lebih tinggi sekitar 5 gram per hari berkaitan dengan risiko stroke sekitar 23% lebih tinggi [4]. Ini menjelaskan mengapa minuman manis, bumbu instan, dan gorengan cepat menghabiskan kuota harian.',
        'Untuk sikap <i>mindful</i>, Robinson dan rekan menyimpulkan melalui tinjauan sistematis bahwa makan dengan perhatian penuh mengurangi asupan energi berikutnya, sedangkan makan sambil terdistraksi cenderung meningkatkan asupan [5]. Menyingkirkan layar saat makan adalah langkah murah dan berbukti.',
        'Mengenai sarapan tinggi protein, studi Leidy dan rekan pada remaja putri yang biasa melewatkan sarapan menunjukkan bahwa sarapan tinggi protein memperbaiki sinyal rasa kenyang dan mengurangi dorongan makan malam hari [6]. Perlu dicatat, ukuran sampelnya kecil dan populasinya spesifik, sehingga hasilnya bersifat indikatif.',
    ],
    findings=[
        ['Permenkes RI No. 30/2013 [1]', 'Batas harian: gula 50 g, natrium 2.000 mg (garam 5 g), lemak 67 g.', 'Rumus G4G1L5.'],
        ['WHO (2015) [2]', 'Gula bebas < 10% energi; manfaat tambahan bila < 5%.', 'Batasi minuman manis.'],
        ['Malik et al. (2010) [3]', 'Minuman manis berkaitan dengan risiko sindrom metabolik dan diabetes tipe 2.', 'Ganti dengan air putih.'],
        ['Strazzullo et al. (2009) [4]', 'Garam lebih tinggi berkaitan dengan risiko stroke lebih besar.', 'Waspadai bumbu instan.'],
        ['Robinson et al. (2013) [5]', 'Makan penuh perhatian mengurangi asupan energi berikutnya.', 'Makan tanpa layar.'],
    ],
    steps_title='Panduan Penerapan: Mengupgrade Piring Harian',
    steps=[
        '<b>Audit kuota gula-garam-minyak.</b> Selama 3 hari, catat sumber utamanya: minuman manis, bumbu instan, gorengan.',
        '<b>Ganti satu minuman manis per hari</b> dengan air putih, teh tanpa gula, atau kopi tanpa gula tambahan.',
        '<b>Susun sarapan protein.</b> Contoh: 2 telur rebus, buah segar, dan Greek yogurt; alternatif tahu, tempe, atau ikan.',
        '<b>Manfaatkan catering sehat atau meal prep</b> pada hari tersibuk agar keputusan makan tidak diserahkan pada kebetulan.',
        '<b>Makan tanpa layar</b> selama 10–15 menit pertama dan kunyah perlahan untuk melatih kesadaran asupan.',
    ],
    mistakes=['Menganggap minuman "sehat" kemasan bebas gula tambahan.', 'Menghitung kalori secara obsesif hingga tidak berkelanjutan.', 'Melewatkan makan lalu makan berlebihan di malam hari.', 'Mengandalkan bumbu instan untuk semua masakan.'],
    plan=[['Minggu 1', 'Audit gula-garam-minyak dan baca label kemasan.'], ['Minggu 2', 'Ganti satu minuman manis; mulai sarapan protein.'], ['Minggu 3', 'Coba catering sehat atau meal prep satu hari.'], ['Minggu 4', 'Evaluasi energi, rasa kenyang, dan kebiasaan makan malam.']],
    reflect=['Pada jam berapa kuota gula harianmu biasanya sudah habis?', 'Makanan sehat apa yang bisa kamu siapkan terlebih dahulu setiap Minggu?'],
    refs=[
        'Kementerian Kesehatan Republik Indonesia. <i>Peraturan Menteri Kesehatan Nomor 30 Tahun 2013 tentang Pencantuman Informasi Kandungan Gula, Garam, dan Lemak serta Pesan Kesehatan pada Pangan Olahan dan Pangan Siap Saji</i>. Jakarta; 2013.',
        'World Health Organization. <i>Guideline: Sugars Intake for Adults and Children</i>. Geneva: WHO; 2015.',
        'Malik VS, Popkin BM, Bray GA, Després JP, Willett WC, Hu FB. Sugar-sweetened beverages and risk of metabolic syndrome and type 2 diabetes: a meta-analysis. <i>Diabetes Care</i>. 2010;33(11):2477–2483.',
        'Strazzullo P, D\'Elia L, Kandala NB, Cappuccio FP. Salt intake, stroke, and cardiovascular disease: meta-analysis of prospective studies. <i>BMJ</i>. 2009;339:b4567.',
        'Robinson E, Aveyard P, Daley A, et al. Eating attentively: a systematic review and meta-analysis of the effect of food intake memory and awareness on eating. <i>American Journal of Clinical Nutrition</i>. 2013;97(4):728–742.',
        'Leidy HJ, Ortinau LC, Douglas SM, Hoertel HA. Beneficial effects of a higher-protein breakfast on the appetitive, hormonal, and neural signals controlling energy intake regulation in overweight/obese, "breakfast-skipping," late-adolescent girls. <i>American Journal of Clinical Nutrition</i>. 2013;97(4):677–688.',
    ])

POINTS['06'] = dict(
    photo=('Foto: kelas group training dan sesi bersama personal trainer di gym',),
    sci_title='Tinjauan Ilmiah: Akuntabilitas, Dosis Olahraga, dan Kebiasaan',
    sci=[
        'Studi "Paying Not to Go to the Gym" oleh DellaVigna dan Malmendier menganalisis data keanggotaan tiga gym di Amerika Serikat. Anggota dengan kontrak bulanan rata-rata hanya datang sekitar 4 kali per bulan, sehingga biaya per kunjungan jauh lebih mahal daripada tiket harian. Peneliti menafsirkan hal ini sebagai bias perilaku: orang melebih-lebihkan niat berolahraganya di masa depan [1].',
        'Berapa banyak olahraga yang dibutuhkan? Pedoman WHO 2020 menyarankan 150–300 menit aktivitas aerobik intensitas sedang per minggu untuk orang dewasa, ditambah penguatan otot pada dua hari atau lebih per minggu [2]. Tinjauan Warburton dan rekan menyimpulkan bahwa aktivitas fisik yang teratur memberi manfaat luas bagi pencegahan penyakit kronis [3].',
        'Pada sisi akuntabilitas, uji Mazzetti dan rekan menemukan bahwa latihan beban dengan pengawasan langsung pelatih menghasilkan peningkatan kekuatan yang lebih besar dibanding latihan tanpa pengawasan [4]. Yorks dan rekan menemukan bahwa kelas kebugaran kelompok berkaitan dengan penurunan stres dan peningkatan kualitas hidup pada mahasiswa kedokteran [5].',
        'Soal kebiasaan, Lally dan rekan mengikuti pembentukan kebiasaan pada kehidupan nyata: rata-rata dibutuhkan sekitar 66 hari agar suatu perilaku menjadi otomatis, dengan rentang yang lebar (18 hingga 254 hari) [6]. Karena itu, sistem yang menjaga kamu tetap datang selama dua bulan pertama sangat menentukan.',
    ],
    findings=[
        ['DellaVigna & Malmendier (2006) [1]', 'Anggota gym berkontrak bulanan rata-rata hanya datang sekitar 4 kali per bulan.', 'Membayar bukan berarti datang.'],
        ['Bull et al. (2020) [2]', 'WHO: 150–300 menit aktivitas sedang per minggu + penguatan otot 2 hari.', 'Target dosis jelas.'],
        ['Mazzetti et al. (2000) [4]', 'Pengawasan langsung menghasilkan peningkatan kekuatan lebih besar.', 'Personal trainer = akuntabilitas.'],
        ['Yorks et al. (2017) [5]', 'Kelas kelompok berkaitan dengan stres lebih rendah dan kualitas hidup lebih baik.', 'Format kelompok membantu.'],
        ['Lally et al. (2010) [6]', 'Kebiasaan butuh rata-rata sekitar 66 hari untuk otomatis (rentang 18–254).', 'Bertahan 2 bulan pertama.'],
    ],
    steps_title='Panduan Penerapan: Membangun Sistem Olahraga',
    steps=[
        '<b>Pilih format dengan biaya bolos.</b> Kelas kelompok berbayar mingguan atau sesi personal trainer yang dijadwalkan.',
        '<b>Kunci jadwal 2–3 sesi per minggu</b> pada hari dan jam tetap, lalu tulis di kalender seperti rapat.',
        '<b>Kombinasikan kekuatan dan kardio</b> sesuai pedoman WHO; mulai dari dosis yang pasti bisa kamu pertahankan.',
        '<b>Siapkan penghalang minimal:</b> tas olahraga siap sebelumnya, lokasi dekat, dan rekan latihan.',
        '<b>Targetkan 66 hari pertama</b> sebagai masa pembentukan kebiasaan; rayakan setiap 4 minggu terlewati.',
    ],
    mistakes=['Membayar membership tahunan tanpa jadwal pasti.', 'Memulai terlalu berat sehingga cedera dan berhenti.', 'Memilih lokasi yang jauh dari rumah atau kantor.', 'Menyerah setelah satu atau dua sesi terlewat.'],
    plan=[['Minggu 1', 'Pilih format, daftar, dan kunci jadwal.'], ['Minggu 2', 'Hadir minimal 2 sesi; siapkan tas dan rutinitas.'], ['Minggu 3', 'Tambah satu sesi atau tingkatkan intensitas bertahap.'], ['Minggu 4', 'Evaluasi kehadiran; perbaiki penghambat jika ada.']],
    reflect=['Apa yang paling sering membuatmu membatalkan olahraga?', 'Sistem eksternal apa yang bisa membuat bolos terasa lebih sulit?'],
    refs=[
        'DellaVigna S, Malmendier U. Paying not to go to the gym. <i>American Economic Review</i>. 2006;96(3):694–719.',
        'Bull FC, Al-Ansari SS, Biddle S, et al. World Health Organization 2020 guidelines on physical activity and sedentary behaviour. <i>British Journal of Sports Medicine</i>. 2020;54(24):1451–1462.',
        'Warburton DER, Nicol CW, Bredin SSD. Health benefits of physical activity: the evidence. <i>Canadian Medical Association Journal</i>. 2006;174(6):801–809.',
        'Mazzetti SA, Kraemer WJ, Volek JS, et al. The influence of direct supervision of resistance training on strength performance. <i>Medicine & Science in Sports & Exercise</i>. 2000;32(6):1175–1184.',
        'Yorks DM, Frothingham CA, Schuenke MD. Effects of group fitness classes on stress and quality of life of medical students. <i>Journal of the American Osteopathic Association</i>. 2017;117(11):e17–e25.',
        'Lally P, van Jaarsveld CHM, Potts HWW, Wardle J. How are habits formed: modelling habit formation in the real world. <i>European Journal of Social Psychology</i>. 2010;40(6):998–1009.',
    ])

POINTS['07'] = dict(
    photo=('Foto: seseorang memakai smartwatch dan memeriksa skor recovery dan tidur setelah bangun',),
    sci_title='Tinjauan Ilmiah: Wearable, Langkah, dan Variabilitas Detak Jantung',
    sci=[
        'Prinsip "apa yang tidak diukur hanya dikira-kira" punya dasar empiris. Tinjauan sistematis Bravata dan rekan menemukan bahwa pengguna pedometer meningkatkan aktivitas fisik sekitar 2.000 langkah per hari dan menunjukkan perbaikan indikator seperti indeks massa tubuh dan tekanan darah, terutama ketika disertai target langkah [1].',
        'Namun alat saja tidak cukup. Patel, Asch dan Volpp menegaskan bahwa perangkat <i>wearable</i> berperan sebagai fasilitator, bukan penggerak, perubahan perilaku; efeknya lebih besar bila dipadukan dengan target, umpan balik, dan insentif [2]. Gunakan data untuk memutuskan tindakan, bukan sekadar dikoleksi.',
        'Variabilitas detak jantung (HRV) adalah indikator yang banyak dipakai sebagai gambaran respons sistem saraf otonom. Shaffer dan Ginsberg menjelaskan berbagai metrik HRV dan nilai normalnya, serta menekankan bahwa interpretasi bergantung pada konteks dan metode pengukuran [3]. Plews dan rekan menunjukkan bahwa tren HRV pada atlet ketahanan berguna untuk memantau adaptasi latihan [4]; perhatikan tren pribadi, bukan angka mutlak.',
        'Untuk tidur, de Zambotti dan rekan meninjau bahwa pelacak tidur konsumen cukup baik mendeteksi tidur-bangun, tetapi kurang akurat dalam membedakan tahap tidur seperti deep sleep dan REM [5]. Karena itu, skor tahap tidur sebaiknya dibaca sebagai perkiraan.',
    ],
    findings=[
        ['Bravata et al. (2007) [1]', 'Pedometer meningkatkan langkah harian sekitar 2.000 dan memperbaiki indikator kesehatan.', 'Ukur langkah dan tetapkan target.'],
        ['Patel et al. (2015) [2]', 'Wearable adalah fasilitator, bukan penggerak, perubahan perilaku.', 'Pasangkan data dengan tindakan.'],
        ['Shaffer & Ginsberg (2017) [3]', 'HRV adalah metrik yang bergantung konteks dan metode pengukuran.', 'Baca tren, bukan satu angka.'],
        ['de Zambotti et al. (2019) [5]', 'Pelacak tidur akurat untuk tidur-bangun, kurang untuk tahap tidur.', 'Anggap deep/REM sebagai estimasi.'],
    ],
    steps_title='Panduan Penerapan: Mengubah Data Menjadi Keputusan',
    steps=[
        '<b>Pilih perangkat sesuai anggaran</b> (Whoop, Apple Watch, Garmin, atau tracker lain) dan pakai konsisten selama minimal 2–4 minggu.',
        '<b>Tentukan baseline pribadi.</b> Catat rata-rata tidur, langkah, dan skor recovery sebelum mengubah apa pun.',
        '<b>Tetapkan satu aturan keputusan,</b> misalnya: jika recovery rendah, turunkan intensitas latihan dan tidur lebih awal.',
        '<b>Tinjau mingguan, bukan setiap menit.</b> Terlalu sering memeriksa angka dapat menimbulkan kecemasan yang tidak perlu.',
        '<b>Hubungkan ke Upgrade lain:</b> hasil tidur memandu Upgrade 04, aktivitas memandu Upgrade 06, makanan memandu Upgrade 05.',
    ],
    mistakes=['Menganggap angka tracker sebagai diagnosis medis.', 'Berganti perangkat terus sehingga tren tidak terbaca.', 'Mengoleksi data tanpa mengubah perilaku.', 'Panik karena satu hari recovery rendah.'],
    plan=[['Minggu 1', 'Pakai perangkat setiap hari; jangan ubah kebiasaan dulu.'], ['Minggu 2', 'Identifikasi pola: hari apa tidur dan recovery paling baik atau buruk.'], ['Minggu 3', 'Terapkan satu aturan keputusan dan lihat efeknya.'], ['Minggu 4', 'Tinjau tren bulanan dan sesuaikan target.']],
    reflect=['Keputusan apa yang akan berubah jika datamu menunjukkan recovery rendah tiga hari berturut-turut?', 'Kebiasaan mana yang paling berpengaruh terhadap skor tidurmu?'],
    refs=[
        'Bravata DM, Smith-Spangler C, Sundaram V, et al. Using pedometers to increase physical activity and improve health: a systematic review. <i>JAMA</i>. 2007;298(19):2296–2304.',
        'Patel MS, Asch DA, Volpp KG. Wearable devices as facilitators, not drivers, of health behavior change. <i>JAMA</i>. 2015;313(5):459–460.',
        'Shaffer F, Ginsberg JP. An overview of heart rate variability metrics and norms. <i>Frontiers in Public Health</i>. 2017;5:258.',
        'Plews DJ, Laursen PB, Stanley J, Kilding AE, Buchheit M. Training adaptation and heart rate variability in elite endurance athletes: opening the door to effective monitoring. <i>Sports Medicine</i>. 2013;43(9):773–781.',
        'de Zambotti M, Cellini N, Goldstone A, Colrain IM, Baker FC. Wearable sleep technology in clinical and research settings. <i>Medicine & Science in Sports & Exercise</i>. 2019;51(7):1538–1557.',
    ])

POINTS['08'] = dict(
    photo=('Foto: pekerja berjalan kaki ke kantor dari apartemen yang dekat, di pagi hari yang cerah',),
    sci_title='Tinjauan Ilmiah: Commuting Paradox, Kebugaran, dan Waktu',
    sci=[
        'Istilah <i>commuting paradox</i> berasal dari Stutzer dan Frey. Dengan data panel rumah tangga Jerman, mereka menemukan bahwa orang yang menempuh perjalanan lebih lama melaporkan kepuasan hidup yang lebih rendah, dan kompensasi berupa gaji atau rumah yang lebih murah tidak sepenuhnya menutup kerugian itu [1]. Ini sejalan dengan pernyataan pada halaman sebelumnya.',
        'Dampaknya tidak hanya pada rasa puas. Christian menemukan bahwa waktu perjalanan yang lebih panjang berkaitan dengan berkurangnya waktu untuk aktivitas fisik, penyiapan makanan di rumah, dan tidur [2]. Hoehner dan rekan menemukan bahwa jarak komuter yang lebih jauh berkaitan dengan kebugaran kardiorespirasi yang lebih rendah dan lebih banyak faktor risiko metabolik [3].',
        'Tinggal dekat kantor juga membuka peluang bagi perjalanan aktif. Celis-Morales dan rekan, memakai data UK Biobank dengan lebih dari 250.000 peserta, menemukan bahwa komuter yang berjalan kaki atau bersepeda memiliki risiko penyakit kardiovaskular, kanker, dan kematian yang lebih rendah dibanding komuter dengan kendaraan bermotor [4].',
        'Hitungan pada halaman sebelumnya (60 jam per bulan) setara dengan 720 jam per tahun, atau sekitar 30 hari penuh. Sebagai pembanding yang ilustratif, waktu sebanyak itu cukup untuk menyelesaikan beberapa kursus dalam Upgrade 01 dan menjalankan sistem olahraga Upgrade 06.',
    ],
    findings=[
        ['Stutzer & Frey (2008) [1]', 'Komuter jauh melaporkan kepuasan hidup lebih rendah; kompensasi tidak sepenuhnya menutup.', 'Hitung biaya hidup total, bukan sewa saja.'],
        ['Christian (2012) [2]', 'Commute lebih panjang mengurangi waktu untuk aktivitas fisik, masak, dan tidur.', 'Waktu hilang berarti kesehatan hilang.'],
        ['Hoehner et al. (2012) [3]', 'Jarak komuter jauh berkaitan dengan kebugaran lebih rendah dan risiko metabolik lebih tinggi.', 'Dekat kantor melindungi kebugaran.'],
        ['Celis-Morales et al. (2017) [4]', 'Komuter aktif (jalan/sepeda) berkaitan dengan risiko penyakit dan kematian lebih rendah.', 'Dekat memungkinkan jalan kaki.'],
    ],
    steps_title='Panduan Penerapan: Menghitung dan Memutuskan',
    steps=[
        '<b>Hitung biaya commute sebenarnya:</b> jam per bulan dikali nilai jam kerjamu, ditambah ongkos transportasi, ditambah biaya tenaga dan kesehatan.',
        '<b>Bandingkan dengan selisih sewa</b> tempat tinggal dekat kantor; sering kali selisihnya lebih kecil dari biaya waktu yang hilang.',
        '<b>Uji coba kontrak pendek</b> (misalnya 3–6 bulan) sebelum berkomitmen lama.',
        '<b>Rencanakan penggunaan waktu yang kembali:</b> menyiapkan makanan sehat, olahraga, dan quality time keluarga.',
        '<b>Jika pindah belum mungkin,</b> negosiasikan jadwal fleksibel atau hari kerja remote, dan manfaatkan waktu perjalanan seproduktif mungkin.',
    ],
    mistakes=['Membandingkan hanya harga sewa tanpa menghitung waktu dan tenaga.', 'Pindah dekat kantor tetapi tidak mengubah kebiasaan sehingga waktu tetap terbuang.', 'Mengabaikan faktor keluarga dan sekolah saat memilih lokasi.', 'Menandatangani kontrak panjang tanpa uji coba.'],
    plan=[['Minggu 1', 'Hitung biaya waktu dan ongkos commute saat ini.'], ['Minggu 2', 'Survei 3 opsi tempat tinggal dekat kantor dan bandingkan.'], ['Minggu 3', 'Bicarakan dengan keluarga atau pasangan; tentukan prioritas.'], ['Minggu 4', 'Ambil keputusan: pindah, kontrak percobaan, atau jadwal fleksibel.']],
    reflect=['Jika kamu mendapat kembali 3 jam per hari, apa tiga hal pertama yang akan kamu lakukan?', 'Berapa nilai satu jam waktumu dalam rupiah?'],
    refs=[
        'Stutzer A, Frey BS. Stress that doesn\'t pay: the commuting paradox. <i>Scandinavian Journal of Economics</i>. 2008;110(2):339–366.',
        'Christian TJ. Trade-offs between commuting time and health-related activities. <i>Journal of Urban Health</i>. 2012;89(5):746–757.',
        'Hoehner CM, Barlow CE, Allen P, Schootman M. Commuting distance, cardiorespiratory fitness, and metabolic risk. <i>American Journal of Preventive Medicine</i>. 2012;42(6):571–578.',
        'Celis-Morales CA, Lyall DM, Welsh P, et al. Association between active commuting and incident cardiovascular disease, cancer, and mortality: prospective cohort study. <i>BMJ</i>. 2017;357:j1456.',
    ])

POINTS['09'] = dict(
    photo=('Foto: orang bersantai menikmati waktu luang sementara jasa laundry atau cleaning bekerja',),
    sci_title='Tinjauan Ilmiah: Membeli Waktu dan Kebahagiaan',
    sci=[
        'Riset yang dirujuk pada halaman sebelumnya adalah studi Whillans, Dunn dan rekan. Pada empat sampel di Amerika Serikat, Kanada, Denmark, dan Belanda (lebih dari 6.000 partisipan), orang yang menggunakan uangnya untuk membeli waktu melaporkan kepuasan hidup yang lebih tinggi. Dalam eksperimen lapangan, peserta merasa lebih bahagia ketika menghabiskan sejumlah uang untuk menghemat waktu dibanding untuk membeli barang, karena stres akibat kekurangan waktu berkurang [1].',
        'Whillans dan rekan juga menemukan bahwa orang yang cenderung menghargai waktu di atas uang melaporkan kebahagiaan yang lebih tinggi, dan kecenderungan ini relatif independen dari penghasilan [2]. Sementara itu, Hamermesh dan Lee menunjukkan bahwa tekanan waktu (<i>time stress</i>) justru cenderung lebih tinggi pada orang berpenghasilan lebih tinggi di berbagai negara [3]. Artinya, penghasilan yang bertambah belum tentu terasa seperti waktu luang yang bertambah, kecuali dikonversi menjadi waktu.',
        'Prinsip memilih tugas yang di-outsource: pilih pekerjaan yang berulang, menguras energi, dan nilai ekonominya rendah bagimu. Pada halaman sebelumnya, laundry, cleaning, dan catering sehat adalah tiga contoh yang menghemat waktu 4–6 jam per minggu atau lebih.',
    ],
    findings=[
        ['Whillans et al. (2017) [1]', 'Membeli waktu berkaitan dengan kepuasan hidup lebih tinggi di 4 negara; eksperimen mendukung.', 'Beli waktu, bukan hanya barang.'],
        ['Whillans et al. (2016) [2]', 'Menghargai waktu di atas uang berkaitan dengan kebahagiaan lebih tinggi.', 'Nilai waktumu secara sadar.'],
        ['Hamermesh & Lee (2007) [3]', 'Time stress cenderung lebih tinggi pada berpenghasilan tinggi.', 'Uang lebih harus dikonversi jadi waktu.'],
    ],
    steps_title='Panduan Penerapan: Memilih Tugas yang Layak Di-outsource',
    steps=[
        '<b>Hitung nilai jam waktumu</b> (penghasilan dibagi jam kerja efektif) sebagai pembanding harga jasa.',
        '<b>Daftar tugas rumah tangga</b> dan beri skor: seberapa menguras energi, seberapa sering, dan seberapa kamu membencinya.',
        '<b>Mulai dari satu layanan,</b> misalnya laundry antar-jemput, lalu tambah cleaning berkala.',
        '<b>Pastikan waktu yang kembali dipakai bermakna:</b> olahraga, tidur, hobi, atau keluarga; bukan sekadar dihabiskan di layar.',
        '<b>Tetap dalam anggaran.</b> Outsource hanya setelah dana darurat 6 bulan aman dan tidak menimbulkan utang.',
    ],
    mistakes=['Mengalihdayakan tugas yang sebenarnya menyenangkan bagimu.', 'Tidak membandingkan harga jasa dengan nilai waktumu.', 'Waktu yang terbeli habis untuk scrolling.', 'Berlangganan banyak layanan sekaligus melebihi anggaran.'],
    plan=[['Minggu 1', 'Hitung nilai jam dan daftar tugas rumah tangga.'], ['Minggu 2', 'Coba satu layanan (laundry atau cleaning) selama satu bulan.'], ['Minggu 3', 'Isi waktu yang kembali dengan aktivitas dari Upgrade 03, 04, atau 06.'], ['Minggu 4', 'Evaluasi: apakah stres waktu berkurang? Lanjutkan atau sesuaikan.']],
    reflect=['Tugas rumah tangga apa yang paling menguras energimu setiap minggu?', 'Apa yang akan kamu lakukan dengan 4–6 jam ekstra per minggu?'],
    refs=[
        'Whillans AV, Dunn EW, Smeets P, Bekkers R, Norton MI. Buying time promotes happiness. <i>Proceedings of the National Academy of Sciences</i>. 2017;114(32):8523–8527.',
        'Whillans AV, Weidman AC, Dunn EW. Valuing time over money is associated with greater happiness. <i>Social Psychological and Personality Science</i>. 2016;7(3):213–222.',
        'Hamermesh DS, Lee J. Stressed out on four continents: time crunch or yuppie kvetch? <i>Review of Economics and Statistics</i>. 2007;89(2):374–383.',
    ])

POINTS['10'] = dict(
    photo=('Foto: anak dewasa makan bersama orang tua dan keluarga dengan suasana hangat',),
    sci_title='Tinjauan Ilmiah: Prosocial Spending dan Kebahagiaan',
    sci=[
        'Eksperimen yang dirujuk pada halaman sebelumnya dilakukan oleh Dunn, Aknin dan Norton. Pada survei nasional, pengeluaran untuk orang lain berkaitan dengan kebahagiaan yang lebih tinggi, sedangkan pengeluaran untuk diri sendiri tidak menunjukkan hubungan serupa. Pada eksperimen, peserta yang diminta membelanjakan uang untuk orang lain melaporkan kebahagiaan yang lebih tinggi daripada yang membelanjakannya untuk diri sendiri [1].',
        'Apakah ini hanya fenomena negara kaya? Aknin dan rekan menganalisis data dari 136 negara dan menemukan bahwa pengeluaran prososial berkaitan dengan kebahagiaan yang lebih tinggi di sebagian besar negara yang dianalisis, tanpa memandang tingkat pendapatan, sehingga pola ini tampak bersifat universal [2].',
        'Dari sisi otak, Harbaugh, Mayr dan Burghart menunjukkan melalui pencitraan fMRI bahwa donasi sukarela mengaktifkan area otak yang berkaitan dengan imbalan (<i>reward</i>) [3]. Tinjauan Post mengaitkan perilaku altruistik, emosi positif, dan kesehatan, dengan catatan bahwa hubungannya kompleks [4].',
        'Pesan praktisnya: berbagi yang terencana, spesifik, dan bermakna lebih mungkin menghasilkan manfaat daripada berbagi yang kebetulan. Itulah alasan alokasi berbagi dimasukkan ke dalam anggaran bulanan sejak awal gajian.',
    ],
    findings=[
        ['Dunn, Aknin & Norton (2008) [1]', 'Membelanjakan uang untuk orang lain meningkatkan kebahagiaan dibanding untuk diri sendiri.', 'Alokasikan dana berbagi.'],
        ['Aknin et al. (2013) [2]', 'Pola serupa di lintas negara dan tingkat pendapatan.', 'Berlaku universal.'],
        ['Harbaugh et al. (2007) [3]', 'Donasi sukarela mengaktifkan area otak terkait imbalan.', 'Berbagi terasa memuaskan secara biologis.'],
        ['Post (2005) [4]', 'Altruisme dikaitkan dengan emosi positif dan kesehatan, dengan hubungan yang kompleks.', 'Berbagi baik bagi pemberi.'],
    ],
    steps_title='Panduan Penerapan: Berbagi yang Terencana',
    steps=[
        '<b>Tetapkan porsi berbagi di awal gajian</b> dan masukkan sebagai pos tetap dalam anggaran bulanan.',
        '<b>Pilih tiga saluran:</b> keluarga terdekat, zakat atau sedekah terencana, dan perhatian atau waktu.',
        '<b>Untuk zakat,</b> hitung sesuai ketentuan dan lembaga resmi atau ulama yang kamu percayai; angka dalam buku ini bukan fatwa.',
        '<b>Buat spesifik dan personal:</b> mengajak orang tua makan, membantu biaya sekolah adik, atau mengirim hadiah perhatian.',
        '<b>Luangkan waktu:</b> telepon rutin dan pulang secara berkala bagi yang tinggal berjauhan.',
    ],
    mistakes=['Menunda berbagi sampai "uang sudah banyak".', 'Berbagi tanpa perencanaan sehingga mengganggu dana darurat.', 'Berbagi hanya uang tanpa kehadiran dan perhatian.', 'Membandingkan jumlah dengan orang lain.'],
    plan=[['Minggu 1', 'Tentukan persentase berbagi dan masukkan ke anggaran.'], ['Minggu 2', 'Pilih penerima dan bentuk berbagi untuk bulan ini.'], ['Minggu 3', 'Lakukan satu tindakan berbagi yang personal (mengajak makan atau menelepon).'], ['Minggu 4', 'Refleksikan perasaanmu dan jadwalkan berbagi bulan berikutnya.']],
    reflect=['Siapa orang yang paling berjasa dalam hidupmu dan belum pernah kamu balas?', 'Berapa persen penghasilan yang nyaman kamu alokasikan untuk berbagi?'],
    refs=[
        'Dunn EW, Aknin LB, Norton MI. Spending money on others promotes happiness. <i>Science</i>. 2008;319(5870):1687–1688.',
        'Aknin LB, Barrington-Leigh CP, Dunn EW, et al. Prosocial spending and well-being: cross-cultural evidence for a psychological universal. <i>Journal of Personality and Social Psychology</i>. 2013;104(4):635–652.',
        'Harbaugh WT, Mayr U, Burghart DR. Neural responses to taxation and voluntary giving reveal motives for charitable donations. <i>Science</i>. 2007;316(5831):1622–1625.',
        'Post SG. Altruism, happiness, and health: it\'s good to be good. <i>International Journal of Behavioral Medicine</i>. 2005;12(2):66–77.',
    ])

# Intro (extra page) ---------------------------------------------------------------------
INTRO_REFS = [
    'Lusardi A, Schneider DJ, Tufano P. Financially fragile households: evidence and implications. <i>Brookings Papers on Economic Activity</i>. 2011;Spring:83–134.',
    'Kahneman D, Deaton A. High income improves evaluation of life but not emotional well-being. <i>Proceedings of the National Academy of Sciences</i>. 2010;107(38):16489–16493.',
    'Van Boven L, Gilovich T. To do or to have? That is the question. <i>Journal of Personality and Social Psychology</i>. 2003;85(6):1193–1202.',
]
