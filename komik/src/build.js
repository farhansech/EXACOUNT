'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { INK, f, bg, fg, person, rabbit, hearts, sparkles, sparkle, heart, butterfly, flower, tree, cloud, rainbow } = L;

/* ================= tata letak halaman (A4 portrait, 794 x 1123 px @96dpi) ================= */
const PW = 794, PH = 1123, MX = 30, MY = 30, CW = 734, CHT = 935, G = 14;
const LAY = {
  TB: (t = 470) => [[0, 0, CW, t], [0, t + G, 360, CHT - t - G], [374, t + G, 360, CHT - t - G]],
  T2B: (t = 420) => [[0, 0, 360, t], [374, 0, 360, t], [0, t + G, CW, CHT - t - G]],
  G4: () => { const h = (CHT - G) / 2; return [[0, 0, 360, h], [374, 0, 360, h], [0, h + G, 360, h], [374, h + G, 360, h]]; },
  S3: () => { const h = (CHT - 2 * G) / 3; return [[0, 0, CW, h], [0, h + G, CW, h], [0, 2 * (h + G), CW, h]]; },
  TB3: (t = 380) => { const w = (CW - 2 * G) / 3, h = CHT - t - G; return [[0, 0, CW, t], [0, t + G, w, h], [w + G, t + G, w, h], [2 * (w + G), t + G, w, h]]; },
  H: (t = 650) => [[0, 0, CW, t], [0, t + G, CW, CHT - t - G]],
};

const B = (t, x, y, w, tail = 'down', off = 0.5, by = 'x', o = {}) => ({ t, x, y, w, tail, off, by, ...o });
const T = (t, x, y, w, off = 0.5, o = {}) => ({ t, x, y, w, tail: 'down', off, kind: 'think', by: 'x', ...o });
const Cap = (t, x = 12, y = 12, w = 330) => ({ t, x, y, w });
const gy = (H, k = 0.9) => H * k;

/* ================= halaman ================= */
const pages = [];

// ---------- HALAMAN 1 ----------
pages.push({
  layout: LAY.TB(470),
  rib: { t: 'Teman membuat hari kita menjadi lebih ceria.', icon: 'joy', col: '#ffe9a8' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.93), s = 1.22;
        return bg(W, H, { seed: 1, rb: true, flow: 26 }) +
          butterfly(W * 0.08, H * 0.5, 1.3, '#ff9ac1', -15) + butterfly(W * 0.93, H * 0.46, 1.1, '#b79bff', 12) +
          person('kiko', W * 0.3, g, s, 'joy', 'up|up') + person('lala', W * 0.44, g, s, 'joy', 'down|wave') +
          person('bimo', W * 0.58, g, s, 'joy', 'up|up') + person('mimi', W * 0.72, g, s, 'smile', 'wave|down') +
          rabbit(W * 0.88, g, 1.2, 'happy', { up: true }) +
          sparkles(W * 0.5, H * 0.5, 7, 3, 300, 0.9) + fg(W, H, 1);
      },
      html: () => `<div class="title"><span class="t1">Petualangan</span><span class="t2">Kiko dan Teman Baik</span></div>`,
      bubs: [B('Halo, teman-teman! Ayo bermain!', 0.22, 0.37, 310, 'down', 0.55, 'kiko')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.2;
        return bg(W, H, { seed: 2, flow: 14, tree: 'right' }) +
          person('lala', W * 0.32, g, s, 'happy', 'down|hold', { front: flower(0, -66, 1.5, '#ff8fb1') }) +
          person('mimi', W * 0.68, g, s, 'shy', 'hold|down', { front: flower(0, -62, 1.4, '#ffd23f') }) +
          flower(W * 0.1, H * 0.86, 1.8, '#ffffff') + hearts(W * 0.5, H * 0.42, 3, 5, 60, 0.9) + fg(W, H, 2);
      },
      bubs: [B('Bunga ini cantik sekali!', 0.38, 0.14, 200, 'down', 0.4, 'lala')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.15;
        return bg(W, H, { seed: 3, flow: 14 }) + L.ball(W * 0.5, H * 0.34, 25) +
          person('kiko', W * 0.26, g, s, 'joy', 'up|up') + person('bimo', W * 0.74, g, s, 'joy', 'up|up') +
          sparkles(W * 0.5, H * 0.34, 4, 8, 70, 0.8) + fg(W, H, 3);
      },
      bubs: [B('Hup! Tangkap!', 0.27, 0.1, 160, 'down', 0.5, 'kiko')],
    },
  ],
});

// ---------- HALAMAN 2 ----------
const plate = (x, y, name, trait, col) =>
  `<g transform="translate(${f(x)} ${f(y)})"><rect x="-64" y="0" width="128" height="58" rx="16" fill="${col}" stroke="${INK}" stroke-width="3.4"/><text x="0" y="26" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="25" fill="${INK}">${name}</text><text x="0" y="47" text-anchor="middle" font-family="Fredoka" font-weight="500" font-size="16" fill="${INK}">${trait}</text></g>`;
pages.push({
  layout: LAY.TB(410),
  rib: { t: 'Setiap teman itu istimewa.', icon: 'happy', col: '#ffd0e6' },
  panels: [
    {
      scene: (W, H) => {
        const g = H * 0.77, s = 1.0;
        return bg(W, H, { seed: 4, flow: 20, hz: 0.42 }) +
          person('kiko', W * 0.12, g, s, 'joy', 'down|wave') + person('lala', W * 0.31, g, s, 'happy', 'wave|down') +
          person('bimo', W * 0.5, g, s, 'joy', 'up|up') + person('mimi', W * 0.69, g, s, 'shy', 'down|wave') +
          rabbit(W * 0.88, g, 1.0, 'happy', { up: true }) +
          plate(W * 0.12, g + 14, 'Kiko', 'pemberani', '#ffe27a') + plate(W * 0.31, g + 14, 'Lala', 'kreatif', '#ffc1de') +
          plate(W * 0.5, g + 14, 'Bimo', 'ceria', '#b8ecbf') + plate(W * 0.69, g + 14, 'Mimi', 'pemalu', '#d8caff') +
          plate(W * 0.88, g + 14, 'Pipi', 'si kelinci', '#ffffff');
      },
      caps: [Cap('Kiko memiliki banyak teman. Mereka selalu bermain dan belajar bersama.', 12, 12, 430)],
    },
    {
      scene: (W, H) => {
        const g = H * 0.84, s = 1.1;
        return bg(W, H, { seed: 5, flow: 10, tree: 'right', hz: 0.45 }) +
          person('kiko', W * 0.3, g, s, 'happy', 'hold|hold') + person('lala', W * 0.7, g, s, 'smile', 'hold|hold') +
          L.table(W * 0.5, g - 52 * s, W * 0.92, 90) + L.book(W * 0.5, g - 60 * s, 1.2) + fg(W, H, 5);
      },
      bubs: [B('Ayo baca bersama!', 0.34, 0.12, 190, 'down', 0.4, 'lala'), B('Aku suka cerita ini.', 0.66, 0.27, 190, 'down', 0.6, 'kiko')],
    },
    {
      scene: (W, H) => {
        const g = H * 0.86, s = 1.05;
        return bg(W, H, { seed: 6, flow: 12, hz: 0.45 }) +
          L.block(W * 0.5, g - 22, 1.1, '#ff7b7b') + L.block(W * 0.5 - 4, g - 68, 1.1, '#4aa8ff', 3) + L.block(W * 0.5 + 3, g - 114, 1.1, '#ffd23f', -4) + L.block(W * 0.5, g - 156, 0.9, '#8fe08a', 5) +
          person('bimo', W * 0.18, g, s, 'joy', 'down|point') + person('mimi', W * 0.82, g, s, 'shy', 'hold|down') + fg(W, H, 6);
      },
      bubs: [B('Menara tinggi!', 0.24, 0.12, 150, 'down', 0.3, 'bimo'), B('Pelan-pelan, ya.', 0.72, 0.26, 170, 'down', 0.7, 'mimi')],
    },
  ],
});

// ---------- HALAMAN 3 ----------
pages.push({
  layout: LAY.T2B(400),
  rib: { t: 'Wajah sedih artinya teman butuh bantuan.', icon: 'sad', col: '#cfe8ff' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.05;
        return bg(W, H, { seed: 7, flow: 12 }) + person('kiko', W * 0.45, g, s, 'joy', 'down|carry', { front: L.lunchbox(36, 12, 0.85) }) + fg(W, H, 7);
      },
      caps: [Cap('Kiko membawa kotak bekal yang besar.', 10, 10, 330)],
      bubs: [B('Bekalku banyak sekali!', 0.6, 0.31, 200, 'down', 0.3, 'kiko')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.1;
        let far = '';
        far += L.blanket(W * 0.78, H * 0.56, 170, 34, 'gp3') + person('lala', W * 0.7, H * 0.55, 0.42, 'happy', 'down|down', { sit: true }) + person('mimi', W * 0.86, H * 0.55, 0.42, 'happy', 'down|down', { sit: true });
        return bg(W, H, { seed: 8, flow: 10 }) + far + L.bag(W * 0.74, g, 1.0) +
          person('bimo', W * 0.34, g, s, 'surprised', 'out|out') + fg(W, H, 8);
      },
      bubs: [B('Oh, tidak! Bekalku tertinggal!', 0.5, 0.15, 270, 'down', 0.3, 'bimo')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 1.75;
        return bg(W, H, { seed: 9, flow: 16, tree: 'left' }) +
          L.blanket(W * 0.78, H * 0.6, 270, 52, 'gp3b') + L.lunchOpen(W * 0.76, H * 0.62, 0.55) +
          person('kiko', W * 0.65, H * 0.58, 0.62, 'eat', 'hold|hold', { sit: true }) + person('lala', W * 0.84, H * 0.58, 0.62, 'happy', 'hold|hold', { sit: true }) + person('mimi', W * 0.93, H * 0.62, 0.55, 'happy', 'hold|hold', { sit: true }) +
          person('bimo', W * 0.28, g, s, 'sad', 'hug|hug', { sit: true }) + fg(W, H, 9);
      },
      caps: [Cap('Bimo tidak membawa makanan. Bimo terlihat sedih.', 12, 12, 330)],
      bubs: [B('Perutku lapar...', 0.46, 0.3, 200, 'down', 0.15, 'bimo')],
      sfx: [{ t: 'grrruk!', x: 0.13, y: 0.62, size: 30, col: '#ff8a3d', rot: -10 }],
    },
  ],
});

// ---------- HALAMAN 4 ----------
pages.push({
  layout: LAY.TB(470),
  rib: { t: 'Lihat wajah temanmu. Tanyakan: “Kamu kenapa?”', icon: 'concern', col: '#ffe9a8' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        return bg(W, H, { seed: 10, flow: 14, tree: 'left' }) +
          person('bimo', W * 0.34, g, 1.35, 'sad', 'hug|hug', { sit: true }) + person('kiko', W * 0.7, g, 1.3, 'concern', 'hip|chest') + fg(W, H, 10);
      },
      caps: [Cap('Kiko melihat wajah Bimo yang murung.', 12, 12, 330)],
      bubs: [B('Kamu kenapa, Bimo?', 0.72, 0.17, 240, 'down', 0.5, 'kiko', { size: 26 })],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 11, flow: 6, hz: 0.55 }) + person('bimo', W * 0.5, H * 1.12, 2.4, 'sad', 'down|down'),
      bubs: [B('Aku lupa bawa bekal. Aku lapar.', 0.5, 0.83, 280, 'up', 0.5, 'bimo')],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 12, flow: 10 }) + person('kiko', W * 0.5, gy(H, 0.92), 1.45, 'concern', 'down|chest') + fg(W, H, 12),
      bubs: [T('Bimo sedih. Aku harus membantu!', 0.5, 0.16, 290, 0.5)],
    },
  ],
});

// ---------- HALAMAN 5 ----------
pages.push({
  layout: LAY.S3(),
  rib: { t: 'Kalau kita punya, kita bisa berbagi.', icon: 'happy', col: '#d4f3d0' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 13, flow: 10, tree: 'right', hz: 0.42 }) + L.lunchOpen(W * 0.86, g - 4, 0.8) +
          person('kiko', W * 0.34, g, 0.95, 'smile', 'down|give', { front: L.sandwich(64, -80, 1.05, -12) }) +
          person('bimo', W * 0.62, g, 0.95, 'concern', 'down|down') + fg(W, H, 13);
      },
      caps: [Cap('Kiko punya ide yang baik.', 12, 12, 250)],
      bubs: [B('Ayo makan bersama, kita bisa berbagi.', 0.5, 0.22, 330, 'down', 0.15, 'kiko', { size: 24 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 14, flow: 10, hz: 0.42 }) +
          person('kiko', W * 0.34, g, 0.95, 'joy', 'hold|hold', { front: L.sandwich(-14, -70, 0.9, 25) + L.sandwich(16, -72, 0.9, -25) }) +
          person('bimo', W * 0.66, g, 0.95, 'surprised', 'chest|chest') + sparkles(W * 0.5, H * 0.45, 4, 4, 80, 0.8) + fg(W, H, 14);
      },
      caps: [Cap('Kiko membagi bekalnya menjadi dua.', 12, 12, 280)],
      bubs: [B('Satu untukmu, satu untukku!', 0.5, 0.2, 260, 'down', 0.12, 'kiko'), B('Wah, untukku?', 0.1, 0.62, 140, 'right', 0.5, 'bimo', { size: 22 })].slice(0, 1),
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 15, flow: 10, hz: 0.42 }) +
          person('lala', W * 0.1, g, 0.8, 'happy', 'wave|down') + person('mimi', W * 0.23, g, 0.8, 'smile', 'down|wave') +
          person('kiko', W * 0.45, g, 0.95, 'joy', 'down|down') + person('bimo', W * 0.62, g, 0.95, 'joy', 'chest|down', { front: L.sandwich(-14, -70, 0.8, 20) }) +
          rabbit(W * 0.86, g, 1.0, 'happy', { hold: L.carrot(0, -52, 1.0, 30) }) + hearts(W * 0.55, H * 0.4, 3, 3, 120, 0.8) + fg(W, H, 15);
      },
      bubs: [B('Aku juga mau berbagi wortel!', 0.7, 0.17, 320, 'down', 0.87, 'pipi', { size: 24 })],
    },
  ],
});

// ---------- HALAMAN 6 ----------
pages.push({
  layout: LAY.T2B(360),
  rib: { t: 'Berbagi membuat hati menjadi bahagia.', icon: 'joy', col: '#ffd0e6' },
  panels: [
    {
      scene: (W, H) => bg(W, H, { seed: 16, flow: 10 }) + person('bimo', W * 0.5, gy(H, 0.93), 1.25, 'eat', 'hold|hold', { front: L.sandwich(0, -72, 1.2, 0) }) + hearts(W * 0.8, H * 0.5, 3, 2, 40, 0.9) + fg(W, H, 16),
      bubs: [B('Hmm, enak sekali!', 0.5, 0.11, 220, 'down', 0.5, 'bimo')],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 17, flow: 10 }) +
        person('bimo', W * 0.28, gy(H, 0.93), 1.1, 'joy', 'chest|chest') + person('kiko', W * 0.72, gy(H, 0.93), 1.1, 'happy', 'down|hip') + hearts(W * 0.5, H * 0.55, 4, 7, 50, 1) + fg(W, H, 17),
      bubs: [B('Terima kasih, Kiko!', 0.3, 0.1, 170, 'down', 0.4, 'bimo', { size: 22 }), B('Sama-sama!', 0.76, 0.24, 140, 'down', 0.4, 'kiko', { size: 22 })],
    },
    {
      scene: (W, H) => {
        const g = H * 0.78, s = 1.35;
        return bg(W, H, { seed: 18, flow: 22, tree: 'right', hz: 0.4 }) + L.blanket(W * 0.5, H * 0.8, 660, 130, 'gp6') +
          person('kiko', W * 0.14, g, s, 'eat', 'hold|hold', { sit: true, front: L.sandwich(0, -62, 0.9) }) +
          person('lala', W * 0.31, g + 6, s, 'joy', 'hold|hold', { sit: true, front: L.apple(0, -64, 1.2) }) +
          person('bimo', W * 0.5, g, s, 'eat', 'hold|hold', { sit: true, front: L.sandwich(0, -62, 0.9) }) +
          person('mimi', W * 0.69, g + 6, s, 'joy', 'hold|hold', { sit: true, front: L.banana(0, -62, 1, 0) }) +
          rabbit(W * 0.88, g + 12, 1.3, 'joy', { hold: L.carrot(0, -50, 1.1, 30) }) +
          L.plate(W * 0.4, H * 0.93, 1.1) + L.apple(W * 0.4, H * 0.9, 0.9) + L.lunchOpen(W * 0.6, H * 0.97, 0.6) +
          hearts(W * 0.5, H * 0.32, 8, 9, 260, 1.2);
      },
      caps: [Cap('Perut kenyang, hati pun senang.', 12, 12, 300)],
      bubs: [B('Hihi, seru sekali!', 0.5, 0.3, 190, 'down', 0.2, 'lala', { size: 22 })],
    },
  ],
});

// ---------- HALAMAN 7 ----------
pages.push({
  layout: LAY.T2B(430),
  rib: { t: 'Teman bisa sedih kalau tidak diperhatikan.', icon: 'sad', col: '#cfe8ff' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.2;
        return bg(W, H, { seed: 19, flow: 10, tree: 'left' }) + person('lala', W * 0.52, g, s, 'joy', 'hold|hold') +
          L.table(W * 0.52, g - 44 * s, W * 0.9, 90) + L.paper(W * 0.52, g - 62 * s, 96, 70, 'sun', -3) + L.crayons(W * 0.2, g - 52 * s, 1.2) + fg(W, H, 19);
      },
      caps: [Cap('Lala membuat gambar untuk teman-temannya.', 10, 10, 340)],
      bubs: [B('Aku mau menggambar!', 0.6, 0.3, 220, 'down', 0.3, 'lala')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.0;
        return bg(W, H, { seed: 20, flow: 10 }) +
          person('lala', W * 0.17, g, s, 'happy', 'down|give') +
          person('kiko', W * 0.52, g, s, 'joy', 'hold|hold', { front: L.paper(0, -78, 60, 46, 'sun') }) +
          person('bimo', W * 0.85, g, s, 'joy', 'hold|hold', { front: L.paper(0, -78, 60, 46, 'rainbow') }) + fg(W, H, 20);
      },
      bubs: [B('Ini untuk kalian!', 0.28, 0.12, 190, 'down', 0.2, 'lala'), B('Bagus sekali!', 0.65, 0.3, 160, 'down', 0.4, 'kiko', { size: 22 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        const far = person('kiko', W * 0.72, H * 0.58, 0.5, 'joy', 'hold|hold', { front: L.paper(0, -78, 60, 46, 'sun') }) +
          person('lala', W * 0.83, H * 0.58, 0.5, 'joy', 'down|wave') + person('bimo', W * 0.94, H * 0.58, 0.5, 'joy', 'hold|hold', { front: L.paper(0, -78, 60, 46, 'rainbow') });
        return bg(W, H, { seed: 21, flow: 16, tree: 'left' }) + far +
          person('mimi', W * 0.3, g, 1.7, 'sad', 'hug|hug', { sit: true }) + rabbit(W * 0.5, g, 1.35, 'sad', {}) + fg(W, H, 21);
      },
      caps: [Cap('Mimi tidak mendapat gambar. Mimi menjadi sedih.', 12, 12, 330)],
    },
  ],
});

// ---------- HALAMAN 8 ----------
pages.push({
  layout: LAY.TB(470),
  rib: { t: 'Perhatikan perasaan temanmu. Jangan biarkan ia sendirian.', icon: 'concern', col: '#ffe9a8' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.93);
        return bg(W, H, { seed: 22, flow: 14, tree: 'right' }) +
          person('mimi', W * 0.84, H * 0.6, 0.6, 'sad', 'hug|hug', { sit: true }) +
          person('kiko', W * 0.18, g, 1.25, 'concern', 'down|point') + person('lala', W * 0.4, g, 1.25, 'concern', 'chest|chest') + fg(W, H, 22);
      },
      caps: [Cap('Kiko dan Lala melihat Mimi duduk sendirian.', 12, 12, 340)],
      bubs: [B('Lihat, Mimi sendirian.', 0.34, 0.31, 230, 'down', 0.22, 'kiko', { size: 26 })],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 23, flow: 6, hz: 0.55 }) + person('lala', W * 0.5, H * 1.1, 2.3, 'surprised', 'down|mouth'),
      bubs: [T('Aku lupa Mimi! Mimi pasti sedih.', 0.5, 0.15, 300, 0.5)],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 24, flow: 12 }) +
        person('kiko', W * 0.3, gy(H, 0.92), 1.2, 'smile', 'down|point') + person('lala', W * 0.7, gy(H, 0.92), 1.2, 'smile', 'wave|down') + fg(W, H, 24),
      bubs: [B('Ayo kita temui Mimi!', 0.4, 0.13, 220, 'down', 0.3, 'kiko'), B('Ayo!', 0.8, 0.32, 90, 'down', 0.5, 'lala')],
    },
  ],
});

// ---------- HALAMAN 9 ----------
pages.push({
  layout: LAY.TB(470),
  rib: { t: 'Berani minta maaf dan memberi membuat teman senang.', icon: 'joy', col: '#ffd0e6' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.93);
        return bg(W, H, { seed: 25, flow: 16 }) +
          person('lala', W * 0.28, g, 1.3, 'happy', 'down|give', { front: L.paper(76, -84, 62, 48, 'flower', -8) }) +
          person('mimi', W * 0.72, g, 1.3, 'shy', 'hug|down') + hearts(W * 0.5, H * 0.52, 3, 4, 50, 1) + fg(W, H, 25);
      },
      caps: [Cap('Lala membuat gambar baru untuk Mimi.', 12, 12, 330)],
      bubs: [B('Ini untuk kamu, Mimi. Aku ingin kamu ikut senang.', 0.62, 0.3, 340, 'down', 0.18, 'lala', { size: 25 })],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 26, flow: 8, hz: 0.55 }) +
        person('mimi', W * 0.5, H * 1.0, 2.2, 'joy', 'hold|hold', { front: L.paper(0, -64, 66, 52, 'flower') }) + hearts(W * 0.5, H * 0.5, 4, 5, 140, 1.1),
      bubs: [B('Untukku? Terima kasih, Lala!', 0.5, 0.13, 300, 'down', 0.5, 'mimi', { size: 25 })],
    },
    {
      scene: (W, H) => bg(W, H, { seed: 27, flow: 10 }) +
        person('kiko', W * 0.3, gy(H, 0.92), 1.2, 'concern', 'down|chest') + person('mimi', W * 0.7, gy(H, 0.92), 1.2, 'smile', 'down|down') + hearts(W * 0.5, H * 0.58, 4, 6, 60, 1) + fg(W, H, 27),
      bubs: [B('Maaf ya, Mimi.', 0.3, 0.14, 170, 'down', 0.5, 'kiko'), B('Tidak apa-apa!', 0.72, 0.3, 180, 'down', 0.5, 'mimi')],
    },
  ],
});

// ---------- HALAMAN 10 ----------
pages.push({
  layout: LAY.G4(),
  rib: { t: 'Kalau saling membantu, pekerjaan jadi mudah dan seru!', icon: 'happy', col: '#d4f3d0' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        return bg(W, H, { seed: 28, flow: 12 }) + L.block(W * 0.5, g - 20, 1.1, '#ff7b7b') + L.block(W * 0.64, g - 20, 1.1, '#4aa8ff') + L.block(W * 0.57, g - 64, 1.1, '#ffd23f', 4) +
          person('kiko', W * 0.22, g, 1.2, 'joy', 'up|up') + person('bimo', W * 0.86, g, 1.1, 'joy', 'down|up') + fg(W, H, 28);
      },
      caps: [Cap('Semua teman bermain bersama.', 10, 10, 300)],
      bubs: [B('Ayo buat rumah-rumahan!', 0.55, 0.28, 240, 'down', 0.2, 'kiko')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 1.1;
        const handsY = g - 128 * s;
        return bg(W, H, { seed: 29, flow: 8 }) +
          L.roofPiece(W * 0.5, handsY + 4, W * 0.46, 40) + `<rect x="${f(W * 0.2)}" y="${f(handsY - 2)}" width="${f(W * 0.6)}" height="14" rx="7" fill="#ffd490" stroke="${INK}" stroke-width="3"/>` +
          person('kiko', W * 0.27, g, s, 'happy', 'up|up') + person('bimo', W * 0.73, g, s, 'happy', 'up|up') +
          fg(W, H, 29);
      },
      bubs: [B('Satu, dua, tiga... angkat!', 0.5, 0.15, 270, 'down', 0.5, 'bimo')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        return bg(W, H, { seed: 30, flow: 8 }) + L.house(W * 0.52, g - 8, 1.05, 'paint') +
          person('lala', W * 0.2, g, 1.15, 'happy', 'down|give', { front: L.brush(66, -80, 1.2, 40) }) +
          person('mimi', W * 0.86, g, 1.15, 'smile', 'hold|down', { front: L.bucket(0, -42, 0.9) }) + fg(W, H, 30);
      },
      bubs: [B('Aku cat pintunya!', 0.28, 0.12, 190, 'down', 0.4, 'lala', { size: 22 }), B('Aku pegang catnya.', 0.74, 0.28, 190, 'down', 0.65, 'mimi', { size: 22 })],
    },
    {
      scene: (W, H) => {
        const g = H * 0.94;
        return bg(W, H, { seed: 31, flow: 8, hz: 0.45 }) + L.house(W * 0.5, g - 56, 1.25, 'done') +
          person('kiko', W * 0.14, g, 0.85, 'joy', 'up|up') + person('lala', W * 0.32, g, 0.85, 'joy', 'wave|down') +
          person('bimo', W * 0.68, g, 0.85, 'joy', 'up|up') + person('mimi', W * 0.84, g, 0.85, 'joy', 'down|wave') +
          sparkles(W * 0.5, H * 0.3, 7, 9, 150, 1) + fg(W, H, 31);
      },
      caps: [Cap('Mereka saling membantu. Rumah-rumahan pun jadi!', 10, 10, 340)],
      bubs: [B('Hore! Rumah kita jadi!', 0.5, 0.28, 260, 'down', 0.2, 'kiko', { size: 22 })],
    },
  ],
});

// ---------- HALAMAN 11 ----------
pages.push({
  layout: LAY.T2B(400),
  rib: { t: 'Teman yang sedih perlu ditemani dan dibantu.', icon: 'sad', col: '#cfe8ff' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 32, flow: 10 }) + `<path d="M${W * 0.08},${g - 30} h40 M${W * 0.05},${g - 50} h50 M${W * 0.08},${g - 70} h40" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>` +
          rabbit(W * 0.45, g, 1.3, 'happy', {}) + L.toy(W * 0.77, g, 1.05, 'ok') + fg(W, H, 32);
      },
      bubs: [B('Brrm, brrm!', 0.4, 0.15, 160, 'down', 0.5, 'pipi')],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 33, flow: 10 }) + rabbit(W * 0.2, g, 1.3, 'surprised', { perk: true }) +
          L.toy(W * 0.55, g, 1.05, 'broken', -10) + L.wheelOnly(W * 0.82, H * 0.45, 1.3, 30) + sparkles(W * 0.8, H * 0.42, 3, 5, 40, 0.9) + fg(W, H, 33);
      },
      caps: [Cap('Tiba-tiba, mainan Pipi rusak!', 10, 10, 300)],
      sfx: [{ t: 'KREK!', x: 0.62, y: 0.3, size: 46, col: '#ff5d5d', rot: -10 }],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92), s = 1.45;
        return bg(W, H, { seed: 34, flow: 18, tree: 'left' }) +
          rabbit(W * 0.22, g, 1.7, 'sad', {}) + L.toy(W * 0.4, g - 6, 1.1, 'broken', -8) + L.wheelOnly(W * 0.47, g - 18, 1.1, 20) +
          person('kiko', W * 0.6, g, s, 'concern', 'hip|chest') + person('bimo', W * 0.76, g, s, 'smile', 'down|point') + person('lala', W * 0.91, g, s, 'smile', 'chest|down') + fg(W, H, 34);
      },
      caps: [Cap('Semua teman mencari cara bersama.', 12, 12, 300)],
      bubs: [B('Jangan sedih, Pipi. Ayo kita cari cara!', 0.66, 0.14, 330, 'down', 0.5, 'kiko', { size: 24 }), B('Rodanya bisa dipasang lagi!', 0.8, 0.36, 220, 'down', 0.5, 'bimo', { size: 21 })],
    },
  ],
});

// ---------- HALAMAN 12 ----------
pages.push({
  layout: LAY.G4(),
  rib: { t: 'Teman yang baik selalu membantu.', icon: 'joy', col: '#ffd0e6' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        return bg(W, H, { seed: 35, flow: 18 }) + person('bimo', W * 0.42, g, 1.3, 'joy', 'down|high', { front: L.wheelOnly(32, -154, 1.3, 0) }) + sparkles(W * 0.7, H * 0.28, 3, 2, 40, 0.9) + fg(W, H, 35);
      },
      bubs: [B('Ini rodanya! Aku menemukannya!', 0.5, 0.12, 300, 'down', 0.8, 'bimo', { size: 23 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9);
        return bg(W, H, { seed: 36, flow: 10 }) + person('mimi', W * 0.28, g, 1.25, 'smile', 'down|give', { front: L.screwdriver(62, -78, 1.0, 80) }) +
          person('lala', W * 0.74, g, 1.15, 'happy', 'give|down') + fg(W, H, 36);
      },
      bubs: [B('Ini obengnya, Lala.', 0.34, 0.12, 190, 'down', 0.4, 'mimi', { size: 22 }), B('Terima kasih, Mimi!', 0.66, 0.3, 190, 'down', 0.65, 'lala', { size: 22 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 1.15;
        return bg(W, H, { seed: 37, flow: 6, tree: 'right' }) + person('kiko', W * 0.27, g, s, 'happy', 'hold|hold') + person('lala', W * 0.73, g, s, 'happy', 'hold|hold') +
          L.table(W * 0.5, g - 46 * s, W * 0.95, 90) + L.toy(W * 0.5, g - 46 * s - 8, 1.1, 'broken', 0) + L.wheelOnly(W * 0.4, g - 46 * s - 12, 0.9) + L.screwdriver(W * 0.62, g - 46 * s - 18, 0.9, 70) + fg(W, H, 37);
      },
      bubs: [B('Aku pegang, kamu putar!', 0.34, 0.14, 220, 'down', 0.5, 'kiko', { size: 22 }), B('Putar... putar...', 0.74, 0.3, 170, 'down', 0.5, 'lala', { size: 22 })],
    },
    {
      scene: (W, H) => {
        const g = H * 0.94, s = 0.8;
        return bg(W, H, { seed: 38, flow: 12 }) +
          person('kiko', W * 0.14, H * 0.62, s, 'joy', 'up|up') + person('lala', W * 0.38, H * 0.62, s, 'joy', 'wave|down') + person('bimo', W * 0.62, H * 0.62, s, 'joy', 'up|up') + person('mimi', W * 0.86, H * 0.62, s, 'joy', 'down|wave') +
          rabbit(W * 0.3, g, 1.15, 'joy', { up: true }) + L.toy(W * 0.7, g, 1.1, 'fixed') + sparkles(W * 0.5, H * 0.45, 7, 4, 150, 1) + fg(W, H, 38);
      },
      bubs: [B('Terima kasih, teman-teman!', 0.5, 0.1, 290, 'down', 0.3, 'pipi', { size: 22 })],
    },
  ],
});

// ---------- HALAMAN 13 ----------
const chip = (t, col) => `<div class="chip" style="background:${col}">${t}</div>`;
pages.push({
  layout: LAY.TB3(390),
  rib: { t: 'Teman baik mau berbagi, mendengar, dan membantu.', icon: 'joy', col: '#ffe9a8' },
  panels: [
    {
      scene: (W, H) => {
        const g = H * 0.78, s = 1.15;
        return bg(W, H, { seed: 39, flow: 20, tree: 'right', tone: 'gold', hz: 0.42 }) + L.blanket(W * 0.5, H * 0.8, 680, 110, 'gp13') +
          person('lala', W * 0.12, g, s, 'smile', 'hold|hold', { sit: true }) + person('kiko', W * 0.3, g + 4, s, 'happy', 'chest|up', { sit: true }) +
          person('bimo', W * 0.5, g, s, 'smile', 'hold|hold', { sit: true }) + person('mimi', W * 0.68, g + 4, s, 'smile', 'hold|hold', { sit: true }) +
          rabbit(W * 0.88, g + 10, 1.15, 'happy', {}) + hearts(W * 0.5, H * 0.42, 4, 5, 200, 1) + fg(W, H, 39);
      },
      caps: [Cap('Semua duduk bersama. Mereka belajar tiga hal baik.', 12, 12, 360)],
      bubs: [B('Ayo kita ingat bersama!', 0.7, 0.2, 250, 'down', 0.15, 'kiko', { size: 23 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 0.88;
        return bg(W, H, { seed: 40, flow: 8, hz: 0.5 }) + person('kiko', W * 0.27, g, s, 'joy', 'hold|hold', { front: L.sandwich(0, -70, 0.8, 20) }) +
          person('bimo', W * 0.75, g, s, 'joy', 'hold|hold', { front: L.sandwich(0, -70, 0.8, -20) }) + hearts(W * 0.5, H * 0.58, 4, 3, 50, 1);
      },
      html: () => chip('BERBAGI', '#ff9ac1'),
      bubs: [B('Berbagi itu menyenangkan!', 0.5, 0.25, 200, 'down', 0.5, 'kiko', { size: 21 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 0.9;
        return bg(W, H, { seed: 41, flow: 8, hz: 0.5 }) + person('lala', W * 0.28, g, s, 'smile', 'ear|down') + person('mimi', W * 0.74, g, s, 'joy', 'down|point') +
          `<path d="M${W * 0.52},${H * 0.55} q10,-10 0,-20 M${W * 0.58},${H * 0.58} q14,-14 0,-28" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
      },
      html: () => chip('MENDENGAR', '#7fc8ff'),
      bubs: [B('Aku suka menggambar!', 0.55, 0.25, 180, 'down', 0.7, 'mimi', { size: 20 }), B('Aku dengar, Mimi.', 0.38, 0.4, 160, 'down', 0.4, 'lala', { size: 20 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.9), s = 0.88;
        return bg(W, H, { seed: 42, flow: 8, hz: 0.5 }) + person('kiko', W * 0.25, g, s, 'happy', 'hold|hold') + person('bimo', W * 0.75, g, s, 'happy', 'hold|hold') +
          L.block(W * 0.5, g - 64 * s, 1.35, '#8fe08a') + sparkles(W * 0.5, H * 0.5, 3, 6, 40, 0.9);
      },
      html: () => chip('MEMBANTU', '#8fe08a'),
      bubs: [B('Ayo kubantu angkat!', 0.5, 0.25, 200, 'down', 0.3, 'kiko', { size: 21 })],
    },
  ],
});

// ---------- HALAMAN 14 ----------
pages.push({
  layout: LAY.TB(470),
  rib: { t: 'Peduli artinya sayang dan memperhatikan teman.', icon: 'joy', col: '#ffd0e6' },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.93);
        return bg(W, H, { seed: 43, flow: 20, tone: 'gold', rb: true }) +
          person('lala', W * 0.17, g, 1.05, 'happy', 'wave|down') + person('mimi', W * 0.33, g, 1.05, 'smile', 'down|wave') +
          person('bimo', W * 0.8, g, 1.05, 'happy', 'down|wave') + rabbit(W * 0.93, g, 1.1, 'happy', { up: true }) +
          person('kiko', W * 0.57, g, 1.4, 'happy', 'chest|chest') + hearts(W * 0.57, H * 0.4, 5, 3, 160, 1.1) + fg(W, H, 43);
      },
      bubs: [B('Teman yang baik adalah teman yang peduli.', 0.5, 0.13, 560, 'down', 0.55, 'kiko', { size: 31 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 44, flow: 12, tone: 'gold' }) + person('lala', W * 0.4, g, 1.3, 'joy', 'down|out') + person('mimi', W * 0.65, g, 1.3, 'joy', 'out|down') +
          hearts(W * 0.52, H * 0.5, 5, 8, 70, 1.1) + fg(W, H, 44);
      },
      bubs: [B('Aku peduli padamu, Mimi.', 0.5, 0.12, 270, 'down', 0.32, 'lala', { size: 23 })],
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.92);
        return bg(W, H, { seed: 45, flow: 12, tone: 'gold' }) + person('bimo', W * 0.38, g, 1.25, 'joy', 'down|high') + person('kiko', W * 0.64, g, 1.25, 'joy', 'high|down') +
          sparkles(W * 0.5, H * 0.3, 5, 3, 40, 1.1) + fg(W, H, 45);
      },
      bubs: [B('Kita teman baik!', 0.5, 0.1, 210, 'down', 0.5, 'kiko', { size: 24 })],
    },
  ],
});

// ---------- HALAMAN 15 ----------
const balloon = (x, y, c) => `<g><path d="M${x},${y + 30} q-4,26 6,48" stroke="${INK}" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="27" fill="${c}" stroke="${INK}" stroke-width="2.6"/><ellipse cx="${x - 7}" cy="${y - 9}" rx="5" ry="8" fill="#fff" opacity=".5"/></g>`;
pages.push({
  layout: LAY.H(650),
  rib: { t: 'Berbagi dan peduli membuat dunia menjadi lebih indah.', icon: 'joy', col: '#ffe9a8', moral: true },
  panels: [
    {
      scene: (W, H) => {
        const g = gy(H, 0.94);
        return bg(W, H, { seed: 46, flow: 34, rb: true, hz: 0.5 }) +
          balloon(W * 0.07, H * 0.33, '#ff7b9a') + balloon(W * 0.14, H * 0.28, '#ffd23f') + balloon(W * 0.9, H * 0.3, '#7fc8ff') + balloon(W * 0.95, H * 0.36, '#8fe08a') +
          butterfly(W * 0.3, H * 0.4, 1.3, '#ff9ac1', -10) + butterfly(W * 0.72, H * 0.42, 1.2, '#b79bff', 14) +
          person('mimi', W * 0.13, g, 1.45, 'joy', 'wave|up') + person('lala', W * 0.31, g, 1.6, 'joy', 'up|up') +
          person('bimo', W * 0.69, g, 1.6, 'joy', 'up|up') + rabbit(W * 0.89, g, 1.55, 'joy', { up: true }) +
          person('kiko', W * 0.5, g, 1.9, 'joy', 'up|up') + hearts(W * 0.5, H * 0.5, 6, 4, 280, 1.3) + sparkles(W * 0.5, H * 0.45, 10, 2, 320, 1.1) + fg(W, H, 46);
      },
      html: () => `<div class="finale">Ayo menjadi <b>teman baik</b> setiap hari!</div>`,
    },
    {
      scene: (W, H) => {
        const g = gy(H, 0.93);
        return bg(W, H, { seed: 47, flow: 16, tone: 'gold', hz: 0.4 }) +
          person('kiko', W * 0.46, g, 0.8, 'joy', 'down|wave') + person('lala', W * 0.58, g, 0.8, 'joy', 'wave|down') + person('bimo', W * 0.7, g, 0.8, 'joy', 'down|wave') + person('mimi', W * 0.82, g, 0.78, 'joy', 'wave|down') +
          rabbit(W * 0.93, g, 0.85, 'joy', { up: true }) + hearts(W * 0.64, H * 0.38, 5, 7, 140, 0.9) + fg(W, H, 47);
      },
      html: () => `<div class="tamat"><span>TAMAT</span></div>`,
      bubs: [B('Sampai jumpa lagi!', 0.3, 0.2, 230, 'right', 0.5, 'kiko', { size: 26 })],
    },
  ],
});

/* ================= cover ================= */
function coverSVG() {
  const W = PW, H = PH;
  let s = `<defs><linearGradient id="cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0ff"/><stop offset="0.55" stop-color="#d9f3ff"/><stop offset="1" stop-color="#fff4c9"/></linearGradient><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4e07c"/><stop offset="1" stop-color="#6cc760"/></linearGradient><radialGradient id="rays" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff7c2" stop-opacity=".9"/><stop offset="1" stop-color="#fff7c2" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#cv)"/>`;
  // sinar matahari
  s += `<g transform="translate(${W / 2} 420)">`;
  for (let i = 0; i < 16; i++) s += `<path d="M0,0 L${f(Math.cos(i * 22.5 * Math.PI / 180 - 0.1) * 900)},${f(Math.sin(i * 22.5 * Math.PI / 180 - 0.1) * 900)} L${f(Math.cos(i * 22.5 * Math.PI / 180 + 0.1) * 900)},${f(Math.sin(i * 22.5 * Math.PI / 180 + 0.1) * 900)}Z" fill="#fff" opacity="${i % 2 ? 0.0 : 0.22}"/>`;
  s += `</g><circle cx="${W / 2}" cy="420" r="320" fill="url(#rays)"/>`;
  s += rainbow(W / 2, 790, 380, 30);
  s += cloud(120, 330, 1.7) + cloud(690, 300, 1.5, 0.9) + cloud(380, 470, 1.1, 0.85);
  s += `<path d="M0,800 C150,730 300,790 480,745 S740,730 794,770 L794,1123 L0,1123Z" fill="#c3ecb4"/><path d="M0,860 C200,800 420,880 794,820 L794,1123 L0,1123Z" fill="url(#cg)"/>`;
  s += L.tree(80, 905, 1.5) + L.tree(716, 905, 1.4);
  const R = L.rng(77);
  for (let i = 0; i < 40; i++) {
    const y = 880 + R() * 230;
    s += flower(R() * W, y, 0.5 + (y - 880) / 230 * 0.9, ['#ff8fb1', '#ffd23f', '#fff', '#b79bff', '#ff9e5e'][i % 5]);
  }
  const g = 1030;
  s += butterfly(150, 640, 1.8, '#ff9ac1', -14) + butterfly(650, 600, 1.6, '#b79bff', 14);
  s += person('mimi', 112, g + 10, 1.9, 'joy', 'wave|up') + person('lala', 262, g, 2.15, 'joy', 'up|wave') +
    person('bimo', 548, g, 2.15, 'joy', 'wave|up') + rabbit(702, g + 8, 1.9, 'joy', { up: true }) + person('kiko', 405, g + 12, 2.5, 'joy', 'up|up');
  s += hearts(400, 700, 7, 5, 330, 1.5) + sparkles(400, 760, 14, 8, 380, 1.2);
  s += fg(W, H - 10, 3);
  return s;
}
const coverHTML = `
<div class="cv-top">Komik Edukasi Anak • Usia 2–6 Tahun</div>
<div class="cv-title"><span class="a">PETUALANGAN</span><span class="k"><i style="color:#ff5d73">K</i><i style="color:#ffb300">I</i><i style="color:#4fbf6a">K</i><i style="color:#3f9bff">O</i></span><span class="b">dan <em>TEMAN BAIK</em></span></div>
<div class="cv-tags"><span style="background:#ff9ac1">Persahabatan</span><span style="background:#ffd23f">Berbagi</span><span style="background:#8fe08a">Empati</span></div>`;

/* ================= CSS ================= */
const css = `
@font-face{font-family:Fredoka;src:url('fonts/Fredoka.ttf');font-weight:300 700;}
*{box-sizing:border-box;margin:0;padding:0}
@page{size:${PW}px ${PH}px;margin:0}
html,body{background:#d9d2c5}
body{font-family:Fredoka,'Comic Sans MS',sans-serif;color:${INK};-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{position:relative;width:${PW}px;height:${PH}px;overflow:hidden;background:#fff8ec;margin:0 auto 24px;page-break-after:always;break-after:page;
  background-image:radial-gradient(#ffe6b8 2.2px,transparent 2.4px);background-size:26px 26px}
@media print{html,body{background:none}.page{margin:0}}
.panels{position:absolute;left:${MX}px;top:${MY}px;width:${CW}px;height:${CHT}px}
.panel{position:absolute;overflow:hidden;border-radius:22px;background:#fff}
.panel svg{position:absolute;left:0;top:0;display:block}
.panel::after{content:'';position:absolute;inset:0;border:5px solid ${INK};border-radius:22px;pointer-events:none}
.cap{position:absolute;background:#fff2a6;border:3.5px solid ${INK};border-radius:12px;padding:6px 13px 7px;font-size:22px;line-height:1.18;font-weight:500;box-shadow:3px 3px 0 rgba(90,66,99,.28);z-index:3}
.bubble{position:absolute;transform:translate(-50%,-50%);background:#fff;border:3.5px solid ${INK};border-radius:28px;padding:8px 14px 9px;font-size:24px;line-height:1.16;font-weight:600;text-align:center;z-index:4;box-shadow:2px 3px 0 rgba(90,66,99,.22)}
.bubble::after{content:'';position:absolute;width:20px;height:20px;background:inherit;border-right:3.5px solid ${INK};border-bottom:3.5px solid ${INK}}
.t-down::after{bottom:-12.5px;left:calc(var(--off) - 10px);transform:rotate(45deg)}
.t-up::after{top:-12.5px;left:calc(var(--off) - 10px);transform:rotate(225deg)}
.t-left::after{left:-12.5px;top:calc(var(--off) - 10px);transform:rotate(135deg)}
.t-right::after{right:-12.5px;top:calc(var(--off) - 10px);transform:rotate(-45deg)}
.bubble.think{border-radius:44px}
.bubble.think::after{display:none}
.bubble.think i{position:absolute;border-radius:50%;background:#fff;border:3px solid ${INK}}
.bubble.think .d1{width:17px;height:17px;left:calc(var(--off) - 8px);bottom:-27px}
.bubble.think .d2{width:10px;height:10px;left:calc(var(--off) - 20px);bottom:-42px}
.by-kiko{background:#fff6bf}.by-lala{background:#ffe3f0}.by-bimo{background:#def7de}.by-mimi{background:#ece5ff}.by-pipi{background:#fff}
.sfx{position:absolute;transform:translate(-50%,-50%);font-weight:700;letter-spacing:1px;paint-order:stroke fill;-webkit-text-stroke:7px #fff;z-index:4;text-shadow:3px 3px 0 rgba(90,66,99,.3)}
.chip{position:absolute;left:50%;top:14px;transform:translateX(-50%);padding:6px 22px 8px;border-radius:30px;border:3.5px solid ${INK};font-size:25px;font-weight:700;color:#fff;paint-order:stroke fill;-webkit-text-stroke:6px ${INK};letter-spacing:1px;z-index:5;white-space:nowrap;box-shadow:2px 3px 0 rgba(90,66,99,.25)}
.title{position:absolute;left:50%;top:14px;transform:translateX(-50%);text-align:center;z-index:5;width:700px}
.title .t1{display:block;font-size:46px;font-weight:700;letter-spacing:7px;text-transform:uppercase;color:#ff5d73;paint-order:stroke fill;-webkit-text-stroke:11px #fff;line-height:1}
.title .t2{display:block;font-size:64px;font-weight:700;color:#ffb300;paint-order:stroke fill;-webkit-text-stroke:13px #fff;line-height:1.05;text-shadow:0 5px 0 rgba(90,66,99,.25);margin-top:4px}
.ribbon{position:absolute;left:${MX}px;top:${MY + CHT + 14}px;width:${CW}px;height:${PH - MY * 2 - CHT - 14}px;border:5px solid ${INK};border-radius:30px;display:flex;align-items:center;gap:14px;padding:0 22px 0 16px;box-shadow:4px 5px 0 rgba(90,66,99,.28)}
.ribbon .no{flex:none;width:62px;height:62px;border-radius:50%;background:#fff;border:4px solid ${INK};font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center}
.ribbon .ico{flex:none;display:flex}
.ribbon .txt{flex:1;font-size:32px;line-height:1.12;font-weight:700}
.ribbon .txt small{display:block;font-size:16px;font-weight:600;letter-spacing:2px;text-transform:uppercase;opacity:.65;margin-bottom:3px}
.ribbon.moral .txt{font-size:34px}
.finale{position:absolute;left:50%;top:18px;transform:translateX(-50%);width:690px;text-align:center;font-size:54px;font-weight:700;line-height:1.05;color:#ff5d73;paint-order:stroke fill;-webkit-text-stroke:12px #fff;text-shadow:0 5px 0 rgba(90,66,99,.28);z-index:5}
.finale b{color:#3f9bff}
.tamat{position:absolute;left:68px;top:68%;transform:translateY(-50%) rotate(-6deg);z-index:5}
.tamat span{display:inline-block;background:#ff5d73;color:#fff;font-size:44px;font-weight:700;letter-spacing:4px;padding:10px 26px;border-radius:40px;border:5px solid ${INK};box-shadow:4px 5px 0 rgba(90,66,99,.3)}
/* cover */
.cover{background:#7fd0ff}
.cover svg{position:absolute;left:0;top:0}
.cv-top{position:absolute;top:26px;left:0;width:100%;text-align:center;font-size:23px;font-weight:600;letter-spacing:2px;color:${INK};z-index:3}
.cv-top::before{content:'';display:inline-block}
.cv-title{position:absolute;top:62px;left:0;width:100%;text-align:center;z-index:3;line-height:1}
.cv-title .a{display:block;font-size:84px;font-weight:700;letter-spacing:5px;color:#ff5d73;paint-order:stroke fill;-webkit-text-stroke:18px #fff;text-shadow:0 7px 0 rgba(90,66,99,.3)}
.cv-title .k{display:block;font-size:190px;font-weight:700;letter-spacing:6px;margin-top:-6px;paint-order:stroke fill;-webkit-text-stroke:26px #fff;text-shadow:0 10px 0 rgba(90,66,99,.3)}
.cv-title .k i{font-style:normal}
.cv-title .b{display:block;font-size:50px;font-weight:700;color:${INK};margin-top:-6px;paint-order:stroke fill;-webkit-text-stroke:12px #fff}
.cv-title .b em{font-style:normal;color:#3f9bff}
.cv-tags{position:absolute;bottom:30px;left:0;width:100%;text-align:center;z-index:3}
.cv-tags span{display:inline-block;margin:0 7px;padding:7px 20px 9px;border:4px solid ${INK};border-radius:30px;font-size:26px;font-weight:700;box-shadow:3px 4px 0 rgba(90,66,99,.28)}
`;

/* ================= susun HTML ================= */
function panelHTML(r, p) {
  const [x, y, W, H] = r;
  let h = `<div class="panel" style="left:${f(x)}px;top:${f(y)}px;width:${f(W)}px;height:${f(H)}px"><svg width="${f(W)}" height="${f(H)}" viewBox="0 0 ${f(W)} ${f(H)}" xmlns="http://www.w3.org/2000/svg">${p.scene(W, H)}</svg>`;
  if (p.html) h += p.html(W, H);
  for (const c of p.caps || []) h += `<div class="cap" style="left:${c.x}px;top:${c.y}px;width:${c.w}px">${c.t}</div>`;
  for (const b of p.bubs || []) {
    const trail = b.kind === 'think' ? '<i class="d1"></i><i class="d2"></i>' : '';
    const off = Math.min(0.9, Math.max(0.1, b.off));
    h += `<div class="bubble by-${b.by} t-${b.tail}${b.kind === 'think' ? ' think' : ''}" style="left:${f(b.x * W)}px;top:${f(b.y * H)}px;width:${b.w}px;--off:${f(off * 100)}%;${b.size ? `font-size:${b.size}px;` : ''}">${b.t}${trail}</div>`;
  }
  for (const s of p.sfx || []) h += `<div class="sfx" style="left:${f(s.x * W)}px;top:${f(s.y * H)}px;font-size:${s.size}px;color:${s.col};transform:translate(-50%,-50%) rotate(${s.rot}deg)">${s.t}</div>`;
  return h + `</div>`;
}

let html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Petualangan Kiko dan Teman Baik</title><style>${css}</style></head><body>`;
html += `<section class="page cover" id="cover"><svg width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" xmlns="http://www.w3.org/2000/svg">${coverSVG()}</svg>${coverHTML}</section>`;
pages.forEach((pg, i) => {
  const no = i + 1;
  html += `<section class="page" id="p${no}"><div class="panels">`;
  pg.layout.forEach((r, j) => (html += panelHTML(r, pg.panels[j])));
  html += `</div><div class="ribbon${pg.rib.moral ? ' moral' : ''}" style="background:${pg.rib.col}"><div class="no">${no}</div><div class="ico">${L.moodIcon(pg.rib.icon, 66)}</div><div class="txt"><small>${pg.rib.moral ? 'Pesan moral' : 'Pesan Kiko'}</small>${pg.rib.t}</div></div></section>`;
});
html += `</body></html>`;
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html);
console.log('index.html ditulis,', pages.length, 'halaman + sampul');
