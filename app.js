/* ==========================================================
   ORIENT EXPRESS — interacciones
   El vagón entra en la estación y se balancea con el cursor
   (reloj de andén con la hora real de Lloret); la carta es un
   panel de salidas de paletas; las hamburguesas, en un mapa
   con la ruta del Orient Express; las fotos pasan por las
   ventanillas de un tren que frena al pasar el cursor.
   ========================================================== */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const STATIC = /[?&]static\b/.test(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || STATIC;
const IMG = (f) => 'assets/img/' + f;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
document.documentElement.classList.add('js');

/* ----------------------------------------------------------
   IDIOMAS · castellano por defecto, ?lang=xx, se recuerda
   ---------------------------------------------------------- */
const I18N = window.OE_I18N || { langs: [{ c: 'es', n: 'Castellano', loc: 'es-ES' }], ui: { es: {} } };
const CARTA = window.OE_CARTA || [];
const LANGS = I18N.langs, CODES = LANGS.map((l) => l.c), LANG_KEY = 'orient-lang';
const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
let lang = [new URLSearchParams(location.search).get('lang'), store.get(LANG_KEY)].find((c) => CODES.includes(c)) || 'es';
const li = () => Math.max(0, CODES.indexOf(lang));
const t = (k, vars) => {
  let s = (I18N.ui[lang] && I18N.ui[lang][k]) ?? (I18N.ui.es && I18N.ui.es[k]) ?? k;
  if (vars) for (const v in vars) s = s.split('{' + v + '}').join(vars[v]);
  return s;
};
const loc = () => (LANGS.find((l) => l.c === lang) || LANGS[0]).loc;
const price = (p) => { try { return new Intl.NumberFormat(loc(), { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(p); } catch (e) { return p.toFixed(2) + ' €'; } };
const onLang = [];
function paintSwitches() {
  const cur = LANGS.find((l) => l.c === lang);
  $$('[data-lang-switch]').forEach((box) => {
    box.innerHTML = `<button class="lang__btn" type="button" aria-expanded="false" aria-label="${t('lang.change')} (${cur.n})"><i class="ph ph-globe-simple" aria-hidden="true"></i><span>${cur.c.toUpperCase()}</span><i class="ph ph-caret-down" aria-hidden="true"></i></button>
      <ul class="lang__menu" hidden>${LANGS.map((l) => `<li><button type="button" lang="${l.c}" data-set-lang="${l.c}"${l.c === lang ? ' aria-current="true"' : ''}><b>${l.c.toUpperCase()}</b>${l.n}</button></li>`).join('')}</ul>`;
  });
  $$('[data-lang-list]').forEach((box) => {
    box.innerHTML = `<span>${t('lang.label')}</span>` + LANGS.map((l) => `<button type="button" lang="${l.c}" data-set-lang="${l.c}"${l.c === lang ? ' aria-current="true"' : ''}>${l.n}</button>`).join('');
  });
}
function applyLang() {
  document.documentElement.lang = lang;
  document.title = t('meta.title');
  const md = $('#metaDesc'); if (md) md.setAttribute('content', t('meta.desc'));
  $$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  $$('[data-i18n-attr]').forEach((el) => el.dataset.i18nAttr.split(';').forEach((p) => {
    const [a, k] = p.split(':'); if (a && k) el.setAttribute(a.trim(), t(k.trim()));
  }));
  paintSwitches();
  onLang.forEach((f) => f());
}
function setLang(c) {
  if (!CODES.includes(c) || c === lang) return;
  lang = c; store.set(LANG_KEY, c);
  try { const u = new URL(location.href); if (c === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', c); history.replaceState(history.state, '', u); } catch (e) {}
  applyLang();
}
const closeLangMenus = () => $$('.lang__menu:not([hidden])').forEach((m) => { m.hidden = true; m.previousElementSibling.setAttribute('aria-expanded', 'false'); });
document.addEventListener('click', (e) => {
  const sw = e.target.closest('.lang__btn');
  if (sw) {
    const m = sw.nextElementSibling, open = m.hidden;
    closeLangMenus(); m.hidden = !open; sw.setAttribute('aria-expanded', String(open));
    if (open) { const c = m.querySelector('[aria-current]'); if (c) c.focus(); }
    return;
  }
  const set = e.target.closest('[data-set-lang]');
  if (set) { const box = set.closest('[data-lang-switch]'); closeLangMenus(); setLang(set.dataset.setLang); if (box) { const b = box.querySelector('.lang__btn'); if (b) b.focus(); } return; }
  if (!e.target.closest('.lang__menu')) closeLangMenus();
});
document.addEventListener('keydown', (e) => {
  const m = $('.lang__menu:not([hidden])'); if (!m) return;
  const items = $$('button', m), i = items.indexOf(document.activeElement);
  if (e.key === 'Escape') { closeLangMenus(); m.previousElementSibling.focus(); }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
});
document.addEventListener('focusin', (e) => { const m = $('.lang__menu:not([hidden])'); if (m && !m.parentNode.contains(e.target)) closeLangMenus(); });

/* ----------------------------------------------------------
   NAV, desplazamiento suave y apariciones
   ---------------------------------------------------------- */
const nav = $('#nav'), burger = $('#burger'), drawer = $('#drawer');
const setSolid = () => nav.classList.toggle('is-solid', scrollY > 60);
addEventListener('scroll', setSolid, { passive: true }); setSolid();
const toggleDrawer = (open) => { burger.setAttribute('aria-expanded', String(open)); drawer.hidden = !open; document.documentElement.style.overflow = open ? 'hidden' : ''; };
burger.addEventListener('click', () => toggleDrawer(burger.getAttribute('aria-expanded') !== 'true'));
drawer.addEventListener('click', (e) => { if (e.target.closest('a')) toggleDrawer(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { toggleDrawer(false); burger.focus(); } });
if ('IntersectionObserver' in window) {
  const links = $$('.nav__links a');
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-on', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['abordo', 'salidas', 'ruta', 'fotos', 'visita'].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
let lenis = null;
if (!reduced && typeof window.Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.12 });
  const raf = (tm) => { lenis.raf(tm); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute('href'); if (id.length < 2) return;
  const target = document.querySelector(id); if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: id === '#estacion-top' ? 0 : -50 }); else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
});
const reveals = $$('.reveal');
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((r) => io.observe(r));
  const check = () => reveals.forEach((r) => { if (!r.classList.contains('is-in') && r.getBoundingClientRect().top < innerHeight * .95) r.classList.add('is-in'); });
  addEventListener('scroll', check, { passive: true }); setTimeout(check, 400);
} else reveals.forEach((r) => r.classList.add('is-in'));

/* ----------------------------------------------------------
   RELOJES · hora real de Lloret
   ---------------------------------------------------------- */
function lloretTime() {
  try {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const g = (k) => +(p.find((x) => x.type === k) || {}).value;
    return { h: g('hour') % 24, m: g('minute'), s: g('second') };
  } catch (e) { const d = new Date(); return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() }; }
}
$('#ckTicks').innerHTML = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, r1 = i % 3 ? 35 : 32; return `<line x1="${(50 + Math.sin(a) * r1).toFixed(1)}" y1="${(50 - Math.cos(a) * r1).toFixed(1)}" x2="${(50 + Math.sin(a) * 38).toFixed(1)}" y2="${(50 - Math.cos(a) * 38).toFixed(1)}"/>`; }).join('');
function tickClocks() {
  const { h, m, s } = lloretTime();
  $('#ckH').setAttribute('transform', `rotate(${((h % 12) + m / 60) * 30} 50 50)`);
  $('#ckM').setAttribute('transform', `rotate(${(m + s / 60) * 6} 50 50)`);
  $('#boardClock').textContent = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}
tickClocks(); setInterval(tickClocks, 15000);

/* ----------------------------------------------------------
   EL VAGÓN · llega a la estación y se balancea
   ---------------------------------------------------------- */
(function train() {
  const svg = $('.train__svg'), body = $('#trainBody'), bogies = $('#trainBogies'), wheels = $$('.wheel', svg), steam = $('#steam'), flame = $('.tr__flame');
  const hero = $('#estacion-top');
  if (!svg) return;
  let x = reduced ? 0 : 1400, sway = 0, swayT = 0, wheelA = 0, arrived = reduced, t0 = performance.now(), visible = true;
  const puffs = [];
  const wheelBase = wheels.map((w) => w.getAttribute('transform'));
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    swayT = ((e.clientX - r.left) / r.width - .5) * 1.6;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { swayT = 0; });
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
  function spawnPuff(px, py) {
    if (puffs.length > 26) return;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    steam.appendChild(c);
    puffs.push({ c, x: px, y: py, r: 8 + Math.random() * 8, vx: -20 - Math.random() * 30, vy: -26 - Math.random() * 20, life: 0, max: 2.4 + Math.random() });
  }
  function apply() {
    body.setAttribute('transform', `translate(${x.toFixed(1)} 0) rotate(${sway.toFixed(2)} 620 340)`);
    bogies.setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
    wheels.forEach((w, i) => w.setAttribute('transform', `${wheelBase[i]} rotate(${wheelA.toFixed(1)})`));
  }
  apply();
  if (reduced) return;
  let last = performance.now(), puffAcc = 0;
  const tick = (now) => {
    requestAnimationFrame(tick);
    if (!visible || document.hidden) { last = now; return; }
    const dt = clamp((now - last) / 1000, .001, .05); last = now;
    const prevX = x;
    if (!arrived) {
      const k = clamp((now - t0 - 300) / 2600, 0, 1), e = 1 - Math.pow(1 - k, 3);
      x = 1400 * (1 - e);
      if (k >= 1) { arrived = true; x = 0; }
    }
    // al llegar, un pequeño vaivén de frenada
    const settle = arrived ? Math.sin((now - t0 - 2900) / 140) * Math.exp(-(now - t0 - 2900) / 500) * .6 : 0;
    sway = lerp(sway, swayT + settle + Math.sin(now / 900) * .08, .06);
    wheelA -= (prevX - x) / 26 * (180 / Math.PI);
    puffAcc += dt * (arrived ? 1.4 : 7);
    while (puffAcc > 1) { puffAcc -= 1; spawnPuff(x + 1180 + Math.random() * 40, 50 + Math.random() * 20); }
    for (let i = puffs.length - 1; i >= 0; i--) {
      const p = puffs[i]; p.life += dt;
      if (p.life > p.max) { p.c.remove(); puffs.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.r += 14 * dt;
      p.c.setAttribute('cx', p.x.toFixed(1)); p.c.setAttribute('cy', p.y.toFixed(1)); p.c.setAttribute('r', p.r.toFixed(1));
      p.c.setAttribute('opacity', (Math.sin(p.life / p.max * Math.PI) * .8).toFixed(2));
    }
    if (flame) flame.setAttribute('opacity', (.8 + Math.random() * .2).toFixed(2));
    apply();
  };
  requestAnimationFrame(tick);
})();

/* ----------------------------------------------------------
   PANEL DE SALIDAS · la carta en paletas
   ---------------------------------------------------------- */
const tabsBox = $('#boardTabs'), body = $('#boardBody'), detail = $('#boardDetail'), secLine = $('#boardSec');
let curSec = 0, selRow = -1, flapJobs = [], flapRaf = 0;
const DIGITS = '0123456789';
function flapsHTML(str, cls) {
  return `<span class="flaps ${cls || ''}">${[...str].map((ch) => {
    const sym = !/[0-9A-Za-z]/.test(ch);
    return `<span class="flap${ch === ' ' || ch === ' ' || ch === ' ' ? ' is-blank is-sym' : sym ? ' is-sym' : ''}" data-c="${esc(ch)}">${esc(ch)}</span>`;
  }).join('')}</span>`;
}
function runFlaps() {
  cancelAnimationFrame(flapRaf);
  let last = 0;
  const step = (now) => {
    if (now - last > 55) {
      last = now;
      flapJobs = flapJobs.filter((j) => {
        if (j.n-- > 0) { j.el.textContent = DIGITS[(Math.random() * 10) | 0]; return true; }
        j.el.textContent = j.c; return false;
      });
    }
    if (flapJobs.length) flapRaf = requestAnimationFrame(step);
  };
  flapRaf = requestAnimationFrame(step);
}
function paintTabs() {
  tabsBox.innerHTML = CARTA.map((s, i) => `<button type="button" role="tab" id="tab-${s.id}" aria-controls="boardPanel" aria-selected="${i === curSec}" tabindex="${i === curSec ? 0 : -1}"><i class="ph ph-${s.ic}" aria-hidden="true"></i><small>${esc(t('sal.anden', { n: i + 1 }))}</small>${esc(s.t[li()])}</button>`).join('');
}
function paintBoard(animate) {
  const s = CARTA[curSec]; if (!s) return;
  $('#boardPanel').setAttribute('aria-labelledby', 'tab-' + s.id);
  secLine.textContent = s.note ? s.note[li()] : '';
  selRow = -1;
  body.innerHTML = s.items.map(([n, p, names], i) => `<tr tabindex="0" data-i="${i}"><td class="b-n">${flapsHTML(String(n))}</td><td class="b-d"><span class="name">${esc(names[li()])}</span></td><td class="b-p">${flapsHTML(price(p))}</td></tr>`).join('');
  detail.innerHTML = esc(t('sal.pick'));
  if (!animate || reduced) return;
  flapJobs = [];
  $$('tr', body).forEach((tr, i) => {
    $$('.flap:not(.is-sym)', tr).forEach((el, j) => flapJobs.push({ el, c: el.dataset.c, n: 4 + i * 2 + j }));
    const nm = $('.name', tr);
    if (nm.animate) nm.animate([{ transform: 'rotateX(-90deg)', opacity: .2 }, { transform: 'rotateX(8deg)', opacity: 1, offset: .75 }, { transform: 'rotateX(0)', opacity: 1 }], { duration: 420, delay: i * 70, easing: 'ease-out', fill: 'backwards' });
  });
  runFlaps();
}
function selectRow(i) {
  const s = CARTA[curSec], it = s.items[i]; if (!it) return;
  selRow = i;
  $$('tr', body).forEach((tr, j) => tr.classList.toggle('is-sel', j === i));
  const d = it[3] ? it[3][li()] : t('sal.nodesc');
  detail.innerHTML = `<b>${esc(it[2][li()])}</b>${esc(d)}`;
}
function goSec(i, focus) {
  curSec = (i + CARTA.length) % CARTA.length;
  paintTabs(); paintBoard(true);
  if (focus) { const b = $('#tab-' + CARTA[curSec].id); b.focus(); b.scrollIntoView({ block: 'nearest', inline: 'center' }); }
}
tabsBox.addEventListener('click', (e) => { const b = e.target.closest('[role="tab"]'); if (!b) return; const i = $$('[role="tab"]', tabsBox).indexOf(b); if (i !== curSec) goSec(i, true); });
tabsBox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); goSec(curSec + (e.key === 'ArrowRight' ? 1 : -1), true); }
  if (e.key === 'Home') { e.preventDefault(); goSec(0, true); }
  if (e.key === 'End') { e.preventDefault(); goSec(CARTA.length - 1, true); }
});
body.addEventListener('click', (e) => { const tr = e.target.closest('tr'); if (tr) selectRow(+tr.dataset.i); });
body.addEventListener('keydown', (e) => { const tr = e.target.closest('tr'); if (tr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectRow(+tr.dataset.i); } });
let boardSeen = false;
onLang.push(() => { paintTabs(); paintBoard(false); });
if ('IntersectionObserver' in window && !reduced) new IntersectionObserver(([en]) => { if (en.isIntersecting && !boardSeen) { boardSeen = true; paintBoard(true); } }, { threshold: .3 }).observe($('.board'));

/* ----------------------------------------------------------
   LA RUTA · las hamburguesas en el mapa
   ---------------------------------------------------------- */
const STOPS = [
  { id: 'london', x: 107, y: 75, n: 42, dx: 18, dy: 6, anchor: 'start', photo: 'burger-victoria.jpg' },
  { id: 'paris', x: 162, y: 154, n: 40, dx: 18, dy: 8, anchor: 'start' },
  { id: 'venezia', x: 381, y: 257, n: 43, dx: 0, dy: -22, anchor: 'middle' },
  { id: 'istanbul', x: 747, y: 389, n: 41, dx: -10, dy: -24, anchor: 'end' },
  { id: 'lloret', x: 173, y: 369, n: null, dx: 22, dy: 6, anchor: 'start' }
];
const burgers = (CARTA.find((s) => s.id === 'hamburguesas') || { items: [] }).items;
let curStop = 'london';
function paintMap() {
  $('#mapStops').innerHTML = STOPS.map((s) => {
    const sub = s.n ? (burgers.find((b) => b[0] === s.n) || [])[2] : null;
    const name = t('ruta.' + s.id);
    const lbl = s.n ? `${name} · ${sub ? sub[li()] : ''}` : name;
    return `<g class="map__stop${s.id === 'lloret' ? ' map__stop--lloret' : ''}${s.id === curStop ? ' is-on' : ''}" data-id="${s.id}" tabindex="0" role="button" aria-pressed="${s.id === curStop}" aria-label="${esc(lbl)}" transform="translate(${s.x} ${s.y})">
      ${s.id === 'lloret' ? '<path d="M0-16 4.7-6.5 15.2-4.9 7.6 2.5 9.4 13 0 8 -9.4 13 -7.6 2.5 -15.2-4.9 -4.7-6.5Z"/>' : '<circle class="o" r="13"/><circle class="i" r="5"/>'}
      <text x="${s.dx}" y="${s.dy}" text-anchor="${s.anchor}">${esc(name)}</text>
      ${sub ? `<text class="s" x="${s.dx}" y="${s.dy + 18}" text-anchor="${s.anchor}">${esc(sub[li()])}</text>` : `<text class="s" x="${s.dx}" y="${s.dy + 18}" text-anchor="${s.anchor}">${esc(t('ruta.lloretT'))}</text>`}
    </g>`;
  }).join('') + '<circle id="mapTrain" r="7" fill="#C9A24A" stroke="#5E1520" stroke-width="3"/>';
  paintStop();
}
function paintStop() {
  const s = STOPS.find((x) => x.id === curStop), card = $('#stopCard');
  $$('.map__stop').forEach((g) => { const on = g.dataset.id === curStop; g.classList.toggle('is-on', on); g.setAttribute('aria-pressed', String(on)); });
  if (!s.n) {
    card.innerHTML = `<p class="sc-city">${esc(t('ruta.lloret'))}</p><h3>${esc(t('ruta.lloretT'))}</h3><span></span><p class="sc-d">${esc(t('ruta.lloretD'))}</p>`;
    return;
  }
  const b = burgers.find((x) => x[0] === s.n); if (!b) return;
  card.innerHTML = `<p class="sc-city">${esc(t('ruta.' + s.id))} · Nº ${b[0]}</p><h3>${esc(b[2][li()])}</h3><span class="sc-price">${esc(price(b[1]))}</span><p class="sc-d">${esc(b[3] ? b[3][li()] : '')}</p>${s.photo ? `<img src="${IMG(s.photo)}" alt="${esc(t('ruta.photo'))}" loading="lazy">` : ''}`;
}
$('#mapSvg').addEventListener('click', (e) => { const g = e.target.closest('.map__stop'); if (g) { curStop = g.dataset.id; paintStop(); } });
$('#mapSvg').addEventListener('keydown', (e) => { const g = e.target.closest('.map__stop'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); curStop = g.dataset.id; paintStop(); } });
onLang.push(paintMap);
(function mapTrain() {
  const route = $('#mapRoute'); if (!route || reduced) return;
  const L = route.getTotalLength();
  let visible = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(route.ownerSVGElement);
  const tick = (now) => {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dot = $('#mapTrain'); if (!dot) return;
    const k = (now / 14000) % 1, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const p = route.getPointAtLength(L * e);
    dot.setAttribute('cx', p.x.toFixed(1)); dot.setAttribute('cy', p.y.toFixed(1));
  };
  requestAnimationFrame(tick);
})();

/* ----------------------------------------------------------
   POR LA VENTANILLA · el tren de fotos
   ---------------------------------------------------------- */
const FOTOS = ['burger-victoria', 'entrecot', 'costillas', 'pizza', 'interior', 'entrana', 'ensalada', 'tiramisu', 'burger', 'pasta', 'ensalada-cabra', 'coulant', 'fachada-noche', 'spaghetti', 'baguette', 'cheesecake'];
const track = $('#convoyTrack');
function paintConvoy() {
  const coach = (start) => `<div class="coach">${FOTOS.slice(start, start + 4).map((f, j) => `<button class="win" type="button" data-i="${start + j}" aria-label="${esc(t('fot.open') + ': ' + t('g.' + f))}"><img src="${IMG(f + '.jpg')}" alt="${esc(t('ga.' + f))}" loading="lazy"><span>${esc(t('g.' + f))}</span></button>`).join('')}</div>`;
  const set = [0, 4, 8, 12].map(coach).join('');
  track.innerHTML = set + set.replace(/<button class="win"/g, '<button class="win" tabindex="-1" aria-hidden="true"');
}
onLang.push(paintConvoy);
(function convoy() {
  if (reduced) { $('#convoy').style.overflowX = 'auto'; return; }
  let x = 0, speed = 60, target = 60, visible = false, last = performance.now();
  const box = $('#convoy');
  box.addEventListener('pointerenter', () => { target = 10; });
  box.addEventListener('pointerleave', () => { target = 60; });
  box.addEventListener('focusin', () => { target = 0; });
  box.addEventListener('focusout', () => { target = 60; });
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(box);
  const tick = (now) => {
    requestAnimationFrame(tick);
    const dt = clamp((now - last) / 1000, .001, .05); last = now;
    if (!visible || document.hidden) return;
    speed = lerp(speed, target, .05);
    const half = track.scrollWidth / 2;
    x -= speed * dt; if (half && -x >= half) x += half;
    track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
  };
  requestAnimationFrame(tick);
})();
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
let lbI = 0, lbFrom = null;
function lbShow(i) {
  lbI = (i + FOTOS.length) % FOTOS.length;
  const f = FOTOS[lbI];
  lbImg.src = IMG(f + '.jpg'); lbImg.alt = t('ga.' + f); lbCap.textContent = t('g.' + f);
  lbCount.textContent = (lbI + 1) + ' / ' + FOTOS.length;
}
function lbOpen(i, from) { lbFrom = from; lbShow(i); lb.hidden = false; document.documentElement.style.overflow = 'hidden'; if (lenis) lenis.stop(); $('#lbClose').focus(); }
function lbClose() { lb.hidden = true; document.documentElement.style.overflow = ''; if (lenis) lenis.start(); if (lbFrom) lbFrom.focus(); }
track.addEventListener('click', (e) => { const b = e.target.closest('.win'); if (b) lbOpen(+b.dataset.i, b); });
$('#lbClose').addEventListener('click', lbClose);
$('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
$('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(lbI - 1);
  if (e.key === 'ArrowRight') lbShow(lbI + 1);
  if (e.key === 'Tab') { const f = $$('.lb__btn', lb); const i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
});
let sx = null;
lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
lb.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) lbShow(lbI + (dx < 0 ? 1 : -1)); });

/* ----------------------------------------------------------
   MAPA · solo si se pide
   ---------------------------------------------------------- */
$('#mapaLoad').addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.title = t('vis.mapTitle'); f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
  f.src = 'https://maps.google.com/maps?q=Orient%20Express%20Restaurant%2C%20Passeig%20d%27Agust%C3%AD%20Font%2012%2C%20Lloret%20de%20Mar&z=17&output=embed&hl=' + lang;
  $('#mapa').replaceChildren(f);
});

applyLang();
})();
