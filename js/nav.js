import { M } from './motion.js';

/* ── Scroll progress + navbar hide/show ── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  gsap.set('#progress', { scaleX: s / h });
  navbar.classList.toggle('scrolled', s > 50);

  if (s > 120) {
    if (s > lastScroll + 4)      gsap.to('nav', { y:-80, duration:M.d.sm, ease:M.easeIn, overwrite:'auto' });
    else if (s < lastScroll - 4) gsap.to('nav', { y:0,   duration:M.d.md, ease:M.ease,   overwrite:'auto' });
  }
  lastScroll = s;
}, { passive:true });

/* ── Mobile menu ── */
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const menuLinks    = document.querySelectorAll('.menu-link');
const menuSocials  = document.querySelectorAll('.menu-social a');
let menuOpen = false;

gsap.set(menuCloseBtn, { opacity:0 });

function openMenu() {
  menuOpen = true;
  gsap.to(hamburger, { opacity:0, duration:.2, pointerEvents:'none' });
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';

  gsap.fromTo(menuCloseBtn,
    { opacity:0, rotation:-90 },
    { opacity:1, rotation:0, duration:M.d.md, ease:M.snap, delay:.2 }
  );
  gsap.fromTo(menuLinks,
    { yPercent:110, opacity:0 },
    { yPercent:0, opacity:1, stagger:M.s.lg, duration:M.d.md, ease:M.ease, delay:.28 }
  );
  gsap.fromTo(menuSocials,
    { y:14, opacity:0 },
    { y:0, opacity:1, stagger:.06, duration:M.d.sm, ease:M.ease, delay:.62 }
  );
}

function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;

  gsap.to(menuCloseBtn, { opacity:0, rotation:180, duration:M.d.xs, ease:M.easeIn });
  gsap.to([...menuLinks].reverse(), { yPercent:-60, opacity:0, stagger:.04, duration:M.d.xs, ease:M.easeIn });
  gsap.to(menuSocials, { y:-10, opacity:0, stagger:.03, duration:.2, ease:M.easeIn });

  setTimeout(() => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    gsap.to(hamburger, { opacity:1, duration:M.d.xs, pointerEvents:'auto' });
    gsap.set(menuCloseBtn, { opacity:0, rotation:0 });
    gsap.set(menuLinks,    { yPercent:110, opacity:0 });
    gsap.set(menuSocials,  { y:14, opacity:0 });
  }, 420);
}

hamburger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
menuCloseBtn.addEventListener('click', closeMenu);
menuLinks.forEach(l => l.addEventListener('click', () => setTimeout(closeMenu, 60)));

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (menuOpen && window.innerWidth > 768) closeMenu();
  }, 150);
});

menuLinks.forEach(link => {
  link.addEventListener('mouseenter', () => gsap.to(link, { x:8, duration:M.d.xs, ease:M.ease }));
  link.addEventListener('mouseleave', () => gsap.to(link, { x:0, duration:M.d.sm, ease:M.spring }));
});

/* ── Logo scramble ── */
const navLogo   = document.querySelector('.nav-logo');
const logoShort = 'AM —';
const logoFull  = 'Abraham —';
const CHARS     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—';
let logoLocked  = false;

function scrambleTo(target, onDone) {
  if (logoLocked) return;
  logoLocked = true;
  let iter = 0;
  const iv = setInterval(() => {
    navLogo.textContent = target.split('').map((c, i) => {
      if (i < iter)           return target[i];
      if (c === ' ' || c === '—') return c;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (iter >= target.length) {
      clearInterval(iv);
      navLogo.textContent = target;
      logoLocked = false;
      onDone && onDone();
    }
    iter += .55;
  }, 36);
}

navLogo.addEventListener('mouseenter', () => scrambleTo(logoFull));
navLogo.addEventListener('mouseleave', () => scrambleTo(logoShort));

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    gsap.to(window, { scrollTo:top, duration:M.d.lg, ease:'expo.inOut' });
  });
});

/* ── Magnetic buttons ── */
document.querySelectorAll('.magnetic').forEach(el => {
  const inner = el.querySelector('span') || el;
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * .42;
    const dy = (e.clientY - r.top  - r.height / 2) * .42;
    gsap.to(el, { x:dx, y:dy, duration:M.d.xs, ease:'power2.out', overwrite:'auto' });
    if (inner !== el) gsap.to(inner, { x:dx*.15, y:dy*.15, duration:M.d.xs, ease:'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x:0, y:0, duration:M.d.md, ease:M.spring, overwrite:'auto' });
    if (inner !== el) gsap.to(inner, { x:0, y:0, duration:M.d.md, ease:M.spring });
  });
  el.addEventListener('click', () => gsap.fromTo(el, { scale:.93 }, { scale:1, duration:M.d.sm, ease:M.spring }));
});
