import math
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Table, TableStyle, Spacer, Frame, KeepInFrame
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER

FD = '/usr/share/fonts/truetype/liberation/'
for n, f in [('S', 'Regular'), ('S-B', 'Bold'), ('S-I', 'Italic'), ('S-BI', 'BoldItalic')]:
    pdfmetrics.registerFont(TTFont(n, FD + f'LiberationSans-{f}.ttf'))
pdfmetrics.registerFontFamily('S', normal='S', bold='S-B', italic='S-I', boldItalic='S-BI')

NAVY = HexColor('#0F1B33'); NAVY2 = HexColor('#1D3557')
GOLD = HexColor('#B8863B'); GOLD2 = HexColor('#E3B964'); CREAM = HexColor('#FBF7EE')
TEAL = HexColor('#2A9D8F'); RED = HexColor('#E5533D'); INK = HexColor('#22304A')
W, H = A4
BH = 190  # banner height
import os as _os
HERE = _os.path.dirname(_os.path.abspath(__file__)) + '/'
OUT = HERE + '../10-Upgrade-yang-Mengubah-Hidup.pdf'


# ---------------- drawing helpers ----------------
def R(c, x, y, w, h, fill, r=0, alpha=1):
    c.saveState(); c.setFillColor(fill); c.setFillAlpha(alpha)
    if r: c.roundRect(x, y, w, h, r, stroke=0, fill=1)
    else: c.rect(x, y, w, h, stroke=0, fill=1)
    c.restoreState()

def C(c, x, y, r, fill, alpha=1):
    c.saveState(); c.setFillColor(fill); c.setFillAlpha(alpha); c.circle(x, y, r, stroke=0, fill=1); c.restoreState()

def E(c, x, y, rx, ry, fill):
    c.saveState(); c.setFillColor(fill); c.ellipse(x - rx, y - ry, x + rx, y + ry, stroke=0, fill=1); c.restoreState()

def P(c, pts, fill, alpha=1):
    c.saveState(); c.setFillColor(fill); c.setFillAlpha(alpha)
    p = c.beginPath(); p.moveTo(*pts[0])
    for q in pts[1:]: p.lineTo(*q)
    p.close(); c.drawPath(p, stroke=0, fill=1); c.restoreState()

def L(c, pts, col, w=2, cap=1):
    c.saveState(); c.setStrokeColor(col); c.setLineWidth(w); c.setLineCap(cap); c.setLineJoin(1)
    p = c.beginPath(); p.moveTo(*pts[0])
    for q in pts[1:]: p.lineTo(*q)
    c.drawPath(p, stroke=1, fill=0); c.restoreState()

def heart(c, x, y, s, fill):
    c.saveState(); c.setFillColor(fill)
    p = c.beginPath()
    p.moveTo(x, y - s * 0.9)
    p.curveTo(x - s * 1.6, y - s * 0.1, x - s * 0.9, y + s * 1.0, x, y + s * 0.35)
    p.curveTo(x + s * 0.9, y + s * 1.0, x + s * 1.6, y - s * 0.1, x, y - s * 0.9)
    c.drawPath(p, stroke=0, fill=1); c.restoreState()

def star(c, x, y, s, fill, alpha=1):
    P(c, [(x, y + s), (x + s * .22, y + s * .22), (x + s, y), (x + s * .22, y - s * .22),
          (x, y - s), (x - s * .22, y - s * .22), (x - s, y), (x - s * .22, y + s * .22)], fill, alpha)

def grad_v(c, x, y, w, h, c1, c2, n=70):
    for i in range(n):
        t = i / (n - 1)
        col = HexColor('#%02x%02x%02x' % tuple(int((c1.rgb()[k] * (1 - t) + c2.rgb()[k] * t) * 255) for k in range(3)))
        R(c, x, y + h - (i + 1) * h / n - 0.6, w, h / n + 1.2, col)


# ---------------- scenes (drawn in banner coords, right side ~ x 320..580) ----------------
def sc_skill(c):
    for i, (bx, bw, col) in enumerate([(410, 130, GOLD2), (420, 110, TEAL), (430, 90, HexColor('#E9ECEF'))]):
        by = 30 + [0, 22, 42][i]; bh = [22, 20, 18][i]
        R(c, bx, by, bw, bh, col, 3); R(c, bx + 8, by + 3, 4, bh - 6, NAVY, 1, .35)
    P(c, [(448, 108), (448, 90), (475, 82), (502, 90), (502, 108), (475, 100)], NAVY2)
    P(c, [(412, 114), (475, 138), (538, 114), (475, 94)], HexColor('#F3F4F6'))
    P(c, [(412, 114), (475, 94), (475, 100), (418, 116)], HexColor('#CBD2DC'))
    L(c, [(530, 116), (530, 92)], GOLD2, 2); C(c, 530, 90, 4, GOLD2)
    for i, h in enumerate([20, 34, 50, 68]):
        R(c, 320 + i * 20, 30, 14, h, GOLD2 if i == 3 else HexColor('#5B7BA8'), 2)
    L(c, [(327, 62), (347, 78), (367, 90), (387, 112)], white, 2.5)
    P(c, [(394, 120), (378, 114), (388, 106)], white)

def sc_wfh(c):
    R(c, 330, 56, 240, 7, GOLD2, 2)                       # desk
    R(c, 346, 30, 7, 28, GOLD2); R(c, 547, 30, 7, 28, GOLD2)
    R(c, 395, 68, 140, 84, HexColor('#E9ECEF'), 6); R(c, 402, 75, 126, 70, NAVY, 3)   # monitor
    R(c, 456, 63, 18, 8, HexColor('#CBD2DC')); R(c, 440, 62, 50, 4, HexColor('#CBD2DC'), 2)
    for i, w in enumerate([80, 100, 60, 90]):
        R(c, 412, 130 - i * 13, w, 5, [GOLD2, TEAL, white, GOLD2][i], 2)
    R(c, 420, 66, 60, 5, HexColor('#8A97AE'), 2)                                      # keyboard
    R(c, 340, 64, 22, 18, RED, 3); C(c, 351, 94, 12, TEAL); C(c, 343, 88, 8, HexColor('#3FB8A8')); C(c, 360, 90, 8, HexColor('#3FB8A8'))  # plant
    L(c, [(552, 63), (552, 100), (532, 128)], GOLD2, 3); P(c, [(516, 134), (548, 138), (538, 122)], GOLD2)  # lamp
    R(c, 300, 52, 6, 40, TEAL, 3); R(c, 294, 90, 26, 14, TEAL, 6); L(c, [(303, 52), (303, 38)], TEAL, 4)  # chair

def sc_hobby(c):
    R(c, 330, 36, 160, 60, HexColor('#F3F4F6'), 4)                                    # piano
    for i in range(1, 8): L(c, [(330 + i * 20, 36), (330 + i * 20, 96)], HexColor('#B7BFCC'), 1)
    for i in [0, 1, 3, 4, 5]: R(c, 345 + i * 20, 58, 12, 38, NAVY, 2)
    C(c, 520, 62, 28, HexColor('#D8E84A'))                                             # tennis ball
    c.saveState(); c.setStrokeColor(white); c.setLineWidth(2.5)
    c.arc(485, 40, 517, 100, 300, 120); c.arc(523, 24, 575, 100, 120, 120); c.restoreState()
    L(c, [(535, 100), (548, 140)], GOLD2, 5)                                          # racket handle
    c.saveState(); c.setStrokeColor(GOLD2); c.setLineWidth(5); c.ellipse(528, 134, 568, 182, stroke=1, fill=0); c.restoreState()
    for i in range(3):
        L(c, [(533, 144 + i * 12), (563, 144 + i * 12)], white, .8)
    for nx, ny in [(360, 120), (420, 138)]:
        E(c, nx, ny, 8, 6, white); L(c, [(nx + 7, ny + 1), (nx + 7, ny + 28)], white, 3)
    L(c, [(367, 148), (428, 166)], white, 3)

def sc_sleep(c):
    c.saveState()
    p = c.beginPath(); p.rect(0, 0, W, BH); p.circle(500, 128, 36)
    c.clipPath(p, stroke=0, fill=0, fillMode=0); C(c, 475, 120, 46, GOLD2); c.restoreState()
    for sx, sy, s in [(540, 150, 7), (420, 150, 5), (380, 118, 6), (560, 100, 5), (520, 168, 4)]: star(c, sx, sy, s, white)
    R(c, 330, 36, 240, 26, HexColor('#5B7BA8'), 5); R(c, 330, 30, 240, 8, GOLD, 2)    # bed
    R(c, 322, 30, 12, 82, GOLD, 3); R(c, 566, 30, 12, 50, GOLD, 3)
    R(c, 338, 62, 56, 18, white, 8)                                                   # pillow
    R(c, 400, 62, 160, 22, TEAL, 8)                                                   # blanket
    for i, (zx, zy, zs) in enumerate([(430, 100, 9), (452, 118, 12), (480, 140, 15)]):
        L(c, [(zx - zs, zy + zs), (zx + zs, zy + zs), (zx - zs, zy - zs), (zx + zs, zy - zs)], white, 2.2)

def sc_food(c):
    C(c, 450, 82, 62, HexColor('#F3F4F6')); C(c, 450, 82, 48, white); C(c, 450, 82, 40, HexColor('#E3E7EE'))
    for gx, gy, gr in [(430, 90, 15), (448, 104, 14), (420, 72, 12), (466, 90, 13)]: C(c, gx, gy, gr, HexColor('#3FA34D'))
    for gx, gy in [(432, 88), (450, 102)]: C(c, gx, gy, 7, HexColor('#6CC070'))
    E(c, 470, 66, 14, 11, white); C(c, 470, 66, 6, HexColor('#F5B301'))
    C(c, 440, 62, 7, HexColor('#F28C28')); C(c, 458, 98, 6, HexColor('#F28C28'))
    L(c, [(358, 36), (358, 140)], GOLD2, 4)                                           # fork
    for dx in (-8, 0, 8): L(c, [(358 + dx, 140), (358 + dx, 118)], GOLD2, 2.5)
    L(c, [(350, 118), (366, 118)], GOLD2, 3)
    L(c, [(542, 36), (542, 112)], GOLD2, 4); E(c, 542, 130, 9, 18, GOLD2)             # spoon
    C(c, 548, 40, 0.1, white)
    C(c, 520, 148, 17, RED); C(c, 530, 148, 17, RED); P(c, [(516, 164), (526, 176), (532, 164)], HexColor('#3FA34D'))

def sc_fit(c):
    L(c, [(350, 70), (470, 70)], white, 8)                                            # dumbbell
    for x in (350, 470):
        R(c, x - 10, 40, 20, 60, GOLD2, 4)
    R(c, 330, 50, 14, 40, GOLD, 4); R(c, 476, 50, 14, 40, GOLD, 4)
    C(c, 530, 62, 28, NAVY2); C(c, 530, 62, 28, TEAL, .0)                              # kettlebell
    c.saveState(); c.setFillColor(TEAL); c.circle(530, 62, 28, stroke=0, fill=1); c.restoreState()
    c.saveState(); c.setStrokeColor(TEAL); c.setLineWidth(7); c.arc(512, 74, 548, 116, 0, 180); c.restoreState()
    R(c, 350, 112, 90, 50, white, 6); R(c, 350, 148, 90, 14, RED, 6)                  # calendar
    for i in range(3):
        for j in range(2): C(c, 366 + i * 28, 134 - j * 15, 4, HexColor('#C8CFDA'))
    L(c, [(358, 130), (366, 122), (382, 142)], TEAL, 3.5)
    C(c, 490, 140, 20, white); C(c, 490, 140, 16, NAVY); L(c, [(490, 140), (490, 152)], GOLD2, 2.5); L(c, [(490, 140), (500, 136)], GOLD2, 2.5)  # stopwatch
    R(c, 485, 160, 10, 6, white, 2)

def sc_track(c):
    R(c, 440, 30, 70, 130, HexColor('#8A97AE'), 14)                                   # strap
    R(c, 408, 58, 134, 84, HexColor('#E9ECEF'), 22); R(c, 416, 66, 118, 68, NAVY, 16)  # watch
    heart(c, 441, 108, 8, RED)
    L(c, [(456, 100), (468, 100), (474, 118), (482, 84), (490, 108), (496, 100), (520, 100)], GOLD2, 2.5)
    R(c, 422, 72, 40, 5, TEAL, 2); R(c, 470, 72, 50, 5, HexColor('#5B7BA8'), 2)
    c.saveState(); c.setStrokeColor(TEAL); c.setLineWidth(7); c.setLineCap(1); c.arc(325, 50, 395, 120, 90, 250); c.restoreState()
    c.saveState(); c.setStrokeColor(HexColor('#2C4468')); c.setLineWidth(7); c.arc(325, 50, 395, 120, 340, 200); c.restoreState()
    heart(c, 360, 85, 8, RED)

def sc_time(c):
    R(c, 330, 30, 250, 6, GOLD2, 2)                                                   # ground
    R(c, 470, 36, 62, 100, HexColor('#8FB0D9'), 3)                                    # office
    for r in range(5):
        for k in range(3): R(c, 478 + k * 18, 44 + r * 18, 10, 11, white if (r + k) % 2 else GOLD2, 1)
    R(c, 540, 36, 36, 62, HexColor('#5B7BA8'), 3)
    for r in range(3): R(c, 548, 44 + r * 18, 10, 11, white, 1)
    P(c, [(338, 82), (378, 118), (418, 82)], RED); R(c, 348, 36, 60, 46, HexColor('#F3F4F6'), 2)  # house
    R(c, 372, 36, 14, 26, GOLD, 2); R(c, 354, 52, 12, 12, HexColor('#8FB0D9'), 1); R(c, 392, 52, 12, 12, HexColor('#8FB0D9'), 1)
    C(c, 440, 150, 24, white); C(c, 440, 150, 20, NAVY)                               # clock
    L(c, [(440, 150), (440, 164)], GOLD2, 2.5); L(c, [(440, 150), (452, 144)], GOLD2, 2.5)
    L(c, [(386, 150), (420, 150)], white, 2); P(c, [(426, 150), (416, 156), (416, 144)], white)
    R(c, 388, 124, 30, 30, white, 5, .0)
    R(c, 500, 140, 50, 0.1, white)
    star(c, 576, 148, 8, GOLD2); star(c, 508, 154, 5, white)

def sc_give(c):
    R(c, 400, 36, 90, 62, RED, 4); R(c, 394, 90, 102, 24, HexColor('#F26B58'), 4)     # gift
    R(c, 436, 36, 18, 78, GOLD2); R(c, 394, 96, 102, 10, GOLD2)
    c.saveState(); c.setStrokeColor(GOLD2); c.setLineWidth(5)
    c.ellipse(412, 114, 446, 142, stroke=1, fill=0); c.ellipse(444, 114, 478, 142, stroke=1, fill=0); c.restoreState()
    heart(c, 540, 120, 14, RED); heart(c, 352, 112, 8, GOLD2); heart(c, 568, 70, 7, HexColor('#F26B58')); heart(c, 520, 160, 6, white)
    for i in range(4):                                                                # coins
        E(c, 345, 40 + i * 7, 22, 7, GOLD2); E(c, 345, 44 + i * 7, 22, 7, HexColor('#F2D48A'))
    star(c, 372, 150, 8, GOLD2); star(c, 500, 150, 5, white)
    for hx in (510, 540):
        C(c, hx, 52, 0.1, white)
    L(c, [(512, 56), (540, 60), (566, 52)], white, 0.1)

def sc_outsource(c):
    R(c, 330, 30, 250, 6, GOLD2, 2)
    R(c, 400, 36, 96, 108, white, 8); R(c, 400, 118, 96, 26, HexColor('#CBD2DC'), 8)
    C(c, 448, 78, 34, HexColor('#8A97AE')); C(c, 448, 78, 27, NAVY2); C(c, 448, 78, 19, HexColor('#5B7BA8'))
    C(c, 418, 131, 5, RED); C(c, 434, 131, 5, GOLD2); R(c, 456, 127, 30, 8, HexColor('#8A97AE'), 3)
    for i, col in enumerate([TEAL, GOLD2, white, HexColor('#8FB0D9')]):
        R(c, 335, 38 + i * 12, 54, 11, col, 3)
    R(c, 520, 36, 22, 54, TEAL, 5); R(c, 526, 90, 10, 14, GOLD2, 2); R(c, 522, 102, 28, 8, GOLD2, 3)
    L(c, [(550, 106), (566, 112)], white, 2)
    star(c, 568, 86, 8, white); star(c, 556, 140, 6, GOLD2); star(c, 350, 120, 7, GOLD2)
    C(c, 360, 150, 18, white); C(c, 360, 150, 14, NAVY); L(c, [(360, 150), (360, 160)], GOLD2, 2); L(c, [(360, 150), (368, 146)], GOLD2, 2)

SCENES = dict(outsource=sc_outsource, skill=sc_skill, wfh=sc_wfh, hobby=sc_hobby, sleep=sc_sleep, food=sc_food, fit=sc_fit,
              track=sc_track, time=sc_time, give=sc_give)

# ---------------- text styles ----------------
def st(name, **k):
    base = dict(fontName='S', fontSize=10, leading=14.2, textColor=INK)
    base.update(k); return ParagraphStyle(name, **base)
BODY = st('b', fontSize=11.2, leading=16, spaceAfter=7)
H1 = st('h1', fontName='S-B', fontSize=16, leading=20, textColor=NAVY, spaceBefore=6, spaceAfter=7)
H2 = st('h2', fontName='S-B', fontSize=13.5, leading=17, textColor=GOLD, spaceBefore=10, spaceAfter=6)
SM = st('sm', fontSize=10.6, leading=15, spaceAfter=2)
LI = st('li', fontSize=11, leading=15.8, leftIndent=14, firstLineIndent=-14, spaceAfter=6)
CELL = st('cell', fontSize=10, leading=13.4)
CELLB = st('cellb', fontName='S-B', fontSize=10, leading=13.4, textColor=white)
QUOTE = st('q', fontName='S-I', fontSize=10.5, leading=15, alignment=TA_CENTER, textColor=NAVY)


def box(title, paras, bg='#FBF1DC', bar=GOLD, width=W - 80):
    items = []
    if title: items.append(Paragraph(f'<b>{title}</b>', st('bt', fontName='S-B', fontSize=11.2, leading=15, textColor=NAVY, spaceAfter=4)))
    items += [Paragraph(t, SM) for t in paras]
    t = Table([[items]], colWidths=[width])
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), HexColor(bg)), ('LINEBEFORE', (0, 0), (0, -1), 4, bar),
                           ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                           ('TOPPADDING', (0, 0), (-1, -1), 10), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
    return [t, Spacer(1, 11)]

def table(head, rows, widths):
    data = [[Paragraph(h, CELLB) for h in head]] + [[Paragraph(x, CELL) for x in r] for r in rows]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor('#F5F1E6')]),
                           ('GRID', (0, 0), (-1, -1), .5, HexColor('#D9CFB8')), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('TOPPADDING', (0, 0), (-1, -1), 6.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 6.5),
                           ('LEFTPADDING', (0, 0), (-1, -1), 7)]))
    return [t, Spacer(1, 9)]

def lis(items): return [Paragraph(t, LI) for t in items]

# ---------------- content ----------------
PAGES = []
def page(num, kicker, title, sub, scene, flow, **kw): PAGES.append(dict(num=num, kicker=kicker, title=title, sub=sub, scene=scene, flow=flow, **kw))

SUB = 'Ketika Sudah Memiliki Penghasilan & Uang Lebih'
page('', 'FINANCIAL & LIFE UPGRADE GUIDE', '10 Hal Wajib Kamu <font color="#E3B964">UPGRADE</font>', SUB, 'photo1',
     [Paragraph('Kata Pengantar & Prasyarat Mutlak', H1),
      Paragraph('Banyak orang ketika pertama kali berpenghasilan atau memiliki uang lebih langsung terjebak pada <i>splurging</i> gaya hidup—membeli ponsel baru, sepatu fancy, jajan berlebihan, atau barang konsumtif yang nilainya cepat terdepresiasi. Padahal, investasi paling berdampak dalam hidup adalah yang dipakai untuk meng-upgrade diri sendiri, energi, kesehatan, dan waktu.', BODY),
      Spacer(1, 4)] +
     box('SYARAT UTAMA SEBELUM MELAKUKAN UPGRADE:', ['Panduan ini ditujukan bagi kamu yang sudah berpenghasilan dan memiliki <b>Dana Darurat minimal 6 bulan biaya hidup</b>. Jika dana darurat belum terpenuhi, fokuskan seluruh uang lebihmu untuk menyelesaikan fondasi keuangan tersebut terlebih dahulu sebelum memulai daftar upgrade di buku ini!'], '#FDE9E4', RED) +
     [Paragraph('Daftar 10 Area Upgrade Kehidupan', H1)] +
     table(['No', 'Area Upgrade', 'Fokus Utama & Pilar Hasil'], [
         ['1', 'Investasi Diri (Skill)', 'Meningkatkan Income Potential & Karir'],
         ['2', 'Setup Kerja (WFH)', 'Ergonomi & Produktivitas Maksimal'],
         ['3', 'Hobi di Luar Kerja', 'Stress Reliever & Stimulus Kreativitas'],
         ['4', 'Kualitas Tidur', 'Sirkadian Rhythm & Kebugaran Otak'],
         ['5', 'Makanan Sehat', 'Mindful Eating & Formula G4G15'],
         ['6', 'Sistem Olahraga', 'Konsistensi Akuntabilitas & Kebugaran'],
         ['7', 'Health Tracker', 'Data Recovery & Monitoring Kesehatan'],
         ['8', 'Tinggal Dekat Kantor', 'Efisiensi Waktu Commute & Kualitas Hidup'],
         ['9', 'Outsource Pekerjaan Rumah', 'Buying Time & Memangkas Kecemasan'],
         ['10', 'Berbagi Lebih Banyak', 'Kebahagiaan Sosial & Mindset Keberlimpahan']], [36, 190, W - 80 - 226]))

page('01', 'UPGRADE 01', 'Investasi Diri Sendiri (Upgrade Skill)', 'Return Tertinggi di Awal Karir Datang dari Kemampuan Diri', 'skill',
     [Paragraph('Saat mendengar kata investasi, kebanyakan orang langsung berpikir tentang saham, reksadana, atau ETF. Padahal di awal karir, return finansial terbesar sering kali datang dari peningkatan skill diri sendiri.', BODY), Spacer(1, 4)] +
     box('Simulasi Perbandingan Return:', ['• Investasi Rp10.000.000 di instrumen finansial dengan return 10%/tahun = <b>Rp1.000.000 / tahun</b>.', '• Mempelajari 1 skill baru yang menaikkan gaji Rp1.000.000/bulan = <b>Rp12.000.000 / tahun</b> (dan nilai skill ini terus terbawa sepanjang karirmu!).']) +
     box(None, ['<para alignment="center"><i>"The best investment by far is anything that develops yourself. It isn\'t taxed, can\'t be stolen, and isn\'t eroded by inflation."</i><br/><b>— Warren Buffett</b></para>'], '#EAF0F8', NAVY2) +
     [Paragraph('Keunggulan Investasi Skill dibanding Barang Mewah', H2)] +
     lis(['<b>1. Tidak Kena Pajak & Inflasi:</b> Pengetahuan dan keahlian yang terpatri di otak tidak akan menyusut nilainya akibat inflasi.',
          '<b>2. Permanen & Melindungi Karir:</b> Skill yang sudah kamu kuasai tidak bisa diambil oleh siapapun.',
          '<b>3. Contoh Pengalaman Nyata:</b> Mengambil course Storytelling & Brand Communication saat menjabat Global Marketing, serta mengambil sertifikasi Financial Planning untuk membuka peluang side income baru.']) +
     [Spacer(1, 5)] +
     box('Rekomendasi Skill Potensial: Virtual Assistant (VA) Remote', ['Bekerja remote membantu business owner/entrepreneur luar negeri (admin, email marketing, social media, project management). Potensi income berdasar tingkat keahlian: <b>Pemula ($10/jam)</b>, <b>Menengah ($15–$20/jam)</b>, <b>Advance ($25/jam)</b>.'], '#E6F4F1', TEAL))

page('02', 'UPGRADE 02', 'Setup Kerja (Produktivitas WFH)', 'Ciptakan Lingkungan Kerja Ergonomis & Fokus Maksimal', 'wfh',
     [Paragraph('Setup kerja yang baik dan tepat secara ergonomis dapat meningkatkan produktivitas kerja secara signifikan. Kesalahan paling fatal saat Work From Home (WFH) atau berkarir mandiri adalah bekerja dari kasur atau sofa.', BODY), Spacer(1, 4)] +
     box('Bahaya Bekerja dari Kasur & Prinsip Stimulus Control:', ['• Punggung cepat pegal, tubuh gampang ngantuk, dan otak tidak bisa benar-benar fokus.', '• Dalam terapi insomnia, ada prinsip bernama <b>Stimulus Control</b>: kasur hanya boleh diasosiasikan untuk tidur. Jika kasur dipakai bekerja, otak menjadi bingung membedakan antara tempat istirahat dan tempat berpikir keras, yang memicu gangguan tidur.'], '#FDE9E4', RED) +
     [Paragraph('Investasi Setup Kerja yang Paling Berdampak', H2)] +
     table(['Peralatan Upgrade', 'Fungsi & Dampak Produktivitas'], [
         ['<b>Meja & Kursi Ergonomis</b>', 'Memperbaiki postur tubuh, mencegah sakit punggung/leher saat duduk lama.'],
         ['<b>Monitor Eksternal Besar</b>', 'Membuka banyak window referensi sekaligus tanpa perlu ganti-ganti tab secara berulang.'],
         ['<b>Standing Desk</b>', 'Memberikan fleksibilitas bekerja sambil berdiri sesekali agar tubuh tidak statis sepanjang hari.']], [150, W - 80 - 150]) +
     box('Langkah Awal:', ['Pilih satu alat upgrade yang paling sering mengganggu kenyamanan atau produktivitas kerjamu sehari-hari. Mulai dari meja/kursi yang layak, lalu tambahkan monitor eksternal saat ada budget lebih.'], '#E6F4F1', TEAL))

page('03', 'UPGRADE 03', 'Punya Hobi di Luar Kerjaan', 'Sarana Pelepasan Stres & Penjaga Kreativitas Otak', 'hobby',
     [Paragraph('Saat gaji masih pas-pasan, hobi sering dianggap sebagai barang mewah yang membuang uang. Namun, jika pola hidupmu hanya berisi kerja → pulang → scrolling medsos berjam-jam → tidur, dalam jangka panjang otakmu akan kelelahan dan performa kerja justru akan menurun drastis.', BODY), Spacer(1, 4)] +
     box('Temuan Riset Ilmiah tentang Hobi Kreatif:', ['Penelitian menunjukkan bahwa individu yang memiliki aktivitas kreatif di luar pekerjaan utama lebih cepat pulih dari stres kerja (<i>stress recovery</i>) dan terbukti jauh lebih kreatif saat menyelesaikan tugas-tugas kantor.'], '#EAF0F8', NAVY2) +
     [Paragraph('Contoh Pengalaman Mengembangkan Hobi di Usia Dewasa', H2)] +
     lis(['<b>• Belajar Alat Musik (Piano):</b> Memulai les piano mingguan saat sudah bekerja (bukan dari kecil). Meskipun bukan prioritas utama karir, kelas piano tetap dibayar secara rutin karena terbukti menjadi stress reliever yang efektif.',
          '<b>• Olahraga Rekreasional (Tenis):</b> Bermain tenis di akhir pekan. Saat pikiran terasa penuh dan lelah, memukul bola tenis menjadi sarana fisik paling ampuh untuk melepaskan beban stres eksekutif.']) +
     [Spacer(1, 6)] +
     box('Action Plan:', ['Hobi apa yang dari dulu selalu ingin kamu coba? Begitu kamu punya dana ekstra, jangan ragu untuk membeli raket pertama atau mendaftar kelas les pertama untuk mulai belajar!'], '#E6F4F1', TEAL))

page('04', 'UPGRADE 04', 'Kualitas Tidur yang Optimal', 'Fondasi Bahan Bakar Utama Mesin Penghasil Uang', 'sleep',
     [Paragraph('Tubuhmu adalah mesin utama penghasil uang, dan bahan bakar paling dasarnya adalah tidur yang berkualitas. Banyak orang hanya memikirkan durasi jam tidur, padahal konsistensi jam tidur dan jam bangun sama pentingnya.', BODY), Spacer(1, 4)] +
     box('Studi Harvard tentang Konsistensi Sirkadian:', ['Penelitian terhadap mahasiswa selama sebulan menemukan bahwa mereka yang jam tidurnya berantakan (meskipun total durasi tidurnya sama) memiliki performa akademis lebih jelek. Jam biologis mereka tergeser hampir 3 jam—merasakan efek <i>jetlag</i> setiap hari tanpa perlu naik pesawat!'], '#EAF0F8', NAVY2) +
     [Paragraph('Aturan Emas Tidur & Tempat Investasi Keuangan', H2)] +
     lis(['<b>1. Jaga Circadian Rhythm:</b> Tidur dan bangunlah di jam yang sama setiap hari (termasuk di akhir pekan/weekend) agar ritme sirkadian tubuh stabil dan hafal kapan harus beristirahat.',
          '<b>2. Investasi Kasur & Bantal Berkualitas:</b> Mengalokasikan uang untuk kasur dan bantal super nyaman adalah keputusan finansial yang sangat cerdas. Kamu menghabiskan 1/3 hidupmu di atas kasur, dan kualitas 1/3 hidup itulah yang menentukan kualitas 2/3 hidup sisanya saat kamu terbangun!']) +
     [Spacer(1, 6)] +
     box('Tantangan 2 Minggu:', ['Tetapkan jam tidur dan jam bangun yang pasti, lalu terapkan secara konsisten selama 14 hari ke depan tanpa terkecuali untuk merasakan lonjakan energi harianmu.'], '#E6F4F1', TEAL))

page('05', 'UPGRADE 05', 'Makanan Sehat & Mindful Eating', 'Nutrisi Berkualitas & Kesadaran Asupan Tubuh', 'food',
     [Paragraph('Makan sehat sering dianggap ribet karena harus menghitung kalori atau memasak sendiri. Padahal saat punya uang lebih, kamu bisa memanfaatkan layanan catering sehat atau meal prep. Kuncinya terletak pada sikap <i>mindful</i> terhadap apa yang masuk ke dalam tubuh.', BODY), Spacer(1, 4)] +
     box('Panduan Batas Asupan Harian Kemenkes (G4G15):', ['• <b>G4:</b> Maksimal 4 Sendok Makan Gula / hari.', '• <b>G1:</b> Maksimal 1 Sendok Teh Garam / hari.', '• <b>L5:</b> Maksimal 5 Sendok Makan Minyak / hari.', '<i>Catatan: kuota ini sering kali sudah habis sebelum makan malam akibat konsumsi minuman manis, bumbu instan, dan gorengan!</i>']) +
     [Paragraph('Prinsip Praktis Upgrade Makanan Sehat', H2)] +
     lis(['<b>1. Menu Sarapan Simpel & Tinggi Protein:</b> Contoh menu praktis harian: 2 telur rebus, buah segar, dan Greek Yogurt. Bahan makanan bernutrisi tinggi sangat mudah ditemukan (telur, tahu, tempe, ayam, ikan, dan sayuran).',
          '<b>2. Makanan Adalah Obat:</b> Anggap makanan sebagai obat yang kamu konsumsi 3 kali sehari. Gunakan uang ekstra untuk membeli bahan makanan berkualitas tinggi, dan gunakan kebiasaan baru untuk lebih <i>mindful</i> memperhatikan nutrisi.']))

page('06', 'UPGRADE 06', 'Bikin Olahraga Konsisten', 'Membangun Sistem Akuntabilitas yang Memaksa Bergerak', 'fit',
     [Paragraph('Banyak orang mengira dengan membayar keanggotaan gym (fitness center), mereka otomatis akan rajin berolahraga. Faktanya, penelitian mengenai perilaku anggota gym menunjukkan fenomena unik.', BODY), Spacer(1, 4)] +
     box("Studi 'Paying Not to Go to the Gym':", ['Riset terhadap ribuan anggota gym menemukan bahwa orang yang membayar biaya membership bulanan rata-rata hanya datang <b>4 kali dalam sebulan</b>. Akibatnya, biaya riil per kedatangan menjadi sangat mahal karena tidak ada sistem yang memaksa mereka datang.'], '#FDE9E4', RED) +
     [Paragraph('2 Solusi Sistemik Agar Olahraga Konsisten', H2)] +
     lis(['<b>1. Format Group Training (Pembayaran Mingguan):</b> Mengikuti kelas kelompok dengan jadwal bergantian (strength & cardio) dan sistem bayar mingguan. Sistem pembayaran mingguan memberikan efek psikologis \'rugi kalau skip\', sehingga dorongan untuk hadir jauh lebih tinggi.',
          '<b>2. Menyewa Personal Trainer (PT):</b> Personal Trainer akan tetap datang dan menagih sesi latihan meskipun kamu sedang malas. Biaya yang dikeluarkan berfungsi membeli sistem akuntabilitas eksternal.']) +
     [Spacer(1, 6)] +
     box('Kunci Upgrade:', ['Pilih format olahraga di mana proses untuk bolos/skip terasa lebih rumit daripada proses untuk datang latihan!'], '#E6F4F1', TEAL))

page('07', 'UPGRADE 07', 'Health Tracker untuk Memantau Kesehatan', 'Transisi dari Sekadar Duga-duga Menjadi Keputusan Berbasis Data', 'track',
     [Paragraph("Prinsip utama manajemen kesehatan modern adalah: <b>'Apa yang tidak diukur, hanya akan dikira-kira.'</b> Tanpa alat ukur, kita sering mengira tidur sudah cukup atau tubuh sudah cukup bergerak, padahal kondisi fisik sebenarnya sedang kelelahan.", BODY), Spacer(1, 4)] +
     box('Manfaat Penggunaan Health Tracker / Smartwatch:', ['• <b>Tracking Skor Recovery (Pemulihan):</b> Mengukur rapot kebugaran harian tubuh sebelum memulai aktivitas berat.', '• <b>Evaluasi Input Tubuh:</b> Jika angka recovery jelek, kamu bisa langsung mengevaluasi aktivitas, asupan makanan, dan kualitas tidur hari sebelumnya.', '• <b>Opsi Perangkat:</b> Memakai Whoop, Apple Watch, Garmin, atau smartwatch/fitness tracker lainnya yang sesuai budget.'], '#EAF0F8', NAVY2) +
     [Paragraph('Integrasi Pilar Kesehatan Berbasis Data', H2)] +
     table(['Metrik Tracker', 'Indikator yang Dievaluasi', 'Tindakan Penyesuaian'], [
         ['<b>Skor Sleep Quality</b>', 'Durasi Deep Sleep & REM', 'Menyesuaikan jam tidur & kenyamanan kamar.'],
         ['<b>Daily Activity / Steps</b>', 'Jumlah langkah & kalori aktif', 'Menambah jalan kaki jika terlalu lama duduk.'],
         ['<b>Recovery Index</b>', 'Variabilitas Detak Jantung (HRV)', 'Mengurangi intensitas latihan saat recovery rendah.']], [130, 150, W - 80 - 280]))

page('08', 'UPGRADE 08', 'Tinggal Dekat dari Tempat Kerja', 'Membeli Kembali Waktu Produktif & Mengurangi Stres Harian', 'time',
     [Paragraph('Poin 8: Tinggal Lebih Dekat dari Tempat Kerja (Commute Paradox)', H1),
      Paragraph('Waktu adalah uang, dan waktu yang habis di perjalanan (commute) adalah waktu produktif yang hilang tanpa menghasilkan apa-apa.', BODY),
      Paragraph('<b>Kalkulasi Perjalanan Bekasi–Jakarta:</b> Commute 3 jam/hari × 5 hari × 4 minggu = <b>60 jam sebulan</b> (2,5 hari penuh terbuang di jalan!). Riset menemukan fenomena <i>Commuting Paradox</i>: orang dengan waktu commute lama secara konsisten lebih tidak puas dengan hidupnya. Gaji lebih besar atau sewa rumah murah di pinggiran tidak cukup menutupi stres akibat commute.', BODY), Spacer(1, 2)] +
     box('Solusi:', ['Menyewa tempat tinggal/apartemen dekat kantor. Waktu 3 jam yang kembali bisa dipakai untuk menyiapkan makanan sehat, berolahraga, dan quality time bersama keluarga.'], '#E6F4F1', TEAL))

page('09', 'UPGRADE 09', 'Outsource Pekerjaan Rumah', 'Membeli Waktu & Memangkas Kecemasan Harian', 'outsource',
     [Paragraph('Poin 9: Outsource Pekerjaan Rumah (Buying Time)', H1),
      Paragraph("Riset internasional di 4 negara membuktikan bahwa orang yang mengeluarkan uang untuk 'membeli waktu' (<i>buying time</i>) jauh lebih bahagia daripada mereka yang terus-menerus mengorbankan waktu untuk tugas domestik.", BODY), Spacer(1, 2)] +
     table(['Jasa Domestik', 'Bentuk Outsource', 'Manfaat yang Diperoleh'], [
         ['<b>Pakaian</b>', 'Laundry Kiloan / Antar-Jemput', 'Menghemat waktu mencuci & menyetrika 4–6 jam/minggu.'],
         ['<b>Kebersihan</b>', 'Jasa Cleaning via Aplikasi', 'Rumah tetap bersih tanpa menguras energi di akhir pekan.'],
         ['<b>Consumables</b>', 'Catering Makanan Sehat', 'Nutrisi terjaga tanpa menyita waktu belanja & memasak.']], [90, 160, W - 80 - 250]))

page('10', 'UPGRADE 10', 'Berbagi Lebih Banyak & Penutup Buku', 'Puncak Kebahagiaan Finansial & Investasi Nilai Abadi', 'give',
     [Paragraph('Upgrade ke-10 ini adalah hal yang paling sering dilupakan orang saat rezeki dan uang mereka bertambah: <b>Berbagi Lebih Banyak (Giving Back)</b>.', BODY), Spacer(1, 4)] +
     box('Bukti Ilmiah Kebahagiaan Berbagi:', ['Studi eksperimental menunjukkan bahwa kelompok orang yang diinstruksikan menggunakan uang untuk orang lain merasakan tingkat kebahagiaan yang jauh lebih tinggi daripada kelompok yang menghabiskan uang seluruhnya untuk diri sendiri.'], '#FDE9E4', RED) +
     [Paragraph('Bentuk Berbagi yang Terencana', H2)] +
     lis(['<b>1. Lingkaran Terdekat (Orang Tua & Keluarga):</b> Membalas jasa orang tua dengan mengajak makan di luar, membantu biaya sekolah adik/kerabat, atau mengirimkan hadiah perhatian tanpa menunggu momen lebaran.',
          '<b>2. Zakat & Sedekah Terencana:</b> Memasukkan alokasi berbagi langsung ke dalam rancangan anggaran/budget bulanan sejak awal gajian.',
          '<b>3. Perhatian & Waktu:</b> Bagi yang tinggal terpisah dari orang tua, teleponlah lebih sering dan luangkan waktu untuk pulang berinteraksi.']) +
     [Spacer(1, 6), Paragraph('Rangkuman & Pesan Penutup', H1)] +
     box(None, ['Barang-barang gaya hidup konsumtif (handphone baru, sepatu fancy, jajan berlebihan) dalam 2 tahun akan ketinggalan zaman dan rusak.'], '#FDE9E4', RED) +
     box(None, ['Sebaliknya, <b>skill</b> yang kamu pelajari, <b>kesehatan tubuh</b> yang kamu jaga, <b>waktu</b> yang kamu selamatkan, dan <b>kebahagiaan berbagi</b> yang kamu tanam nilainya justru akan terus meningkat dan melipatgandakan kualitas hidupmu sepanjang masa.'], '#E6F4F1', TEAL))


# ---------------- rendering ----------------
def banner(c, p, idx):
    y0 = H - BH
    c.saveState()
    cl = c.beginPath(); cl.rect(0, y0, W, BH); c.clipPath(cl, stroke=0, fill=0)
    c.translate(0, y0)
    if p['scene'] == 'photo1':
        c.drawImage(HERE + 'crop_city.jpg', 0, 0, W, BH, preserveAspectRatio=False)
        for i in range(60):   # navy fade left -> right
            t = i / 59
            R(c, i * W * 0.72 / 60, 0, W * 0.72 / 60 + 1, BH, NAVY, alpha=.88 * (1 - t) ** 1.2)
        R(c, 0, 0, W, 40, NAVY, alpha=.0)
    else:
        grad_v(c, 0, 0, W, BH, NAVY, NAVY2)
        C(c, 455, 92, 120, GOLD2, .10); C(c, 455, 92, 82, GOLD2, .12)
        for i in range(6): star(c, 40 + i * 47 % 280, 150 + (i * 23) % 30, 3, white, .35)
        c.saveState(); c.translate(0, 0); SCENES[p['scene']](c); c.restoreState()
    R(c, 0, 0, W, 4, GOLD2)
    # text
    Paragraph(p['kicker'], st('k', fontName='S-B', fontSize=8.6, leading=11, textColor=GOLD2)).wrapOn(c, 280, 20)
    pk = Paragraph(p['kicker'], st('k', fontName='S-B', fontSize=8.6, leading=11, textColor=GOLD2)); pk.wrapOn(c, 280, 20); pk.drawOn(c, 40, BH - 40)
    if p['num']:
        R(c, 40, BH - 90, 52, 36, GOLD2, 6)
        c.setFillColor(NAVY); c.setFont('S-B', 20 if len(p['num']) < 4 else 11)
        c.drawCentredString(66, BH - 79 if len(p['num']) < 4 else BH - 75, p['num'])
        ty = BH - 100
    else:
        ty = BH - 54
    pt = Paragraph(p['title'], st('t', fontName='S-B', fontSize=21, leading=25, textColor=white)); w, h = pt.wrapOn(c, 250, 100)
    pt.drawOn(c, 40, ty - h)
    ps = Paragraph(p['sub'], st('s', fontName='S-I', fontSize=10, leading=13, textColor=HexColor('#F2D48A'))); w2, h2 = ps.wrapOn(c, 250, 40)
    ps.drawOn(c, 40, ty - h - 8 - h2)
    c.restoreState()

TAKE = {'photo1': 'Upgrade dirimu dulu, baru upgrade gaya hidupmu.',
        'skill': 'Skill adalah aset yang tidak bisa disita, dipajaki, atau tergerus inflasi.',
        'wfh': 'Satu meja dan kursi yang tepat bisa mengubah seluruh hari kerjamu.',
        'hobby': 'Hobi bukan pemborosan — ia bahan bakar kreativitas dan ketenangan.',
        'sleep': 'Tidur konsisten hari ini = energi, fokus, dan penghasilan esok hari.',
        'food': 'Makanan adalah obat yang kamu minum tiga kali sehari.',
        'fit': 'Bangun sistem yang membuat bolos lebih sulit daripada hadir.',
        'track': 'Yang diukur akan membaik. Yang dikira-kira akan terus meleset.',
        'time': 'Waktu yang kamu beli kembali adalah investasi yang paling cepat terasa.',
        'outsource': 'Uang yang membeli waktu sering lebih berharga daripada barang yang membeli gengsi.',
        'give': 'Berbagi tidak mengurangi — berbagi melipatgandakan kebahagiaanmu.'}

def takeaway(c, p, y_top):
    hb = 100; y = y_top - hb - 4
    c.saveState()
    R(c, 40, y, W - 80, hb, NAVY, 12); R(c, 40, y, 6, hb, GOLD2, 3)
    c.setFillColor(GOLD2); c.setFont('S-B', 8.6); c.drawString(62, y + hb - 24, 'INTI PESAN')
    q = Paragraph('<i>' + TAKE[p['scene']] + '</i>', st('tk', fontName='S-I', fontSize=13, leading=18, textColor=white))
    w, h = q.wrapOn(c, 235, 70); q.drawOn(c, 62, y + (hb - 24 - h) / 2 - 4)
    c.setFillColor(GOLD2); c.setFillAlpha(.9)
    c.restoreState()
    if p['scene'] != 'photo1':
        c.saveState()
        cl = c.beginPath(); cl.roundRect(40, y, W - 80, hb, 12); c.clipPath(cl, stroke=0, fill=0)
        C(c, 430, y + 50, 60, GOLD2, .12)
        s = 0.62; c.translate(345 - 300 * s, y + 8 - 25 * s); c.scale(s, s)
        SCENES[p['scene']](c); c.restoreState()
    else:
        c.saveState(); c.translate(0, 0); 
        for k in range(5): heart(c, 340 + k * 42, y + 50 + (k % 2) * 8, 9 - (k % 2) * 2, GOLD2)
        c.restoreState()

def footer(c, n):
    c.saveState()
    R(c, 40, 48, W - 80, .8, GOLD2)
    c.setFillColor(GOLD); c.setFont('S-B', 10.5); c.drawCentredString(W / 2, 31, '@Copyright 2026')
    c.setFillColor(HexColor('#7B8598')); c.setFont('S', 7.8)
    c.drawString(40, 17, 'Berdasarkan Panduan Pengalaman & Riset Ninda Fer')
    c.drawRightString(W - 40, 17, f'10 Upgrade yang Mengubah Hidup  |  Halaman {n}')
    c.restoreState()

import os, sys
from reportlab.platypus import Flowable
sys.path.insert(0, HERE)
from content import POINTS, NOTE, INTRO_REFS
from PIL import Image as PILImage

PHOTO_DIR = HERE + 'photos/'

class PhotoSlot(Flowable):
    """A realistic-photo frame. Uses photos/<key>.jpg when present, otherwise a labelled placeholder."""
    def __init__(self, w, h, key, caption):
        super().__init__(); self.w, self.h, self.key, self.caption = w, h, key, caption
        self.path = PHOTO_DIR + key + '.jpg'; self.credit_path = PHOTO_DIR + key + '.txt'
    def wrap(self, aw, ah): return self.w, self.h + 14
    def draw(self):
        c = self.canv; w, h = self.w, self.h
        if os.path.exists(self.path):
            im = PILImage.open(self.path).convert('RGB'); iw, ih = im.size; tr = w / h
            if iw / ih > tr: nw = int(ih * tr); im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
            else: nh = int(iw / tr); im = im.crop((0, (ih - nh) // 2, iw, (ih - nh) // 2 + nh))
            tmp = HERE + f'_crop_{self.key}.jpg'; im.save(tmp, quality=92)
            c.saveState(); p = c.beginPath(); p.roundRect(0, 14, w, h, 10); c.clipPath(p, stroke=0, fill=0)
            c.drawImage(tmp, 0, 14, w, h); c.restoreState()
            R(c, 0, 14, w, 3, GOLD2)
            cap = self.caption
            if os.path.exists(self.credit_path): cap += '  |  ' + open(self.credit_path).read().strip()
            c.setFillColor(HexColor('#7B8598')); c.setFont('S-I', 7.6); c.drawString(2, 3, cap)
        else:
            c.saveState(); c.setFillColor(HexColor('#EFE8D6')); c.roundRect(0, 14, w, h, 10, stroke=0, fill=1)
            c.setStrokeColor(GOLD); c.setLineWidth(1.2); c.setDash(5, 4); c.roundRect(3, 17, w - 6, h - 6, 8, stroke=1, fill=0)
            c.setDash(); cx, cy = w / 2, 14 + h / 2 + 12
            c.setFillColor(GOLD); c.roundRect(cx - 24, cy - 15, 48, 30, 5, stroke=0, fill=1)
            c.setFillColor(HexColor('#EFE8D6')); c.circle(cx, cy, 10, stroke=0, fill=1); c.setFillColor(GOLD); c.circle(cx, cy, 6.5, stroke=0, fill=1)
            c.setFillColor(NAVY); c.setFont('S-B', 9.5); c.drawCentredString(cx, cy - 30, 'TEMPAT FOTO MANUSIA REALISTIS')
            c.setFont('S', 8.4); c.drawCentredString(cx, cy - 43, self.caption)
            c.restoreState()


# ---- extra styles for the denser pages ----
BODYS = st('bs', fontSize=10.3, leading=14.6, spaceAfter=5.5)
LIS = st('lis', fontSize=10.2, leading=14, leftIndent=14, firstLineIndent=-14, spaceAfter=4.5)
REFS = st('refs', fontSize=8.4, leading=11.2, leftIndent=14, firstLineIndent=-14, spaceAfter=2.6)
CELLS = st('cells', fontSize=9, leading=12)
CELLSB = st('cellsb', fontName='S-B', fontSize=9, leading=12, textColor=white)

def table_s(head, rows, widths):
    data = [[Paragraph(h, CELLSB) for h in head]] + [[Paragraph(x, CELLS) for x in r] for r in rows]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor('#F5F1E6')]),
                           ('GRID', (0, 0), (-1, -1), .5, HexColor('#D9CFB8')), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('TOPPADDING', (0, 0), (-1, -1), 4.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5), ('LEFTPADDING', (0, 0), (-1, -1), 6)]))
    return [t, Spacer(1, 7)]

SMS = st('sms', fontSize=9.6, leading=13.2, spaceAfter=2)
def mini_box(title, items, bg, bar, width):
    ps = [Paragraph(f'<b>{title}</b>', st('mbt', fontName='S-B', fontSize=10.2, leading=13.5, textColor=NAVY, spaceAfter=3))]
    ps += [Paragraph('• ' + t, SMS) for t in items]
    t = Table([[ps]], colWidths=[width])
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), HexColor(bg)), ('LINEBEFORE', (0, 0), (0, -1), 4, bar),
                           ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
                           ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8), ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    return t

def build_groups(num, d):
    fw = W - 80; half = (fw - 10) / 2
    G = [[PhotoSlot(fw, 150, 'p' + num, d['photo'][0]), Spacer(1, 6)]]
    G.append([Paragraph(d['sci_title'], H1), Paragraph(d['sci'][0], BODYS)])
    G += [[Paragraph(t, BODYS)] for t in d['sci'][1:]]
    G.append([Paragraph('Temuan Kunci dari Riset', H2)] + table_s(['Studi', 'Temuan', 'Makna Praktis'], d['findings'], [128, 232, fw - 360]))
    G.append(box(None, [NOTE], '#EAF0F8', NAVY2))
    G.append([Paragraph(d['steps_title'], H1), Paragraph('1. ' + d['steps'][0], LIS)])
    G += [[Paragraph(f'{i + 2}. ' + t, LIS)] for i, t in enumerate(d['steps'][1:])]
    two = Table([[mini_box('Kesalahan Umum yang Dihindari', d['mistakes'], '#FDE9E4', RED, half),
                  mini_box('Pertanyaan Refleksi', d['reflect'], '#E6F4F1', TEAL, half)]], colWidths=[half + 5, half + 5])
    two.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 5), ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    G.append([Spacer(1, 4), two, Spacer(1, 4)])
    G.append([Paragraph('Rencana 30 Hari', H2)] + table_s(['Periode', 'Fokus Tindakan'], d['plan'], [70, fw - 70]))
    G.append([Paragraph('Referensi Jurnal', H2), Paragraph('[1] ' + d['refs'][0], REFS)])
    G += [[Paragraph(f'[{i + 2}] ' + r, REFS)] for i, r in enumerate(d['refs'][1:])]
    return G

# ---- assemble the expanded book ----
by_num = {p['num']: p for p in PAGES}
intro = PAGES[0]
intro2_flow = [Paragraph('Landasan Ilmiah & Cara Memakai Buku Ini', H1),
    Paragraph('Panduan ini bertumpu pada satu gagasan: setelah kebutuhan dasar dan dana darurat aman, uang lebih paling bernilai bila diubah menjadi kapasitas diri, kesehatan, waktu, dan relasi. Sejumlah riset mendukung arah ini. Lusardi dan rekan menemukan bahwa banyak rumah tangga sangat rapuh secara finansial; sekitar seperempat responden yang mereka survei tidak yakin dapat menghimpun dana darurat dalam waktu singkat [1]. Karena itu syarat dana darurat 6 bulan pada halaman sebelumnya adalah fondasi, bukan formalitas.', BODYS),
    Paragraph('Kahneman dan Deaton menemukan bahwa penghasilan yang lebih tinggi berkaitan dengan evaluasi hidup yang lebih baik, tetapi tidak otomatis meningkatkan kesejahteraan emosional harian [2]. Artinya, bukan besarnya uang semata yang menentukan, melainkan ke mana uang itu diarahkan. Van Boven dan Gilovich menunjukkan bahwa pembelian berupa pengalaman cenderung memberi kepuasan lebih besar dibanding pembelian barang [3], selaras dengan pesan buku ini untuk mengutamakan investasi pada diri, bukan barang konsumtif.', BODYS),
    Paragraph('Cara Membaca Setiap Upgrade', H2)] + \
    table_s(['Halaman', 'Isi', 'Fungsi'], [
        ['<b>Halaman 1</b>', 'Inti pesan dan ringkasan asli dari panduan', 'Memahami gagasan dan contoh pengalaman.'],
        ['<b>Halaman 2</b>', 'Tinjauan ilmiah, foto ilustrasi, dan temuan kunci riset', 'Mengerti alasan di balik tiap upgrade.'],
        ['<b>Halaman 3</b>', 'Panduan penerapan, rencana 30 hari, dan referensi jurnal', 'Mengubah pemahaman menjadi tindakan.']], [80, 230, W - 80 - 310]) + \
    box('Catatan Penting:', ['Isi buku ini bersifat edukasi umum, bukan nasihat medis, psikologis, atau keuangan yang dipersonalisasi. Untuk kondisi kesehatan tertentu (misalnya gangguan tidur menetap, penyakit kronis, atau cedera), konsultasikan dengan tenaga profesional. Simulasi angka bersifat ilustratif.'], '#FDE9E4', RED) + \
    [Paragraph('Referensi Pengantar', H2)] + [Paragraph(f'[{i + 1}] ' + r, REFS) for i, r in enumerate(INTRO_REFS)]
intro2 = dict(num='', kicker='FINANCIAL & LIFE UPGRADE GUIDE', title='Landasan Ilmiah <font color="#E3B964">Buku Ini</font>', sub='Mengapa Upgrade Diri Layak Menjadi Prioritas', scene='skill', flow=intro2_flow, band=False)

ORDER = [intro, intro2]
TITLES = {}
for n in ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']:
    p1 = by_num[n]; d = POINTS[n]
    ORDER.append(p1)
    ORDER.append(dict(num=n, kicker=f'UPGRADE {n}  |  TINJAUAN ILMIAH, PANDUAN & REFERENSI', title=p1['title'], sub='Bukti Riset, Panduan Penerapan & Referensi Jurnal', scene=p1['scene'], groups=build_groups(n, d)))

credits = []
for n in range(1, 11):
    cp = PHOTO_DIR + f'p{n:02d}.txt'
    if os.path.exists(cp): credits.append(f'Upgrade {n:02d}: ' + open(cp).read().strip())
end_flow = [Paragraph('Catatan Akhir & Kredit Foto', H1),
    Paragraph('Seluruh referensi jurnal pada buku ini dirujuk dari literatur ilmiah yang telah dipublikasikan. Sebelum mengutip secara akademik, mohon verifikasi detail volume, halaman, dan DOI pada sumber aslinya. Temuan penelitian bersifat probabilistik dan konteksnya dapat berbeda dengan kondisimu.', BODYS),
    Paragraph('Panduan ini disusun berdasarkan pengalaman dan riset Ninda Fer, dengan tinjauan ilmiah tambahan pada tiap upgrade.', BODYS),
    Paragraph('Kredit Foto', H2)]
end_flow += [Paragraph(x, SMS) for x in credits] if credits else [Paragraph('Foto ilustrasi manusia pada tiap bab akan dicantumkan kreditnya di sini.', SMS)]
ORDER.append(dict(num='', kicker='FINANCIAL & LIFE UPGRADE GUIDE', title='Terima Kasih & <font color="#E3B964">Catatan Akhir</font>', sub='Mulai dari Satu Upgrade Hari Ini', scene='give', flow=end_flow, band=False))


BH2 = 124

def banner2(c, p):
    y0 = H - BH2
    c.saveState()
    cl = c.beginPath(); cl.rect(0, y0, W, BH2); c.clipPath(cl, stroke=0, fill=0)
    c.translate(0, y0)
    grad_v(c, 0, 0, W, BH2, NAVY, NAVY2)
    C(c, 485, 62, 80, GOLD2, .10); C(c, 485, 62, 55, GOLD2, .12)
    c.saveState(); sc = 0.62; c.translate(395 - 300 * sc, 8 - 25 * sc); c.scale(sc, sc); SCENES[p['scene']](c); c.restoreState()
    R(c, 0, 0, W, 4, GOLD2)
    pk = Paragraph(p['kicker'], st('k2', fontName='S-B', fontSize=8, leading=10, textColor=GOLD2)); pk.wrapOn(c, 340, 20); pk.drawOn(c, 40, BH2 - 24)
    R(c, 40, BH2 - 36 - 26, 44, 26, GOLD2, 5)
    c.setFillColor(NAVY); c.setFont('S-B', 16); c.drawCentredString(62, BH2 - 36 - 19, p['num'])
    pt = Paragraph(p['title'], st('t2', fontName='S-B', fontSize=16.5, leading=20, textColor=white)); w, h = pt.wrapOn(c, 290, 60)
    pt.drawOn(c, 94, BH2 - 34 - h)
    ps = Paragraph(p['sub'], st('s2', fontName='S-I', fontSize=9, leading=12, textColor=HexColor('#F2D48A'))); w2, h2 = ps.wrapOn(c, 330, 30)
    ps.drawOn(c, 40, BH2 - 34 - max(h, 28) - 7 - h2)
    c.restoreState()


def gh(group, aw):
    t = 0
    for f in group:
        w_, h_ = f.wrap(aw, 9999); t += h_ + f.getSpaceBefore() + f.getSpaceAfter()
    return t

def main():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle('10 Upgrade yang Mengubah Hidup'); c.setAuthor('Ninda Fer'); c.setSubject('Saat Kamu Mulai Punya Uang Lebih')
    ch = W * 1536 / 1024
    c.setPageSize((W, ch)); c.drawImage(HERE + 'cover.jpg', 0, 0, W, ch); c.showPage()
    c.setPageSize(A4)
    state = dict(n=2); bad = []; per = {}
    AH = H - BH - 56 - 16; AH2 = H - BH2 - 56 - 16
    for p in ORDER:
        if 'groups' in p:
            queue = [list(g) for g in p['groups']]; first = True; cnt = 0
            while queue:
                R(c, 0, 0, W, H, CREAM); banner2(c, p)
                fr = Frame(40, 56, W - 80, AH2, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
                empty = True
                while queue:
                    g = queue[0]; avail = fr._y - fr._y1p; need = gh(g, W - 80)
                    if need > avail and not empty: break
                    queue.pop(0)
                    rest = list(g); fr.addFromList(rest, c)
                    if rest: queue.insert(0, rest)
                    empty = False
                    if rest: break
                footer(c, state['n']); c.showPage(); state['n'] += 1; cnt += 1
            per[p['num']] = cnt
        else:
            R(c, 0, 0, W, H, CREAM); banner(c, p, 0)
            fr = Frame(40, 56, W - 80, AH, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
            flow = p['flow']; tot = gh(flow, W - 80)
            if tot > AH: bad.append((state['n'], p['num'], round(tot - AH)))
            kif = KeepInFrame(W - 80, AH, flow, mode='shrink' if tot > AH else 'error')
            fr.addFromList([kif], c)
            if p.get('band', True) and AH - tot >= 112: takeaway(c, p, fr._y)
            footer(c, state['n']); c.showPage(); state['n'] += 1
    c.save()
    print('pages', state['n'] - 1, '| expanded pages per point:', per)
    print('shrunk/overflow on non-paginated pages:', bad)

main()
print('ok', OUT)
