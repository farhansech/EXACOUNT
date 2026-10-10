'use strict';
// Pustaka ilustrasi vektor: karakter, properti, latar. Semua karakter dipakai ulang di setiap halaman
// agar desainnya konsisten.
const INK = '#5a4263';
const f = (n) => +(+n).toFixed(1);

function rng(seed) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- efek kecil ---------- */
function heart(x, y, s = 1, c = '#ff6f91') {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0,6 C-14,-4 -12,-16 -5,-16 C-1,-16 0,-12 0,-10 C0,-12 1,-16 5,-16 C12,-16 14,-4 0,6Z" fill="${c}" stroke="#fff" stroke-width="2"/>`;
}
function sparkle(x, y, s = 1, c = '#ffe066') {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3Z" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
}
function hearts(cx, cy, n, seed, spread = 90, s = 1) {
  const R = rng(seed);
  const cols = ['#ff6f91', '#ff9ac1', '#ff5d73', '#ffb3c7'];
  let o = '';
  for (let i = 0; i < n; i++) o += heart(cx + (R() - 0.5) * spread * 2, cy - R() * spread, (0.6 + R() * 0.7) * s, cols[i % 4]);
  return o;
}
function sparkles(cx, cy, n, seed, spread = 90, s = 1) {
  const R = rng(seed);
  const cols = ['#ffe066', '#fff2a8', '#ffd23f'];
  let o = '';
  for (let i = 0; i < n; i++) o += sparkle(cx + (R() - 0.5) * spread * 2, cy + (R() - 0.5) * spread * 1.4, (0.5 + R() * 0.8) * s, cols[i % 3]);
  return o;
}
function butterfly(x, y, s = 1, c = '#ff9ac1', rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse cx="-9" cy="-5" rx="10" ry="8" fill="${c}" stroke="${INK}" stroke-width="1.6"/><ellipse cx="9" cy="-5" rx="10" ry="8" fill="${c}" stroke="${INK}" stroke-width="1.6"/><ellipse cx="-7" cy="6" rx="7" ry="6" fill="#ffd23f" stroke="${INK}" stroke-width="1.6"/><ellipse cx="7" cy="6" rx="7" ry="6" fill="#ffd23f" stroke="${INK}" stroke-width="1.6"/><rect x="-1.6" y="-9" width="3.2" height="20" rx="1.6" fill="${INK}"/><path d="M0,-9 Q-4,-18 -8,-18 M0,-9 Q4,-18 8,-18" stroke="${INK}" stroke-width="1.4" fill="none"/></g>`;
}

/* ---------- alam ---------- */
function flower(x, y, s = 1, c = '#ff8fb1', stem = true) {
  let p = '';
  for (let i = 0; i < 5; i++) {
    const a = (i * 72 * Math.PI) / 180;
    p += `<circle cx="${f(Math.sin(a) * 8)}" cy="${f(-Math.cos(a) * 8)}" r="6.5" fill="${c}"/>`;
  }
  const st = stem
    ? `<path d="M0,0 L0,30" stroke="#4c9f4a" stroke-width="3.2" fill="none"/><path d="M0,20 Q-11,11 -16,16 Q-9,23 0,20Z" fill="#6cc46a"/>`
    : '';
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">${st}${p}<circle r="5" fill="#ffe066"/></g>`;
}
function tuft(x, y, s = 1, c = '#5fb85a') {
  return `<path transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" d="M-8,0 L-5,-12 L-1,-2 L3,-15 L6,-2 L10,-11 L11,0Z" fill="${c}"/>`;
}
function tree(x, y, s = 1, c1 = '#6fcb6a', c2 = '#55b259') {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><path d="M-16,0 L-11,-100 L11,-100 L16,0Z" fill="#b17a52"/><path d="M-3,0 L-2,-100 L11,-100 L16,0Z" fill="#9c6742" opacity=".55"/><circle cx="0" cy="-138" r="64" fill="${c2}"/><circle cx="-50" cy="-104" r="42" fill="${c1}"/><circle cx="52" cy="-108" r="44" fill="${c1}"/><circle cx="-8" cy="-156" r="48" fill="${c1}"/><circle cx="-26" cy="-170" r="12" fill="#fff" opacity=".18"/><circle cx="34" cy="-120" r="7" fill="#ff6f6f"/><circle cx="-34" cy="-118" r="7" fill="#ff6f6f"/><circle cx="8" cy="-98" r="7" fill="#ff6f6f"/></g>`;
}
function smallTree(x, y, s = 1, c = '#8bd47f') {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><rect x="-4" y="-26" width="8" height="26" fill="#b17a52"/><circle cx="0" cy="-38" r="22" fill="${c}"/><circle cx="-12" cy="-30" r="14" fill="${c}"/><circle cx="12" cy="-30" r="14" fill="${c}"/></g>`;
}
function cloud(x, y, s = 1, o = 0.95) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" fill="#fff" opacity="${o}"><ellipse cx="0" cy="8" rx="46" ry="14"/><circle cx="-18" cy="-2" r="16"/><circle cx="6" cy="-10" r="22"/><circle cx="28" cy="0" r="15"/></g>`;
}
function rainbow(cx, cy, r, sw = 12) {
  const cols = ['#ff7b7b', '#ffb36b', '#ffe27a', '#8fe08a', '#7fc8ff', '#b79bff'];
  return cols
    .map((c, i) => `<path d="M${f(cx - r + i * sw)},${f(cy)} A${f(r - i * sw)},${f(r - i * sw)} 0 0 1 ${f(cx + r - i * sw)},${f(cy)}" fill="none" stroke="${c}" stroke-width="${sw + 0.5}" opacity=".9"/>`)
    .join('');
}

function bg(W, H, o = {}) {
  const { tone = 'day', seed = 1, hz = 0.5, flow = 16, tree: tr = null, rb = false, clouds = true } = o;
  const R = rng(seed * 7 + 3);
  const yH = H * hz;
  const sky = tone === 'gold' ? ['#ffc99a', '#fff1dc'] : ['#93d8ff', '#e9f8ff'];
  const gr = tone === 'gold' ? ['#b9dc7a', '#8cc860'] : ['#a4e07c', '#7bcf66'];
  const id = `g${seed}_${Math.round(W)}_${Math.round(H)}`;
  const u = Math.min(W, H);
  let s = `<defs><linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><linearGradient id="r${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${gr[0]}"/><stop offset="1" stop-color="${gr[1]}"/></linearGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#s${id})"/>`;
  const sunC = tone === 'gold' ? '#ffb347' : '#ffe27a';
  s += `<circle cx="${f(W * 0.85)}" cy="${f(H * 0.13)}" r="${f(u * 0.12)}" fill="${sunC}" opacity=".3"/><circle cx="${f(W * 0.85)}" cy="${f(H * 0.13)}" r="${f(u * 0.075)}" fill="${sunC}"/>`;
  if (rb) s += rainbow(W * 0.5, yH + 4, Math.min(W * 0.46, H * 0.46), Math.max(8, u * 0.028));
  if (clouds) s += cloud(W * 0.18, H * 0.1, u / 380 + 0.3) + cloud(W * 0.62, H * 0.2, u / 520 + 0.25, 0.85);
  s += `<path d="M0,${f(yH)} C${f(W * 0.2)},${f(yH - H * 0.14)} ${f(W * 0.38)},${f(yH - H * 0.03)} ${f(W * 0.58)},${f(yH - H * 0.1)} S${f(W * 0.9)},${f(yH - H * 0.15)} ${W},${f(yH - H * 0.06)} L${W},${f(yH + 12)} L0,${f(yH + 12)}Z" fill="${tone === 'gold' ? '#c8e08a' : '#c3ecb4'}"/>`;
  s += smallTree(W * 0.12, yH - H * 0.045, u / 420 + 0.35) + smallTree(W * 0.7, yH - H * 0.09, u / 520 + 0.3, '#9adb8f');
  s += `<path d="M0,${f(yH + 6)} C${f(W * 0.3)},${f(yH - H * 0.05)} ${f(W * 0.6)},${f(yH + H * 0.04)} ${W},${f(yH - H * 0.02)} L${W},${f(yH + 16)} L0,${f(yH + 16)}Z" fill="${tone === 'gold' ? '#a8d46d' : '#a8e592'}"/>`;
  s += `<rect y="${f(yH + 6)}" width="${W}" height="${f(H - yH - 6)}" fill="url(#r${id})"/>`;
  if (tr === 'left') s += tree(W * 0.14, yH + (H - yH) * 0.34, u / 330 + 0.35);
  if (tr === 'right') s += tree(W * 0.86, yH + (H - yH) * 0.34, u / 330 + 0.35);
  // bunga & rumput berjarak acak
  const items = [];
  for (let i = 0; i < flow; i++) {
    const y = yH + 14 + R() * (H - yH - 20);
    items.push({ y, x: R() * W, t: i % 4 === 0 ? 'tuft' : 'flower', c: ['#ff8fb1', '#ffd23f', '#ffffff', '#b79bff', '#ff9e5e'][i % 5] });
  }
  items.sort((a, b) => a.y - b.y);
  for (const it of items) {
    const k = 0.3 + ((it.y - yH) / (H - yH)) * 0.55;
    s += it.t === 'tuft' ? tuft(it.x, it.y, k * 1.4) : flower(it.x, it.y, k * 0.9, it.c);
  }
  return s;
}
function fg(W, H, seed = 1) {
  const R = rng(seed * 11 + 5);
  let s = '';
  const cols = ['#ff8fb1', '#ffd23f', '#ffffff', '#b79bff'];
  for (let i = 0; i < 4; i++) {
    const left = i < 2;
    const x = left ? W * (0.03 + i * 0.07) : W * (0.97 - (i - 2) * 0.07);
    s += tuft(x, H + 2, 1.9, '#4fa84d') + flower(x + (left ? 10 : -10), H - 30 - R() * 14, 1.05 + R() * 0.3, cols[(i + seed) % 4]);
  }
  return s;
}

/* ---------- karakter manusia ---------- */
const CH = {
  kiko: { skin: '#f4c59a', hair: '#2e2433', top: '#ffd23f', bot: '#3f7fe0', shoe: '#ef5b5b', kind: 'pants', k: 1 },
  lala: { skin: '#f8d2ac', hair: '#6b3f2b', top: '#ff8fc2', bot: '#ff8fc2', shoe: '#ff5d73', kind: 'dress', k: 1 },
  bimo: { skin: '#e9b688', hair: '#7a4a2b', top: '#4fbf6a', bot: '#e8c36a', shoe: '#ffffff', kind: 'shorts', k: 1.02 },
  mimi: { skin: '#f9d9bb', hair: '#d99a3d', top: '#b9a2ff', bot: '#b9a2ff', shoe: '#ff9ad0', kind: 'dress', k: 0.85 },
};

function faceSvg(mood, c) {
  const ey = -120;
  const eye = (x, big = 1) =>
    `<ellipse cx="${x}" cy="${ey}" rx="${7 * big}" ry="${9 * big}" fill="${INK}" stroke="none"/><circle cx="${x + 2.2}" cy="${ey - 3.6 * big}" r="3.1" fill="#fff" stroke="none"/><circle cx="${x - 2.6}" cy="${ey + 3.8 * big}" r="1.4" fill="#fff" stroke="none"/>`;
  const joy = (x) => `<path d="M${x - 8},${ey + 3} Q${x},${ey - 10} ${x + 8},${ey + 3}" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>`;
  const brow = (x1, y1, x2, y2) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${INK}" stroke-width="3.2" stroke-linecap="round" fill="none" opacity=".85"/>`;
  const tear = (x) => `<path d="M${x},${ey + 12} q-5,9 0,13 q5,-4 0,-13z" fill="#7fd0ff" stroke="#fff" stroke-width="1.2"/>`;
  const smileOpen = `<path d="M-13,-106 Q0,-103 13,-106 Q11,-89 0,-89 Q-11,-89 -13,-106Z" fill="#b8334f"/><ellipse cx="0" cy="-93.5" rx="6" ry="3" fill="#ff8a9a" stroke="none"/>`;
  const cheek = (o = 0.55, r = 1) =>
    `<ellipse cx="-23" cy="-107" rx="${7 * r}" ry="${4.6 * r}" fill="#ff8fa3" opacity="${o}" stroke="none"/><ellipse cx="23" cy="-107" rx="${7 * r}" ry="${4.6 * r}" fill="#ff8fa3" opacity="${o}" stroke="none"/>`;
  const nose = `<path d="M-2.5,-113 Q0,-110.5 2.5,-113" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity=".6"/>`;
  let s = '';
  switch (mood) {
    case 'joy':
      s = joy(-12) + joy(12) + smileOpen + cheek(0.7);
      break;
    case 'eat':
      s = joy(-12) + joy(12) + `<path d="M-8,-102 Q0,-96 8,-102" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` + cheek(0.85, 1.35);
      break;
    case 'sad':
      s = eye(-12) + eye(12) + brow(-20, -134, -6, -139) + brow(6, -139, 20, -134) +
        `<path d="M-9,-97 Q0,-106 9,-97" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` + tear(-17) + cheek(0.35);
      break;
    case 'surprised':
      s = eye(-12, 1.1) + eye(12, 1.1) + brow(-19, -138, -6, -141) + brow(6, -141, 19, -138) +
        `<ellipse cx="0" cy="-97" rx="5.5" ry="7" fill="#b8334f"/>` + cheek(0.6);
      break;
    case 'concern':
      s = eye(-12) + eye(12) + brow(-20, -134, -6, -138) + brow(6, -138, 20, -134) +
        `<path d="M-7,-98 Q-3,-101 0,-98 Q3,-95 7,-98" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` + cheek(0.4);
      break;
    case 'shy':
      s = eye(-12) + eye(12) + brow(-18, -137, -7, -139) + brow(7, -139, 18, -137) +
        `<path d="M-7,-100 Q0,-94 7,-100" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` + cheek(0.85, 1.25);
      break;
    case 'smile':
      s = eye(-12) + eye(12) + `<path d="M-10,-102 Q0,-92 10,-102" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` + cheek(0.55);
      break;
    default: // happy
      s = eye(-12) + eye(12) + smileOpen + cheek(0.6);
  }
  return s + nose;
}

function hairBack(name, c) {
  if (name === 'lala')
    return `<path d="M-38,-122 Q-48,-166 0,-164 Q48,-166 38,-122 L45,-56 Q40,-46 29,-54 L27,-96 L-27,-96 L-29,-54 Q-40,-46 -45,-56Z" fill="${c.hair}"/>`;
  if (name === 'mimi')
    return `<g><ellipse cx="-44" cy="-110" rx="13" ry="20" fill="${c.hair}" transform="rotate(14 -44 -110)"/><ellipse cx="44" cy="-110" rx="13" ry="20" fill="${c.hair}" transform="rotate(-14 44 -110)"/></g>`;
  return '';
}
function hairFront(name, c) {
  if (name === 'kiko')
    return `<path d="M-36,-124 Q-40,-162 0,-160 Q40,-162 36,-124 Q30,-141 18,-142 Q8,-130 -4,-143 Q-18,-134 -27,-142 Q-34,-137 -36,-124Z" fill="${c.hair}"/><path d="M-8,-157 L-3,-174 L5,-158Z" fill="${c.hair}"/><path d="M10,-155 L19,-170 L21,-151Z" fill="${c.hair}"/><path d="M-22,-152 L-30,-165 L-14,-157Z" fill="${c.hair}"/>`;
  if (name === 'lala')
    return `<path d="M-36,-124 Q-38,-162 0,-160 Q38,-162 36,-124 Q22,-148 0,-141 Q-22,-148 -36,-124Z" fill="${c.hair}"/><g transform="translate(-26 -153)"><path d="M0,0 L-19,-11 L-19,10Z" fill="#ff4d5e"/><path d="M0,0 L19,-11 L19,10Z" fill="#ff4d5e"/><circle r="5.5" fill="#ff8a96"/></g>`;
  if (name === 'bimo')
    return `<path d="M-36,-122 Q-40,-163 0,-161 Q40,-163 36,-122 Q31,-138 14,-143 Q-8,-148 -30,-134 Q-35,-130 -36,-122Z" fill="${c.hair}"/>`;
  return `<path d="M-36,-122 Q-40,-163 0,-161 Q40,-163 36,-122 Q24,-140 0,-137 Q-24,-140 -36,-122Z" fill="${c.hair}"/><circle cx="-42" cy="-126" r="5" fill="#ff7ab8"/><circle cx="42" cy="-126" r="5" fill="#ff7ab8"/>`;
}

const ARMS = {
  down: (s) => [s * 36, -46],
  up: (s) => [s * 46, -130],
  out: (s) => [s * 56, -78],
  hold: (s) => [s * 15, -58],
  point: (s) => [s * 68, -92],
  give: (s) => [s * 62, -74],
  carry: (s) => [s * 36, -56],
  chest: (s) => [s * 9, -72],
  mouth: (s) => [s * 9, -99],
  ear: (s) => [s * 42, -118],
  hip: (s) => [s * 42, -58],
  hug: (s) => [s * 22, -58],
  high: (s) => [s * 30, -144],
  wave: (s) => [s * 52, -124],
};

function armSvg(c, side, pose, sleeve) {
  const sh = [side * 25, -90];
  const fn = ARMS[pose] || ARMS.down;
  const hd = fn(side);
  const cx = (sh[0] + hd[0]) / 2 + side * 5;
  const cy = (sh[1] + hd[1]) / 2 + 9;
  const t = 0.42;
  const p1 = [sh[0] + t * (cx - sh[0]), sh[1] + t * (cy - sh[1])];
  const pt = [(1 - t) * (1 - t) * sh[0] + 2 * (1 - t) * t * cx + t * t * hd[0], (1 - t) * (1 - t) * sh[1] + 2 * (1 - t) * t * cy + t * t * hd[1]];
  const d = `M${f(sh[0])},${f(sh[1])} Q${f(cx)},${f(cy)} ${f(hd[0])},${f(hd[1])}`;
  const d2 = `M${f(sh[0])},${f(sh[1])} Q${f(p1[0])},${f(p1[1])} ${f(pt[0])},${f(pt[1])}`;
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="15.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c.skin}" stroke-width="11.5" stroke-linecap="round"/><path d="${d2}" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="${d2}" fill="none" stroke="${c.top}" stroke-width="14" stroke-linecap="round"/><circle cx="${f(hd[0])}" cy="${f(hd[1])}" r="8" fill="${c.skin}"/>`;
}

/**
 * person(nama, x, y(kaki), skala, ekspresi, pose, opsi)
 * pose: 'kiri|kanan' (kiri = sisi kiri penonton). opsi: {flip, sit, front, behind}
 */
function person(name, x, y, s = 1, mood = 'happy', pose = 'down', o = {}) {
  const c = CH[name];
  const [pl, pr = pl] = String(pose).split('|');
  const kk = s * c.k;
  const fl = o.flip ? -1 : 1;
  const sit = o.sit ? 38 : 0;
  const over = (p) => p === 'mouth' || p === 'ear';
  let g = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(kk * fl)} ${f(kk)})" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">`;
  g += `<g transform="translate(0 ${sit})">${hairBack(name, c)}</g>`;
  // kaki / bawahan
  if (!o.sit) {
    if (c.kind === 'pants') {
      g += `<rect x="-22" y="-60" width="19" height="52" rx="8" fill="${c.bot}"/><rect x="3" y="-60" width="19" height="52" rx="8" fill="${c.bot}"/>`;
    } else if (c.kind === 'shorts') {
      g += `<rect x="-20" y="-40" width="15" height="34" rx="6" fill="${c.skin}"/><rect x="5" y="-40" width="15" height="34" rx="6" fill="${c.skin}"/><rect x="-21" y="-17" width="17" height="11" fill="#fff"/><rect x="4" y="-17" width="17" height="11" fill="#fff"/><rect x="-24" y="-58" width="21" height="30" rx="8" fill="${c.bot}"/><rect x="3" y="-58" width="21" height="30" rx="8" fill="${c.bot}"/>`;
    } else {
      g += `<rect x="-19" y="-44" width="14" height="38" rx="6" fill="${c.skin}"/><rect x="5" y="-44" width="14" height="38" rx="6" fill="${c.skin}"/><rect x="-20" y="-17" width="16" height="11" fill="#fff"/><rect x="4" y="-17" width="16" height="11" fill="#fff"/>`;
    }
    g += `<ellipse cx="-13" cy="-4" rx="13" ry="7.5" fill="${c.shoe}"/><ellipse cx="13" cy="-4" rx="13" ry="7.5" fill="${c.shoe}"/>`;
  } else {
    const legCol = c.kind === 'pants' ? c.bot : c.skin;
    g += `<rect x="-12" y="-34" width="62" height="20" rx="10" fill="${legCol}"/><rect x="-12" y="-18" width="62" height="20" rx="10" fill="${legCol}"/>`;
    if (c.kind === 'shorts') g += `<rect x="-14" y="-34" width="34" height="36" rx="10" fill="${c.bot}"/>`;
    g += `<ellipse cx="54" cy="-13" rx="11" ry="12" fill="${c.shoe}"/>`;
  }
  // badan
  g += `<g transform="translate(0 ${sit})">`;
  g += `<rect x="-8" y="-104" width="16" height="14" fill="${c.skin}" stroke="none"/>`;
  if (c.kind === 'dress') {
    g += `<path d="M-25,-98 Q0,-93 25,-98 Q30,-66 46,-30 Q0,-20 -46,-30 Q-30,-66 -25,-98Z" fill="${c.top}"/>`;
    if (name === 'lala') g += `<path d="M-27,-72 Q0,-64 27,-72 L28,-62 Q0,-54 -28,-62Z" fill="#ffd0e6" stroke="none"/>` + heart(0, -44, 0.9, '#fff') + `<circle cx="-24" cy="-40" r="3" fill="#fff" stroke="none"/><circle cx="26" cy="-46" r="3" fill="#fff" stroke="none"/><circle cx="-10" cy="-34" r="2.5" fill="#fff" stroke="none"/>`;
    else g += flower(0, -52, 0.7, '#fff', false) + `<path d="M-27,-70 Q0,-62 27,-70" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
  } else {
    g += `<rect x="-28" y="-100" width="56" height="58" rx="15" fill="${c.top}"/>`;
    if (name === 'kiko') g += `<text x="0" y="-60" font-family="Fredoka, sans-serif" font-weight="700" font-size="30" fill="#ff8a3d" stroke="none" text-anchor="middle">K</text>`;
    if (name === 'bimo') g += `<rect x="-27" y="-76" width="54" height="8" fill="#fff" stroke="none" opacity=".9"/><rect x="-27" y="-60" width="54" height="8" fill="#fff" stroke="none" opacity=".9"/>`;
  }
  // lengan
  let a = '';
  if (!over(pl)) a += armSvg(c, -1, pl);
  if (!over(pr)) a += armSvg(c, 1, pr);
  g += a;
  g += `</g>`;
  if (o.front) g += o.front;
  g += `<g transform="translate(0 ${sit})">`;
  // kepala
  g += `<circle cx="-34" cy="-120" r="7.5" fill="${c.skin}"/><circle cx="34" cy="-120" r="7.5" fill="${c.skin}"/>`;
  g += `<ellipse cx="0" cy="-122" rx="35" ry="33" fill="${c.skin}"/>`;
  g += faceSvg(mood, c);
  g += hairFront(name, c);
  let b = '';
  if (over(pl)) b += armSvg(c, -1, pl);
  if (over(pr)) b += armSvg(c, 1, pr);
  g += b;
  g += `</g></g>`;
  return g;
}

/* ---------- Pipi si kelinci ---------- */
function rabbit(x, y, s = 1, mood = 'happy', o = {}) {
  const fl = o.flip ? -1 : 1;
  const sad = mood === 'sad';
  const ey = -88;
  const eye = (xx, big = 1) =>
    `<ellipse cx="${xx}" cy="${ey}" rx="${5.4 * big}" ry="${6.8 * big}" fill="${INK}" stroke="none"/><circle cx="${xx + 1.8}" cy="${ey - 2.6}" r="2.3" fill="#fff" stroke="none"/>`;
  const joy = (xx) => `<path d="M${xx - 6},${ey + 2} Q${xx},${ey - 8} ${xx + 6},${ey + 2}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  const earL = sad ? 'rotate(-62 -15 -100)' : o.perk ? 'rotate(-4 -15 -100)' : 'rotate(-12 -15 -100)';
  const earR = sad ? 'rotate(62 15 -100)' : o.perk ? 'rotate(4 15 -100)' : 'rotate(12 15 -100)';
  let eyes, mouth;
  if (mood === 'joy') { eyes = joy(-11) + joy(11); mouth = `<path d="M-6,-77 Q0,-68 6,-77Z" fill="#c2415c"/>`; }
  else if (sad) { eyes = eye(-11) + eye(11) + `<path d="M-17,-98 L-6,-102 M6,-102 L17,-98" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M-15,${ey + 10} q-4,8 0,11 q4,-3 0,-11z" fill="#7fd0ff" stroke="none"/>`; mouth = `<path d="M-6,-72 Q0,-78 6,-72" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`; }
  else if (mood === 'surprised') { eyes = eye(-11, 1.15) + eye(11, 1.15); mouth = `<ellipse cx="0" cy="-73" rx="4.5" ry="6" fill="#c2415c"/>`; }
  else { eyes = eye(-11) + eye(11); mouth = `<path d="M0,-80 L0,-77 M0,-77 Q-6,-69 -11,-74 M0,-77 Q6,-69 11,-74" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><rect x="-3.5" y="-77" width="7" height="8" rx="2" fill="#fff"/>`; }
  let g = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * fl)} ${f(s)})" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">`;
  g += `<circle cx="-31" cy="-20" r="10" fill="#fff"/>`; // ekor
  g += `<ellipse cx="0" cy="-36" rx="31" ry="35" fill="#fff"/><ellipse cx="0" cy="-30" rx="17" ry="22" fill="#fff0f3" stroke="none"/>`;
  g += `<ellipse cx="-17" cy="-5" rx="15" ry="7.5" fill="#fff"/><ellipse cx="17" cy="-5" rx="15" ry="7.5" fill="#fff"/>`;
  // telinga
  g += `<g transform="${earL}"><ellipse cx="-15" cy="-128" rx="10.5" ry="28" fill="#fff"/><ellipse cx="-15" cy="-126" rx="5.5" ry="20" fill="#ffb3c1" stroke="none"/></g>`;
  g += `<g transform="${earR}"><ellipse cx="15" cy="-128" rx="10.5" ry="28" fill="#fff"/><ellipse cx="15" cy="-126" rx="5.5" ry="20" fill="#ffb3c1" stroke="none"/></g>`;
  g += `<ellipse cx="0" cy="-86" rx="29" ry="26" fill="#fff"/>`;
  g += eyes;
  g += `<ellipse cx="0" cy="-82" rx="4" ry="3" fill="#ff8aa0" stroke="none"/>` + mouth;
  g += `<ellipse cx="-21" cy="-77" rx="6" ry="4" fill="#ffb3c1" opacity=".7" stroke="none"/><ellipse cx="21" cy="-77" rx="6" ry="4" fill="#ffb3c1" opacity=".7" stroke="none"/>`;
  // dasi kupu-kupu biru (ciri khas Pipi)
  g += `<path d="M0,-58 L-13,-66 L-13,-50Z" fill="#4aa8ff"/><path d="M0,-58 L13,-66 L13,-50Z" fill="#4aa8ff"/><circle cx="0" cy="-58" r="4.5" fill="#2f86e0"/>`;
  // lengan
  if (o.hold) g += `<ellipse cx="-19" cy="-42" rx="8" ry="13" fill="#fff" transform="rotate(25 -19 -42)"/><ellipse cx="19" cy="-42" rx="8" ry="13" fill="#fff" transform="rotate(-25 19 -42)"/>` + o.hold;
  else if (o.up) g += `<ellipse cx="-30" cy="-58" rx="8" ry="14" fill="#fff" transform="rotate(-30 -30 -58)"/><ellipse cx="30" cy="-58" rx="8" ry="14" fill="#fff" transform="rotate(30 30 -58)"/>`;
  else g += `<ellipse cx="-28" cy="-38" rx="8" ry="14" fill="#fff" transform="rotate(12 -28 -38)"/><ellipse cx="28" cy="-38" rx="8" ry="14" fill="#fff" transform="rotate(-12 28 -38)"/>`;
  g += `</g>`;
  return g;
}

/* ---------- ikon wajah (untuk pita pelajaran) ---------- */
function moodIcon(mood, size = 62) {
  const tint = mood === 'sad' ? '#bfe3ff' : mood === 'concern' ? '#ffe9a8' : '#ffd95a';
  const eyes = mood === 'joy' ? `<path d="M-14,-4 Q-9,-13 -4,-4 M4,-4 Q9,-13 14,-4" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>` : `<circle cx="-9" cy="-4" r="4.2" fill="${INK}"/><circle cx="9" cy="-4" r="4.2" fill="${INK}"/>`;
  let mouth;
  if (mood === 'sad') mouth = `<path d="M-9,13 Q0,5 9,13" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M-16,3 q-4,8 0,11 q4,-3 0,-11z" fill="#4aa8ff"/>`;
  else if (mood === 'concern') mouth = `<path d="M-8,12 Q-3,9 0,12 Q3,15 8,12" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M-15,-12 L-5,-15 M5,-15 L15,-12" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
  else mouth = `<path d="M-11,6 Q0,20 11,6Z" fill="#b8334f" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  return `<svg width="${size}" height="${size}" viewBox="-30 -30 60 60"><circle r="27" fill="${tint}" stroke="${INK}" stroke-width="3.2"/><circle cx="-17" cy="6" r="4.5" fill="#ff8fa3" opacity=".5"/><circle cx="17" cy="6" r="4.5" fill="#ff8fa3" opacity=".5"/>${eyes}${mouth}</svg>`;
}

/* ---------- properti ---------- */
function sandwich(x, y, s = 1, r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"><path d="M-22,12 L22,12 L0,-22Z" fill="#f4cf86"/><path d="M-15,9 L15,9 L0,-14Z" fill="#fff3cf" stroke="none"/><path d="M-19,6 Q-12,12 -6,6 Q0,12 6,6 Q12,12 19,6 L19,11 L-19,11Z" fill="#7fd36e" stroke="none"/><circle cx="0" cy="-2" r="4" fill="#ff6b5a" stroke="none"/></g>`;
}
function apple(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.4"><path d="M0,-12 Q-6,-20 -14,-12 Q-20,0 -10,10 Q0,14 10,10 Q20,0 14,-12 Q6,-20 0,-12Z" fill="#ff5d5d"/><path d="M0,-12 Q1,-18 4,-21" fill="none" stroke-linecap="round"/><path d="M2,-17 Q10,-23 14,-17 Q8,-12 2,-17Z" fill="#6cc46a"/><circle cx="-7" cy="-3" r="2.6" fill="#fff" opacity=".7" stroke="none"/></g>`;
}
function banana(x, y, s = 1, r = 0) {
  return `<path transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" d="M-22,-4 Q-4,14 20,-8 L24,-4 Q0,26 -24,2Z" fill="#ffe066" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
}
function carrot(x, y, s = 1, r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"><path d="M-6,-14 L6,-14 L0,22Z" fill="#ff9a3d"/><path d="M-3,-14 Q-8,-26 -12,-24 Q-8,-16 -3,-14 M0,-14 Q0,-30 0,-30 Q3,-22 0,-14 M3,-14 Q8,-26 12,-24 Q8,-16 3,-14Z" fill="#6cc46a"/></g>`;
}
function lunchbox(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M-22,-62 Q-22,-86 0,-86 Q22,-86 22,-62" fill="none" stroke-width="7"/><path d="M-22,-62 Q-22,-86 0,-86 Q22,-86 22,-62" fill="none" stroke="#ffd23f" stroke-width="3.4"/><rect x="-54" y="-66" width="108" height="66" rx="12" fill="#ff7a59"/><rect x="-54" y="-66" width="108" height="22" rx="12" fill="#ff9a76"/><rect x="-10" y="-50" width="20" height="14" rx="4" fill="#ffd23f"/><path d="M0,-34 L4,-24 L14,-24 L6,-18 L9,-8 L0,-14 L-9,-8 L-6,-18 L-14,-24 L-4,-24Z" fill="#fff3a8" stroke-width="1.8"/></g>`;
}
function lunchOpen(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><rect x="-58" y="-92" width="116" height="52" rx="12" fill="#ff9a76"/><path d="M0,-80 L4,-70 L14,-70 L6,-64 L9,-54 L0,-60 L-9,-54 L-6,-64 L-14,-70 L-4,-70Z" fill="#fff3a8" stroke-width="1.8"/><path d="M-58,-40 L58,-40 L66,-4 L-66,-4Z" fill="#fff3d6"/>${sandwich(-30, -22, 0.9)}${apple(8, -20, 1)}${banana(38, -20, 0.9, -8)}<rect x="-66" y="-6" width="132" height="42" rx="10" fill="#ff7a59"/></g>`;
}
function paper(x, y, w, h, kind = 'sun', r = 0) {
  let art = '';
  const cx = w / 2, cy = h / 2;
  if (kind === 'sun') art = `<circle cx="${cx}" cy="${cy - 4}" r="${w * 0.2}" fill="#ffd23f" stroke="#ff9a3d" stroke-width="2"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i * 45 * Math.PI) / 180; return `<path d="M${f(cx + Math.cos(a) * w * 0.26)},${f(cy - 4 + Math.sin(a) * w * 0.26)} L${f(cx + Math.cos(a) * w * 0.36)},${f(cy - 4 + Math.sin(a) * w * 0.36)}" stroke="#ff9a3d" stroke-width="3" stroke-linecap="round"/>`; }).join('') + `<path d="M${cx - 8},${cy - 2} q8,8 16,0" stroke="${INK}" stroke-width="2" fill="none"/>`;
  if (kind === 'rainbow') art = ['#ff7b7b', '#ffe27a', '#7fc8ff'].map((c, i) => `<path d="M${w * 0.18 + i * 7},${h * 0.7} A${w * 0.32 - i * 7},${w * 0.32 - i * 7} 0 0 1 ${w * 0.82 - i * 7},${h * 0.7}" fill="none" stroke="${c}" stroke-width="6"/>`).join('');
  if (kind === 'flower') art = `<path d="M${cx},${h * 0.85} L${cx},${cy}" stroke="#4c9f4a" stroke-width="3"/>` + [0, 1, 2, 3, 4].map((i) => { const a = (i * 72 * Math.PI) / 180; return `<circle cx="${f(cx + Math.sin(a) * w * 0.14)}" cy="${f(cy - 6 - Math.cos(a) * w * 0.14)}" r="${w * 0.1}" fill="#ff8fb1"/>`; }).join('') + `<circle cx="${cx}" cy="${cy - 6}" r="${w * 0.08}" fill="#ffe066"/>`;
  if (kind === 'friends') art = `<circle cx="${w * 0.3}" cy="${h * 0.5}" r="${w * 0.1}" fill="#f4c59a" stroke="${INK}" stroke-width="1.6"/><circle cx="${w * 0.5}" cy="${h * 0.5}" r="${w * 0.1}" fill="#f8d2ac" stroke="${INK}" stroke-width="1.6"/><circle cx="${w * 0.7}" cy="${h * 0.5}" r="${w * 0.1}" fill="#f9d9bb" stroke="${INK}" stroke-width="1.6"/><path d="M${w * 0.28},${h * 0.7} h${w * 0.44}" stroke="#ff8fb1" stroke-width="3"/>` + heart(cx, h * 0.28, 0.6);
  if (kind === 'house') art = `<rect x="${w * 0.25}" y="${h * 0.45}" width="${w * 0.5}" height="${h * 0.38}" fill="#ffcf70"/><path d="M${w * 0.2},${h * 0.47} L${cx},${h * 0.2} L${w * 0.8},${h * 0.47}Z" fill="#ff7a7a"/><rect x="${w * 0.44}" y="${h * 0.6}" width="${w * 0.12}" height="${h * 0.23}" fill="#8a5a3c"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r})"><rect x="-${w / 2}" y="-${h / 2}" width="${w}" height="${h}" rx="5" fill="#fffdf6" stroke="${INK}" stroke-width="2.6"/><g transform="translate(-${w / 2} -${h / 2})">${art}</g></g>`;
}
function ball(x, y, r = 22) {
  const cols = ['#ff7b7b', '#ffe27a', '#7fc8ff', '#8fe08a', '#ff9ac1', '#b79bff'];
  let s = `<g transform="translate(${f(x)} ${f(y)})"><circle r="${r}" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  for (let i = 0; i < 6; i++) {
    const a1 = (i * 60 * Math.PI) / 180, a2 = ((i + 1) * 60 * Math.PI) / 180;
    s += `<path d="M0,0 L${f(Math.cos(a1) * r)},${f(Math.sin(a1) * r)} A${r},${r} 0 0 1 ${f(Math.cos(a2) * r)},${f(Math.sin(a2) * r)}Z" fill="${cols[i]}"/>`;
  }
  return s + `<circle r="${r}" fill="none" stroke="${INK}" stroke-width="2.6"/><circle r="5" fill="#fff" stroke="${INK}" stroke-width="2"/></g>`;
}
function toy(x, y, s = 1, state = 'ok', r = 0) {
  const wheel = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="12" fill="#4a4a5e" stroke="${INK}" stroke-width="2.4"/><circle cx="${cx}" cy="${cy}" r="5" fill="#ffd23f" stroke="${INK}" stroke-width="1.8"/>`;
  let s2 = `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" stroke-linejoin="round"><path d="M-46,-12 L46,-12 Q50,-34 36,-38 L18,-38 L8,-58 L-24,-58 L-34,-38 L-44,-36 Q-52,-30 -46,-12Z" fill="#ff5d5d" stroke="${INK}" stroke-width="2.6"/><path d="M-20,-52 L6,-52 L14,-38 L-27,-38Z" fill="#bfe9ff" stroke="${INK}" stroke-width="2.2"/><circle cx="40" cy="-26" r="4.5" fill="#ffe066" stroke="${INK}" stroke-width="1.6"/>`;
  s2 += wheel(-26, -8);
  if (state !== 'broken') s2 += wheel(26, -8);
  if (state === 'fixed') s2 += sparkle(0, -66, 0.9);
  return s2 + `</g>`;
}
function wheelOnly(x, y, s = 1, r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})"><circle r="12" fill="#4a4a5e" stroke="${INK}" stroke-width="2.4"/><circle r="5" fill="#ffd23f" stroke="${INK}" stroke-width="1.8"/></g>`;
}
function screwdriver(x, y, s = 1, r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" stroke="${INK}" stroke-width="2" stroke-linejoin="round"><rect x="-4" y="-34" width="8" height="22" fill="#cfd6e4"/><rect x="-7" y="-12" width="14" height="24" rx="6" fill="#ff5d5d"/><rect x="-7" y="-2" width="14" height="6" fill="#ffd23f" stroke="none"/></g>`;
}
function house(x, y, s = 1, stage = 'done') {
  const wall = `<rect x="-70" y="-110" width="140" height="110" fill="#ffd490" stroke="${INK}" stroke-width="3"/><path d="M-70,-82 H70 M-70,-55 H70 M-70,-28 H70" stroke="#e8b165" stroke-width="2" opacity=".7"/>`;
  const door = `<rect x="-17" y="-66" width="34" height="66" rx="16" fill="${stage === 'paint' ? '#ffd23f' : '#ff7ab8'}" stroke="${INK}" stroke-width="3"/><circle cx="8" cy="-32" r="3" fill="#fff"/>`;
  const win = `<rect x="-62" y="-92" width="34" height="32" rx="6" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/><path d="M-45,-92 V-60 M-62,-76 H-28" stroke="${INK}" stroke-width="2"/><rect x="28" y="-92" width="34" height="32" rx="6" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/><path d="M45,-92 V-60 M28,-76 H62" stroke="${INK}" stroke-width="2"/>`;
  const roof = `<path d="M-88,-106 L0,-178 L88,-106Z" fill="#ff6b6b" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M-60,-112 L0,-160 L60,-112" fill="none" stroke="#ff9a9a" stroke-width="5" opacity=".7"/><circle cx="0" cy="-130" r="9" fill="#ffe27a" stroke="${INK}" stroke-width="2.4"/>`;
  const flag = `<path d="M0,-178 V-206" stroke="${INK}" stroke-width="3"/><path d="M0,-206 L26,-198 L0,-190Z" fill="#4aa8ff" stroke="${INK}" stroke-width="2.4"/>`;
  const plants = flower(-52, -10, 0.8, '#ff8fb1') + flower(52, -10, 0.8, '#fff');
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">${wall}${win}${door}${roof}${flag}${plants}</g>`;
}
function roofPiece(x, y, w, h = 46) {
  return `<g transform="translate(${f(x)} ${f(y)})"><path d="M${-w / 2},0 L0,${-h} L${w / 2},0Z" fill="#ff6b6b" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${-w * 0.3},-4 L0,${-h * 0.8} L${w * 0.3},-4" fill="none" stroke="#ff9a9a" stroke-width="5" opacity=".7"/><rect x="${-w / 2 - 6}" y="0" width="${w + 12}" height="12" rx="5" fill="#ffd490" stroke="${INK}" stroke-width="3"/></g>`;
}
function block(x, y, s = 1, c = '#ffd23f', r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})"><rect x="-22" y="-22" width="44" height="44" rx="8" fill="${c}" stroke="${INK}" stroke-width="2.6"/><rect x="-14" y="-14" width="28" height="9" rx="4" fill="#fff" opacity=".35"/></g>`;
}
function book(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"><path d="M0,-6 Q-30,-22 -58,-8 L-58,32 Q-30,18 0,34Z" fill="#fff"/><path d="M0,-6 Q30,-22 58,-8 L58,32 Q30,18 0,34Z" fill="#fff"/><path d="M-50,2 Q-30,-6 -10,4 M-50,14 Q-30,6 -10,16" stroke="#7fc8ff" fill="none" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="8" r="12" fill="#ffd23f" stroke-width="2"/><path d="M18,24 Q30,14 44,24" fill="none" stroke="#6cc46a" stroke-width="3"/><path d="M0,-6 V34" /></g>`;
}
function blanket(x, y, w, h, id = 'gp') {
  return `<defs><pattern id="${id}" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#fff"/><rect width="13" height="26" fill="#ff8fa3" opacity=".55"/><rect width="26" height="13" fill="#ff8fa3" opacity=".55"/></pattern></defs><path d="M${f(x - w * 0.42)},${f(y - h / 2)} L${f(x + w * 0.42)},${f(y - h / 2)} L${f(x + w / 2)},${f(y + h / 2)} L${f(x - w / 2)},${f(y + h / 2)}Z" fill="url(#${id})" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
}
function table(x, y, w, h = 60) {
  return `<g transform="translate(${f(x)} ${f(y)})" stroke="${INK}" stroke-width="3" stroke-linejoin="round"><rect x="${-w / 2 + 8}" y="0" width="14" height="${h}" fill="#c98f5e"/><rect x="${w / 2 - 22}" y="0" width="14" height="${h}" fill="#c98f5e"/><rect x="${-w / 2}" y="-14" width="${w}" height="20" rx="8" fill="#e8b27a"/></g>`;
}
function crayons(x, y, s = 1) {
  const cols = ['#ff5d5d', '#ffd23f', '#4aa8ff', '#6cc46a'];
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">${cols.map((c, i) => `<rect x="${i * 11 - 22}" y="-6" width="9" height="${22 - (i % 2) * 5}" rx="2" fill="${c}" stroke="${INK}" stroke-width="1.6" transform="rotate(${(i - 1.5) * 12} ${i * 11 - 17} 12)"/>`).join('')}</g>`;
}
function brush(x, y, s = 1, r = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" stroke="${INK}" stroke-width="2" stroke-linejoin="round"><rect x="-3.5" y="-30" width="7" height="42" rx="3" fill="#c98f5e"/><rect x="-5" y="-40" width="10" height="12" fill="#cfd6e4"/><path d="M-6,-40 Q0,-56 6,-40Z" fill="#ff7ab8"/></g>`;
}
function bucket(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"><path d="M-18,-26 Q0,-46 18,-26" fill="none"/><path d="M-20,-24 L20,-24 L16,10 L-16,10Z" fill="#7fc8ff"/><ellipse cx="0" cy="-24" rx="20" ry="6" fill="#ff7ab8"/></g>`;
}
function bag(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"><path d="M-30,0 L30,0 L26,-52 L-26,-52Z" fill="#4aa8ff"/><path d="M-26,-52 L-30,-72 L30,-72 L26,-52Z" fill="#7fc8ff"/><path d="M-12,-50 Q0,-40 12,-50" fill="none"/><text x="0" y="-20" font-family="Fredoka" font-size="13" font-weight="600" fill="#fff" stroke="none" text-anchor="middle">?</text></g>`;
}
function plate(x, y, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" stroke="${INK}" stroke-width="2.4"><ellipse cx="0" cy="0" rx="26" ry="9" fill="#fff"/><ellipse cx="0" cy="-1" rx="16" ry="5" fill="#f1f1f1" stroke="none"/></g>`;
}

module.exports = {
  INK, f, rng, heart, sparkle, hearts, sparkles, butterfly, flower, tuft, tree, cloud, rainbow, bg, fg,
  CH, person, rabbit, moodIcon, sandwich, apple, banana, carrot, lunchbox, lunchOpen, paper, ball, toy,
  wheelOnly, screwdriver, house, roofPiece, block, book, blanket, table, crayons, brush, bucket, bag, plate,
};
