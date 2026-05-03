import { M } from './motion.js';

const cur      = document.getElementById('cursor');
const ring     = document.getElementById('cursor-ring');
const curLabel = document.getElementById('cursor-label');
let mx=0, my=0, rx=0, ry=0, vx=0, vy=0, px=0, py=0;

document.addEventListener('mousemove', e => {
  px=mx; py=my; mx=e.clientX; my=e.clientY;
  vx=mx-px; vy=my-py;
  gsap.set(cur, { x:mx, y:my });
  gsap.set(curLabel, { x:mx, y:my });

  const speed   = Math.sqrt(vx*vx + vy*vy);
  const angle   = Math.atan2(vy, vx) * (180/Math.PI);
  const stretch = Math.min(1 + speed * 0.04, 1.8);
  gsap.to(cur, { scaleX:stretch, scaleY:1/stretch, rotation:angle, duration:.12, ease:'power2.out', overwrite:'auto' });
  gsap.to(cur, { scaleX:1, scaleY:1, rotation:0, duration:.5, ease:M.spring, delay:.12, overwrite:false });
});

(function animRing(){
  rx += (mx-rx)*.09; ry += (my-ry)*.09;
  gsap.set(ring, { x:rx, y:ry });
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('c-hover');
    gsap.to(ring, { scale:1.2, duration:.3, ease:M.ease });
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('c-hover');
    gsap.to(ring, { scale:1, duration:.4, ease:M.spring });
  });
});

document.querySelectorAll('[data-project]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('c-proj');
    document.body.classList.remove('c-hover');
  });
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-proj'));
});
