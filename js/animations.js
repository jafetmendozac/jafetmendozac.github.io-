import { M } from './motion.js';

/* ── Parallax ── */
gsap.to('#bgText',  { yPercent:32, rotation:-1, ease:'none', scrollTrigger:{ trigger:'#hero',  start:'top top',    end:'bottom top', scrub:2   } });
gsap.to('#aboutNum',{ y:-100,                   ease:'none', scrollTrigger:{ trigger:'#about', start:'top bottom', end:'bottom top', scrub:2.5 } });

/* ── Utilidades reutilizables ── */
export function clipReveal(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return;
  gsap.fromTo(els,
    { clipPath:'inset(0 0 100% 0)', y: opts.y ?? 0 },
    {
      clipPath:'inset(0 0 0% 0)', y:0,
      duration: opts.dur     ?? M.d.md,
      stagger:  opts.stagger ?? M.s.md,
      ease: M.ease,
      scrollTrigger: { trigger: opts.trigger ?? els[0], start: opts.start ?? 'top 80%', toggleActions:'play none none none' }
    }
  );
}

export function fadeUp(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return;
  gsap.fromTo(els,
    { y: opts.from ?? 40, opacity:0 },
    {
      y:0, opacity:1,
      duration: opts.dur     ?? M.d.md,
      stagger:  opts.stagger ?? M.s.md,
      ease: M.ease,
      scrollTrigger: { trigger: opts.trigger ?? els[0], start: opts.start ?? 'top 82%', toggleActions:'play none none none' }
    }
  );
}

/* ── Section labels ── */
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.fromTo(el, { x:-18, opacity:0 }, { x:0, opacity:1, duration:M.d.sm, ease:M.ease, scrollTrigger:{ trigger:el, start:'top 90%' } });
});

/* ── About ── */
gsap.fromTo('.about-sticky', { x:-50, opacity:0 }, { x:0, opacity:1, duration:M.d.lg, ease:M.ease, scrollTrigger:{ trigger:'#about', start:'top 72%' } });
clipReveal('#aboutContent .about-text', { stagger:M.s.lg, dur:M.d.md, start:'top 74%', trigger:'#about' });
gsap.fromTo('.about-diff', { scale:.96, opacity:0 }, { scale:1, opacity:1, duration:M.d.md, ease:M.snap, scrollTrigger:{ trigger:'.about-diff', start:'top 88%' } });

/* ── Experience ── */
clipReveal('.exp-heading .line', { stagger:M.s.lg, dur:M.d.lg, trigger:'#experience', start:'top 78%' });

document.querySelectorAll('.exp-card').forEach(card => {
  fadeUp(card, { from:55, dur:M.d.md, start:'top 88%', stagger:0, trigger:card });
  card.style.overflow = 'hidden';

  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y:-4, duration:M.d.xs, ease:M.ease, overwrite:'auto' });
    gsap.to(card.querySelector('.exp-results .exp-result'), { x:3, stagger:M.s.sm, duration:M.d.xs, ease:M.ease });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y:0, duration:M.d.sm, ease:M.spring, overwrite:'auto' });
    gsap.to(card.querySelector('.exp-results .exp-result'), { x:0, stagger:M.s.sm, duration:M.d.sm, ease:M.spring });
  });
});

/* ── Projects ── */
clipReveal('.proj-heading .line', { stagger:M.s.lg, dur:M.d.lg, trigger:'#projects', start:'top 78%' });

document.querySelectorAll('.proj-card').forEach(card => {
  fadeUp(card, { from:45, dur:M.d.md, trigger:card, start:'top 90%', stagger:0 });
  const arrow = card.querySelector('.proj-arrow');

  card.addEventListener('mouseenter', () => {
    gsap.to(card,  { y:-6, duration:M.d.xs, ease:M.ease, overwrite:'auto' });
    gsap.to(arrow, { rotation:-42, scale:1.15, duration:M.d.sm, ease:M.snap });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card,  { y:0, duration:M.d.sm, ease:M.spring, overwrite:'auto' });
    gsap.to(arrow, { rotation:0, scale:1, duration:M.d.md, ease:M.spring });
  });
});

/* ── Skills ── */
fadeUp('.skills-heading', { dur:M.d.md, trigger:'#skills', start:'top 80%' });
fadeUp('.skills-sub',     { from:20, dur:M.d.sm, trigger:'#skills', start:'top 78%' });

document.querySelectorAll('.skill-group').forEach(el => {
  fadeUp(el, { from:50, dur:M.d.md, trigger:el, start:'top 90%', stagger:0 });

  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    gsap.to(el, { rotateY:dx*6, rotateX:-dy*6, transformPerspective:900, duration:M.d.xs, ease:'power2.out', overwrite:'auto' });
  });
  el.addEventListener('mouseleave', () => gsap.to(el, { rotateY:0, rotateX:0, duration:M.d.md, ease:M.spring }));
});

/* ── Testimonials ── */
const testHeading = document.querySelector('.test-heading');
if (testHeading) {
  gsap.fromTo(testHeading, { y:30, opacity:0 }, { y:0, opacity:1, duration:M.d.lg, ease:M.ease, scrollTrigger:{ trigger:testHeading, start:'top 80%' } });
}

document.querySelectorAll('.test-card').forEach(card => {
  fadeUp(card, { from:40, dur:M.d.md, trigger:card, start:'top 90%', stagger:0 });

  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y:-6, boxShadow:'0 24px 50px rgba(17,24,39,.12)', duration:M.d.xs, ease:M.ease, overwrite:'auto' });
    gsap.to(card.querySelector('.test-quote'), { scale:1.15, opacity:.7, duration:M.d.sm, ease:M.snap });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y:0, boxShadow:'0 0px 0px rgba(17,24,39,0)', duration:M.d.sm, ease:M.spring, overwrite:'auto' });
    gsap.to(card.querySelector('.test-quote'), { scale:1, opacity:1, duration:M.d.sm, ease:M.spring });
  });
});

/* ── Contact ── */
gsap.fromTo('#contactHeading',
  { clipPath:'inset(0 0 100% 0)', y:20 },
  { clipPath:'inset(0 0 0% 0)', y:0, duration:M.d.lg, ease:M.ease, scrollTrigger:{ trigger:'#contact', start:'top 72%' } }
);
fadeUp(['#contactSub', '.contact-promise'], { from:16, dur:M.d.sm, stagger:M.s.md, trigger:'#contact', start:'top 68%' });
fadeUp('#contactLinks', { from:20, dur:M.d.md, trigger:'#contact', start:'top 62%' });

/* ── Footer ── */
fadeUp('footer', { from:20, dur:M.d.md, trigger:'footer', start:'top 95%' });
