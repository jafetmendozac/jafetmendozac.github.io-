import { M } from './motion.js';

export function startHero() {
  const words = gsap.utils.toArray('#heroTitle .word');
  const tl = gsap.timeline({ defaults:{ ease:M.ease } });

  tl.fromTo(words,       { yPercent:110 },            { yPercent:0, duration:M.d.md, stagger:M.s.md })
    .fromTo('#heroAvail', { y:16, opacity:0 },         { y:0, opacity:1, duration:M.d.sm }, '-=.5')
    .fromTo('#heroBottom',{ y:20, opacity:0 },         { y:0, opacity:1, duration:M.d.md }, '-=.45')
    .fromTo('#bgText',    { x:80, opacity:0, rotation:3 }, { x:0, opacity:1, rotation:0, duration:M.d.xl }, '-=.8')
    .fromTo('nav',        { y:-20, opacity:0 },        { y:0, opacity:1, duration:M.d.md }, '-=1.1');

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.getAttribute('data-count');
    gsap.to({ v:0 }, {
      v: target, duration:2, ease:'power2.out', delay:1,
      onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
    });
  });
}
