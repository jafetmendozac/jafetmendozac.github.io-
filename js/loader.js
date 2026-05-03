import { M } from './motion.js';
import { startHero } from './hero.js';

(function () {
  const bar     = document.getElementById('loader-bar');
  const pct     = document.getElementById('loader-pct');
  const letters = document.querySelectorAll('#loader-name span');

  gsap.set(letters, { yPercent:110, opacity:0 });
  gsap.to(letters, { yPercent:0, opacity:1, stagger:.12, duration:M.d.md, ease:M.ease, delay:.1 });

  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 13 + 4;
    if (p >= 100) { p = 100; clearInterval(iv); }
    gsap.to(bar, { width: p + '%', duration:.3, ease:'power2.out' });
    pct.textContent = Math.round(p) + '%';

    if (p === 100) setTimeout(() => {
      gsap.to(letters, { yPercent:-110, opacity:0, stagger:.05, duration:M.d.sm, ease:M.easeIn });
      gsap.to('#loader', {
        clipPath: 'inset(100% 0 0 0)',
        duration: M.d.md + .1, ease:M.ease, delay:.15,
        onComplete() {
          document.getElementById('loader').style.display = 'none';
          startHero();
        }
      });
    }, 300);
  }, 75);
})();
