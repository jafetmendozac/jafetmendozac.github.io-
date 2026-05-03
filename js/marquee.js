const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
  const marqueeWrap = marqueeTrack.closest('.marquee-wrap');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const velocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    const rate = Math.max(0.3, Math.min(3, 1 + Math.abs(velocity) * 0.04));
    marqueeTrack.style.animationDuration = (20 / rate) + 's';
  }, { passive:true });

  marqueeWrap.addEventListener('mouseenter', () => gsap.to(marqueeTrack, { opacity:.8, duration:.3 }));
  marqueeWrap.addEventListener('mouseleave', () => gsap.to(marqueeTrack, { opacity:1,  duration:.3 }));
}
