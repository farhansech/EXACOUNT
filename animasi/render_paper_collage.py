"""Paper-collage animation for the exacount key visual.

Three scenes (cafe terrace -> Paris skyline -> full exacount title) joined by
two motivated transitions (torn paper strip wipe, falling paper clouds).
Renders 1920x1080 @30fps, 7.0 s, with synthesized paper sound effects.

Usage: python3 render_paper_collage.py SOURCE_IMAGE OUT_DIR
"""
import math, os, subprocess, sys, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops

W, H, FPS, DUR = 1920, 1080, 30, 7.0
N = int(FPS * DUR)
CREAM = (246, 238, 222)
rng = np.random.default_rng(7)

src = Image.open(sys.argv[1]).convert("RGB")
OUT = sys.argv[2]
os.makedirs(os.path.join(OUT, "frames"), exist_ok=True)

# ---------- helpers ----------
def ease_out(t):  # back-ease with restrained settle
    t = min(max(t, 0), 1); c = 1.2
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2
def smooth(t):
    t = min(max(t, 0), 1); return t * t * (3 - 2 * t)
def ease_in(t):
    t = min(max(t, 0), 1); return t * t * t

def noise_img(w, h, scale, seed):
    r = np.random.default_rng(seed).random((max(2, h // scale), max(2, w // scale)))
    return np.asarray(Image.fromarray((r * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), np.float32) / 255

def fiber_texture(w, h, seed):
    a = noise_img(w, h, 3, seed) * 0.5 + noise_img(w, h, 24, seed + 1) * 0.5
    return a

def torn(mask, seed, rough=0.22):
    """Turn a hard mask into an organically torn one."""
    w, h = mask.size
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(6)), np.float32) / 255
    n = noise_img(w, h, 5, seed) - 0.5 + (noise_img(w, h, 18, seed + 9) - 0.5) * 0.8
    return Image.fromarray(((m + n * rough) > 0.5).astype(np.uint8) * 255)

def paper_piece(img_rgb, mask, seed, border=9):
    """Photo printed on paper: torn cream border + fibers + soft drop shadow (RGBA)."""
    w, h = mask.size
    inner = torn(mask, seed)
    outer = torn(inner.filter(ImageFilter.MaxFilter(border * 2 + 1)), seed + 3, 0.35)
    tex = fiber_texture(w, h, seed + 5)
    paper = np.stack([np.full((h, w), c, np.float32) for c in CREAM], -1) * (0.93 + 0.07 * tex[..., None])
    photo = np.asarray(img_rgb, np.float32) * (0.95 + 0.07 * tex[..., None])
    a_in = np.asarray(inner.filter(ImageFilter.GaussianBlur(0.8)), np.float32)[..., None] / 255
    rgb = photo * a_in + paper * (1 - a_in)
    alpha = np.asarray(outer.filter(ImageFilter.GaussianBlur(0.7)), np.float32)
    return Image.fromarray(np.dstack([rgb, alpha]).clip(0, 255).astype(np.uint8), "RGBA")

def with_shadow(piece, off=(6, 8), blur=7, strength=0.35):
    pad = 24
    w, h = piece.size
    out = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    sh = piece.getchannel("A").point(lambda v: int(v * strength))
    sh_img = Image.new("RGBA", piece.size, (40, 30, 20, 0)); sh_img.putalpha(sh)
    sh_img = sh_img.filter(ImageFilter.GaussianBlur(blur))
    out.alpha_composite(sh_img, (pad + off[0], pad + off[1]))
    out.alpha_composite(piece, (pad, pad))
    return out, pad

def place(canvas, layer, cx, cy, angle=0.0, scale=1.0):
    if scale != 1.0:
        layer = layer.resize((max(1, int(layer.width * scale)), max(1, int(layer.height * scale))), Image.BICUBIC)
    if abs(angle) > 0.01:
        layer = layer.rotate(angle, Image.BICUBIC, expand=True)
    canvas.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)))

def crop_fill(box, zoom=1.0, cx=0.5, cy=0.5):
    """Crop from source (with optional zoom around a point), resized to frame."""
    x0, y0, x1, y1 = box
    zoom = max(zoom, 1.0)
    bw, bh = (x1 - x0) / zoom, (y1 - y0) / zoom
    mx, my = x0 + (x1 - x0) * cx, y0 + (y1 - y0) * cy
    nx0 = max(x0, min(max(mx - bw * cx, x0), x1 - bw)); ny0 = max(y0, min(max(my - bh * cy, y0), y1 - bh))
    return src.resize((W, H), Image.LANCZOS, box=(nx0, ny0, nx0 + bw, ny0 + bh))

def make_cloud(w, h, seed):
    r = np.random.default_rng(seed)
    m = Image.new("L", (w, h), 0); d = ImageDraw.Draw(m)
    base = h * 0.78
    k = 8
    for i in range(k):
        u = i / (k - 1)
        cx = w * (0.1 + 0.8 * u) + r.uniform(-15, 15)
        rad = h * (0.16 + 0.26 * math.sin(math.pi * u) ** 1.5) * r.uniform(0.85, 1.15)
        cy = base - rad * 0.75 - h * 0.12 * math.sin(math.pi * u)
        d.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=255)
    d.ellipse((w * 0.05, base - h * 0.2, w * 0.95, base + h * 0.06), fill=255)
    m = torn(m, seed, 0.3)
    tex = fiber_texture(w, h, seed + 2)
    rgb = np.stack([np.full((h, w), c, np.float32) for c in (250, 247, 240)], -1) * (0.9 + 0.1 * tex[..., None])
    # light top edge, cooler underside like the reference's paper clouds
    grad = np.linspace(1.02, 0.9, h)[:, None, None]
    rgb = rgb * grad * np.array([1.0, 1.0, 1.02])
    a = np.asarray(m.filter(ImageFilter.GaussianBlur(0.8)), np.float32)
    return with_shadow(Image.fromarray(np.dstack([rgb, a]).clip(0, 255).astype(np.uint8), "RGBA"), (5, 9), 9, 0.28)[0]

def make_bird(frame_up):
    s = 4
    m = Image.new("L", (140 * s, 70 * s), 0); d = ImageDraw.Draw(m)
    if frame_up:
        pts = [(70, 40), (40, 10), (8, 4), (32, 22), (58, 44), (82, 44), (108, 22), (132, 4), (100, 10)]
    else:
        pts = [(70, 34), (42, 40), (10, 58), (36, 44), (58, 30), (82, 30), (104, 44), (130, 58), (98, 40)]
    d.polygon([(x * s, y * s) for x, y in pts], fill=255)
    d.ellipse((50 * s, 30 * s, 92 * s, 46 * s), fill=255)
    d.polygon([(50 * s, 38 * s), (36 * s, 34 * s), (50 * s, 42 * s)], fill=255)  # beak/head facing left
    m = m.resize((140, 70), Image.LANCZOS)
    rgb = Image.new("RGB", m.size, (250, 248, 242))
    p = rgb.convert("RGBA"); p.putalpha(m)
    return with_shadow(p, (3, 5), 3, 0.25)[0]

# grain / halftone overlay shared by all frames (stable paper, boiling grain)
paper_tex = fiber_texture(W, H, 99)
grains = [(np.random.default_rng(s).normal(0, 1, (H, W)).astype(np.float32)) for s in range(4)]
yy, xx = np.mgrid[0:H, 0:W]
halftone = (np.sin(xx * 0.9) * np.sin(yy * 0.9)).astype(np.float32)

def finish(img, fi):
    a = np.asarray(img.convert("RGB"), np.float32)
    a *= (0.95 + 0.06 * paper_tex[..., None])
    a += grains[(fi // 2) % 4][..., None] * 4.0 + halftone[..., None] * 2.0
    # gentle vignette
    v = 1 - 0.12 * (((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    return Image.fromarray((a * v[..., None]).clip(0, 255).astype(np.uint8))

# ---------- Scene 1: cafe terrace, assembled from torn pieces ----------
S1_BOX = (0, 592, 620, 941)
s1_full = crop_fill(S1_BOX)
# irregular cut lines → 5 pieces (wall/flowers, town, chairs, table, foreground chair)
cuts = [
    [(0, 0), (W, 0), (W, 360), (1300, 420), (700, 300), (0, 380)],                 # top band
    [(0, 380), (700, 300), (820, 760), (0, 820)],                                   # flowers + jug
    [(700, 300), (1300, 420), (W, 360), (W, H), (1480, H), (1380, 640), (820, 760)],  # chairs/right
    [(0, 820), (820, 760), (1380, 640), (1480, H), (0, H)],                          # table
]
s1_pieces = []
for i, poly in enumerate(cuts):
    m = Image.new("L", (W, H), 0); ImageDraw.Draw(m).polygon(poly, fill=255)
    m = m.filter(ImageFilter.MaxFilter(15))  # overlap so no gaps
    bb = m.getbbox()
    piece = paper_piece(s1_full.crop(bb), m.crop(bb), 10 + i * 7)
    piece, pad = with_shadow(piece)
    cx, cy = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
    s1_pieces.append((piece, cx, cy))
# entry offsets / start rotations / start times (s)
s1_motion = [((0, -700), -6, 0.00), ((-900, 80), 8, 0.22), ((950, -60), -7, 0.40), ((0, 760), 5, 0.62)]
S1_PIECE_DUR = 0.62

def scene1(t):
    c = Image.new("RGBA", (W, H), CREAM + (255,))
    push = 1.0 + 0.02 * smooth((t - 1.2) / 1.0)
    for (piece, cx, cy), ((dx, dy), rot, t0) in zip(s1_pieces, s1_motion):
        p = (t - t0) / S1_PIECE_DUR
        if p <= 0: continue
        e = ease_out(p)
        place(c, piece, cx + dx * (1 - e), cy + dy * (1 - e), rot * (1 - smooth(p)))
    if push != 1.0:
        c = c.resize((int(W * push), int(H * push)), Image.BICUBIC)
        ox, oy = (c.width - W) // 2, (c.height - H) // 2
        c = c.crop((ox, oy, ox + W, oy + H))
    return c

# ---------- Scene 2: Paris skyline, push-in, drifting clouds, gull ----------
S2_BOX = (440, 0, 1130, 388)
clouds2 = [(make_cloud(560, 230, 31), 300, 170, 26), (make_cloud(460, 190, 32), 1500, 250, -18),
           (make_cloud(380, 160, 33), 1050, 110, 12)]
bird_frames = [make_bird(True), make_bird(False)]

def scene2(t, t_start=1.7):
    lt = t - t_start
    z = 1.0 + 0.07 * smooth(lt / 3.0)
    c = crop_fill(S2_BOX, z, 0.42, 0.55).convert("RGBA")
    for cl, x, y, speed in clouds2:
        place(c, cl, x + speed * lt, y + 6 * math.sin(lt * 1.3 + x))
    # gull: enters right, readable glide past the tower, exits left
    bt = (t - 2.45) / 1.9
    if 0 <= bt <= 1:
        bx = W + 120 - (W + 260) * (0.5 * bt + 0.5 * smooth(bt))
        by = 330 - 60 * math.sin(bt * math.pi) + 10 * math.sin(t * 9)
        place(c, bird_frames[int(t * 8) % 2], bx, by, 4 * math.sin(t * 5))
    return c

# ---------- Scene 3: full key visual with logo, settles into place ----------
def scene3(t):
    p = smooth((t - 5.05) / 1.25)
    z = 1.14 - 0.14 * p
    return crop_fill((0, 0, src.width, src.height), z, 0.45, 0.45).convert("RGBA")

# ---------- Transition 1: torn paper strip wipes right → left ----------
T1A, T1B = 1.70, 2.40
STRIP = 240
edge_n = (noise_img(1, H, 6, 51)[:, 0] - 0.5) * 34 + (noise_img(1, H, 40, 52)[:, 0] - 0.5) * 50
edge_n2 = (noise_img(1, H, 6, 53)[:, 0] - 0.5) * 34 + (noise_img(1, H, 40, 54)[:, 0] - 0.5) * 50
tilt = (np.arange(H) - H / 2) * 0.18
strip_tex = np.stack([np.full((H, W), c, np.float32) for c in CREAM], -1) * (0.9 + 0.1 * fiber_texture(W, H, 55)[..., None])

def transition1(t, a, b):
    p = smooth((t - T1A) / (T1B - T1A))
    lead = W + 60 - (W + STRIP + 260) * p          # strip leading (left) edge
    xl = lead + tilt + edge_n                       # per-row left edge
    xr = lead + STRIP + tilt + edge_n2              # per-row right edge
    A, B = np.asarray(a.convert("RGB"), np.float32), np.asarray(b.convert("RGB"), np.float32)
    X = xx.astype(np.float32)
    m_b = (X > xr[:, None]).astype(np.float32)
    m_s = ((X >= xl[:, None]) & (X <= xr[:, None])).astype(np.float32)
    # soft shadow cast by strip onto scene 1 side
    sh = np.clip(1 - (xl[:, None] - X) / 40, 0, 1) * (X < xl[:, None]) * 0.35
    out = A * (1 - sh[..., None])
    out = out * (1 - m_b[..., None]) + B * m_b[..., None]
    out = out * (1 - m_s[..., None]) + strip_tex * m_s[..., None]
    return Image.fromarray(out.clip(0, 255).astype(np.uint8)).convert("RGBA")

# ---------- Transition 2: paper clouds fall, cover, then part ----------
T2A, SWAP, T2B = 4.30, 5.00, 5.60
fall = []
for row, yrow in enumerate([180, 520, 860]):
    for col in range(4):
        cl = make_cloud(1000, 560, 200 + row * 10 + col)
        x = -120 + col * 600 + (row % 2) * 180
        delay = 0.06 * col + 0.1 * (2 - row) + rng.uniform(0, 0.05)
        fall.append((cl, x, yrow, delay, -1 if x + 500 < W / 2 else 1))

def transition2(t, base):
    c = base.copy()
    for cl, x, y, delay, side in sorted(fall, key=lambda f: f[2]):
        p = (t - T2A - delay) / 0.45
        if p <= 0: continue
        cy = (y - H - 400) + (H + 400) * ease_out(p)
        q = smooth((t - SWAP - 0.05 * abs(x - W / 2) / W) / (T2B - SWAP))
        cx = x + 500 + side * 1300 * q
        cy = cy - 80 * q
        place(c, cl, cx, cy, 3 * side * q)
    return c

# ---------- render ----------
for fi in range(N):
    t = fi / FPS
    if t < T1A:
        frame = scene1(t)
    elif t < T1B:
        frame = transition1(t, scene1(t), scene2(t))
    elif t < T2A:
        frame = scene2(t)
    elif t < T2B:
        frame = transition2(t, scene2(t) if t < SWAP else scene3(t))
    else:
        frame = scene3(t)
    finish(frame, fi).save(os.path.join(OUT, "frames", f"f{fi:04d}.png"), compress_level=1)
    if fi % 30 == 0: print("frame", fi, flush=True)

# ---------- sound effects (48 kHz) ----------
SR = 48000
L = int(SR * DUR)
mix = np.zeros((L, 2), np.float32)
ar = np.random.default_rng(3)

def band_noise(n, lo, hi):
    x = ar.normal(0, 1, n); X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR)
    X *= np.exp(-0.5 * ((np.log(f + 1) - np.log((lo * hi) ** 0.5)) / (np.log(hi / lo) / 2.5)) ** 2)
    y = np.fft.irfft(X, n); return y / (np.abs(y).max() + 1e-9)

def add(sig, t0, gain, pan=0.0):
    i0 = int(t0 * SR); n = min(len(sig), L - i0)
    if n <= 0: return
    if np.ndim(pan) == 0: pan = np.full(n, pan)
    pan = pan[:n]
    mix[i0:i0 + n, 0] += sig[:n] * gain * np.sqrt((1 - pan) / 2)
    mix[i0:i0 + n, 1] += sig[:n] * gain * np.sqrt((1 + pan) / 2)

def env(n, att, rel):
    e = np.ones(n); a, r = int(att * SR), int(rel * SR)
    e[:a] = np.linspace(0, 1, a) ** 2; e[-r:] *= np.linspace(1, 0, r) ** 2; return e

def slide(d): n = int(d * SR); return band_noise(n, 1500, 7000) * env(n, d * 0.4, d * 0.5)
def tap():
    n = int(0.09 * SR); return band_noise(n, 150, 900) * np.exp(-np.linspace(0, 9, n)) * env(n, 0.002, 0.02)

for ((dx, dy), _, t0), pan in zip(s1_motion, [0, -0.6, 0.6, 0]):
    add(slide(S1_PIECE_DUR * 0.8), t0, 0.32, pan)
    add(tap(), t0 + S1_PIECE_DUR * 0.62, 0.6, pan)
# strip rush, panned right → left
n = int(0.9 * SR); add(band_noise(n, 800, 9000) * env(n, 0.35, 0.4), T1A - 0.1, 0.42, np.linspace(0.8, -0.8, n))
# gull wing flutter following its path
n = int(1.9 * SR); tt = np.arange(n) / SR
flut = band_noise(n, 300, 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * 8 * tt)) ** 3 * env(n, 0.3, 0.4)
add(flut, 2.45, 0.28, np.linspace(0.9, -0.9, n))
# falling clouds: soft rushes + light landings, then parting swoosh
for k, (cl, x, y, delay, side) in enumerate(fall[::2]):
    add(slide(0.4), T2A + delay, 0.18, side * 0.5)
    add(tap(), T2A + delay + 0.3, 0.3, side * 0.5)
n = int(0.8 * SR); s = band_noise(n, 600, 8000) * env(n, 0.25, 0.45)
add(s, SWAP, 0.25, -0.7); add(band_noise(n, 600, 8000) * env(n, 0.25, 0.45), SWAP, 0.25, 0.7)
add(tap(), 6.25, 0.45)  # final settle
# quiet paper room tone
add(band_noise(L, 200, 3000) * 0.012, 0, 1.0)
fade = int(0.15 * SR); mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
mix *= 0.7 / (np.abs(mix).max() + 1e-9)  # ≈ -3 dBFS peak
with wave.open(os.path.join(OUT, "sfx.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())

subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(OUT, "frames", "f%04d.png"),
                "-i", os.path.join(OUT, "sfx.wav"), "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
                os.path.join(OUT, "exacount_paper_collage.mp4")], check=True)
print("done")
